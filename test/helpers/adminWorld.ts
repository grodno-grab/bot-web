import { makeFakeSend, type FakeSend, type Handler } from './fakeSend';
import type { TdChat, TdUpdate } from '../../src/lib/types';

const MUL = 2 ** 20;

export interface UserDef {
  id: number;
  bot?: boolean;
  /** getUser throws for this user (network failure simulation). */
  getUserThrows?: boolean;
}

export interface MsgDef {
  id: number;
  date: number;
  /** numeric user id, or 'chat' for a messageSenderChat. */
  sender: number | 'chat';
  /** non-regular content (join/pin/etc.) → treated as a service message. */
  service?: boolean;
}

export interface ChatDef {
  id: number;
  title: string;
  supergroupId: number;
  /** TDLib chat type @type; defaults to chatTypeSupergroup. */
  typeName?: string;
  isChannel?: boolean;
  myStatus?: 'creator' | 'admin' | 'member';
  canDelete?: boolean;
  username?: string;
  hasLinkedChat?: boolean;
  admins?: number[];
  anonymousAdmins?: number[];
  /** Discussion/linked chat id, surfaced via getSupergroupFullInfo. */
  linkedChatId?: number;
  history?: MsgDef[];
  /** Must match the DateRange the test feeds to waitForDateRange. */
  startTs?: number;
  endTs?: number;
  startMsgId?: number;
  endMsgId?: number;
  throwEndDate?: boolean;
  throwStartDate?: boolean;
  canHideMembers?: boolean;
  hasHiddenMembers?: boolean;
}

export interface WorldDef {
  meId: number;
  chatIds: number[];
  archiveIds?: number[];
  /** Marked ids returned by getLeftChats (chats the user has left, via takeout). */
  leftChatIds?: number[];
  /** Chat ids surfaced only through the "replies" service-chat scan (B3). */
  repliesOrigins?: number[];
  chats: ChatDef[];
  users?: UserDef[];
  /**
   * When true, deleteMessages / deleteChatMessagesBySender actually remove
   * messages from a live history, and getChatHistory / getMessages read from it.
   * Lets tests exercise the verify-pass loop terminating once the chat is clean.
   */
  removeOnDelete?: boolean;
}

const toMessage = (m: MsgDef): TdUpdate =>
  ({
    id: m.id,
    date: m.date,
    sender_id:
      m.sender === 'chat'
        ? { '@type': 'messageSenderChat', chat_id: -100 }
        : { '@type': 'messageSenderUser', user_id: m.sender },
    content: { '@type': m.service ? 'messageChatAddMembers' : 'messageText' },
  }) as unknown as TdUpdate;

const memberStatus = (chat: ChatDef): TdUpdate => {
  if (chat.myStatus === 'creator') return { '@type': 'chatMemberStatusCreator' } as TdUpdate;
  if (chat.myStatus === 'admin') {
    return {
      '@type': 'chatMemberStatusAdministrator',
      rights: { can_delete_messages: chat.canDelete === true },
    } as unknown as TdUpdate;
  }
  return { '@type': 'chatMemberStatusMember' } as TdUpdate;
};

/** Build a fake `send` backed by a declarative Telegram "world". */
export function buildAdminSend(
  world: WorldDef,
  overrides: Record<string, Handler | Handler[]> = {},
): FakeSend {
  const byId = (id: unknown) => world.chats.find((c) => c.id === Number(id));
  const bySg = (sg: unknown) => world.chats.find((c) => c.supergroupId === Number(sg));
  const userOf = (id: number) => (world.users ?? []).find((u) => u.id === id);

  // Live, mutable copy of each chat's history (only mutated when removeOnDelete).
  const live = new Map<number, MsgDef[]>(world.chats.map((c) => [c.id, [...(c.history ?? [])]]));
  const historyOf = (chatId: unknown) => live.get(Number(chatId)) ?? [];

  // The "replies" service chat (B3): its first history page carries the discovered origins as
  // forward_info sources; a second page comes back empty so the scan terminates.
  const REPLIES_CHAT_ID = 424242;
  const repliesPage = (world.repliesOrigins ?? []).map((chatId, i) => ({
    id: i + 1,
    forward_info: { source: { chat_id: chatId } },
  })) as unknown as TdUpdate[];

  return makeFakeSend({
    handlers: {
      getMe: { id: world.meId },
      loadChats: () => {
        throw new Error('no more chats to load');
      },
      getChats: (p) => {
        const list = (p.chat_list as { '@type': string })['@type'];
        return { chat_ids: list === 'chatListArchive' ? (world.archiveIds ?? []) : world.chatIds };
      },
      // getLeftChats paginates: first page returns the left ids, then an empty page.
      getLeftChats: (p) => ({ chat_ids: Number(p.offset) === 0 ? (world.leftChatIds ?? []) : [] }),
      // The B3 replies scan resolves the "replies" username only when the test opts in;
      // otherwise it returns an id-less object so collectRepliesOriginChatIds bails.
      searchPublicChat: (p) =>
        ((p.username as string) === 'replies' && world.repliesOrigins
          ? { id: REPLIES_CHAT_ID }
          : {}) as TdUpdate,
      getChat: (p) => {
        const chat = byId(String(p.chat_id).replace('-100', ''));
        if (!chat) throw new Error(`no chat ${p.chat_id}`);
        return {
          id: chat.id,
          title: chat.title,
          type: {
            '@type': chat.typeName ?? 'chatTypeSupergroup',
            supergroup_id: chat.supergroupId,
            is_channel: chat.isChannel ?? false,
          },
        } as unknown as TdChat as unknown as TdUpdate;
      },
      getChatMember: (p) => {
        const memberId = (p.member_id as { user_id: number }).user_id;
        const chat = byId(p.chat_id);
        if (memberId === world.meId) return { status: memberStatus(chat!) } as TdUpdate;
        // Admin anonymity lookup (fetchPublicAdminIds)
        const anon = chat?.anonymousAdmins?.includes(memberId) ?? false;
        return {
          status: { '@type': 'chatMemberStatusAdministrator', is_anonymous: anon },
        } as unknown as TdUpdate;
      },
      getSupergroup: (p) => {
        const chat = bySg(p.supergroup_id);
        return {
          usernames: { active_usernames: chat?.username ? [chat.username] : [] },
          username: chat?.username,
          has_linked_chat: chat?.hasLinkedChat ?? false,
        } as unknown as TdUpdate;
      },
      getSupergroupFullInfo: (p) => {
        const chat = bySg(p.supergroup_id);
        return {
          can_hide_members: chat?.canHideMembers ?? false,
          has_hidden_members: chat?.hasHiddenMembers ?? false,
          linked_chat_id: chat?.linkedChatId,
        } as unknown as TdUpdate;
      },
      getChatMessageByDate: (p) => {
        const chat = byId(p.chat_id)!;
        const date = p.date as number;
        if (date === chat.endTs) {
          if (chat.throwEndDate) throw new Error('no message at end date');
          return { id: chat.endMsgId ?? 0 } as TdUpdate;
        }
        // startTs anchor (used only for the progress range)
        if (chat.throwStartDate) throw new Error('no message at start date');
        return { id: chat.startMsgId ?? 0 } as TdUpdate;
      },
      getChatHistory: (p) => {
        if (Number(p.chat_id) === REPLIES_CHAT_ID) {
          return { messages: Number(p.from_message_id) === 0 ? repliesPage : [] } as TdUpdate;
        }
        const from = p.from_message_id as number;
        const msgs = historyOf(p.chat_id)
          .filter((m) => m.id < from)
          .sort((a, b) => b.id - a.id)
          .slice(0, p.limit as number);
        return { messages: msgs.map(toMessage) } as TdUpdate;
      },
      getChatAdministrators: (p) => {
        const chat = byId(p.chat_id);
        return { administrators: (chat?.admins ?? []).map((user_id) => ({ user_id })) } as unknown as TdUpdate;
      },
      getUser: (p) => {
        const u = userOf(p.user_id as number);
        if (u?.getUserThrows) throw new Error('getUser failed');
        return { type: { '@type': u?.bot ? 'userTypeBot' : 'userTypeRegular' } } as unknown as TdUpdate;
      },
      // ensureMessagesDeleted verify. Without removeOnDelete: pretend everything is
      // gone. With it: report whichever requested ids are still in the live history.
      getMessages: (p) => {
        if (!world.removeOnDelete) return { messages: [] };
        const present = new Set(historyOf(p.chat_id).map((m) => m.id));
        const ids = (p.message_ids as number[]) ?? [];
        return { messages: ids.map((id) => (present.has(id) ? { id } : null)) };
      },
      deleteMessages: (p) => {
        if (world.removeOnDelete) {
          const ids = new Set((p.message_ids as number[]) ?? []);
          const hist = live.get(Number(p.chat_id));
          if (hist) live.set(Number(p.chat_id), hist.filter((m) => !ids.has(m.id)));
        }
        return {};
      },
      deleteChatMessagesBySender: (p) => {
        if (world.removeOnDelete) {
          const userId = (p.sender_id as { user_id: number }).user_id;
          const hist = live.get(Number(p.chat_id));
          if (hist) live.set(Number(p.chat_id), hist.filter((m) => m.sender !== userId));
        }
        return {};
      },
      resetChatLocalDeletedMessages: {},
      toggleSupergroupHasHiddenMembers: {},
      logOut: {},
      ...overrides,
    },
  });
}

export const ID_MULTIPLIER = MUL;
