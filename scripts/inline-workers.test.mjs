// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { inlineWorkers, buildWasmInterceptor } from './inline-logic.mjs';

const MAIN_WORKER = 'self.x=1;importScripts(__webpack_require__.p + "1.abc.worker.js");self.y=2;';
const CHUNK_WORKER = 'var CHUNK_MARKER=42;';
const TDWEB =
  'var a=1; module.exports = function() { return new Worker(__webpack_require__.p + "0.def.worker.js"); }; var b=2;';
const WASM = Buffer.from([0x00, 0x61, 0x73, 0x6d]); // "\0asm"

describe('inlineWorkers', () => {
  it('inlines the chunk worker, embeds the wasm and rewrites the worker factory', () => {
    const { inlined, merged, wasmB64 } = inlineWorkers({
      mainWorker: MAIN_WORKER,
      chunkWorker: CHUNK_WORKER,
      tdweb: TDWEB,
      wasmBytes: WASM,
    });

    // chunk worker merged in place of importScripts
    expect(merged).toContain('CHUNK_MARKER');
    expect(merged).not.toContain('importScripts(__webpack_require__.p');

    // wasm embedded as base64
    expect(wasmB64).toBe(WASM.toString('base64'));
    expect(inlined).toContain(wasmB64);

    // worker factory rewritten to a blob URL
    expect(inlined).toContain('URL.createObjectURL');
    expect(inlined).not.toMatch(/return new Worker\(__webpack_require__\.p \+ "0\.def\.worker\.js"\)/);

    // surrounding tdweb code preserved
    expect(inlined).toContain('var a=1;');
    expect(inlined).toContain('var b=2;');
  });

  it('throws when the importScripts pattern is missing', () => {
    expect(() =>
      inlineWorkers({ mainWorker: 'no pattern here', chunkWorker: '', tdweb: TDWEB, wasmBytes: WASM }),
    ).toThrow(/importScripts pattern not found/);
  });

  it('throws when the worker module pattern is missing', () => {
    expect(() =>
      inlineWorkers({ mainWorker: MAIN_WORKER, chunkWorker: '', tdweb: 'no module here', wasmBytes: WASM }),
    ).toThrow(/worker module pattern not found/);
  });
});

describe('buildWasmInterceptor', () => {
  it('embeds the base64 and overrides fetch for .wasm requests', () => {
    const out = buildWasmInterceptor('QUJD');
    expect(out).toContain('"QUJD"');
    expect(out).toContain('self.fetch=function');
    expect(out).toContain('.wasm');
  });
});
