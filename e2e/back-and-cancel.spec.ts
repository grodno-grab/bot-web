import { test, expect } from '@playwright/test';
import { installFakeTdweb, loginToModeSelect, BOT_CHAT_ID } from './fixtures/setup';

test('navigates back from the admin chat list to mode select', async ({ page }) => {
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
  await expect(page.getByText('MyChat')).toBeVisible();

  await page.getByRole('button', { name: 'Назад' }).click();
  await expect(page.getByText('Удалить как администратор')).toBeVisible();
});

test('cancelling on the intro screen redirects away', async ({ page }) => {
  await installFakeTdweb(page, { meId: 555, botChatId: BOT_CHAT_ID });
  // Intercept the exit redirect target so the test does not hit the network.
  await page.route('https://www.google.com/**', (route) =>
    route.fulfill({ contentType: 'text/html', body: '<html><body>exit</body></html>' }),
  );

  await page.goto('/');
  await expect(page.getByText('Перед началом')).toBeVisible();
  await page.getByRole('button', { name: 'Отмена' }).click();

  await page.waitForURL(/google\.com/);
});
