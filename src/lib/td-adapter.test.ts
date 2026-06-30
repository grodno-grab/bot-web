import { describe, it, expect } from 'vitest';
import {
  toTdMessageId,
  toServerMessageId,
  channelToTdChatId,
  parseTdChatId,
  peerToTdChatId,
  mapSender,
  mapReplyMarkup,
  mapMessageRaw,
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
