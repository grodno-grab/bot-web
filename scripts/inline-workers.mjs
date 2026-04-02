#!/usr/bin/env node
/**
 * inline-workers.mjs
 *
 * Reads the tdweb webpack output from srcDir, embeds the worker scripts and
 * the WASM binary directly into tdweb.js, and writes tdweb.inlined.js to outDir.
 *
 * The WASM is base64-encoded and injected as a fetch interceptor in the worker
 * scope so that TDLib's internal `fetch('tdlib.wasm')` is served from memory
 * without any external file.
 */

import fs   from 'node:fs';
import path from 'node:path';

const srcDir = process.argv[2];
const outDir = process.argv[3];

if (!srcDir || !outDir) {
  console.error('Usage: node inline-workers.mjs <srcDir> <outDir>');
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const ls = fs.readdirSync(srcDir);

// Locate files
const mainName  = ls.find(f => /^\w+\.worker\.js$/.test(f) && !/^\d+\./.test(f));
const chunkName = ls.find(f => /^\d+\.\w+\.worker\.js$/.test(f));
const wasmName  = ls.find(f => f.endsWith('.wasm'));
const tdwebPath = path.join(srcDir, 'tdweb.js');

if (!mainName)  { console.error('ERROR: main worker file not found in ' + srcDir);  process.exit(1); }
if (!chunkName) { console.error('ERROR: chunk worker file not found in ' + srcDir); process.exit(1); }
if (!wasmName)  { console.error('ERROR: .wasm file not found in ' + srcDir);         process.exit(1); }
if (!fs.existsSync(tdwebPath)) { console.error('ERROR: tdweb.js not found in ' + srcDir); process.exit(1); }

const mainWorker  = fs.readFileSync(path.join(srcDir, mainName),  'utf8');
const chunkWorker = fs.readFileSync(path.join(srcDir, chunkName), 'utf8');
const tdweb       = fs.readFileSync(tdwebPath, 'utf8');
const wasmBytes   = fs.readFileSync(path.join(srcDir, wasmName));

// ── Step 1: inline chunk worker into main worker ──────────────────────────────
// The main worker loads chunk 1 via a synchronous importScripts() call.
const importScriptsRe = /importScripts\(__webpack_require__\.p[^)]+\)/;
if (!importScriptsRe.test(mainWorker)) {
  console.error('ERROR: importScripts pattern not found in main worker — file structure changed?');
  process.exit(1);
}
let merged = mainWorker.replace(importScriptsRe, `(function(){${chunkWorker}})()`);

// ── Step 2: embed WASM as base64 and intercept fetch in the worker ────────────
// Workers spawned from blob: URLs have no origin, so any relative fetch() would
// fail. We replace the entire fetch for *.wasm URLs with an in-memory response
// built from the embedded base64 data. This also removes the need to distribute
// tdlib.wasm as a separate file.
const wasmB64 = wasmBytes.toString('base64');

const wasmInterceptor =
  `(function(){` +
  `var _wasmB64=${JSON.stringify(wasmB64)};` +
  `var _wasmBuf=(function(b){` +
    `var s=atob(b),a=new Uint8Array(s.length);` +
    `for(var i=0;i<s.length;i++)a[i]=s.charCodeAt(i);` +
    `return a.buffer;` +
  `})(_wasmB64);` +
  `var _origFetch=self.fetch.bind(self);` +
  `self.fetch=function(url,opts){` +
    `if(typeof url==='string'&&/\\.wasm($|\\?)/.test(url))` +
      `return Promise.resolve(new Response(new Uint8Array(_wasmBuf),{headers:{'Content-Type':'application/wasm'}}));` +
    `return _origFetch(url,opts);` +
  `};` +
  `}());\n`;

merged = wasmInterceptor + merged;

// ── Step 3: inline merged worker into tdweb.js ────────────────────────────────
// Replace the webpack worker factory (module #7 in tdweb.js) with a blob-URL
// factory. The blob is built in the main thread so location.href is available.
const workerModuleRe = /module\.exports = function\(\) \{\s*return new Worker\(__webpack_require__\.p \+ "[^"]+\.worker\.js"\);\s*\};/;
if (!workerModuleRe.test(tdweb)) {
  console.error('ERROR: worker module pattern not found in tdweb.js — file structure changed?');
  process.exit(1);
}

const inlined = tdweb.replace(
  workerModuleRe,
  `module.exports=(function(){` +
  `var _c=${JSON.stringify(merged)};` +
  `return function(){` +
  `var _b=new Blob([_c],{type:'application/javascript'});` +
  `return new Worker(URL.createObjectURL(_b));` +
  `};` +
  `}());`,
);

const outputPath = path.join(outDir, 'tdweb.inlined.js');
fs.writeFileSync(outputPath, inlined, 'utf8');

console.log('Created: ' + outputPath);
console.log('  WASM embedded: ' + (wasmBytes.length / 1024 / 1024).toFixed(1) + ' MB → ' + (wasmB64.length / 1024 / 1024).toFixed(1) + ' MB base64');
console.log('  tdweb.js:       ' + (tdweb.length   / 1024).toFixed(1) + ' KB');
console.log('  tdweb.inlined.js: ' + (inlined.length / 1024 / 1024).toFixed(1) + ' MB total');
