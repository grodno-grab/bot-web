import { formatMonthYear } from './utils';
import { sendFloodSafe } from './flood';
import {
  CHAT_LOAD_BATCH_LIMIT, CHAT_LIST_MAX,
  MESSAGE_HISTORY_LIMIT, MAX_VERIFY_PASSES, DELETE_MESSAGES_BATCH_SIZE, MAX_DELETE_RETRIES,
} from './config';
import type { AdminChatGroup, TdChat, TdSend, TdUpdate, TelegramController } from './types';

/**
 * Run the full admin deletion flow.
 * - 'back'      — user pressed back to return to mode select (no logOut)
 * - 'completed' — deletion finished, logOut already called
 * - 'error'     — no admin chats found, error shown (no logOut)
 */
export async function runAdminFlow(
  send: TdSend,
  ctrl: TelegramController,
  takeoutSessionId: string | null = null,
): Promise<'back' | 'completed' | 'error'> {
  ctrl.showWorking('Получение данных пользователя…');
  const me = await send('getMe') as TdUpdate & { id: number };

  // Gather every chat the account touches from the same sources as the user flow: current +
  // archived dialogs, chats left via the takeout session (may still hold admin rights), and
  // chats surfaced only through the "replies" service chat. Unlike the bot flow, we don't
  // fetch messages — only check permissions.
  ctrl.showWorking('Загрузка списка чатов…');
  const currentIds = await loadAllChatIds(send);
  const leftIds = await collectLeftChatIds(send, takeoutSessionId,
    (n) => ctrl.showWorking(`Поиск покинутых чатов… найдено ${n}`));
  const repliesIds = await collectRepliesOriginChatIds(send,
    (n) => ctrl.showWorking(`Поиск чатов через «Ответы»… просмотрено ${n}`));
  const chatIds = [...new Set([...currentIds, ...leftIds, ...repliesIds])];
  const adminChats = await filterAdminChats(chatIds, me.id, send, ctrl);

  if (adminChats.length === 0) {
    ctrl.showError('Нет доступных чатов для администрирования.');
    return 'error';
  }

  ctrl.showWorking('Загрузка данных о чатах…');
  const groups = await groupAdminChats(adminChats, send);

  while (true) {
    const selectedChat = await ctrl.waitForAdminChatSelect(groups);
    if (!selectedChat) return 'back';

    const action = await runChatDeletionFlow(selectedChat, send, ctrl);
    if (action === 'done') break;
  }

  try { await send('logOut'); } catch (_) {}
  ctrl.showWorking('Готово. Можно закрыть вкладку.', false);
  return 'completed';
}

// ─── Internal ─────────────────────────────────────────────────────────────────

const REGULAR_CONTENT_TYPES = new Set([
  'messageText', 'messageAnimation', 'messageAudio', 'messageDocument',
  'messagePaidMedia', 'messagePhoto', 'messageSticker', 'messageVideo',
  'messageVideoNote', 'messageVoiceNote', 'messageLocation', 'messageVenue',
  'messageContact', 'messageAnimatedEmoji', 'messageDice', 'messageStakeDice',
  'messageGame', 'messagePoll', 'messageStory', 'messageChecklist', 'messageInvoice',
  'messageGiveaway', 'messageGiveawayWinners', 'messageUnsupported',
  'messageExpiredPhoto', 'messageExpiredVideo', 'messageExpiredVideoNote', 'messageExpiredVoiceNote',
]);

async function runChatDeletionFlow(
  chat: TdChat,
  send: TdSend,
  ctrl: TelegramController,
): Promise<'next' | 'done'> {
  let canHideMembers = false;
  let hasHiddenMembers = false;
  try {
    const fullInfo = await send('getSupergroupFullInfo', { supergroup_id: chat.type.supergroup_id }) as TdUpdate & {
      can_hide_members?: boolean;
      has_hidden_members?: boolean;
    };
    canHideMembers = fullInfo.can_hide_members === true;
    hasHiddenMembers = fullInfo.has_hidden_members === true;
  } catch (_) {}

  while (true) {
    const dates = await ctrl.waitForDateRange(
      chat.title,
      canHideMembers && !hasHiddenMembers ? chat.type.supergroup_id : undefined,
    );
    if (!dates) return 'next'; // back — return to chat list

    const confirmed = await ctrl.waitForAdminConfirm(chat, dates.startDateStr, dates.endDateStr);
    if (confirmed) {
      const { deletedUsers, failedCount } = await runAdminDeletion(chat, dates.startTs, dates.endTs, send, ctrl);
      return ctrl.waitForAdminDone(chat.title, dates.startDateStr, dates.endDateStr, deletedUsers, failedCount);
    }
    // "change period" — re-show date range
  }
}

export async function loadAllChatIds(send: TdSend): Promise<number[]> {
  for (const chatList of [{ '@type': 'chatListMain' }, { '@type': 'chatListArchive' }]) {
    while (true) {
      try {
        await send('loadChats', { chat_list: chatList, limit: CHAT_LOAD_BATCH_LIMIT });
      } catch (_) {
        break; // TDLib returns 404 when all chats in this list are loaded
      }
    }
  }

  const [main, archive] = await Promise.all([
    send('getChats', { chat_list: { '@type': 'chatListMain' },    limit: CHAT_LIST_MAX }),
    send('getChats', { chat_list: { '@type': 'chatListArchive' }, limit: CHAT_LIST_MAX }),
  ]) as [TdUpdate & { chat_ids?: number[] }, TdUpdate & { chat_ids?: number[] }];

  const ids = new Set([...(main.chat_ids ?? []), ...(archive.chat_ids ?? [])]);
  return [...ids];
}

/** Marked ids of channels/supergroups the user has left, via the takeout session. */
export async function collectLeftChatIds(
  send: TdSend,
  takeoutId: string | null,
  onProgress?: (total: number) => void,
): Promise<number[]> {
  if (!takeoutId) return [];
  const ids: number[] = [];
  for (let offset = 0; ;) {
    const result = await send('getLeftChats', {
      takeout_session_id: takeoutId,
      offset,
    }) as TdUpdate & { chat_ids?: number[] };
    const page = result.chat_ids ?? [];
    if (page.length === 0) break;
    ids.push(...page);
    offset += page.length;
    onProgress?.(ids.length);
  }
  return ids;
}

/**
 * Discover chat ids hidden in the "replies" service chat: forwarded messages and comment
 * replies carry their origin chat in forward_info.source / reply_to headers, so this surfaces
 * chats the account's own dialog/left lists don't mention. Best-effort — returns whatever it
 * finds and swallows any error (missing chat, no permission, flood). The ids may include user
 * or channel ids the caller doesn't care about; callers filter them via getChat.
 */
export async function collectRepliesOriginChatIds(
  send: TdSend,
  onProgress?: (scanned: number) => void,
): Promise<number[]> {
  const ids = new Set<number>();
  try {
    const repliesChat = await send('searchPublicChat', { username: 'replies' }) as TdUpdate & { id?: number };
    if (typeof repliesChat.id !== 'number') return []; // no reachable replies chat → nothing to scan
    await send('openChat', { chat_id: repliesChat.id });
    let fromMsgId = 0;
    let scanned = 0;
    for (;;) {
      const result = await send('getChatHistory', {
        chat_id: repliesChat.id,
        from_message_id: fromMsgId,
        offset: 0,
        limit: MESSAGE_HISTORY_LIMIT,
        only_local: false,
      }) as TdUpdate & { messages?: TdUpdate[] };
      const msgs = result.messages ?? [];
      if (msgs.length === 0) break;
      scanned += msgs.length;
      onProgress?.(scanned);
      for (const msg of msgs) {
        const sourceId = ((msg.forward_info as TdUpdate | undefined)?.source as TdUpdate | undefined)?.chat_id as number | undefined;
        if (sourceId) ids.add(sourceId);
        const replyId = (msg.reply_to as TdUpdate | undefined)?.chat_id as number | undefined;
        if (replyId) ids.add(replyId);
      }
      const lastId = msgs[msgs.length - 1].id as number;
      if (fromMsgId !== 0 && lastId >= fromMsgId) break; // guard against non-advancing pagination
      fromMsgId = lastId;
    }
    await send('closeChat', { chat_id: repliesChat.id });
  } catch (_) { /* best-effort */ }
  return [...ids];
}

async function filterAdminChats(
  chatIds: number[],
  myUserId: number,
  send: TdSend,
  ctrl: TelegramController,
): Promise<TdChat[]> {
  const result: TdChat[] = [];

  // Sequential (not batched): parallel channels.getParticipant calls trigger FLOOD_WAIT,
  // and retrying a whole batch in parallel just re-floods → admin chats get dropped. A serial
  // pass lets sendFloodSafe wait each flood out (with the same "Пауза…" countdown as the export
  // scan), so nothing is lost. getChat is usually served from cache (dialog / left chats came
  // from loadChats / getLeftChats); only replies-discovered ids and getChatMember hit the network.
  for (let i = 0; i < chatIds.length; i++) {
    ctrl.showWorking(`Проверка чатов… ${i + 1} из ${chatIds.length}`);
    try {
      const chat = await send('getChat', { chat_id: chatIds[i] }) as unknown as TdChat;
      if (chat.type?.['@type'] !== 'chatTypeSupergroup' || chat.type?.is_channel) continue;

      const member = await sendFloodSafe(send, 'getChatMember', {
        chat_id: chat.id,
        member_id: { '@type': 'messageSenderUser', user_id: myUserId },
      }, ctrl, `проверка прав ${i + 1}/${chatIds.length}`) as TdUpdate & { status?: TdUpdate };

      const status = member?.status?.['@type'];
      const canDelete =
        status === 'chatMemberStatusCreator' ||
        (status === 'chatMemberStatusAdministrator' &&
         (member.status as TdUpdate & { rights?: TdUpdate & { can_delete_messages?: boolean } })
           .rights?.can_delete_messages);

      if (canDelete) result.push(chat);
    } catch (_) { /* not a supergroup / not accessible — skip */ }
  }

  return result;
}

async function groupAdminChats(chats: TdChat[], send: TdSend): Promise<AdminChatGroup[]> {
  const classified = await Promise.all(chats.map(async chat => ({
    chat,
    isPublic: await isChatPublicOrLinked(chat, send),
  })));

  const sort = (a: TdChat, b: TdChat) => a.title.toLowerCase().localeCompare(b.title.toLowerCase());
  const publicChats = classified.filter(c => c.isPublic).map(c => c.chat).sort(sort);
  const privateChats = classified.filter(c => !c.isPublic).map(c => c.chat).sort(sort);

  const groups: AdminChatGroup[] = [];
  if (publicChats.length > 0) groups.push({ label: 'Публичные чаты', chats: publicChats });
  if (privateChats.length > 0) groups.push({ label: 'Приватные чаты', chats: privateChats });
  return groups;
}

async function isChatPublicOrLinked(chat: TdChat, send: TdSend): Promise<boolean> {
  try {
    const sg = await send('getSupergroup', { supergroup_id: chat.type.supergroup_id }) as TdUpdate & {
      usernames?: { active_usernames?: string[] };
      username?: string;
      has_linked_chat?: boolean;
    };
    if ((sg.usernames?.active_usernames?.length ?? 0) > 0 || !!sg.username) return true;
    if (!sg.has_linked_chat) return false;

    const info = await send('getSupergroupFullInfo', { supergroup_id: chat.type.supergroup_id }) as TdUpdate & {
      linked_chat_id?: number;
    };
    if (!info.linked_chat_id) return false;

    const linkedChat = await send('getChat', { chat_id: info.linked_chat_id }) as TdUpdate & {
      type?: { supergroup_id?: number };
    };
    if (!linkedChat.type?.supergroup_id) return false;

    const linkedSg = await send('getSupergroup', { supergroup_id: linkedChat.type.supergroup_id }) as TdUpdate & {
      usernames?: { active_usernames?: string[] };
      username?: string;
    };
    return (linkedSg.usernames?.active_usernames?.length ?? 0) > 0 || !!linkedSg.username;
  } catch (_) {
    return false;
  }
}

interface AdminDeletionResult {
  /** Distinct senders whose messages were swept (the "обработано пользователей" count). */
  deletedUsers: number;
  /** Deletions that could not be confirmed (left-over messages + failed sender sweeps). */
  failedCount: number;
}

async function runAdminDeletion(
  chat: TdChat,
  startTs: number,
  endTs: number,
  send: TdSend,
  ctrl: TelegramController,
): Promise<AdminDeletionResult> {
  ctrl.showWorking('Подготовка удаления…');
  const getStartMsgId = async (): Promise<number> => {
    const endMsg = await send('getChatMessageByDate', { chat_id: chat.id, date: endTs }) as TdUpdate & { id: number };
    return endMsg.id + 1;
  };

  let fromMsgId: number;
  try {
    fromMsgId = await getStartMsgId();
  } catch (_) {
    return { deletedUsers: 0, failedCount: 0 };
  }

  const maxMsgId = fromMsgId;
  let minMsgId = 0;
  try {
    const startMsg = await send('getChatMessageByDate', { chat_id: chat.id, date: startTs }) as TdUpdate & { id: number };
    minMsgId = startMsg.id;
  } catch (_) {}

  const adminIds = await fetchPublicAdminIds(chat.id, send);
  const userIds = new Set<number>();
  const botIds = new Set<number>();
  let failedCount = 0;

  for (let pass = 0; pass < MAX_VERIFY_PASSES; pass++) {
    try { await send('resetChatLocalDeletedMessages', { chat_id: chat.id }); } catch (_) {}
    const { deleted, failed } = await scanAndDelete(chat, startTs, endTs, fromMsgId, minMsgId, maxMsgId, userIds, botIds, adminIds, send, ctrl);
    failedCount = failed; // only the final pass's residue counts as a real failure
    if (deleted === 0) break; // nothing new removed this pass → the chat is clean
    try { fromMsgId = await getStartMsgId(); } catch (_) { break; }
  }

  if (userIds.size > 0) {
    let doneUsers = 0;
    for (const userId of userIds) {
      ctrl.showWorking(`Удаление сообщений участников… ${++doneUsers} из ${userIds.size}`);
      try {
        await send('deleteChatMessagesBySender', {
          chat_id: chat.id,
          sender_id: { '@type': 'messageSenderUser', user_id: userId },
        });
      } catch (_) {
        failedCount++; // a sender sweep that throws leaves messages behind
      }
    }
  }

  return { deletedUsers: userIds.size, failedCount };
}

async function fetchPublicAdminIds(chatId: number, send: TdSend): Promise<Set<number>> {
  const ids = new Set<number>();
  try {
    const admins = await send('getChatAdministrators', { chat_id: chatId }) as TdUpdate & {
      administrators?: (TdUpdate & { user_id: number })[];
    };
    await Promise.all((admins.administrators ?? []).map(async ({ user_id }) => {
      try {
        const member = await send('getChatMember', {
          chat_id: chatId,
          member_id: { '@type': 'messageSenderUser', user_id },
        }) as TdUpdate & { status?: TdUpdate & { is_anonymous?: boolean } };
        if (!member.status?.is_anonymous) ids.add(user_id);
      } catch (_) {}
    }));
  } catch (_) {}
  return ids;
}

async function scanAndDelete(
  chat: TdChat,
  startTs: number,
  endTs: number,
  fromMsgId: number,
  minMsgId: number,
  maxMsgId: number,
  userIds: Set<number>,
  botIds: Set<number>,
  adminIds: Set<number>,
  send: TdSend,
  ctrl: TelegramController,
): Promise<{ deleted: number; failed: number }> {
  let deletedCount = 0;
  let failedCount = 0;
  let processedCount = 0;
  const rangeSize = maxMsgId - minMsgId;

  while (true) {
    let messages: TdUpdate[];
    try {
      const result = await send('getChatHistory', {
        chat_id: chat.id,
        from_message_id: fromMsgId,
        offset: 0,
        limit: MESSAGE_HISTORY_LIMIT,
        only_local: false,
      }) as TdUpdate & { messages?: TdUpdate[] };
      messages = result.messages ?? [];
    } catch (_) { break; }

    if (messages.length === 0) break;

    const batchDate = new Date((messages[messages.length - 1].date as number) * 1000);

    const batchIds: number[] = [];

    for (const msg of messages) {
      const msgDate = msg.date as number;
      if (msgDate > endTs) continue;
      if (msgDate < startTs) break;

      const senderId = msg.sender_id as TdUpdate;
      const contentType = (msg.content as TdUpdate)?.['@type'] as string | undefined;
      const isServiceMessage = !contentType || !REGULAR_CONTENT_TYPES.has(contentType);

      if (senderId['@type'] === 'messageSenderChat') {
        if (!isServiceMessage) continue;
      } else if (senderId['@type'] === 'messageSenderUser') {
        const userId = senderId.user_id as number;
        if (adminIds.has(userId)) continue;
        if (!isServiceMessage) {
          if (!botIds.has(userId) && !userIds.has(userId)) {
            try {
              const user = await send('getUser', { user_id: userId }) as TdUpdate & { type?: TdUpdate };
              if (user.type?.['@type'] === 'userTypeBot') {
                botIds.add(userId);
              } else {
                userIds.add(userId);
              }
            } catch (_) {
              // If the user lookup fails, treat the sender as a regular user
              // (and thus eligible for deletion) rather than silently skipping.
              userIds.add(userId);
            }
          }
          if (botIds.has(userId)) continue;
        }
      }

      batchIds.push(msg.id as number);
    }

    processedCount += batchIds.length;
    const currentMsgId = messages[messages.length - 1].id as number;
    const progress = rangeSize > 0
      ? Math.min(100, Math.round((maxMsgId - currentMsgId) / rangeSize * 100))
      : 0;
    ctrl.showWorking(`Удаление сообщений (${formatMonthYear(batchDate)})…\n~${progress}% · найдено ${processedCount}`);

    for (let i = 0; i < batchIds.length; i += DELETE_MESSAGES_BATCH_SIZE) {
      const res = await ensureMessagesDeleted(chat.id, batchIds.slice(i, i + DELETE_MESSAGES_BATCH_SIZE), send);
      deletedCount += res.deleted;
      failedCount += res.failed;
    }

    const oldestDate = (messages[messages.length - 1]?.date as number) ?? 0;
    if (oldestDate < startTs) break;

    const nextId = messages[messages.length - 1].id as number;
    if (nextId >= fromMsgId) break;
    fromMsgId = nextId;
  }

  return { deleted: deletedCount, failed: failedCount };
}

/**
 * Delete a batch of messages, retrying per-message for any that survive, and
 * report what actually happened: `deleted` is the number verified gone, `failed`
 * the number still present after all retries (used to surface partial failures).
 */
async function ensureMessagesDeleted(
  chatId: number,
  ids: number[],
  send: TdSend,
): Promise<{ deleted: number; failed: number }> {
  let remaining = ids;
  for (let attempt = 0; attempt < MAX_DELETE_RETRIES && remaining.length > 0; attempt++) {
    if (attempt === 0) {
      try {
        await send('deleteMessages', { chat_id: chatId, message_ids: remaining, revoke: true });
      } catch (_) {}
    } else {
      for (const id of remaining) {
        try {
          await send('deleteMessages', { chat_id: chatId, message_ids: [id], revoke: true });
        } catch (_) {}
      }
    }
    try {
      try { await send('resetChatLocalDeletedMessages', { chat_id: chatId }); } catch (_) {}
      const result = await send('getMessages', { chat_id: chatId, message_ids: remaining }) as TdUpdate & { messages?: (TdUpdate | null)[] };
      remaining = (result.messages ?? [])
        .filter((m): m is TdUpdate => m !== null && !!(m.id as number))
        .map(m => m.id as number);
    } catch (_) {
      // Can't verify — assume the batch is unresolved rather than silently "done".
      return { deleted: ids.length - remaining.length, failed: remaining.length };
    }
  }
  return { deleted: ids.length - remaining.length, failed: remaining.length };
}
