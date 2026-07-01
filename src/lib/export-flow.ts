import { loadAllChatIds, collectLeftChatIds, collectRepliesOriginChatIds } from './admin-flow';
import { MESSAGE_HISTORY_LIMIT, TDLIB_MESSAGE_ID_MULTIPLIER } from './config';
import { sendFloodSafe } from './flood';
import type { TdSend, TdUpdate, TelegramController } from './types';

/** A chat + the user's own messages found in it via export, in the bot's deletion format. */
export interface ExportFinding {
  chat_id: number;       // marked chat id (-100…)
  chat: TdUpdate;        // resolved chat object (from getChat)
  message_ids: number[]; // raw server message ids (same id space as the bot's list)
}

/**
 * Collect every chat the user is or was part of via a Telegram account-export ("takeout")
 * session, then find the user's own messages in each. Chats are gathered from four sources:
 *   B1 — current + archived dialogs
 *   B2 — left channels/supergroups (only reachable inside a takeout session: getLeftChats)
 *   B3 — the "replies" service chat (origin chat ids hide in forward_info/reply_to)
 * then their objects (plus linked discussion groups) are loaded and searched.
 *
 * Ported from the pre-mtcute draft (branch use-chats-from-account-export, index.html).
 * Runs before the bot flow in user mode (see telegram.ts routePostAuthFlow).
 *
 * The takeout session is opened earlier — right after login — by TelegramSession and
 * passed in as `takeoutId` (null if unavailable); B2 (left chats) is skipped when null.
 */
export async function collectChatsViaExport(
  send: TdSend,
  ctrl: TelegramController,
  takeoutId: string | null,
): Promise<ExportFinding[]> {
  const me = await send('getMe') as TdUpdate & { id: number };
  const myUserId = me.id;

  const allChatIds = new Set<number>();

  // B1. Current + archived chats.
  ctrl.showWorking('Сбор текущих и архивных чатов…');
  for (const id of await loadAllChatIds(send)) allChatIds.add(id);

  // B2. Left channels/supergroups (only reachable inside the takeout session).
  if (takeoutId) {
    ctrl.showWorking('Сбор покинутых каналов…');
    try {
      const leftIds = await collectLeftChatIds(send, takeoutId,
        (n) => ctrl.showWorking(`Сбор покинутых каналов… найдено ${n}`));
      leftIds.forEach((id) => allChatIds.add(id));
    } catch (_) { /* best-effort: left chats unavailable */ }
  }

  // B3. The "replies" service chat — discover origin chats from forward/reply headers. Best-effort.
  ctrl.showWorking('Поиск чатов через «Ответы»…');
  for (const id of await collectRepliesOriginChatIds(send,
    (n) => ctrl.showWorking(`Поиск чатов через «Ответы»… просмотрено ${n}`))) {
    allChatIds.add(id);
  }

  // C. Load chat objects, deduped by chat.id; for channels also pull the linked discussion group.
  const allIds = [...allChatIds];
  const chatsMap = new Map<number, TdUpdate>();
  // Sequential (not batched): parallel getFullChannel calls trigger FLOOD_WAIT, and
  // sendFloodSafe waits those out — retrying in parallel would just re-flood.
  const loadChat = async (chatId: number): Promise<void> => {
    let chat: TdUpdate & { id: number };
    try {
      chat = await sendFloodSafe(send, 'getChat', { chat_id: chatId }, ctrl, 'загрузка чатов') as TdUpdate & { id: number };
    } catch (_) {
      return; // best-effort: e.g. a user id or private channel — skip it
    }
    if (chatsMap.has(chat.id)) return;
    chatsMap.set(chat.id, chat);
    const type = chat.type as (TdUpdate & { is_channel?: boolean; supergroup_id?: number }) | undefined;
    if (type?.['@type'] === 'chatTypeSupergroup' && type.is_channel) {
      try {
        const full = await sendFloodSafe(send, 'getSupergroupFullInfo',
          { supergroup_id: type.supergroup_id }, ctrl, 'загрузка чатов') as TdUpdate & { linked_chat_id?: number };
        if (full.linked_chat_id) await loadChat(full.linked_chat_id);
      } catch (_) { /* best-effort */ }
    }
  };
  for (let i = 0; i < allIds.length; i++) {
    ctrl.showWorking(`Загрузка данных чатов… ${i + 1} из ${allIds.length}`);
    await loadChat(allIds[i]);
  }
  const chats = [...chatsMap.values()];

  // D. Find the user's own messages in each chat. The findings are handed back and merged into
  //    the bot's deletion list (see bot-flow.ts mergeExportFindings / handleExportOnly).
  const selfSender = { '@type': 'messageSenderUser', user_id: myUserId };
  const found = new Map<number, TdUpdate[]>();
  let totalFound = 0;
  for (let i = 0; i < chats.length; i++) {
    const chat = chats[i] as TdUpdate & { id: number; title?: string };
    ctrl.showWorking(`Поиск своих сообщений… чат ${i + 1} из ${chats.length}, найдено ${totalFound}`);
    const messages: TdUpdate[] = [];
    let fromMsgId = 0;
    for (;;) {
      try {
        const result = await sendFloodSafe(send, 'searchChatMessages', {
          chat_id: chat.id,
          query: '',
          sender_id: selfSender,
          from_message_id: fromMsgId,
          offset: 0,
          limit: MESSAGE_HISTORY_LIMIT,
          filter: { '@type': 'searchMessagesFilterEmpty' },
          topic_id: null,
        }, ctrl, `поиск ${i + 1}/${chats.length}`) as TdUpdate & { messages?: TdUpdate[]; next_from_message_id?: number };
        const msgs = result.messages ?? [];
        messages.push(...msgs);
        const nextId = result.next_from_message_id;
        if (!nextId || msgs.length === 0) break;
        fromMsgId = nextId;
      } catch (_) { break; } // e.g. CHANNEL_PRIVATE — skip this chat
    }
    if (messages.length > 0) {
      found.set(chat.id, messages);
      totalFound += messages.length;
    }
  }

  // Hand the findings back so the bot flow can merge them into the deletion list.
  // Message ids: TDLib (server<<20) → raw server id, matching the bot document's format.
  // (The takeout session itself is closed by TelegramSession on finish / page unload.)
  const findings: ExportFinding[] = [];
  for (const [chatId, msgs] of found) {
    const chat = chatsMap.get(chatId);
    if (!chat) continue;
    findings.push({
      chat_id: chatId,
      chat,
      message_ids: msgs.map((m) => Math.floor((m.id as number) / TDLIB_MESSAGE_ID_MULTIPLIER)),
    });
  }
  return findings;
}
