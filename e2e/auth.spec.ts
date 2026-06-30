import { test, expect } from '@playwright/test';
import { installFakeTdweb, loginToModeSelect, BOT_CHAT_ID } from './fixtures/setup';

test('walks through intro → phone → code to the mode-select screen', async ({ page }) => {
  await installFakeTdweb(page, { meId: 555, botChatId: BOT_CHAT_ID });
  await page.goto('/');

  await expect(page.getByText('Перед началом')).toBeVisible();
  await loginToModeSelect(page);

  await expect(page.getByText('Удалить мои сообщения')).toBeVisible();
  await expect(page.getByText('Удалить как администратор')).toBeVisible();
});

test('shows the 2FA password screen with the server hint', async ({ page }) => {
  await installFakeTdweb(page, {
    meId: 555,
    botChatId: BOT_CHAT_ID,
    requirePassword: true,
    passwordHint: 'my pet',
  });
  await page.goto('/');

  await page.getByRole('button', { name: 'Продолжить' }).click();
  await expect(page.getByText('Вход в Telegram')).toBeVisible();
  await page.getByRole('textbox').fill('+49123456');
  await page.getByRole('button', { name: 'Продолжить' }).click();
  await expect(page.getByText('Код для входа')).toBeVisible();
  await page.getByRole('textbox').fill('12345');

  await expect(page.getByText('Введите облачный пароль. Подсказка: my pet')).toBeVisible();
});
