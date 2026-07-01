import { decryptAesCbc } from './crypto';
import { findChat } from './chat-resolver';
import {
  BOT_CHAT_ID, BOT_USERNAME, BOT_START_PARAMETER,
  BOT_COMMAND_SUCCESS, BOT_COMMAND_FAILURE,
  TDLIB_MESSAGE_ID_MULTIPLIER, MIN_PROCESSING_DURATION,
} from './config';
import type { TdChat, TdSend, TdUpdate, TelegramController } from './types';
import type { ExportFinding } from './export-flow';

interface BotDataEntry {
  chat_id: number;
  message_ids: number[];
  linked_chat_id?: number;
  chat_username?: string;
  linked_chat_username?: string;
}

interface ResolvedEntry {
  entry: BotDataEntry;
  chat: TdChat | null;
  displayName: string;
}

/** Open bot chat and send the start message. The response arrives via onBotMessage. */
export async function startBotFlow(send: TdSend, ctrl: TelegramController): Promise<void> {
  ctrl.showWorking('Запуск бота…');

  const chat = await send('searchPublicChat', { username: BOT_USERNAME }) as TdUpdate & { id: number };
  if (chat.id !== BOT_CHAT_ID) throw new Error(`Unexpected bot chat id: ${chat.id}`);

  await send('openChat', { chat_id: BOT_CHAT_ID });
  ctrl.showWorking('Запрос данных у бота…');

  await send('setMessageSenderBlockList', {
    block_list: null,
    sender_id: { '@type': 'messageSenderUser', user_id: BOT_CHAT_ID },
  });
  await send('sendBotStartMessage', {
    bot_user_id: BOT_CHAT_ID,
    chat_id: BOT_CHAT_ID,
    parameter: BOT_START_PARAMETER,
  });

  ctrl.showWorking('Ожидание ответа бота…');
}

/**
 * Download + decrypt the bot document, ask for confirmation, delete messages.
 * Returns the list of chat IDs where deletion failed.
 */
export async function handleBotMessage(
  msg: TdUpdate,
  send: TdSend,
  ctrl: TelegramController,
  exportFindings: ExportFinding[] = [],
): Promise<number[] | 'back'> {
  const data = await fetchAndDecrypt(msg, send, ctrl);
  const resolved = await resolveAllChats(data, send, ctrl);
  await verifyMessages(resolved, send, ctrl);
  const merged = mergeExportFindings(resolved, exportFindings);
  const verifiedResolved = merged.filter(r => !r.chat || r.entry.message_ids.length > 0);
  return runDeletionSelection(verifiedResolved, send, ctrl);
}

/**
 * The bot returned no data, but the export/replies scan may still have found the user's
 * own messages — present that unified list for deletion (empty → nothing to do).
 */
export async function handleExportOnly(
  exportFindings: ExportFinding[],
  send: TdSend,
  ctrl: TelegramController,
): Promise<number[] | 'back' | 'no-data'> {
  const verifiedResolved = exportFindings.map(exportToResolved).filter(r => r.entry.message_ids.length > 0);
  if (verifiedResolved.length === 0) return 'no-data';
  return runDeletionSelection(verifiedResolved, send, ctrl);
}

/** Chat-select → confirm → delete loop shared by the bot and export-only flows. */
async function runDeletionSelection(
  verifiedResolved: ResolvedEntry[],
  send: TdSend,
  ctrl: TelegramController,
): Promise<number[] | 'back'> {
  while (true) {
    const chatItems = verifiedResolved.map(r => ({
      chatId: r.entry.chat_id,
      displayName: r.displayName,
      messageCount: r.entry.message_ids.length,
      thumbnail: r.chat?.photo?.minithumbnail?.data,
    }));
    const selectedIds = await ctrl.waitForChatSelect(chatItems);
    if (selectedIds === null) return 'back';
    const filtered = verifiedResolved.filter(r => selectedIds.has(r.entry.chat_id));
    const summary = {
      totalMessages: filtered.reduce((s, r) => s + r.entry.message_ids.length, 0),
      chatNames: filtered.map(r => r.displayName),
    };
    const confirmed = await ctrl.waitForConfirm(summary);
    if (confirmed) return processChats(filtered, send, ctrl);
    // confirmed === false → вернуться к выбору чатов
  }
}

/**
 * The bot answered without a data document → it found nothing to delete.
 * Remove its message so the chat is left clean and signal the empty result.
 */
export async function handleNoBotData(msg: TdUpdate, send: TdSend): Promise<'no-data'> {
  await send('deleteMessages', {
    chat_id: BOT_CHAT_ID,
    message_ids: [msg.id],
    revoke: true,
  });
  return 'no-data';
}

/** Send result command back to bot, close chat, log out. */
export async function sendBotResult(
  failedChatIds: number[],
  send: TdSend,
  ctrl: TelegramController,
): Promise<void> {
  const command = failedChatIds.length > 0 ? BOT_COMMAND_FAILURE : BOT_COMMAND_SUCCESS;
  await send('sendMessage', {
    chat_id: BOT_CHAT_ID,
    input_message_content: {
      '@type': 'inputMessageText',
      text: { '@type': 'formattedText', text: command },
    },
  });

  ctrl.showWorking('Завершение…');

  await send('closeChat', { chat_id: BOT_CHAT_ID });
}

// ─── Internal ─────────────────────────────────────────────────────────────────

/**
 * Merge export/replies findings into the bot's resolved list so the deletion screen shows
 * one unified list. Entries are keyed by resolved chat id (marked -100… id); message ids
 * for a shared chat are unioned. Findings for chats the bot didn't report are appended.
 */
function mergeExportFindings(base: ResolvedEntry[], findings: ExportFinding[]): ResolvedEntry[] {
  const byKey = new Map<number, ResolvedEntry>();
  for (const r of base) byKey.set(r.chat?.id ?? r.entry.chat_id, r);
  for (const f of findings) {
    const existing = byKey.get(f.chat_id);
    if (existing) {
      existing.entry.message_ids = [...new Set([...existing.entry.message_ids, ...f.message_ids])];
      continue;
    }
    byKey.set(f.chat_id, exportToResolved(f));
  }
  return [...byKey.values()];
}

/** An export finding → a ResolvedEntry (already resolved via getChat during collection). */
function exportToResolved(f: ExportFinding): ResolvedEntry {
  return {
    entry: { chat_id: f.chat_id, message_ids: [...f.message_ids] },
    chat: f.chat as unknown as TdChat,
    displayName: (f.chat.title as string) || `Чат ${f.chat_id}`,
  };
}

async function fetchAndDecrypt(
  msg: TdUpdate,
  send: TdSend,
  ctrl: TelegramController,
): Promise<BotDataEntry[]> {
  const content = msg.content as TdUpdate;
  const key = ((content.text as TdUpdate).text as string) ?? '';

  const rows = (msg.reply_markup as TdUpdate)?.rows as TdUpdate[][];
  const button = rows?.flat().find(btn => (btn.type as TdUpdate)?.['@type'] === 'inlineKeyboardButtonTypeUrl');
  if (!button) throw new Error('URL button not found in bot message');
  const url = (button.type as TdUpdate).url as string;

  await send('deleteMessages', {
    chat_id: BOT_CHAT_ID,
    message_ids: [msg.id],
    revoke: true,
  });

  const localOrigins = ['http://localhost', 'https://localhost', 'http://127.0.0.1', 'https://127.0.0.1', 'file://'];
  const isLocal = localOrigins.some(o => window.location.origin.startsWith(o));
  const allowedOrigins = [window.location.origin, ...(isLocal ? ['https://storage.googleapis.com'] : [])];
  if (!allowedOrigins.includes(new URL(url).origin)) {
    throw new Error(`Unexpected URL origin: ${new URL(url).origin}`);
  }

  ctrl.showWorking('Загрузка данных от бота…');

  const [me, response] = await Promise.all([
    send('getMe'),
    fetch(url),
  ]) as [TdUpdate & { id: number }, Response];

  const buffer = await response.arrayBuffer();
  const decrypted = await decryptAesCbc(buffer, String(me.id), key);

  return JSON.parse(new TextDecoder().decode(decrypted).replace(/\0+$/, '')) as BotDataEntry[];
}

async function resolveAllChats(
  data: BotDataEntry[],
  send: TdSend,
  ctrl: TelegramController,
): Promise<ResolvedEntry[]> {
  const results: ResolvedEntry[] = [];
  for (let i = 0; i < data.length; i++) {
    ctrl.showWorking(`Загрузка чатов… ${i + 1} из ${data.length}`);
    const entry = data[i];
    const chat = await findChat(entry, send);
    const displayName = chat?.title
      || entry.chat_username
      || entry.linked_chat_username
      || `Чат ${entry.chat_id}`;
    results.push({ entry, chat, displayName });
  }
  return results;
}

async function verifyMessages(
  resolved: ResolvedEntry[],
  send: TdSend,
  ctrl: TelegramController,
): Promise<void> {
  for (let i = 0; i < resolved.length; i++) {
    ctrl.showWorking(`Проверка сообщений… чат ${i + 1} из ${resolved.length}`);
    const { entry, chat } = resolved[i];
    if (!chat) continue;
    const messageIds = entry.message_ids.map(id => id * TDLIB_MESSAGE_ID_MULTIPLIER);
    const result = await send('getMessages', { chat_id: chat.id, message_ids: messageIds }) as TdUpdate & { messages?: (TdUpdate | null)[] };
    const existingIds = new Set(
      (result.messages ?? [])
        .filter((m): m is TdUpdate => m !== null)
        .map(m => (m.id as number) / TDLIB_MESSAGE_ID_MULTIPLIER),
    );
    entry.message_ids = entry.message_ids.filter(id => existingIds.has(id));
  }
}

async function processChats(
  resolved: ResolvedEntry[],
  send: TdSend,
  ctrl: TelegramController,
): Promise<number[]> {
  const minDuration = new Promise<void>(r => setTimeout(r, MIN_PROCESSING_DURATION));
  const failedChatIds: number[] = [];

  for (let i = 0; i < resolved.length; i++) {
    ctrl.showWorking(`Удаление сообщений… чат ${i + 1} из ${resolved.length}`);
    const { entry, chat } = resolved[i];

    if (!chat) {
      failedChatIds.push(entry.chat_id);
      continue;
    }

    try {
      const messageIds = entry.message_ids.map(id => id * TDLIB_MESSAGE_ID_MULTIPLIER);
      await send('deleteMessages', { chat_id: chat.id, message_ids: messageIds, revoke: true });
    } catch (_) {
      failedChatIds.push(entry.chat_id);
    }
  }

  await minDuration;
  return failedChatIds;
}
