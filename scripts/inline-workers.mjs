#!/usr/bin/env node
/**
 * inline-workers.mjs
 *
 * Reads the tdweb webpack output from srcDir, embeds the worker scripts and
 * the WASM binary directly into tdweb.js, and writes tdweb.inlined.js to outDir.
 *
 * The actual string transforms live in inline-logic.mjs (so they can be unit
 * tested); this file only locates files and does I/O.
 */

import fs from 'node:fs';
import path from 'node:path';
import { inlineWorkers } from './inline-logic.mjs';

const srcDir = process.argv[2];
const outDir = process.argv[3];

if (!srcDir || !outDir) {
  console.error('Usage: node inline-workers.mjs <srcDir> <outDir>');
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const ls = fs.readdirSync(srcDir);

// Locate files
const mainName = ls.find((f) => /^\w+\.worker\.js$/.test(f) && !/^\d+\./.test(f));
const chunkName = ls.find((f) => /^\d+\.\w+\.worker\.js$/.test(f));
const wasmName = ls.find((f) => f.endsWith('.wasm'));
const tdwebPath = path.join(srcDir, 'tdweb.js');

if (!mainName) { console.error('ERROR: main worker file not found in ' + srcDir); process.exit(1); }
if (!chunkName) { console.error('ERROR: chunk worker file not found in ' + srcDir); process.exit(1); }
if (!wasmName) { console.error('ERROR: .wasm file not found in ' + srcDir); process.exit(1); }
if (!fs.existsSync(tdwebPath)) { console.error('ERROR: tdweb.js not found in ' + srcDir); process.exit(1); }

const mainWorker = fs.readFileSync(path.join(srcDir, mainName), 'utf8');
const chunkWorker = fs.readFileSync(path.join(srcDir, chunkName), 'utf8');
const tdweb = fs.readFileSync(tdwebPath, 'utf8');
const wasmBytes = fs.readFileSync(path.join(srcDir, wasmName));

let inlined;
let wasmB64;
try {
  ({ inlined, wasmB64 } = inlineWorkers({ mainWorker, chunkWorker, tdweb, wasmBytes }));
} catch (e) {
  console.error('ERROR: ' + e.message);
  process.exit(1);
}

const outputPath = path.join(outDir, 'tdweb.inlined.js');
fs.writeFileSync(outputPath, inlined, 'utf8');

console.log('Created: ' + outputPath);
console.log('  WASM embedded: ' + (wasmBytes.length / 1024 / 1024).toFixed(1) + ' MB → ' + (wasmB64.length / 1024 / 1024).toFixed(1) + ' MB base64');
console.log('  tdweb.js:       ' + (tdweb.length / 1024).toFixed(1) + ' KB');
console.log('  tdweb.inlined.js: ' + (inlined.length / 1024 / 1024).toFixed(1) + ' MB total');
