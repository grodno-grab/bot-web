import { describe, it, expect, afterEach, vi } from 'vitest';
import { TelegramSession } from './telegram';
import { makeFakeSend, type Handler } from '../../test/helpers/fakeSend';
import { makeFakeController } from '../../test/helpers/fakeController';
import { BOT_CHAT_ID, EXIT_FALLBACK_URL, EXIT_REDIRECT_DELAY_MS } from './config';

// Let queued microtasks + a macrotask settle (handleUpdate dispatches async).
const flush = () => new Promise((r) => setTimeout(r, 0));

const authUpdate = (type: string, extra: Record<string, unknown> = {}) => ({
  '@type': 'updateAuthorizationState',
  authorization_state: { '@type': type, ...extra },
});

interface Harness {
  fake: ReturnType<typeof makeFakeSend>;
  emit: (u: Record<string, unknown>) => void;
}

/** Install a controllable fake `tdweb` global and capture the live client. */
function installTg(handlers: Record<string, Handler | Handler[]> = {}): Harness {
  const fake = makeFakeSend({ handlers });
  let instance: { onUpdate: ((u: Record<string, unknown>) => void) | null } | null = null;

  class FakeClient {
    onUpdate: ((u: Record<string, unknown>) => void) | null = null;
    constructor(_opts: Record<string, unknown>) {
      instance = this;
    }
    send(req: Record<string, unknown>) {
      const { '@type': type, ...params } = req;
      return fake.send(type as string, params);
    }
  }

  (globalThis as unknown as { tdweb: unknown }).tdweb = { default: FakeClient };
  return { fake, emit: (u) => instance?.onUpdate?.(u) };
}

/** A genuine bot data message (passes every onBotMessage guard). */
const validBotMsg = (over: Record<string, unknown> = {}) => ({
  '@type': 'message',
  id: 42,
  chat_id: BOT_CHAT_ID,
  sender_id: { '@type': 'messageSenderUser', user_id: BOT_CHAT_ID },
  content: { '@type': 'messageText', text: { '@type': 'formattedText', text: 'key' } },
  reply_markup: {
    '@type': 'replyMarkupInlineKeyboard',
    rows: [
      [{ text: 'BOT-WEB-DATA' }],
      [{ text: 'dl', type: { '@type': 'inlineKeyboardButtonTypeUrl', url: `${window.location.origin}/d.bin` } }],
    ],
  },
  ...over,
});

/** Drive the session to authorizationStateReady with mode-select left pending. */
function makeReadySession(handlers: Record<string, Handler | Handler[]> = {}) {
  const tg = installTg(handlers);
  const fc = makeFakeController();
  fc.ctrl.waitForModeSelect = vi.fn(() => new Promise(() => {})); // never resolves
  const session = new TelegramSession(fc.ctrl);
  tg.emit(authUpdate('authorizationStateReady'));
  return { tg, fc, session };
}

afterEach(() => {
  delete (globalThis as unknown as { tdweb?: unknown }).tdweb;
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe('TelegramSession — authorization handshake', () => {
  it('answers the TDLib parameter and encryption-key states', async () => {
    const tg = installTg();
    const fc = makeFakeController();
    new TelegramSession(fc.ctrl);

    tg.emit(authUpdate('authorizationStateWaitTdlibParameters'));
    await flush();
    expect(tg.fake.lastOf('setTdlibParameters')).toBeTruthy();

    tg.emit(authUpdate('authorizationStateWaitEncryptionKey'));
    await flush();
    expect(tg.fake.lastOf('setDatabaseEncryptionKey')?.params.new_encryption_key).toBe('');
  });

  it('routes the phone, code and password auth states to the controller', async () => {
    const tg = installTg();
    const fc = makeFakeController();
    new TelegramSession(fc.ctrl);

    tg.emit(authUpdate('authorizationStateWaitPhoneNumber'));
    await flush();
    expect(fc.callsOf('showPhoneScreen')).toHaveLength(1);

    tg.emit(authUpdate('authorizationStateWaitCode'));
    await flush();
    expect(fc.callsOf('showCodeScreen')).toHaveLength(1);

    tg.emit(authUpdate('authorizationStateWaitPassword', { password_hint: 'my pet' }));
    await flush();
    expect(fc.callsOf('showPasswordScreen')[0].args[0]).toBe('my pet');
  });

  it('shows an error when an authorization step rejects', async () => {
    const tg = installTg({ setTdlibParameters: new Error('handshake boom') });
    const fc = makeFakeController();
    new TelegramSession(fc.ctrl);

    tg.emit(authUpdate('authorizationStateWaitTdlibParameters'));
    await flush();
    expect(fc.errors).toContain('handshake boom');
  });

  it('shows an error when post-auth routing rejects', async () => {
    const tg = installTg();
    const fc = makeFakeController();
    fc.ctrl.waitForModeSelect = vi.fn().mockRejectedValue(new Error('route fail'));
    new TelegramSession(fc.ctrl);

    tg.emit(authUpdate('authorizationStateReady'));
    await flush();
    expect(fc.errors).toContain('route fail');
  });
});

describe('TelegramSession — auth submissions', () => {
  it('sends phone, code and password as the matching TDLib requests', async () => {
    const tg = installTg();
    const session = new TelegramSession(makeFakeController().ctrl);

    await session.submitPhone('+49123456');
    await session.submitCode('12345');
    await session.submitPassword('s3cret');

    expect(tg.fake.lastOf('setAuthenticationPhoneNumber')?.params.phone_number).toBe('+49123456');
    expect(tg.fake.lastOf('checkAuthenticationCode')?.params.code).toBe('12345');
    expect(tg.fake.lastOf('checkAuthenticationPassword')?.params.password).toBe('s3cret');
  });

  it('requests hiding the member list of a supergroup', async () => {
    const tg = installTg();
    const session = new TelegramSession(makeFakeController().ctrl);

    await session.toggleHideMembers(987);

    expect(tg.fake.lastOf('toggleSupergroupHasHiddenMembers')?.params).toMatchObject({
      supergroup_id: 987,
      has_hidden_members: true,
    });
  });
});

describe('TelegramSession — incoming bot messages (anti-spoofing guards)', () => {
  const cases: { name: string; over: Record<string, unknown> }[] = [
    { name: 'a message in a different chat', over: { chat_id: 999 } },
    {
      name: 'a message from a spoofed sender in the bot chat',
      over: { sender_id: { '@type': 'messageSenderUser', user_id: 4242 } },
    },
    { name: 'a non-text message', over: { content: { '@type': 'messagePhoto' } } },
  ];

  for (const { name, over } of cases) {
    it(`ignores ${name}`, async () => {
      const { tg } = makeReadySession({ deleteMessages: {} });
      await flush();

      tg.emit({ '@type': 'updateNewMessage', message: validBotMsg(over) });
      await flush();

      // The first thing handleBotMessage does is delete the bot message; if the
      // guard rejected the message, that never happens.
      expect(tg.fake.countOf('deleteMessages')).toBe(0);
    });
  }

  it('processes a genuine bot message (passes every guard)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('stop after guard')));
    const { tg } = makeReadySession({ deleteMessages: {}, getMe: { id: 1 } });
    await flush();

    tg.emit({ '@type': 'updateNewMessage', message: validBotMsg() });
    await flush();

    expect(tg.fake.countOf('deleteMessages')).toBe(1);
  });

  it('treats a bot reply without the data marker as "nothing to delete" instead of hanging', async () => {
    const { tg, fc } = makeReadySession({ deleteMessages: {}, logOut: {} });
    await flush();

    // A genuine bot text message that carries no data-marker button.
    const noDataMsg = validBotMsg({
      reply_markup: { '@type': 'replyMarkupInlineKeyboard', rows: [[{ text: 'nope' }]] },
    });
    tg.emit({ '@type': 'updateNewMessage', message: noDataMsg });
    await flush();
    await flush();

    // The bot message is cleaned up and the done screen is shown (no data download).
    expect(tg.fake.countOf('deleteMessages')).toBe(1);
    const doneCall = fc.callsOf('waitForBotDone')[0];
    expect(doneCall).toBeTruthy();
    expect(doneCall.args[0]).toMatch(/не найдено/i);
    expect(doneCall.args[1]).toBe('Всё чисто'); // celebratory title
    // No document was fetched or reported back to the bot.
    expect(tg.fake.countOf('sendMessage')).toBe(0);
    await flush();
    expect(tg.fake.countOf('logOut')).toBe(1);
  });

  it('ignores bot messages while no session is active', async () => {
    const tg = installTg({ deleteMessages: {} });
    new TelegramSession(makeFakeController().ctrl); // never reaches ready

    tg.emit({ '@type': 'updateNewMessage', message: validBotMsg() });
    await flush();

    expect(tg.fake.countOf('deleteMessages')).toBe(0);
  });

  it('surfaces an error when handling a genuine bot message fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('download failed')));
    const { tg, fc } = makeReadySession({ deleteMessages: {}, getMe: { id: 1 } });
    await flush();

    tg.emit({ '@type': 'updateNewMessage', message: validBotMsg() });
    await flush();
    await flush();

    expect(fc.errors.length).toBeGreaterThan(0);
  });
});

describe('TelegramSession — exit & cleanup (security-relevant logout)', () => {
  const mockLocation = (): { replace: ReturnType<typeof vi.fn>; restore: () => void } => {
    const original = window.location;
    const replace = vi.fn();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { replace, reload: vi.fn(), origin: original.origin, href: original.href },
    });
    return { replace, restore: () => Object.defineProperty(window, 'location', { configurable: true, value: original }) };
  };

  it('logs out, closes the tab and redirects to the fallback on cancel', async () => {
    vi.useFakeTimers();
    const tg = installTg({ logOut: {} });
    const closeSpy = vi.fn();
    vi.stubGlobal('close', closeSpy);
    const loc = mockLocation();
    try {
      const session = new TelegramSession(makeFakeController().ctrl);
      const done = session.cancelAndExit();
      await vi.advanceTimersByTimeAsync(EXIT_REDIRECT_DELAY_MS + 1);
      await done;

      expect(tg.fake.countOf('logOut')).toBe(1);
      expect(closeSpy).toHaveBeenCalled();
      expect(loc.replace).toHaveBeenCalledWith(EXIT_FALLBACK_URL);
    } finally {
      loc.restore();
    }
  });

  it('still redirects even if the logout request throws', async () => {
    vi.useFakeTimers();
    installTg({ logOut: new Error('already gone') });
    vi.stubGlobal('close', vi.fn());
    const loc = mockLocation();
    try {
      const session = new TelegramSession(makeFakeController().ctrl);
      const done = session.cancelAndExit();
      await vi.advanceTimersByTimeAsync(EXIT_REDIRECT_DELAY_MS + 1);
      await done;
      expect(loc.replace).toHaveBeenCalledWith(EXIT_FALLBACK_URL);
    } finally {
      loc.restore();
    }
  });

  it('logs out exactly once on page unload, even when called repeatedly', async () => {
    const tg = installTg({ logOut: {} });
    const session = new TelegramSession(makeFakeController().ctrl);

    session.onPageUnload();
    session.onPageUnload(); // idempotent: cleanup already performed
    await flush();

    expect(tg.fake.countOf('logOut')).toBe(1);
  });

  it('cleanup cancels the pending initialisation timeout', async () => {
    vi.useFakeTimers();
    const tg = installTg();
    const fc = makeFakeController();
    const session = new TelegramSession(fc.ctrl);

    session.cleanup();
    await vi.advanceTimersByTimeAsync(70000);

    expect(fc.errors).toHaveLength(0); // the timeout error never fires
    expect(tg.fake.countOf('logOut')).toBe(0);
  });
});
