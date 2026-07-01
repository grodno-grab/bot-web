import { test, expect } from '@playwright/test';
import { installFakeTdweb, loginToModeSelect, BOT_CHAT_ID, MUL } from './fixtures/setup';

test('decrypts the bot document, lists chats, deletes and reports done', async ({ page }) => {
  const meId = 777777;
  const key = 'doc-key';
  const docUrl = 'http://localhost:5174/doc.bin';

  const consoleErrors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
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
        [{ text: 'Download', type: { '@type': 'inlineKeyboardButtonTypeUrl', url: docUrl } }],
      ],
    },
  };

  await installFakeTdweb(
    page,
    {
      meId,
      botChatId: BOT_CHAT_ID,
      bot: {
        botMessage,
        chatsById: {
          '5001': {
            id: -1000000005001,
            title: 'Alpha',
            type: { '@type': 'chatTypeSupergroup', supergroup_id: 5001 },
          },
        },
      },
    },
    { doc: { url: '**/doc.bin', userId: String(meId), key, value: [{ chat_id: 5001, message_ids: [10, 20] }] } },
  );

  await page.goto('/');
  await loginToModeSelect(page);

  await page.getByText('Удалить мои сообщения').click();
  await expect(page.getByText('Alpha')).toBeVisible();
  await expect(page.getByText('Выбрано 1 чат, 2 сообщения')).toBeVisible();

  await page.getByRole('button', { name: 'Приступить к удалению' }).click();
  await expect(page.getByText('Приступить к удалению?')).toBeVisible();
  await page.getByRole('button', { name: 'Начать удаление' }).click();

  // processChats enforces a ~5s minimum visible progress, so allow extra time.
  await expect(page.getByText('Удаление завершено')).toBeVisible({ timeout: 15000 });
  await expect(page.getByText('Все найденные сообщения успешно удалены.')).toBeVisible();

  expect(consoleErrors).toEqual([]);
});

test('shows the "nothing found" screen when the bot has no messages to delete', async ({ page }) => {
  // The bot replies with a plain text message that carries no data-marker button.
  const botMessage = {
    '@type': 'message',
    id: 999 * MUL,
    chat_id: BOT_CHAT_ID,
    sender_id: { '@type': 'messageSenderUser', user_id: BOT_CHAT_ID },
    content: { '@type': 'messageText', text: { '@type': 'formattedText', text: 'Сообщений не найдено' } },
  };

  await installFakeTdweb(page, { meId: 777777, botChatId: BOT_CHAT_ID, bot: { botMessage } });

  await page.goto('/');
  await loginToModeSelect(page);

  await page.getByText('Удалить мои сообщения').click();

  // Regression: this used to hang on "Получение сообщений…" forever.
  await expect(page.getByText('Всё чисто')).toBeVisible();
  await expect(page.getByText(/Сообщений для удаления не найдено/)).toBeVisible();
});
