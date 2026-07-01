import { describe, it, expect } from 'vitest';
import { Long } from '@mtcute/web';
import {
  toTdMessageId,
  toServerMessageId,
  channelToTdChatId,
  parseTdChatId,
  peerToTdChatId,
  mapSender,
  mapReplyMarkup,
  mapMessageRaw,
  mapLeftChats,
  humanizeAuthError,
} from './td-adapter';

// Raw tl objects are plain `_`-tagged data; cast to keep the test readable.
const raw = <T>(o: unknown): T => o as T;

describe('message id conversion (TDLib server_id << 20)', () => {
  it('round-trips a server id', () => {
    expect(toTdMessageId(5)).toBe(5 * 2 ** 20);
    expect(toServerMessageId(toTdMessageId(5))).toBe(5);
  });
  it('floors the +1 anchor back to the server id', () => {
    expect(toServerMessageId(toTdMessageId(42) + 1)).toBe(42);
  });
});

describe('chat id mapping (TDLib marked ids)', () => {
  it('marks a bare channel id negatively and parses it back', () => {
    const marked = channelToTdChatId(1234567890);
    expect(marked).toBeLessThan(0);
    expect(parseTdChatId(marked)).toEqual({ type: 'channel', bareId: 1234567890 });
  });

  it('maps raw peers to marked chat ids', () => {
    expect(peerToTdChatId(raw({ _: 'peerUser', userId: 7 }))).toBe(7);
    expect(peerToTdChatId(raw({ _: 'peerChannel', channelId: 123 }))).toBe(channelToTdChatId(123));
    expect(peerToTdChatId(raw({ _: 'peerChat', chatId: 9 }))).toBe(-9);
  });
});

describe('mapSender', () => {
  it('maps a user peer', () => {
    expect(mapSender(raw({ _: 'peerUser', userId: 42 }))).toEqual({ '@type': 'messageSenderUser', user_id: 42 });
  });
  it('maps a channel peer to a chat sender with marked id', () => {
    expect(mapSender(raw({ _: 'peerChannel', channelId: 5 }))).toEqual({
      '@type': 'messageSenderChat',
      chat_id: channelToTdChatId(5),
    });
  });
});

describe('mapReplyMarkup', () => {
  it('maps an inline keyboard with url + callback buttons', () => {
    const markup = mapReplyMarkup(raw({
      _: 'replyInlineMarkup',
      rows: [{ _: 'keyboardButtonRow', buttons: [
        { _: 'keyboardButtonUrl', text: 'open', url: 'https://x/y' },
        { _: 'keyboardButtonCallback', text: 'cb' },
      ] }],
    }));
    expect(markup).toEqual({
      '@type': 'replyMarkupInlineKeyboard',
      rows: [[
        { text: 'open', type: { '@type': 'inlineKeyboardButtonTypeUrl', url: 'https://x/y' } },
        { text: 'cb', type: { '@type': 'inlineKeyboardButtonTypeCallback' } },
      ]],
    });
  });
  it('returns undefined for non-inline markup', () => {
    expect(mapReplyMarkup(undefined)).toBeUndefined();
    expect(mapReplyMarkup(raw({ _: 'replyKeyboardHide' }))).toBeUndefined();
  });
});

describe('mapMessageRaw', () => {
  it('maps a text message with an inline url button (the bot reply shape)', () => {
    const td = mapMessageRaw(raw({
      _: 'message',
      id: 100,
      peerId: { _: 'peerUser', userId: 555 },
      fromId: { _: 'peerUser', userId: 555 },
      date: 1700000000,
      message: 'secret-key',
      replyMarkup: {
        _: 'replyInlineMarkup',
        rows: [{ _: 'keyboardButtonRow', buttons: [{ _: 'keyboardButtonUrl', text: 'dl', url: 'https://h/d.bin' }] }],
      },
    })) as Record<string, any>;

    expect(td.id).toBe(toTdMessageId(100));
    expect(td.chat_id).toBe(555);
    expect(td.sender_id).toEqual({ '@type': 'messageSenderUser', user_id: 555 });
    expect(td.content).toEqual({ '@type': 'messageText', text: { '@type': 'formattedText', text: 'secret-key' } });
    expect(td.reply_markup['@type']).toBe('replyMarkupInlineKeyboard');
  });

  it('maps a service message to a non-regular content type', () => {
    const td = mapMessageRaw(raw({
      _: 'messageService',
      id: 7,
      peerId: { _: 'peerChannel', channelId: 10 },
      fromId: { _: 'peerUser', userId: 9 },
      date: 1,
    })) as Record<string, any>;
    expect(td.content['@type']).toBe('messageChatAddMembers');
    expect(td.chat_id).toBe(channelToTdChatId(10));
  });

  it('maps photo media to messagePhoto', () => {
    const td = mapMessageRaw(raw({
      _: 'message', id: 1, peerId: { _: 'peerUser', userId: 1 }, date: 1,
      message: '', media: { _: 'messageMediaPhoto' },
    })) as Record<string, any>;
    expect(td.content['@type']).toBe('messagePhoto');
  });
});

describe('humanizeAuthError', () => {
  it('explains a flood wait and points at the shared api_id', () => {
    const msg = humanizeAuthError({ text: 'FLOOD_WAIT_%d', seconds: 300 });
    expect(msg).toMatch(/Слишком много попыток/);
    expect(msg).toMatch(/300 с/);
    expect(msg).toMatch(/VITE_API_ID/);
  });
  it('extracts the wait from the message when no seconds field', () => {
    expect(humanizeAuthError(new Error('FLOOD_WAIT_42'))).toMatch(/42 с/);
  });
  it('maps common auth errors and passes unknown text through', () => {
    expect(humanizeAuthError({ text: 'PHONE_NUMBER_INVALID' })).toMatch(/Неверный номер/);
    expect(humanizeAuthError({ text: 'API_ID_INVALID' })).toMatch(/api_id/);
    expect(humanizeAuthError(new Error('SOMETHING_ELSE'))).toBe('SOMETHING_ELSE');
  });
});

describe('mapMessageRaw forward/reply origin (used by export-flow "replies" scan)', () => {
  it('exposes the forward source chat_id (savedFromPeer preferred over fromId)', () => {
    const td = mapMessageRaw(raw({
      _: 'message', id: 1, peerId: { _: 'peerUser', userId: 777 }, date: 1, message: '',
      fwdFrom: { _: 'messageFwdHeader', savedFromPeer: { _: 'peerChannel', channelId: 555 }, fromId: { _: 'peerUser', userId: 9 } },
    })) as Record<string, any>;
    expect(td.forward_info).toEqual({ source: { chat_id: channelToTdChatId(555) } });
  });
  it('falls back to fwdFrom.fromId when there is no savedFromPeer', () => {
    const td = mapMessageRaw(raw({
      _: 'message', id: 1, peerId: { _: 'peerUser', userId: 777 }, date: 1, message: '',
      fwdFrom: { _: 'messageFwdHeader', fromId: { _: 'peerChat', chatId: 42 } },
    })) as Record<string, any>;
    expect(td.forward_info).toEqual({ source: { chat_id: -42 } });
  });
  it('exposes reply_to chat_id from a messageReplyHeader', () => {
    const td = mapMessageRaw(raw({
      _: 'message', id: 1, peerId: { _: 'peerUser', userId: 777 }, date: 1, message: '',
      replyTo: { _: 'messageReplyHeader', replyToPeerId: { _: 'peerChannel', channelId: 88 } },
    })) as Record<string, any>;
    expect(td.reply_to).toEqual({ chat_id: channelToTdChatId(88) });
  });
  it('leaves forward_info/reply_to undefined for a plain message', () => {
    const td = mapMessageRaw(raw({
      _: 'message', id: 1, peerId: { _: 'peerUser', userId: 777 }, date: 1, message: 'hi',
    })) as Record<string, any>;
    expect(td.forward_info).toBeUndefined();
    expect(td.reply_to).toBeUndefined();
  });
});

describe('mapLeftChats (channels.getLeftChannels → TDLib chats)', () => {
  // getLeftChannels returns full channel objects (with accessHash); Chat.id needs it.
  const chan = (id: number, title: string) =>
    raw({ _: 'channel', id, title, accessHash: Long.fromNumber(id), broadcast: true });

  it('maps a chatsSlice: marked channel ids + server total_count, skipping non-channels', () => {
    const cached: number[] = [];
    const res = mapLeftChats(raw({
      _: 'messages.chatsSlice', count: 57,
      chats: [chan(111, 'A'), { _: 'chat', id: 9, title: 'basic' }, chan(222, 'B')],
    }), (c) => cached.push(c.id)) as Record<string, any>;
    expect(res['@type']).toBe('chats');
    expect(res.total_count).toBe(57);
    expect(res.chat_ids).toEqual([channelToTdChatId(111), channelToTdChatId(222)]);
    expect(cached).toEqual([channelToTdChatId(111), channelToTdChatId(222)]);
  });

  it('uses chats.length as total_count for a non-slice messages.chats', () => {
    const res = mapLeftChats(raw({
      _: 'messages.chats', chats: [chan(1, 'A'), chan(2, 'B')],
    })) as Record<string, any>;
    expect(res.total_count).toBe(2);
    expect(res.chat_ids).toEqual([channelToTdChatId(1), channelToTdChatId(2)]);
  });

  it('includes channelForbidden (left channels you were removed from)', () => {
    const res = mapLeftChats(raw({
      _: 'messages.chats',
      chats: [{ _: 'channelForbidden', id: 333, title: 'X', accessHash: Long.fromNumber(1) }],
    })) as Record<string, any>;
    expect(res.chat_ids).toEqual([channelToTdChatId(333)]);
  });
});
