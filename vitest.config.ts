import { defineConfig } from 'vitest/config';
import preact from '@preact/preset-vite';

// Pinned public bot configuration so tests are deterministic regardless of
// any values in a local .env.local override.
const TEST_ENV = {
  VITE_API_ID: '21929053',
  VITE_API_HASH: '531ad33ad3e2af1dab49d59bc1062ec3',
  VITE_BOT_CHAT_ID: '6092224989',
  VITE_BOT_USERNAME: 'FindMessagesBot',
  VITE_BOT_START_PARAMETER: 'wtg',
  VITE_BOT_COMMAND_SUCCESS: '/wtg_done',
  VITE_BOT_COMMAND_FAILURE: '/wtg_fail',
};

export default defineConfig({
  // Use the Preact preset so JSX compiles against Preact's runtime regardless
  // of the underlying transformer (Vite 8 uses oxc, not esbuild).
  plugins: [preact()],
  test: {
    environment: 'jsdom',
    globals: true,
    css: false,
    setupFiles: ['./test/setup.ts'],
    include: [
      'src/**/*.test.{ts,tsx}',
      'test/**/*.test.ts',
      'scripts/**/*.test.mjs',
    ],
    exclude: ['e2e/**', 'node_modules/**', 'dist/**'],
    env: TEST_ENV,
    coverage: {
      provider: 'v8',
      include: [
        'src/**/*.{ts,tsx}',
        'scripts/deploy-logic.mjs',
        'scripts/patch-deps.mjs',
      ],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/types/**',
        'src/main.tsx',
        // Browser-only environment shim (no IndexedDB in jsdom); exercised by
        // the Playwright e2e suite in a real browser instead.
        'src/lib/idb-setup.ts',
        'src/components/Icons.tsx',
      ],
      reporter: ['text', 'html'],
    },
  },
});
