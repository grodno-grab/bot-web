import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/preact';
import { afterEach } from 'vitest';
import { webcrypto } from 'node:crypto';

// jsdom does not ship a full Web Crypto (subtle) implementation; bot-flow and
// crypto tests need it. Use Node's webcrypto when subtle is missing.
try {
  if (!globalThis.crypto?.subtle) {
    Object.defineProperty(globalThis, 'crypto', {
      value: webcrypto,
      configurable: true,
      writable: true,
    });
  }
} catch {
  // crypto is locked down in this environment; individual tests will surface it.
}

afterEach(() => {
  cleanup();
});
