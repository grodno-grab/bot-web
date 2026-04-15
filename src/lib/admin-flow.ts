import { formatMonthYear } from './utils';
import {
  CHAT_LOAD_BATCH_LIMIT, CHAT_LIST_MAX,
  MESSAGE_HISTORY_LIMIT, ADMIN_CHECK_BATCH_SIZE, MAX_VERIFY_PASSES, DELETE_MESSAGES_BATCH_SIZE, MAX_DELETE_RETRIES,
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
): Promise<'back' | 'completed' | 'error'> {
  ctrl.showWorking('Получение данных пользователя…');
  const me = await send('getMe') as TdUpdate & { id: number };

  ctrl.showWorking('Загрузка списка чатов…');
  const chatIds = await loadAllChatIds(send);
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
  ctrl.showWorking('Можно закрыть вкладку.', false);
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
      const deletedCount = await runAdminDeletion(chat, dates.startTs, dates.endTs, send, ctrl);
      return ctrl.waitForAdminDone(chat.title, dates.startDateStr, dates.endDateStr, deletedCount);
    }
    // "change period" — re-show date range
  }
}

async function loadAllChatIds(send: TdSend): Promise<number[]> {
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

async function filterAdminChats(
  chatIds: number[],
  myUserId: number,
  send: TdSend,
  ctrl: TelegramController,
): Promise<TdChat[]> {
  const result: TdChat[] = [];

  for (let i = 0; i < chatIds.length; i += ADMIN_CHECK_BATCH_SIZE) {
    const batch = chatIds.slice(i, i + ADMIN_CHECK_BATCH_SIZE);
    ctrl.showWorking(
      `Проверка чатов ${i + 1}–${Math.min(i + ADMIN_CHECK_BATCH_SIZE, chatIds.length)} из ${chatIds.length}…`,
    );

    const checks = await Promise.all(batch.map(async (chatId) => {
      try {
        const chat = await send('getChat', { chat_id: chatId }) as unknown as TdChat;
        if (chat.type?.['@type'] !== 'chatTypeSupergroup' || chat.type?.is_channel) return null;

        const member = await send('getChatMember', {
          chat_id: chat.id,
          member_id: { '@type': 'messageSenderUser', user_id: myUserId },
        }) as TdUpdate & { status?: TdUpdate };

        const status = member?.status?.['@type'];
        const canDelete =
          status === 'chatMemberStatusCreator' ||
          (status === 'chatMemberStatusAdministrator' &&
           (member.status as TdUpdate & { rights?: TdUpdate & { can_delete_messages?: boolean } })
             .rights?.can_delete_messages);

        if (canDelete) return chat;
      } catch (_) {}
      return null;
    }));

    result.push(...checks.filter((c): c is TdChat => c !== null));
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

async function runAdminDeletion(
  chat: TdChat,
  startTs: number,
  endTs: number,
  send: TdSend,
  ctrl: TelegramController,
): Promise<number> {
  const getStartMsgId = async (): Promise<number> => {
    const endMsg = await send('getChatMessageByDate', { chat_id: chat.id, date: endTs }) as TdUpdate & { id: number };
    return endMsg.id + 1;
  };

  let fromMsgId: number;
  try {
    fromMsgId = await getStartMsgId();
  } catch (_) {
    return 0;
  }

  const adminIds = await fetchPublicAdminIds(chat.id, send);
  const userIds = new Set<number>();
  const botIds = new Set<number>();

  for (let pass = 0; pass < MAX_VERIFY_PASSES; pass++) {
    const found = await scanAndDelete(chat, startTs, endTs, fromMsgId, userIds, botIds, adminIds, send, ctrl);
    if (found === 0) break;
    try { fromMsgId = await getStartMsgId(); } catch (_) { break; }
  }

  if (userIds.size > 0) {
    ctrl.showWorking('Удаление сообщений участников…');
    for (const userId of userIds) {
      try {
        await send('deleteChatMessagesBySender', {
          chat_id: chat.id,
          sender_id: { '@type': 'messageSenderUser', user_id: userId },
        });
      } catch (_) {}
    }
  }

  return userIds.size;
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
  userIds: Set<number>,
  botIds: Set<number>,
  adminIds: Set<number>,
  send: TdSend,
  ctrl: TelegramController,
): Promise<number> {
  let deletedCount = 0;

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
    ctrl.showWorking(`Удаление сообщений (${formatMonthYear(batchDate)})…`);

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
              botIds.add(userId);
            }
          }
          if (botIds.has(userId)) continue;
        }
      }

      if (await canDeleteForAll(chat.id, msg.id as number, send)) {
        batchIds.push(msg.id as number);
      }
    }

    for (let i = 0; i < batchIds.length; i += DELETE_MESSAGES_BATCH_SIZE) {
      deletedCount += await ensureMessagesDeleted(chat.id, batchIds.slice(i, i + DELETE_MESSAGES_BATCH_SIZE), send);
    }

    const oldestDate = (messages[messages.length - 1]?.date as number) ?? 0;
    if (oldestDate < startTs) break;

    const nextId = messages[messages.length - 1].id as number;
    if (nextId >= fromMsgId) break;
    fromMsgId = nextId;
  }

  return deletedCount;
}

async function canDeleteForAll(chatId: number, messageId: number, send: TdSend): Promise<boolean> {
  try {
    const props = await send('getMessageProperties', { chat_id: chatId, message_id: messageId }) as TdUpdate & { can_be_deleted_for_all_users?: boolean };
    return props.can_be_deleted_for_all_users === true;
  } catch (_) {
    return false;
  }
}

async function ensureMessagesDeleted(chatId: number, ids: number[], send: TdSend): Promise<number> {
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
      const result = await send('getMessages', { chat_id: chatId, message_ids: remaining }) as TdUpdate & { messages?: (TdUpdate | null)[] };
      remaining = (result.messages ?? [])
        .filter((m): m is TdUpdate => m !== null && !!(m.id as number))
        .map(m => m.id as number);
    } catch (_) {
      break;
    }
  }
  return ids.length;
}
