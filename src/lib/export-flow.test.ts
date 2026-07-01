import { describe, it, expect } from 'vitest';
import { makeFakeSend } from '../../test/helpers/fakeSend';
import { makeFakeController } from '../../test/helpers/fakeController';
import { collectChatsViaExport } from './export-flow';
import { channelToTdChatId } from './td-adapter';

describe('collectChatsViaExport', () => {
  it('gathers chats from all sources (dialogs, left chats, replies + linked groups) and searches each', async () => {
    const leftChat = channelToTdChatId(500); // a left channel → triggers linked-group load
    const fake = makeFakeSend({
      handlers: {
        getMe: { '@type': 'user', id: 1000 },
        // loadAllChatIds loops loadChats until it throws (per-folder), then reads getChats.
        loadChats: new Error('no more chats'),
        getChats: [
          { '@type': 'chats', chat_ids: [100, 200] },     // main
          { '@type': 'chats', chat_ids: [200, 300] },     // archive (200 duplicates main)
        ],
        // getLeftChats paginates until an empty page.
        getLeftChats: [
          { '@type': 'chats', chat_ids: [leftChat] },
          { '@type': 'chats', chat_ids: [] },
        ],
        // "replies" scan: one page with forward/reply origins, then empty.
        searchPublicChat: { '@type': 'chat', id: 7 },
        getChatHistory: [
          { '@type': 'messages', messages: [
            { '@type': 'message', id: 50, forward_info: { source: { chat_id: -100600 } }, reply_to: { chat_id: 400 } },
          ] },
          { '@type': 'messages', messages: [] },
        ],
        getChat: (p) => ({
          id: Number(p.chat_id),
          type: Number(p.chat_id) === leftChat
            ? { '@type': 'chatTypeSupergroup', is_channel: true, supergroup_id: 500 }
            : { '@type': 'chatTypePrivate' },
        }),
        getSupergroupFullInfo: { '@type': 'supergroupFullInfo', linked_chat_id: 999 },
        // Own messages found only in the left channel (TDLib id 12<<20 → raw server id 12).
        searchChatMessages: (p) => Number(p.chat_id) === leftChat
          ? { '@type': 'foundChatMessages', messages: [{ '@type': 'message', id: 12 * 2 ** 20 }], next_from_message_id: 0 }
          : { '@type': 'foundChatMessages', messages: [], next_from_message_id: 0 },
      },
    });
    const { ctrl } = makeFakeController();

    const findings = await collectChatsViaExport(fake.send, ctrl, '55');

    // Findings are returned in the bot's deletion format (raw server message ids).
    expect(findings).toContainEqual(expect.objectContaining({ chat_id: leftChat, message_ids: [12] }));

    // Left chats fetched via the takeout session id passed in by TelegramSession.
    expect(fake.lastOf('getLeftChats')?.params.takeout_session_id).toBe('55');

    // Collected ids: 100,200,300 (dialogs) + leftChat + -100600,400 (replies) = 6 unique,
    // plus the linked discussion group 999 pulled for the channel = 7 chats searched.
    const requested = fake.callsOf('getChat').map((c) => c.params.chat_id);
    expect(requested).toContain(leftChat);
    expect(requested).toContain(-100600);
    expect(requested).toContain(400);
    expect(requested).toContain(999); // linked group, reached via getSupergroupFullInfo
    expect(fake.countOf('searchChatMessages')).toBe(7);

    // Opening/closing the takeout session is TelegramSession's job, not this function's.
    expect(fake.countOf('initTakeoutSession')).toBe(0);
    expect(fake.countOf('finishTakeoutSession')).toBe(0);
  });

  it('skips the left-chats step when no takeout session is available (null id)', async () => {
    const fake = makeFakeSend({
      handlers: {
        getMe: { '@type': 'user', id: 1 },
        loadChats: new Error('no more chats'),
        getChats: { '@type': 'chats', chat_ids: [] },
        searchPublicChat: new Error('no replies chat'), // B3 is best-effort
      },
    });
    const { ctrl } = makeFakeController();

    await collectChatsViaExport(fake.send, ctrl, null);

    expect(fake.countOf('getLeftChats')).toBe(0);
  });
});
