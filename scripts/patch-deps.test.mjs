// @vitest-environment node
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyPatch, applyWasmPatch } from './patch-deps.mjs';

const FROM = 'Promise.resolve().then(() => __importStar(require("zimmerframe")))';
const TO = 'import("zimmerframe")';

const SCRIPT = fileURLToPath(new URL('./patch-deps.mjs', import.meta.url));
const TARGET_REL = 'node_modules/@preact/preset-vite/dist/cjs/transform-hook-names.js';

describe('applyPatch', () => {
  it('replaces the require() wrapper with a dynamic import()', () => {
    const src = `before ${FROM} after`;
    const { changed, src: out } = applyPatch(src);
    expect(changed).toBe(true);
    expect(out).toContain(TO);
    expect(out).not.toContain(FROM);
  });

  it('is a no-op when the pattern is absent (already patched)', () => {
    const src = `already ${TO} patched`;
    const { changed, src: out } = applyPatch(src);
    expect(changed).toBe(false);
    expect(out).toBe(src);
  });

  it('is idempotent', () => {
    const once = applyPatch(`x ${FROM} y`).src;
    expect(applyPatch(once).changed).toBe(false);
  });
});

describe('applyWasmPatch', () => {
  const WASM_SRC = 'if (s) return new URL("./mtcute-simd.wasm", import.meta.url);\nreturn new URL("./mtcute.wasm", import.meta.url);';

  it('points the SIMD wasm URL at the non-SIMD blob', () => {
    const { changed, src } = applyWasmPatch(WASM_SRC);
    expect(changed).toBe(true);
    expect(src).not.toContain('mtcute-simd.wasm');
    expect(src).toContain('./mtcute.wasm');
  });

  it('is a no-op when the SIMD reference is absent (already patched)', () => {
    const src = 'return new URL("./mtcute.wasm", import.meta.url);';
    const out = applyWasmPatch(src);
    expect(out.changed).toBe(false);
    expect(out.src).toBe(src);
  });

  it('is idempotent', () => {
    const once = applyWasmPatch(WASM_SRC).src;
    expect(applyWasmPatch(once).changed).toBe(false);
  });
});

// Run the script as a real process inside a throwaway cwd so its relative
// node_modules target resolves to a fixture instead of the real dependency.
describe('patch-deps CLI (main)', () => {
  let dir;
  const run = () => execFileSync('node', [SCRIPT], { cwd: dir, encoding: 'utf8' });
  const writeTarget = (content) => {
    mkdirSync(join(dir, 'node_modules/@preact/preset-vite/dist/cjs'), { recursive: true });
    writeFileSync(join(dir, TARGET_REL), content);
  };

  beforeEach(() => { dir = mkdtempSync(join(tmpdir(), 'patch-deps-')); });
  afterEach(() => { rmSync(dir, { recursive: true, force: true }); });

  it('patches the target file in place when the pattern is present', () => {
    writeTarget(`prefix ${FROM} suffix`);
    const out = run();
    const patched = readFileSync(join(dir, TARGET_REL), 'utf8');
    expect(patched).toContain(TO);
    expect(patched).not.toContain(FROM);
    expect(out).toMatch(/patched/);
  });

  it('does nothing and reports when the file is already patched', () => {
    writeTarget(`already ${TO} patched`);
    const out = run();
    expect(readFileSync(join(dir, TARGET_REL), 'utf8')).toBe(`already ${TO} patched`);
    expect(out).toMatch(/already patched/);
  });

  it('exits cleanly when the target file is absent', () => {
    expect(() => run()).not.toThrow();
    expect(existsSync(join(dir, TARGET_REL))).toBe(false);
  });

  it('patches @mtcute/wasm so only the non-SIMD blob remains', () => {
    const WASM_REL = 'node_modules/@mtcute/wasm/index.js';
    mkdirSync(join(dir, 'node_modules/@mtcute/wasm'), { recursive: true });
    writeFileSync(join(dir, WASM_REL),
      'new URL("./mtcute-simd.wasm", import.meta.url); new URL("./mtcute.wasm", import.meta.url);');
    const out = run();
    const patched = readFileSync(join(dir, WASM_REL), 'utf8');
    expect(patched).not.toContain('mtcute-simd.wasm');
    expect(patched).toContain('./mtcute.wasm');
    expect(out).toMatch(/@mtcute\/wasm/);
  });
});
