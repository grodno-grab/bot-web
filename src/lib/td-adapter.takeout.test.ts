import { describe, it, expect, vi } from 'vitest';
import { Long } from '@mtcute/web';

// The adapter resolves peers via the standalone mtcute methods; stub them so the takeout
// methods can be exercised against a bare fake client (just a `.call`). Only resolvePeer
// is reached by the methods under test.
vi.mock('@mtcute/web/methods.js', () => ({
  sendCode: vi.fn(), signIn: vi.fn(), checkPassword: vi.fn(), getPasswordHint: vi.fn(),
  getMe: vi.fn(), resolveUser: vi.fn(), getChat: vi.fn(), sendText: vi.fn(),
  iterDialogs: vi.fn(), logOut: vi.fn(),
  resolvePeer: vi.fn(async (_client: unknown, id: number) =>
    id < 0
      ? { _: 'inputPeerChannel', channelId: 5, accessHash: Long.ZERO }
      : { _: 'inputPeerUser', userId: id, accessHash: Long.ZERO }),
}));

import { TdAdapter, channelToTdChatId, toTdMessageId } from './td-adapter';

type RawCall = { _: string; [k: string]: unknown };

/** A TdAdapter whose underlying mtcute client is a fake recording every raw `.call`. */
function makeAdapter(reply: (q: RawCall) => unknown) {
  const calls: RawCall[] = [];
  const adapter = new TdAdapter({});
  (adapter as unknown as { client: { call: (q: RawCall) => Promise<unknown> } }).client = {
    call: async (q: RawCall) => { calls.push(q); return reply(q); },
  };
  return { adapter, calls };
}

describe('takeout session adapter methods', () => {
  it('initTakeoutSession packs the flags and returns the int64 id as a string', async () => {
    // A real int64 takeout id, too large for a precise JS number (> 2^53).
    const id = Long.fromString('7766554433221100990');
    const { adapter, calls } = makeAdapter(() => ({ _: 'account.takeout', id }));
    const res = await adapter.send({ '@type': 'initTakeoutSession', message_megagroups: true, message_channels: true }) as Record<string, unknown>;
    expect(calls[0]._).toBe('account.initTakeoutSession');
    expect(calls[0]).toMatchObject({ messageMegagroups: true, messageChannels: true, messageUsers: false, messageChats: false });
    // Crucially a string — a JS number would lose precision across the send() boundary.
    expect(res).toEqual({ '@type': 'takeoutSession', id: id.toString() });
    // And it round-trips: getLeftChats/finish parse it back with Long.fromString.
    expect(Long.fromString(res.id as string).toString()).toBe(id.toString());
  });

  it('getLeftChats wraps channels.getLeftChannels in invokeWithTakeout and parses the chats', async () => {
    const { adapter, calls } = makeAdapter(() => ({
      _: 'messages.chatsSlice', count: 3,
      chats: [{ _: 'channel', id: 111, title: 'A', accessHash: Long.fromNumber(111), broadcast: true }],
    }));
    const res = await adapter.send({ '@type': 'getLeftChats', takeout_session_id: '12345678901234567', offset: 7 }) as Record<string, unknown>;
    expect(calls[0]._).toBe('invokeWithTakeout');
    expect((calls[0].takeoutId as Long).toString()).toBe('12345678901234567');
    expect(calls[0].query).toEqual({ _: 'channels.getLeftChannels', offset: 7 });
    expect(res.total_count).toBe(3);
    expect(res.chat_ids).toEqual([channelToTdChatId(111)]);
  });

  it('finishTakeoutSession wraps account.finishTakeoutSession in invokeWithTakeout', async () => {
    const { adapter, calls } = makeAdapter(() => true);
    await adapter.send({ '@type': 'finishTakeoutSession', takeout_session_id: '42', success: true });
    expect(calls[0]._).toBe('invokeWithTakeout');
    expect((calls[0].takeoutId as Long).toString()).toBe('42');
    expect(calls[0].query).toEqual({ _: 'account.finishTakeoutSession', success: true });
  });

  it('searchChatMessages → messages.search with fromId=self, empty filter, page anchor', async () => {
    const { adapter, calls } = makeAdapter(() => ({
      _: 'messages.messagesSlice', count: 50,
      messages: [
        { _: 'message', id: 10, peerId: { _: 'peerChannel', channelId: 5 }, date: 1, message: 'a' },
        { _: 'message', id: 5, peerId: { _: 'peerChannel', channelId: 5 }, date: 1, message: 'b' },
      ],
      chats: [], users: [],
    }));
    const res = await adapter.send({
      '@type': 'searchChatMessages',
      chat_id: channelToTdChatId(5),
      sender_id: { '@type': 'messageSenderUser', user_id: 999 },
      from_message_id: 0, offset: 0, limit: 2,
    }) as Record<string, unknown>;
    expect(calls[0]._).toBe('messages.search');
    expect(calls[0].filter).toEqual({ _: 'inputMessagesFilterEmpty' });
    expect(calls[0].fromId).toBeDefined();
    expect((res.messages as unknown[])).toHaveLength(2);
    // Page was full (2 >= limit 2) → next anchor is the oldest message (id 5).
    expect(res.next_from_message_id).toBe(toTdMessageId(5));
  });
});
