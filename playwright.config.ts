import { defineConfig, devices } from '@playwright/test';

const PORT = 5174;
const BASE_URL = `http://localhost:${PORT}`;

// Pin the public bot config so the in-browser TDLib fake and the app agree on
// BOT_CHAT_ID etc., regardless of any .env.local override.
const VITE_ENV = {
  VITE_API_ID: '21929053',
  VITE_API_HASH: '531ad33ad3e2af1dab49d59bc1062ec3',
  VITE_BOT_CHAT_ID: '6092224989',
  VITE_BOT_USERNAME: 'FindMessagesBot',
  VITE_BOT_START_PARAMETER: 'wtg',
  VITE_BOT_COMMAND_SUCCESS: '/wtg_done',
  VITE_BOT_COMMAND_FAILURE: '/wtg_fail',
};

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    // e2e injects a fake tdweb client via addInitScript (see e2e/fixtures/setup.ts),
    // which wins over the real adapter registered by main.tsx (`globalThis.tdweb ??=`).
    command: `npx vite --port ${PORT} --strictPort`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: VITE_ENV,
  },
});
