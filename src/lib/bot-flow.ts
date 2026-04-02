import { decryptAesCbc } from './crypto';
import { findChat } from './chat-resolver';
import {
  BOT_CHAT_ID, BOT_USERNAME, BOT_START_PARAMETER,
  BOT_COMMAND_SUCCESS, BOT_COMMAND_FAILURE,
  TDLIB_MESSAGE_ID_MULTIPLIER, MIN_PROCESSING_DURATION,
} from './config';
import type { TdChat, TdSend, TdUpdate, TelegramController } from './types';

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
  ctrl.showWorking('Запрос сообщений…');

  await send('setMessageSenderBlockList', {
    block_list: null,
    sender_id: { '@type': 'messageSenderUser', user_id: BOT_CHAT_ID },
  });
  await send('sendBotStartMessage', {
    bot_user_id: BOT_CHAT_ID,
    chat_id: BOT_CHAT_ID,
    parameter: BOT_START_PARAMETER,
  });

  ctrl.showWorking('Получение сообщений…');
}

/**
 * Download + decrypt the bot document, ask for confirmation, delete messages.
 * Returns the list of chat IDs where deletion failed.
 */
export async function handleBotMessage(
  msg: TdUpdate,
  send: TdSend,
  ctrl: TelegramController,
): Promise<number[] | 'back'> {
  const data = await fetchAndDecrypt(msg, send, ctrl);
  const resolved = await resolveAllChats(data, send, ctrl);

  while (true) {
    const chatItems = resolved.map(r => ({
      chatId: r.entry.chat_id,
      displayName: r.displayName,
      messageCount: r.entry.message_ids.length,
      thumbnail: r.chat?.photo?.minithumbnail?.data,
    }));
    const selectedIds = await ctrl.waitForChatSelect(chatItems);
    if (selectedIds === null) return 'back';
    const filtered = resolved.filter(r => selectedIds.has(r.entry.chat_id));
    const summary = {
      totalMessages: filtered.reduce((s, r) => s + r.entry.message_ids.length, 0),
      chatNames: filtered.map(r => r.displayName),
    };
    const confirmed = await ctrl.waitForConfirm(summary);
    if (confirmed) return processChats(filtered, send, ctrl);
    // confirmed === false → вернуться к выбору чатов
  }
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

  ctrl.showWorking('Загрузка сообщений…');

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
  ctrl.showWorking('Загрузка чатов…');
  const results: ResolvedEntry[] = [];
  for (const entry of data) {
    const chat = await findChat(entry, send);
    const displayName = chat?.title
      || entry.chat_username
      || entry.linked_chat_username
      || `Чат ${entry.chat_id}`;
    results.push({ entry, chat, displayName });
  }
  return results;
}

async function processChats(
  resolved: ResolvedEntry[],
  send: TdSend,
  ctrl: TelegramController,
): Promise<number[]> {
  const minDuration = new Promise<void>(r => setTimeout(r, MIN_PROCESSING_DURATION));
  const failedChatIds: number[] = [];

  for (const { entry, chat } of resolved) {
    ctrl.showWorking('Обработка…');

    if (!chat) {
      failedChatIds.push(entry.chat_id);
      continue;
    }

    try {
      const messageIds = entry.message_ids.map(id => id * TDLIB_MESSAGE_ID_MULTIPLIER);
      await send('getMessages', { chat_id: chat.id, message_ids: messageIds });
      await send('deleteMessages', { chat_id: chat.id, message_ids: messageIds, revoke: true });
    } catch (_) {
      failedChatIds.push(entry.chat_id);
    }
  }

  await minDuration;
  return failedChatIds;
}
