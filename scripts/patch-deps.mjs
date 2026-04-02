#!/usr/bin/env node
/**
 * Patches @preact/preset-vite to use dynamic import() instead of require()
 * for zimmerframe (ESM-only package). The CJS bundle of @preact/preset-vite
 * wraps require() in a Promise but zimmerframe has no CommonJS export, so
 * require() always fails. Replacing with import() fixes the error.
 * See: https://github.com/sveltejs/zimmerframe/pull/34
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const file = 'node_modules/@preact/preset-vite/dist/cjs/transform-hook-names.js';

if (!existsSync(file)) process.exit(0);

const src = readFileSync(file, 'utf8');
const from = 'Promise.resolve().then(() => __importStar(require("zimmerframe")))';
const to   = 'import("zimmerframe")';

if (!src.includes(from)) {
  console.log('patch-deps: @preact/preset-vite already patched');
  process.exit(0);
}

writeFileSync(file, src.replace(from, to));
console.log('patch-deps: patched @preact/preset-vite/dist/cjs/transform-hook-names.js');
