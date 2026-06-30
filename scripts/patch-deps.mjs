#!/usr/bin/env node
/**
 * Patches @preact/preset-vite to use dynamic import() instead of require()
 * for zimmerframe (ESM-only package). The CJS bundle of @preact/preset-vite
 * wraps require() in a Promise but zimmerframe has no CommonJS export, so
 * require() always fails. Replacing with import() fixes the error.
 * See: https://github.com/sveltejs/zimmerframe/pull/34
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const FILE = 'node_modules/@preact/preset-vite/dist/cjs/transform-hook-names.js';
const FROM = 'Promise.resolve().then(() => __importStar(require("zimmerframe")))';
const TO = 'import("zimmerframe")';

/** Apply the zimmerframe require()→import() patch. Idempotent. */
export function applyPatch(src) {
  if (!src.includes(FROM)) return { changed: false, src };
  return { changed: true, src: src.replace(FROM, TO) };
}

/* v8 ignore start */
// CLI glue (fs/process side effects). Exercised out-of-process by the
// "patch-deps CLI (main)" subprocess tests, which v8 coverage can't observe.
function main() {
  if (!existsSync(FILE)) process.exit(0);

  const { changed, src } = applyPatch(readFileSync(FILE, 'utf8'));
  if (!changed) {
    console.log('patch-deps: @preact/preset-vite already patched');
    process.exit(0);
  }

  writeFileSync(FILE, src);
  console.log('patch-deps: patched @preact/preset-vite/dist/cjs/transform-hook-names.js');
}
/* v8 ignore stop */

// Only run the side-effecting patch when executed directly (not when imported by tests).
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
