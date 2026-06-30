#!/usr/bin/env node
/**
 * Post-install dependency patches (idempotent, applied by the `postinstall` script).
 *
 * 1. @preact/preset-vite — use dynamic import() instead of require() for zimmerframe
 *    (ESM-only). The CJS bundle wraps require() in a Promise but zimmerframe has no
 *    CommonJS export, so require() always fails. import() fixes it.
 *    See: https://github.com/sveltejs/zimmerframe/pull/34
 *
 * 2. @mtcute/wasm — getWasmUrl() references both `./mtcute-simd.wasm` and `./mtcute.wasm`.
 *    viteSingleFile inlines every `new URL(..., import.meta.url)` asset as base64, so BOTH
 *    blobs (~152 KB raw / ~65 KB gzip) end up in the bundle even though only one loads at
 *    runtime. Pointing the SIMD branch at the non-SIMD file collapses them to a single
 *    inlined blob (Vite dedupes by path), saving ~33 KB gzip. We keep the non-SIMD build
 *    so device coverage stays the same as the es2017 target (WASM SIMD is newer than
 *    baseline WASM); the crypto speed loss is negligible for this non-file-heavy app.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const FILE = 'node_modules/@preact/preset-vite/dist/cjs/transform-hook-names.js';
const FROM = 'Promise.resolve().then(() => __importStar(require("zimmerframe")))';
const TO = 'import("zimmerframe")';

const WASM_FILE = 'node_modules/@mtcute/wasm/index.js';
const WASM_FROM = './mtcute-simd.wasm';
const WASM_TO = './mtcute.wasm';

/** Apply the zimmerframe require()→import() patch. Idempotent. */
export function applyPatch(src) {
  if (!src.includes(FROM)) return { changed: false, src };
  return { changed: true, src: src.replace(FROM, TO) };
}

/** Point the SIMD wasm URL at the non-SIMD blob so only one is inlined. Idempotent. */
export function applyWasmPatch(src) {
  if (!src.includes(WASM_FROM)) return { changed: false, src };
  return { changed: true, src: src.replaceAll(WASM_FROM, WASM_TO) };
}

/* v8 ignore start */
// CLI glue (fs/process side effects). Exercised out-of-process by the
// "patch-deps CLI (main)" subprocess tests, which v8 coverage can't observe.
const PATCHES = [
  { file: FILE, apply: applyPatch, name: '@preact/preset-vite' },
  { file: WASM_FILE, apply: applyWasmPatch, name: '@mtcute/wasm (single non-SIMD blob)' },
];

function main() {
  for (const { file, apply, name } of PATCHES) {
    if (!existsSync(file)) continue;
    const { changed, src } = apply(readFileSync(file, 'utf8'));
    if (changed) {
      writeFileSync(file, src);
      console.log(`patch-deps: patched ${name}`);
    } else {
      console.log(`patch-deps: ${name} already patched`);
    }
  }
}
/* v8 ignore stop */

// Only run the side-effecting patch when executed directly (not when imported by tests).
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
