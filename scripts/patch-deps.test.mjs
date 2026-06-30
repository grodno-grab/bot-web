// @vitest-environment node
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyPatch } from './patch-deps.mjs';

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
});
