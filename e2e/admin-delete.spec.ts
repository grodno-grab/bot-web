import { test, expect } from '@playwright/test';
import { installFakeTdweb, loginToModeSelect, BOT_CHAT_ID, MUL } from './fixtures/setup';

const startTs = Math.floor(new Date(2020, 0, 1).getTime() / 1000);
const endTs = startTs + 86399;

test('deletes a member end-to-end and returns to a closeable state', async ({ page }) => {
  await installFakeTdweb(page, {
    meId: 1000,
    botChatId: BOT_CHAT_ID,
    admin: {
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
  });
  await page.goto('/');
  await loginToModeSelect(page);

  await page.getByText('Удалить как администратор').click();
  await page.getByText('MyChat').click();

  await expect(page.getByText('Период удаления')).toBeVisible();
  const dates = page.getByRole('textbox');
  await dates.nth(0).fill('01.01.2020');
  await dates.nth(1).fill('01.01.2020');
  await page.getByRole('button', { name: 'Продолжить' }).click();

  await expect(page.getByText(/Будут безвозвратно удалены/)).toBeVisible();
  await page.getByRole('button', { name: 'Начать удаление' }).click();

  await expect(page.getByText('Удаление завершено')).toBeVisible();
  await expect(page.getByText(/Обработано пользователей: 1/)).toBeVisible();

  await page.getByRole('button', { name: 'Завершить' }).click();
  await expect(page.getByText('Готово. Можно закрыть вкладку.')).toBeVisible();
});

test('shows a date validation error for an inverted range', async ({ page }) => {
  await installFakeTdweb(page, {
    meId: 1000,
    botChatId: BOT_CHAT_ID,
    admin: {
      chatIds: [5000],
      chats: [{ id: 5000, title: 'MyChat', supergroupId: 5000, myStatus: 'creator' }],
    },
  });
  await page.goto('/');
  await loginToModeSelect(page);

  await page.getByText('Удалить как администратор').click();
  await page.getByText('MyChat').click();

  await expect(page.getByText('Период удаления')).toBeVisible();
  const dates = page.getByRole('textbox');
  await dates.nth(0).fill('02.01.2020');
  await dates.nth(1).fill('01.01.2020');
  await page.getByRole('button', { name: 'Продолжить' }).click();

  await expect(page.getByText('Начальная дата не может быть позже конечной.')).toBeVisible();
});
