import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/preact';

// Remove the artificial 5s minimum progress delay from the user flow.
vi.mock('./lib/config', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./lib/config')>();
  return { ...actual, MIN_PROCESSING_DURATION: 0 };
});

import { App } from './App';
import { installTdSimulator, uninstallTdSimulator } from '../test/helpers/tdSimulator';
import { buildAdminSend, ID_MULTIPLIER as MUL } from '../test/helpers/adminWorld';
import { makeFakeSend } from '../test/helpers/fakeSend';
import { encryptBotDoc } from '../test/helpers/cryptoFixture';
import { BOT_CHAT_ID, EXIT_FALLBACK_URL } from './lib/config';

const clickBtn = (name: string | RegExp) =>
  fireEvent.click(screen.getByRole('button', { name }));
const clickText = (text: string) => fireEvent.click(screen.getByText(text).closest('button')!);
const typeInto = (el: Element, value: string) => fireEvent.input(el, { target: { value } });

async function loginToModeSelect() {
  clickBtn('Продолжить'); // intro → proceed
  await screen.findByText('Вход в Telegram');
  typeInto(screen.getByRole('textbox'), '+49123456');
  clickBtn('Продолжить');
  await screen.findByText('Код для входа');
  typeInto(screen.getByRole('textbox'), '12345'); // auto-submits
  await screen.findByText('Удалить мои сообщения');
}

afterEach(() => {
  uninstallTdSimulator();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

// ─── auth wiring (exercises TelegramSession) ───────────────────────────────────

describe('App — authentication', () => {
  it('walks intro → phone → code → mode select (no 2FA)', async () => {
    installTdSimulator({});
    render(<App />);
    await loginToModeSelect();
    expect(screen.getByText('Удалить как администратор')).toBeInTheDocument();
  });

  it('shows the password screen with a hint when 2FA is enabled', async () => {
    installTdSimulator({ requirePassword: true, passwordHint: 'my pet' });
    render(<App />);
    clickBtn('Продолжить');
    await screen.findByText('Вход в Telegram');
    typeInto(screen.getByRole('textbox'), '+49123456');
    clickBtn('Продолжить');
    await screen.findByText('Код для входа');
    typeInto(screen.getByRole('textbox'), '12345');

    expect(await screen.findByText('Введите облачный пароль. Подсказка: my pet')).toBeInTheDocument();
  });

  it('completes login through the 2FA password screen to mode select', async () => {
    installTdSimulator({ requirePassword: true, passwordHint: 'pet' });
    render(<App />);
    clickBtn('Продолжить');
    await screen.findByText('Вход в Telegram');
    typeInto(screen.getByRole('textbox'), '+49123456');
    clickBtn('Продолжить');
    await screen.findByText('Код для входа');
    typeInto(screen.getByRole('textbox'), '12345');
    await screen.findByText('Введите пароль');

    const pw = document.querySelector('input[type="password"]') as HTMLInputElement;
    typeInto(pw, 'secret');
    clickBtn('Продолжить');

    expect(await screen.findByText('Удалить мои сообщения')).toBeInTheDocument();
  });

  it('shows an error when the TDLib client fails to construct', async () => {
    installTdSimulator({ throwOnConstruct: true });
    render(<App />);
    clickBtn('Продолжить');
    expect(await screen.findByText(/Не удалось запустить TDLib/)).toBeInTheDocument();
  });

  it('shows an error when initialisation times out', async () => {
    vi.useFakeTimers();
    installTdSimulator({ silent: true });
    render(<App />);
    clickBtn('Продолжить');
    await vi.advanceTimersByTimeAsync(60000);
    expect(screen.getByText(/Инициализация не завершилась/)).toBeInTheDocument();
  });
});

// ─── admin flow end-to-end ──────────────────────────────────────────────────────

describe('App — admin flow', () => {
  const startTs = Math.floor(new Date(2020, 0, 1).getTime() / 1000);
  const endTs = startTs + 86399;

  const adminWorld = () =>
    buildAdminSend({
      meId: 1000,
      chatIds: [5000],
      chats: [
        {
          id: 5000,
          title: 'MyChat',
          supergroupId: 5000,
          myStatus: 'creator',
          startTs,
          endTs,
          startMsgId: 1 * MUL,
          endMsgId: 5 * MUL,
          history: [{ id: 5 * MUL, date: startTs + 100, sender: 11 }],
        },
      ],
      users: [{ id: 11 }],
    });

  it('deletes a member and shows the done screen', async () => {
    const world = adminWorld();
    installTdSimulator({ onSend: world.send });
    render(<App />);
    await loginToModeSelect();

    clickText('Удалить как администратор');
    fireEvent.click((await screen.findByText('MyChat')).closest('button')!);

    await screen.findByText('Период удаления');
    const [from, to] = screen.getAllByRole('textbox');
    typeInto(from, '01.01.2020');
    typeInto(to, '01.01.2020');
    clickBtn('Продолжить');

    await screen.findByText(/Будут безвозвратно удалены/);
    clickBtn('Начать удаление');

    await screen.findByText('Удаление завершено');
    expect(screen.getByText(/Обработано пользователей: 1/)).toBeInTheDocument();

    clickBtn('Завершить');
    await screen.findByText('Можно закрыть вкладку.');

    const deletedUsers = world
      .callsOf('deleteChatMessagesBySender')
      .map((c) => (c.params.sender_id as { user_id: number }).user_id);
    expect(deletedUsers).toEqual([11]);
    expect(world.countOf('logOut')).toBeGreaterThanOrEqual(1);
  });

  it('returns to the chat list via "Выбрать другой чат" on the done screen', async () => {
    const world = adminWorld();
    installTdSimulator({ onSend: world.send });
    render(<App />);
    await loginToModeSelect();

    clickText('Удалить как администратор');
    fireEvent.click((await screen.findByText('MyChat')).closest('button')!);

    await screen.findByText('Период удаления');
    const [from, to] = screen.getAllByRole('textbox');
    typeInto(from, '01.01.2020');
    typeInto(to, '01.01.2020');
    clickBtn('Продолжить');

    await screen.findByText(/Будут безвозвратно удалены/);
    clickBtn('Начать удаление');

    await screen.findByText('Удаление завершено');
    clickBtn('Выбрать другой чат'); // loops back to the chat list, no logOut yet

    expect(await screen.findByText('MyChat')).toBeInTheDocument();
  });

  it('warns on the done screen when a member deletion fails', async () => {
    const world = buildAdminSend(
      {
        meId: 1000,
        chatIds: [5000],
        chats: [
          {
            id: 5000,
            title: 'MyChat',
            supergroupId: 5000,
            myStatus: 'creator',
            startTs,
            endTs,
            startMsgId: 1 * MUL,
            endMsgId: 5 * MUL,
            history: [{ id: 5 * MUL, date: startTs + 100, sender: 11 }],
          },
        ],
        users: [{ id: 11 }],
      },
      { deleteChatMessagesBySender: new Error('CHAT_ADMIN_REQUIRED') },
    );
    installTdSimulator({ onSend: world.send });
    render(<App />);
    await loginToModeSelect();

    clickText('Удалить как администратор');
    fireEvent.click((await screen.findByText('MyChat')).closest('button')!);

    await screen.findByText('Период удаления');
    const [from, to] = screen.getAllByRole('textbox');
    typeInto(from, '01.01.2020');
    typeInto(to, '01.01.2020');
    clickBtn('Продолжить');

    await screen.findByText(/Будут безвозвратно удалены/);
    clickBtn('Начать удаление');

    await screen.findByText('Удаление завершено');
    expect(screen.getByText(/часть сообщений удалить не удалось/i)).toBeInTheDocument();
  });

  it('returns to mode select when going back from the chat list', async () => {
    const world = buildAdminSend({
      meId: 1000,
      chatIds: [5000],
      chats: [{ id: 5000, title: 'MyChat', supergroupId: 5000, myStatus: 'creator' }],
    });
    installTdSimulator({ onSend: world.send });
    render(<App />);
    await loginToModeSelect();

    clickText('Удалить как администратор');
    await screen.findByText('MyChat');
    clickBtn('Назад'); // header back

    expect(await screen.findByText('Удалить мои сообщения')).toBeInTheDocument();
  });

  it('hides the member list from the date-range screen', async () => {
    const world = buildAdminSend({
      meId: 1000,
      chatIds: [5000],
      chats: [
        {
          id: 5000,
          title: 'MyChat',
          supergroupId: 5000,
          myStatus: 'creator',
          canHideMembers: true,
          hasHiddenMembers: false,
        },
      ],
    });
    installTdSimulator({ onSend: world.send });
    render(<App />);
    await loginToModeSelect();

    clickText('Удалить как администратор');
    fireEvent.click((await screen.findByText('MyChat')).closest('button')!);

    await screen.findByText('Период удаления');
    clickBtn('Скрыть');

    await waitFor(() => expect(world.countOf('toggleSupergroupHasHiddenMembers')).toBe(1));
    expect(world.lastOf('toggleSupergroupHasHiddenMembers')!.params).toMatchObject({
      supergroup_id: 5000,
      has_hidden_members: true,
    });
  });
});

// ─── user (delete-my-messages) flow end-to-end ──────────────────────────────────

describe('App — delete-my-messages flow', () => {
  it('decrypts the bot document, deletes the messages and notifies the bot', async () => {
    const meId = 777777;
    const key = 'doc-key';
    const url = `${window.location.origin}/doc.bin`;
    const data = [{ chat_id: 5001, message_ids: [10, 20] }];
    const buf = await encryptBotDoc(String(meId), key, JSON.stringify(data));
    vi.stubGlobal('fetch', vi.fn(async () => ({ arrayBuffer: async () => buf }) as unknown as Response));

    const fake = makeFakeSend({
      handlers: {
        getMe: { id: meId },
        searchPublicChat: { id: BOT_CHAT_ID },
        getChat: {
          id: -1000000005001,
          title: 'Alpha',
          type: { '@type': 'chatTypeSupergroup', supergroup_id: 5001 },
        },
        getMessages: (p) => ({ messages: (p.message_ids as number[]).map((id) => ({ id })) }),
      },
    });

    const botMessage = {
      '@type': 'message',
      id: 999 * MUL,
      chat_id: BOT_CHAT_ID,
      sender_id: { '@type': 'messageSenderUser', user_id: BOT_CHAT_ID },
      content: { '@type': 'messageText', text: { '@type': 'formattedText', text: key } },
      reply_markup: {
        '@type': 'replyMarkupInlineKeyboard',
        rows: [
          [{ text: 'BOT-WEB-DATA', type: { '@type': 'inlineKeyboardButtonTypeCallback' } }],
          [{ text: 'Download', type: { '@type': 'inlineKeyboardButtonTypeUrl', url } }],
        ],
      },
    };

    installTdSimulator({ onSend: fake.send, botMessage });
    render(<App />);
    await loginToModeSelect();

    clickText('Удалить мои сообщения');
    await screen.findByText('Alpha');

    clickBtn('Приступить к удалению');
    await screen.findByText('Приступить к удалению?');
    clickBtn('Начать удаление');

    await screen.findByText('Удаление завершено');
    const sent = fake.lastOf('sendMessage')!;
    expect((sent.params.input_message_content as { text: { text: string } }).text.text).toBe('/wtg_done');
    expect(fake.countOf('deleteMessages')).toBeGreaterThanOrEqual(1);

    // "Вернуться к выбору" loops back to the mode-select screen.
    clickBtn('Вернуться к выбору');
    expect(await screen.findByText('Удалить как администратор')).toBeInTheDocument();
  });

  it('reports failure to the bot and logs out on finish when a deletion fails', async () => {
    const meId = 777777;
    const key = 'doc-key';
    const url = `${window.location.origin}/doc.bin`;
    const data = [{ chat_id: 5001, message_ids: [10] }];
    const buf = await encryptBotDoc(String(meId), key, JSON.stringify(data));
    vi.stubGlobal('fetch', vi.fn(async () => ({ arrayBuffer: async () => buf }) as unknown as Response));

    const fake = makeFakeSend({
      handlers: {
        getMe: { id: meId },
        searchPublicChat: { id: BOT_CHAT_ID },
        getChat: {
          id: -1000000005001,
          title: 'Alpha',
          type: { '@type': 'chatTypeSupergroup', supergroup_id: 5001 },
        },
        getMessages: (p) => ({ messages: (p.message_ids as number[]).map((id) => ({ id })) }),
        // The bot message deletion succeeds; the chat deletion fails.
        deleteMessages: (p) => {
          if (p.chat_id === BOT_CHAT_ID) return {};
          throw new Error('cannot delete');
        },
      },
    });

    const botMessage = {
      '@type': 'message',
      id: 999 * MUL,
      chat_id: BOT_CHAT_ID,
      sender_id: { '@type': 'messageSenderUser', user_id: BOT_CHAT_ID },
      content: { '@type': 'messageText', text: { '@type': 'formattedText', text: key } },
      reply_markup: {
        '@type': 'replyMarkupInlineKeyboard',
        rows: [
          [{ text: 'BOT-WEB-DATA', type: { '@type': 'inlineKeyboardButtonTypeCallback' } }],
          [{ text: 'Download', type: { '@type': 'inlineKeyboardButtonTypeUrl', url } }],
        ],
      },
    };

    installTdSimulator({ onSend: fake.send, botMessage });
    render(<App />);
    await loginToModeSelect();

    clickText('Удалить мои сообщения');
    await screen.findByText('Alpha');
    clickBtn('Приступить к удалению');
    await screen.findByText('Приступить к удалению?');
    clickBtn('Начать удаление');

    expect(await screen.findByText(/Не удалось удалить сообщения из 1 чатов/)).toBeInTheDocument();
    expect(
      (fake.lastOf('sendMessage')!.params.input_message_content as { text: { text: string } }).text.text,
    ).toBe('/wtg_fail');

    clickBtn('Завершить');
    await waitFor(() => expect(fake.countOf('logOut')).toBeGreaterThanOrEqual(1));
  });

  it('shows the "nothing found" screen when the bot has no messages to delete', async () => {
    const fake = makeFakeSend({
      handlers: {
        searchPublicChat: { id: BOT_CHAT_ID },
        deleteMessages: {},
        logOut: {},
      },
    });

    // The bot replies with a plain text message carrying no data-marker button.
    const botMessage = {
      '@type': 'message',
      id: 999 * MUL,
      chat_id: BOT_CHAT_ID,
      sender_id: { '@type': 'messageSenderUser', user_id: BOT_CHAT_ID },
      content: { '@type': 'messageText', text: { '@type': 'formattedText', text: 'Сообщений не найдено' } },
    };

    installTdSimulator({ onSend: fake.send, botMessage });
    render(<App />);
    await loginToModeSelect();

    clickText('Удалить мои сообщения');

    // Instead of hanging on "Получение сообщений…", the done screen is shown.
    expect(await screen.findByText('Всё чисто')).toBeInTheDocument();
    expect(screen.getByText(/Сообщений для удаления не найдено/)).toBeInTheDocument();

    // Finishing logs the session out.
    clickBtn('Завершить');
    await waitFor(() => expect(fake.countOf('logOut')).toBeGreaterThanOrEqual(1));
  });

  // Shared setup that drives the user flow up to the chat-selection screen.
  async function gotoChatSelect() {
    const meId = 777777;
    const key = 'doc-key';
    const url = `${window.location.origin}/doc.bin`;
    const data = [{ chat_id: 5001, message_ids: [10, 20] }];
    const buf = await encryptBotDoc(String(meId), key, JSON.stringify(data));
    vi.stubGlobal('fetch', vi.fn(async () => ({ arrayBuffer: async () => buf }) as unknown as Response));

    const fake = makeFakeSend({
      handlers: {
        getMe: { id: meId },
        searchPublicChat: { id: BOT_CHAT_ID },
        getChat: {
          id: -1000000005001,
          title: 'Alpha',
          type: { '@type': 'chatTypeSupergroup', supergroup_id: 5001 },
        },
        getMessages: (p) => ({ messages: (p.message_ids as number[]).map((id) => ({ id })) }),
      },
    });

    const botMessage = {
      '@type': 'message',
      id: 999 * MUL,
      chat_id: BOT_CHAT_ID,
      sender_id: { '@type': 'messageSenderUser', user_id: BOT_CHAT_ID },
      content: { '@type': 'messageText', text: { '@type': 'formattedText', text: key } },
      reply_markup: {
        '@type': 'replyMarkupInlineKeyboard',
        rows: [
          [{ text: 'BOT-WEB-DATA', type: { '@type': 'inlineKeyboardButtonTypeCallback' } }],
          [{ text: 'Download', type: { '@type': 'inlineKeyboardButtonTypeUrl', url } }],
        ],
      },
    };

    installTdSimulator({ onSend: fake.send, botMessage });
    render(<App />);
    await loginToModeSelect();
    clickText('Удалить мои сообщения');
    await screen.findByText('Alpha');
    return fake;
  }

  it('returns to mode select when going back from the chat list', async () => {
    await gotoChatSelect();
    clickBtn('Назад'); // BotChatSelectScreen back → handleBotMessage returns "back"
    expect(await screen.findByText('Удалить как администратор')).toBeInTheDocument();
  });

  it('returns to the chat list when the confirmation is cancelled', async () => {
    await gotoChatSelect();
    clickBtn('Приступить к удалению');
    await screen.findByText('Приступить к удалению?');
    clickBtn('Назад'); // ConfirmScreen cancel → re-show chat selection
    expect(await screen.findByText('Alpha')).toBeInTheDocument();
  });
});

// ─── exit / cleanup (security-relevant: must always log out) ────────────────────

describe('App — cancel and exit', () => {
  it('logs out and closes the tab when cancelling after login', async () => {
    const fake = makeFakeSend({ handlers: { logOut: {} } });
    installTdSimulator({ onSend: fake.send });
    const closeSpy = vi.fn();
    vi.stubGlobal('close', closeSpy);

    const original = window.location;
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { replace: vi.fn(), reload: vi.fn(), origin: original.origin, href: original.href },
    });
    try {
      render(<App />);
      await loginToModeSelect();
      clickBtn('Отменить и выйти');
      await waitFor(() => expect(fake.countOf('logOut')).toBe(1));
      expect(closeSpy).toHaveBeenCalled();
    } finally {
      Object.defineProperty(window, 'location', { configurable: true, value: original });
    }
  });

  it('logs out when the page is being unloaded', async () => {
    const fake = makeFakeSend({ handlers: { logOut: {} } });
    installTdSimulator({ onSend: fake.send });
    render(<App />);
    await loginToModeSelect();

    window.dispatchEvent(new Event('pagehide'));
    await waitFor(() => expect(fake.countOf('logOut')).toBe(1));
  });

  it('redirects to the fallback when cancelling on the intro screen (no session yet)', () => {
    const original = window.location;
    const replace = vi.fn();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { replace, reload: vi.fn(), origin: original.origin, href: original.href },
    });
    try {
      render(<App />);
      clickBtn('Отмена'); // intro cancel, before any TelegramSession exists
      expect(replace).toHaveBeenCalledWith(EXIT_FALLBACK_URL);
    } finally {
      Object.defineProperty(window, 'location', { configurable: true, value: original });
    }
  });

  it('reloads the page when restored from the back-forward cache', () => {
    const original = window.location;
    const reload = vi.fn();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { replace: vi.fn(), reload, origin: original.origin, href: original.href },
    });
    try {
      render(<App />);
      const evt = new Event('pageshow') as Event & { persisted: boolean };
      evt.persisted = true;
      window.dispatchEvent(evt);
      expect(reload).toHaveBeenCalled();
    } finally {
      Object.defineProperty(window, 'location', { configurable: true, value: original });
    }
  });
});
