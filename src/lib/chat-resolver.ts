import type { TdChat, TdSend } from './types';
import { CHANNEL_CHAT_ID_PREFIX } from './config';

export interface ChatEntry {
  chat_id: number;
  linked_chat_id?: number;
  chat_username?: string;
  linked_chat_username?: string;
}

/** Resolve a chat using multiple fallback strategies. */
export async function findChat(entry: ChatEntry, send: TdSend): Promise<TdChat | null> {
  try { return await resolveChatById(entry.chat_id, send); } catch (_) {}

  if (entry.linked_chat_id) {
    try {
      const linked = await resolveChatById(entry.linked_chat_id, send);
      await prefetchSupergroupInfo(linked, send);
      return await resolveChatById(entry.chat_id, send);
    } catch (_) {}
  }

  if (entry.chat_username) {
    try {
      return await send('searchPublicChat', { username: entry.chat_username }) as unknown as TdChat;
    } catch (_) {}
  }

  if (entry.linked_chat_username) {
    try {
      const linked = await send('searchPublicChat', { username: entry.linked_chat_username }) as unknown as TdChat;
      await prefetchSupergroupInfo(linked, send);
      return await resolveChatById(entry.chat_id, send);
    } catch (_) {}
  }

  return null;
}

async function resolveChatById(chatId: number, send: TdSend): Promise<TdChat> {
  try {
    return await send('getChat', { chat_id: `${CHANNEL_CHAT_ID_PREFIX}${chatId}` }) as unknown as TdChat;
  } catch (_) {
    // Not a channel/supergroup — fall through to raw ID
  }
  return send('getChat', { chat_id: chatId }) as unknown as Promise<TdChat>;
}

async function prefetchSupergroupInfo(chat: TdChat, send: TdSend): Promise<void> {
  if (chat?.type?.['@type'] === 'chatTypeSupergroup') {
    try {
      await send('getSupergroupFullInfo', { supergroup_id: chat.type.supergroup_id });
    } catch (_) {}
  }
}
