import { type Page, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { webcrypto } from 'node:crypto';

// Playwright compiles specs to CJS, so __dirname is available (import.meta is not).
const fakeTdwebSource = readFileSync(join(__dirname, 'fakeTdweb.js'), 'utf-8');

export interface TdConfig {
  meId: number;
  botChatId: number;
  requirePassword?: boolean;
  passwordHint?: string;
  admin?: unknown;
  bot?: unknown;
}

export interface DocFixture {
  /** Glob the app will fetch, e.g. '**\/doc.bin'. */
  url: string;
  userId: string;
  key: string;
  value: unknown;
}

/** Mirror of src/lib/crypto.ts encryption (iv || AES-CBC ciphertext). */
async function encryptBotDoc(userId: string, key: string, plaintext: string): Promise<Buffer> {
  const { subtle } = webcrypto;
  const keyData = await subtle.digest('SHA-256', new TextEncoder().encode(userId + key));
  const cryptoKey = await subtle.importKey('raw', keyData, { name: 'AES-CBC' }, false, ['encrypt']);
  const iv = webcrypto.getRandomValues(new Uint8Array(16));
  const ciphertext = await subtle.encrypt({ name: 'AES-CBC', iv }, cryptoKey, new TextEncoder().encode(plaintext));
  return Buffer.concat([Buffer.from(iv), Buffer.from(ciphertext)]);
}

/** Serve the fake tdweb global (+ optional encrypted bot document) for a page. */
export async function installFakeTdweb(page: Page, config: TdConfig, opts: { doc?: DocFixture } = {}) {
  await page.addInitScript((cfg) => {
    (window as unknown as { __TD_CONFIG__: unknown }).__TD_CONFIG__ = cfg;
  }, config);

  await page.route('**/tdweb.inlined.js', (route) =>
    route.fulfill({ contentType: 'application/javascript', body: fakeTdwebSource }),
  );

  if (opts.doc) {
    const body = await encryptBotDoc(opts.doc.userId, opts.doc.key, JSON.stringify(opts.doc.value));
    await page.route(opts.doc.url, (route) => route.fulfill({ contentType: 'application/octet-stream', body }));
  }
}

/** Drive the intro → phone → code screens up to the mode-select screen. */
export async function loginToModeSelect(page: Page) {
  await page.getByRole('button', { name: 'Продолжить' }).click(); // intro
  await expect(page.getByText('Вход в Telegram')).toBeVisible();
  await page.getByRole('textbox').fill('+49123456');
  await page.getByRole('button', { name: 'Продолжить' }).click();
  await expect(page.getByText('Код для входа')).toBeVisible();
  await page.getByRole('textbox').fill('12345'); // auto-submits at 5 digits
  await expect(page.getByText('Удалить мои сообщения')).toBeVisible();
}

export const BOT_CHAT_ID = 6092224989;
export const MUL = 2 ** 20;
