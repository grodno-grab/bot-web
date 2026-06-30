/**
 * td-adapter.ts
 *
 * Implements the `tdweb` client contract (src/types/tdweb.d.ts) the app speaks to — a
 * class with a `send(req)` Promise method and a settable `onUpdate` callback — backed
 * by the pure-JS MTProto library mtcute. Registered as `globalThis.tdweb` in main.tsx,
 * so telegram.ts and the unit/e2e fakes all share one seam.
 *
 * It covers the subset of the TDLib JSON API the flows use (telegram.ts, bot-flow.ts,
 * admin-flow.ts, chat-resolver.ts) and absorbs two TDLib conventions so those files
 * stay untouched:
 *   • message ids — TDLib uses server_id << 20; mtcute uses the bare server id.
 *   • chat ids    — TDLib/bot-API marked ids (-100… for channels) == mtcute marked ids.
 */
import {
  BaseTelegramClient,
  MemoryStorage,
  Long,
  getMarkedPeerId,
  parseMarkedPeerId,
  tl,
} from '@mtcute/web';
import type { Chat } from '@mtcute/web';
// Tree-shakable standalone methods: importing only the ~11 we use lets the bundler
// drop the ~300+ high-level methods that the all-in-one TelegramClient would pull in.
import {
  sendCode, signIn, checkPassword, getPasswordHint, getMe,
  resolvePeer, resolveUser, getChat, sendText, iterDialogs, logOut,
} from '@mtcute/web/methods.js';

type TdObject = Record<string, unknown>;

// Diagnostics: verbose in dev, or set localStorage.td_debug='1' on a prod build.
const DEBUG = (() => {
  try {
    return Boolean((import.meta as { env?: { DEV?: boolean } }).env?.DEV) ||
      (typeof localStorage !== 'undefined' && localStorage.getItem('td_debug') === '1');
  } catch { return false; }
})();
const dlog = (...a: unknown[]): void => { if (DEBUG) console.info('[td-adapter]', ...a); };

// ─── Pure helpers (unit-tested; no network) ─────────────────────────────────────

const MSG_ID_SHIFT = 2 ** 20; // TDLib message id = server message id << 20

export const toTdMessageId = (serverId: number): number => serverId * MSG_ID_SHIFT;
export const toServerMessageId = (tdId: number): number => Math.floor(tdId / MSG_ID_SHIFT);

/** Bare channel/supergroup id (mtcute, raw API) → TDLib/bot-API marked chat id (-100…). */
export const channelToTdChatId = (bareId: number): number => getMarkedPeerId(bareId, 'channel');

/** TDLib marked chat id → { type, bareId }. */
export function parseTdChatId(tdChatId: number): { type: 'user' | 'chat' | 'channel'; bareId: number } {
  const [type, bareId] = parseMarkedPeerId(tdChatId);
  return { type, bareId };
}

/** A raw tl.Peer → TDLib marked chat id. */
export function peerToTdChatId(peer: tl.TypePeer): number {
  if (peer._ === 'peerUser') return peer.userId;
  if (peer._ === 'peerChannel') return channelToTdChatId(peer.channelId);
  return -peer.chatId; // basic group
}

/** A raw tl.Peer → TDLib message-sender object. */
export function mapSender(peer: tl.TypePeer | undefined): TdObject {
  switch (peer?._) {
    case 'peerUser': return { '@type': 'messageSenderUser', user_id: peer.userId };
    case 'peerChannel': return { '@type': 'messageSenderChat', chat_id: channelToTdChatId(peer.channelId) };
    case 'peerChat': return { '@type': 'messageSenderChat', chat_id: -peer.chatId };
    default: return { '@type': 'messageSenderUser', user_id: 0 };
  }
}

function mapButtonType(btn: tl.TypeKeyboardButton): TdObject {
  switch (btn._) {
    case 'keyboardButtonUrl': return { '@type': 'inlineKeyboardButtonTypeUrl', url: btn.url };
    case 'keyboardButtonCallback': return { '@type': 'inlineKeyboardButtonTypeCallback' };
    default: return { '@type': 'inlineKeyboardButtonTypeCallback' };
  }
}

/** Raw inline keyboard → TDLib replyMarkupInlineKeyboard (the only markup the bot uses). */
export function mapReplyMarkup(markup: tl.TypeReplyMarkup | undefined): TdObject | undefined {
  if (!markup || markup._ !== 'replyInlineMarkup') return undefined;
  return {
    '@type': 'replyMarkupInlineKeyboard',
    rows: markup.rows.map((row) => row.buttons.map((btn) => ({ text: btn.text, type: mapButtonType(btn) }))),
  };
}

/** Pick a TDLib content type that preserves the regular-vs-service distinction the
 *  admin scan relies on (see REGULAR_CONTENT_TYPES in admin-flow.ts). */
function mapContent(raw: tl.RawMessage): TdObject {
  const media = raw.media;
  if (media && media._ === 'messageMediaPhoto') return { '@type': 'messagePhoto' };
  if (media && media._ === 'messageMediaDocument') return { '@type': 'messageDocument' };
  return { '@type': 'messageText', text: { '@type': 'formattedText', text: raw.message ?? '' } };
}

/** Raw tl.Message (message | messageService) → TDLib message object. */
export function mapMessageRaw(raw: tl.RawMessage | tl.RawMessageService): TdObject {
  const senderPeer = raw.fromId ?? raw.peerId;
  const base = {
    '@type': 'message',
    id: toTdMessageId(raw.id),
    chat_id: peerToTdChatId(raw.peerId),
    date: raw.date,
    sender_id: mapSender(senderPeer),
  };
  if (raw._ === 'messageService') {
    // Any service type works as long as it is absent from REGULAR_CONTENT_TYPES.
    return { ...base, content: { '@type': 'messageChatAddMembers' } };
  }
  return { ...base, content: mapContent(raw), reply_markup: mapReplyMarkup(raw.replyMarkup) };
}

/** mtcute Chat → TDLib chat object. */
export function mapChat(chat: Chat): TdObject {
  const isChannel = chat.chatType === 'channel';
  const isSupergroup = isChannel || chat.chatType === 'supergroup' || chat.chatType === 'gigagroup';
  let type: TdObject;
  if (isSupergroup) {
    const [, bareId] = parseMarkedPeerId(chat.id);
    type = { '@type': 'chatTypeSupergroup', supergroup_id: bareId, is_channel: isChannel };
  } else if (chat.chatType === 'group') {
    type = { '@type': 'chatTypeBasicGroup', basic_group_id: Math.abs(chat.id) };
  } else {
    type = { '@type': 'chatTypePrivate', user_id: chat.id };
  }
  // photo.minithumbnail isn't available from a dialog Chat; the UI falls back to
  // initials, so we omit it rather than fetch full info for every chat.
  return { id: chat.id, title: chat.title || chat.displayName || '', type };
}

function mapMemberStatus(part: tl.TypeChannelParticipant): TdObject {
  if (part._ === 'channelParticipantCreator') {
    return { '@type': 'chatMemberStatusCreator', is_anonymous: !!part.adminRights?.anonymous };
  }
  if (part._ === 'channelParticipantAdmin') {
    return {
      '@type': 'chatMemberStatusAdministrator',
      is_anonymous: !!part.adminRights.anonymous,
      rights: { can_delete_messages: !!part.adminRights.deleteMessages },
    };
  }
  return { '@type': 'chatMemberStatusMember' };
}

const errText = (e: unknown): string =>
  (e as { text?: string; message?: string } | null)?.text ??
  (e as Error | null)?.message ?? String(e);

const is2FANeeded = (e: unknown): boolean => errText(e).includes('SESSION_PASSWORD_NEEDED');

/** Turn raw MTProto errors into a clear Russian message for the auth screens. */
export function humanizeAuthError(e: unknown): string {
  const text = errText(e);
  if (/FLOOD.*WAIT/.test(text)) {
    const secs = (e as { seconds?: number })?.seconds ?? Number(/_WAIT_(\d+)/.exec(text)?.[1]);
    const wait = Number.isFinite(secs) && secs > 0 ? ` Подождите ~${secs} с.` : '';
    return `Слишком много попыток входа.${wait} Общий api_id ограничен Telegram — укажите свой VITE_API_ID/VITE_API_HASH (my.telegram.org).`;
  }
  if (/API_ID_INVALID/.test(text)) return 'Неверный api_id/api_hash — проверьте VITE_API_ID и VITE_API_HASH.';
  if (/PHONE_NUMBER_INVALID/.test(text)) return 'Неверный номер. Введите в международном формате, начиная с +.';
  if (/PHONE_NUMBER_BANNED/.test(text)) return 'Этот номер заблокирован в Telegram.';
  if (/PHONE_PASSWORD_FLOOD/.test(text)) return 'Слишком много попыток. Попробуйте позже.';
  if (/PHONE_CODE_INVALID/.test(text)) return 'Неверный код.';
  if (/PHONE_CODE_EXPIRED/.test(text)) return 'Код истёк — запросите новый.';
  if (/PASSWORD_HASH_INVALID/.test(text)) return 'Неверный пароль двухфакторной аутентификации.';
  return text;
}

const authState = (type: string, extra: TdObject = {}): TdObject => ({
  '@type': 'updateAuthorizationState',
  authorization_state: { '@type': type, ...extra },
});

// ─── Adapter ────────────────────────────────────────────────────────────────────

interface TdClientOptions {
  api_id?: number;
  [key: string]: unknown;
}

export class TdAdapter {
  onUpdate: ((update: TdObject) => void) | null = null;

  private client: BaseTelegramClient | null = null;
  private phone = '';
  private phoneCodeHash = '';
  private loggedOut = false;
  private botPollActive = false;

  private chatCache = new Map<number, Chat>();
  private folderIds = new Map<'main' | 'archive', number[]>();
  private loadedFolders = new Set<'main' | 'archive'>();
  private fullChannelCache = new Map<number, tl.RawChannelFull>();

  constructor(_opts: TdClientOptions) {
    // Mirror TDLib's startup handshake; the app drives auth off these updates.
    setTimeout(() => this.emit(authState('authorizationStateWaitTdlibParameters')), 0);
  }

  send(req: TdObject): Promise<TdObject> {
    const { '@type': type, ...params } = req as { '@type': string };
    return this.dispatch(type, params as TdObject);
  }

  // ─── Dispatch ──────────────────────────────────────────────────────────────────

  private async dispatch(type: string, p: TdObject): Promise<TdObject> {
    switch (type) {
      // — lifecycle / auth —
      case 'setTdlibParameters': return this.setTdlibParameters(p);
      case 'setDatabaseEncryptionKey': this.emitLater(authState('authorizationStateWaitPhoneNumber')); return {};
      case 'setAuthenticationPhoneNumber': return this.submitPhone(p);
      case 'checkAuthenticationCode': return this.submitCode(p);
      case 'checkAuthenticationPassword': return this.submitPassword(p);
      case 'logOut': return this.logOut();
      case 'getMe': return this.getMe();

      // — chat resolution / enumeration —
      case 'searchPublicChat': return this.searchPublicChat(p);
      case 'getChat': return this.getChat(num(p.chat_id));
      case 'loadChats': return this.loadChats(p);
      case 'getChats': return this.getChats(p);
      case 'getSupergroup': return this.getSupergroup(num(p.supergroup_id));
      case 'getSupergroupFullInfo': return this.getSupergroupFullInfo(num(p.supergroup_id));
      case 'getUser': return this.getUser(num(p.user_id));
      case 'getChatMember': return this.getChatMember(p);
      case 'getChatAdministrators': return this.getChatAdministrators(num(p.chat_id));

      // — messages —
      case 'getChatHistory': return this.getChatHistory(p);
      case 'getChatMessageByDate': return this.getChatMessageByDate(p);
      case 'getMessages': return this.getMessages(p);
      case 'sendMessage': return this.sendMessage(p);
      case 'sendBotStartMessage': return this.sendBotStartMessage(p);

      // — mutations —
      case 'deleteMessages': return this.deleteMessages(p);
      case 'deleteChatMessagesBySender': return this.deleteChatMessagesBySender(p);
      case 'toggleSupergroupHasHiddenMembers': return this.toggleHiddenMembers(p);
      case 'setMessageSenderBlockList': return this.unblockSender(p);

      // closing the bot chat ends the reply poll started by sendBotStartMessage
      case 'closeChat':
        this.botPollActive = false;
        return {};

      // — TDLib-local no-ops (no MTProto equivalent needed) —
      case 'openChat':
      case 'resetChatLocalDeletedMessages':
        return {};

      default:
        return {};
    }
  }

  // ─── Auth ───────────────────────────────────────────────────────────────────────

  private async setTdlibParameters(p: TdObject): Promise<TdObject> {
    const lang = String(p.system_language_code || 'en');
    this.client = new BaseTelegramClient({
      apiId: num(p.api_id),
      apiHash: String(p.api_hash),
      storage: new MemoryStorage(), // ephemeral: the app wipes all storage on exit anyway
      // CRITICAL for login: Telegram silently drops the login-code delivery if the
      // client calls updates.getState on an unauthorized key before sign-in — which
      // mtcute's high-level updates manager does eagerly on connect. disableUpdates
      // stops that (auth.sendCode goes via invokeWithoutUpdates), so the code actually
      // arrives. The bot's reply is then obtained by polling (pollBotReply) since
      // real-time onNewMessage is unavailable with updates disabled.
      disableUpdates: true,
      // Mirror the device profile the app gave TDLib (cosmetic; not the fix).
      initConnectionOptions: {
        deviceModel: String(p.device_model || 'Web'),
        systemVersion: String(p.system_version || 'Unknown'),
        appVersion: String(p.application_version || '1.0'),
        systemLangCode: lang,
        langCode: lang,
      },
    });
    if (DEBUG) {
      try { (this.client.log as unknown as { mgr: { level: number } }).mgr.level = 5; } catch { /* ignore */ }
      dlog('mtcute client created (apiId=' + p.api_id + ')');
    }
    this.emitLater(authState('authorizationStateWaitEncryptionKey'));
    return {};
  }

  private async submitPhone(p: TdObject): Promise<TdObject> {
    this.phone = String(p.phone_number);
    dlog('sendCode → connecting and requesting code for', this.phone);
    let sent;
    try {
      sent = await sendCode(this.tg,{ phone: this.phone });
    } catch (e) {
      console.error('[td-adapter] sendCode FAILED:', e);
      throw new Error(humanizeAuthError(e));
    }
    dlog('sendCode result:', sent);
    if (!('phoneCodeHash' in sent)) {
      this.onAuthorized(); // already logged in (returned a User)
      return {};
    }
    this.phoneCodeHash = sent.phoneCodeHash;
    this.emitLater(authState('authorizationStateWaitCode'));
    return {};
  }

  private async submitCode(p: TdObject): Promise<TdObject> {
    try {
      await signIn(this.tg,{ phone: this.phone, phoneCodeHash: this.phoneCodeHash, phoneCode: String(p.code) });
      this.onAuthorized();
    } catch (e) {
      if (!is2FANeeded(e)) { console.error('[td-adapter] signIn FAILED:', e); throw new Error(humanizeAuthError(e)); }
      dlog('2FA password required');
      const hint = await getPasswordHint(this.tg).catch(() => null);
      this.emitLater(authState('authorizationStateWaitPassword', { password_hint: hint ?? '' }));
    }
    return {};
  }

  private async submitPassword(p: TdObject): Promise<TdObject> {
    try {
      await checkPassword(this.tg,String(p.password));
    } catch (e) {
      console.error('[td-adapter] checkPassword FAILED:', e);
      throw new Error(humanizeAuthError(e));
    }
    this.onAuthorized();
    return {};
  }

  private onAuthorized(): void {
    // signIn/checkPassword call notifyLoggedIn internally, which starts the update
    // loop; onNewMessage (the bot reply) flows from here on.
    this.emitLater(authState('authorizationStateReady'));
  }

  private async logOut(): Promise<TdObject> {
    if (this.loggedOut) return {};
    this.loggedOut = true;
    try { if (this.client) await logOut(this.client); } catch { /* best-effort */ }
    return {};
  }

  private async getMe(): Promise<TdObject> {
    const me = await getMe(this.tg);
    return { id: me.id };
  }

  // ─── Chats ────────────────────────────────────────────────────────────────────

  private async searchPublicChat(p: TdObject): Promise<TdObject> {
    const username = String(p.username);
    const peer = await resolvePeer(this.tg,username);
    // A bot/user (e.g. FindMessagesBot) — mtcute getChat rejects users, and TDLib
    // represents it as a private chat whose id equals the user id (positive).
    if (peer._ === 'inputPeerUser') {
      return { id: peer.userId, title: username, type: { '@type': 'chatTypePrivate', user_id: peer.userId } };
    }
    const chat = await getChat(this.tg,username);
    this.chatCache.set(chat.id, chat);
    return mapChat(chat);
  }

  private async getChat(tdChatId: number): Promise<TdObject> {
    const chat = await this.resolveChat(tdChatId);
    return mapChat(chat);
  }

  private async loadChats(p: TdObject): Promise<TdObject> {
    const folder = folderOf(p.chat_list);
    // The app loops loadChats until it throws; fetch once, then signal "no more".
    if (this.loadedFolders.has(folder)) throw new Error('no more chats to load');
    const ids: number[] = [];
    for await (const dialog of iterDialogs(this.tg,{ archived: folder === 'archive' ? 'only' : 'exclude' })) {
      const peer = dialog.peer;
      ids.push(peer.id);
      // Cache the full Chat (supergroups/channels) so getChat avoids a round-trip;
      // user/bot dialogs are resolved on demand instead.
      if ('chatType' in peer) this.chatCache.set(peer.id, peer);
    }
    this.folderIds.set(folder, ids);
    this.loadedFolders.add(folder);
    return {};
  }

  private async getChats(p: TdObject): Promise<TdObject> {
    return { chat_ids: this.folderIds.get(folderOf(p.chat_list)) ?? [] };
  }

  private async getSupergroup(bareId: number): Promise<TdObject> {
    const chat = await this.resolveChat(channelToTdChatId(bareId));
    const usernames = chat.usernames?.map((u) => u.username) ?? (chat.username ? [chat.username] : []);
    if (usernames.length > 0) {
      return { usernames: { active_usernames: usernames }, username: chat.username ?? undefined, has_linked_chat: false };
    }
    const full = await this.ensureFullChannel(bareId);
    return { usernames: { active_usernames: [] }, username: undefined, has_linked_chat: !!full.linkedChatId };
  }

  private async getSupergroupFullInfo(bareId: number): Promise<TdObject> {
    const full = await this.ensureFullChannel(bareId);
    return {
      // TDLib derives can_hide_members from participant count vs the
      // hidden_members_group_size_min option (default 100); approximated here.
      can_hide_members: (full.participantsCount ?? 0) >= 100,
      has_hidden_members: !!full.participantsHidden,
      linked_chat_id: full.linkedChatId ? channelToTdChatId(full.linkedChatId) : 0,
    };
  }

  private async getUser(userId: number): Promise<TdObject> {
    const input = await resolveUser(this.tg,userId);
    const [user] = await this.tg.call({ _: 'users.getUsers', id: [input] });
    const isBot = user._ === 'user' && !!user.bot;
    return { type: { '@type': isBot ? 'userTypeBot' : 'userTypeRegular' } };
  }

  private async getChatMember(p: TdObject): Promise<TdObject> {
    const channel = await this.inputChannel(num(p.chat_id));
    const participant = await resolvePeer(this.tg,num((p.member_id as TdObject).user_id));
    const res = await this.tg.call({ _: 'channels.getParticipant', channel, participant });
    return { status: mapMemberStatus(res.participant) };
  }

  private async getChatAdministrators(tdChatId: number): Promise<TdObject> {
    const channel = await this.inputChannel(tdChatId);
    const res = await this.tg.call({
      _: 'channels.getParticipants',
      channel,
      filter: { _: 'channelParticipantsAdmins' },
      offset: 0,
      limit: 200,
      hash: Long.ZERO,
    });
    const administrators = res._ === 'channels.channelParticipants'
      ? res.participants.map((part) => ({ user_id: participantUserId(part) })).filter((a) => a.user_id !== 0)
      : [];
    return { administrators };
  }

  // ─── Messages ─────────────────────────────────────────────────────────────────

  private async getChatHistory(p: TdObject): Promise<TdObject> {
    const peer = await resolvePeer(this.tg,num(p.chat_id));
    // TDLib from_message_id is exclusive and lives in server_id<<20 space; the admin
    // scan passes endMsg.id+1 to *include* the boundary message. getHistory.offsetId is
    // exclusive in server-id space, so convert with ceil (matches floor for clean ids
    // but preserves the +1) — otherwise the newest message at endTs is never scanned.
    const fromId = num(p.from_message_id) || 0;
    const res = await this.tg.call({
      _: 'messages.getHistory',
      peer,
      offsetId: fromId ? Math.ceil(fromId / MSG_ID_SHIFT) : 0,
      offsetDate: 0,
      addOffset: num(p.offset),
      limit: num(p.limit) || 100,
      maxId: 0,
      minId: 0,
      hash: Long.ZERO,
    });
    return { messages: rawMessages(res).filter(isConcrete).map(mapMessageRaw) };
  }

  private async getChatMessageByDate(p: TdObject): Promise<TdObject> {
    const peer = await resolvePeer(this.tg,num(p.chat_id));
    const res = await this.tg.call({
      _: 'messages.getHistory',
      peer,
      offsetId: 0,
      offsetDate: num(p.date) + 1, // +1 so the boundary date is inclusive (newest ≤ date)
      addOffset: 0,
      limit: 1,
      maxId: 0,
      minId: 0,
      hash: Long.ZERO,
    });
    const [msg] = rawMessages(res).filter(isConcrete);
    if (!msg) throw new Error('no message at or before date');
    return mapMessageRaw(msg);
  }

  private async getMessages(p: TdObject): Promise<TdObject> {
    const ids = (p.message_ids as number[]).map((id) => ({ _: 'inputMessageID' as const, id: toServerMessageId(id) }));
    const { type } = parseTdChatId(num(p.chat_id));
    const res = type === 'channel'
      ? await this.tg.call({ _: 'channels.getMessages', channel: await this.inputChannel(num(p.chat_id)), id: ids })
      : await this.tg.call({ _: 'messages.getMessages', id: ids });
    // TDLib returns null for missing messages; preserve that (the flows filter nulls).
    const messages = rawMessages(res).map((m) => (m._ === 'messageEmpty' ? null : mapMessageRaw(m)));
    return { messages };
  }

  private async sendMessage(p: TdObject): Promise<TdObject> {
    const content = p.input_message_content as TdObject | undefined;
    const text = String((content?.text as TdObject | undefined)?.text ?? '');
    await sendText(this.tg,num(p.chat_id), text);
    return {};
  }

  private async sendBotStartMessage(p: TdObject): Promise<TdObject> {
    const bot = await resolveUser(this.tg,num(p.bot_user_id));
    const peer = await resolvePeer(this.tg,num(p.chat_id));
    const since = await this.latestServerMessageId(peer);
    await this.tg.call({
      _: 'messages.startBot',
      bot,
      peer,
      randomId: randomLong(),
      startParam: String(p.parameter),
    });
    // Updates are disabled (see setTdlibParameters), so poll for the bot's reply and
    // surface it as updateNewMessage — the same shape TDLib delivered in real time.
    void this.pollBotReply(peer, since);
    return {};
  }

  // ─── Mutations ──────────────────────────────────────────────────────────────────

  private async deleteMessages(p: TdObject): Promise<TdObject> {
    const serverIds = (p.message_ids as number[]).map(toServerMessageId);
    const { type } = parseTdChatId(num(p.chat_id));
    if (type === 'channel') {
      await this.tg.call({ _: 'channels.deleteMessages', channel: await this.inputChannel(num(p.chat_id)), id: serverIds });
    } else {
      await this.tg.call({ _: 'messages.deleteMessages', revoke: p.revoke !== false, id: serverIds });
    }
    return {};
  }

  private async deleteChatMessagesBySender(p: TdObject): Promise<TdObject> {
    const channel = await this.inputChannel(num(p.chat_id));
    const participant = await resolvePeer(this.tg,num((p.sender_id as TdObject).user_id));
    await this.tg.call({ _: 'channels.deleteParticipantHistory', channel, participant });
    return {};
  }

  private async toggleHiddenMembers(p: TdObject): Promise<TdObject> {
    const channel = await this.inputChannel(channelToTdChatId(num(p.supergroup_id)));
    await this.tg.call({ _: 'channels.toggleParticipantsHidden', channel, enabled: !!p.has_hidden_members });
    return {};
  }

  private async unblockSender(p: TdObject): Promise<TdObject> {
    const id = await resolvePeer(this.tg,num((p.sender_id as TdObject).user_id));
    try { await this.tg.call({ _: 'contacts.unblock', id }); } catch { /* not blocked → fine */ }
    return {};
  }

  // ─── Internals ────────────────────────────────────────────────────────────────

  private get tg(): BaseTelegramClient {
    if (!this.client) throw new Error('TDLib parameters not set yet');
    return this.client;
  }

  /** Newest server message id currently in a chat (0 if empty). */
  private async latestServerMessageId(peer: tl.TypeInputPeer): Promise<number> {
    const res = await this.tg.call({
      _: 'messages.getHistory', peer, offsetId: 0, offsetDate: 0, addOffset: 0,
      limit: 1, maxId: 0, minId: 0, hash: Long.ZERO,
    });
    return rawMessages(res).filter(isConcrete)[0]?.id ?? 0;
  }

  /** Poll a chat for new incoming messages and emit them as TDLib updateNewMessage. */
  private async pollBotReply(peer: tl.TypeInputPeer, sinceServerId: number): Promise<void> {
    if (this.botPollActive) return;
    this.botPollActive = true;
    const deadline = Date.now() + 90_000;
    let lastSeen = sinceServerId;
    try {
      while (this.botPollActive && !this.loggedOut && Date.now() < deadline) {
        await delay(1500);
        let res;
        try {
          res = await this.tg.call({
            _: 'messages.getHistory', peer, offsetId: 0, offsetDate: 0, addOffset: 0,
            limit: 10, maxId: 0, minId: 0, hash: Long.ZERO,
          });
        } catch { continue; }
        const fresh = rawMessages(res).filter(isConcrete)
          .filter((m) => m.id > lastSeen && !m.out) // new and incoming (from the bot, not us)
          .sort((a, b) => a.id - b.id);
        for (const m of fresh) {
          lastSeen = Math.max(lastSeen, m.id);
          this.emit({ '@type': 'updateNewMessage', message: mapMessageRaw(m) });
        }
      }
    } finally {
      this.botPollActive = false;
    }
  }

  private async resolveChat(tdChatId: number): Promise<Chat> {
    const cached = this.chatCache.get(tdChatId);
    if (cached) return cached;
    const chat = await getChat(this.tg,tdChatId);
    this.chatCache.set(chat.id, chat);
    return chat;
  }

  private async ensureFullChannel(bareId: number): Promise<tl.RawChannelFull> {
    const cached = this.fullChannelCache.get(bareId);
    if (cached) return cached;
    const channel = await this.inputChannel(channelToTdChatId(bareId));
    const res = await this.tg.call({ _: 'channels.getFullChannel', channel });
    const full = res.fullChat as tl.RawChannelFull;
    this.fullChannelCache.set(bareId, full);
    return full;
  }

  private async inputChannel(tdChatId: number): Promise<tl.TypeInputChannel> {
    const peer = await resolvePeer(this.tg,tdChatId);
    if (peer._ === 'inputPeerChannel') {
      return { _: 'inputChannel', channelId: peer.channelId, accessHash: peer.accessHash };
    }
    if (peer._ === 'inputPeerChannelFromMessage') {
      return { _: 'inputChannelFromMessage', peer: peer.peer, msgId: peer.msgId, channelId: peer.channelId };
    }
    throw new Error('chat is not a channel/supergroup: ' + tdChatId);
  }

  private emit(u: TdObject): void {
    this.onUpdate?.(u);
  }

  private emitLater(u: TdObject): void {
    setTimeout(() => this.emit(u), 0);
  }
}

// ─── Local utilities ────────────────────────────────────────────────────────────

const num = (v: unknown): number => Number(v);

const delay = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

function folderOf(chatList: unknown): 'main' | 'archive' {
  return (chatList as TdObject | undefined)?.['@type'] === 'chatListArchive' ? 'archive' : 'main';
}

/** Messages array out of any messages.Messages variant. */
function rawMessages(res: tl.messages.TypeMessages): tl.TypeMessage[] {
  return 'messages' in res ? res.messages : [];
}

const isConcrete = (m: tl.TypeMessage): m is tl.RawMessage | tl.RawMessageService => m._ !== 'messageEmpty';

function participantUserId(part: tl.TypeChannelParticipant): number {
  if ('userId' in part && typeof part.userId === 'number') return part.userId;
  if ('peer' in part && part.peer._ === 'peerUser') return part.peer.userId;
  return 0;
}

function randomLong(): Long {
  return Long.fromBits((Math.random() * 0x100000000) | 0, (Math.random() * 0x100000000) | 0);
}
