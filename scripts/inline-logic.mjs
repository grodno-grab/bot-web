/**
 * Pure string transforms for inlining the tdweb webpack output into a single
 * self-contained file. Separated from inline-workers.mjs so it can be tested
 * without touching the filesystem.
 */

const IMPORT_SCRIPTS_RE = /importScripts\(__webpack_require__\.p[^)]+\)/;
const WORKER_MODULE_RE =
  /module\.exports = function\(\) \{\s*return new Worker\(__webpack_require__\.p \+ "[^"]+\.worker\.js"\);\s*\};/;

/** Build the in-worker fetch interceptor that serves the embedded WASM. */
export function buildWasmInterceptor(wasmB64) {
  return (
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
    `}());\n`
  );
}

/**
 * Inline the chunk worker + WASM into the main worker, then inline the merged
 * worker into tdweb.js as a blob-URL factory. Throws if either webpack pattern
 * is missing (i.e. the upstream file structure changed).
 */
export function inlineWorkers({ mainWorker, chunkWorker, tdweb, wasmBytes }) {
  if (!IMPORT_SCRIPTS_RE.test(mainWorker)) {
    throw new Error('importScripts pattern not found in main worker — file structure changed?');
  }
  let merged = mainWorker.replace(IMPORT_SCRIPTS_RE, `(function(){${chunkWorker}})()`);

  const wasmB64 = Buffer.from(wasmBytes).toString('base64');
  merged = buildWasmInterceptor(wasmB64) + merged;

  if (!WORKER_MODULE_RE.test(tdweb)) {
    throw new Error('worker module pattern not found in tdweb.js — file structure changed?');
  }
  const inlined = tdweb.replace(
    WORKER_MODULE_RE,
    `module.exports=(function(){` +
      `var _c=${JSON.stringify(merged)};` +
      `return function(){` +
      `var _b=new Blob([_c],{type:'application/javascript'});` +
      `return new Worker(URL.createObjectURL(_b));` +
      `};` +
      `}());`,
  );

  return { inlined, merged, wasmB64 };
}
