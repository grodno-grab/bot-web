// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { gzipSync } from 'node:zlib';
import {
  parseGeneration,
  selectVersionsToDelete,
  parseConfig,
  classifyConfigUrl,
  buildMultipartRelated,
} from './deploy-logic.mjs';

const GCS = 'https://storage.googleapis.com';

describe('parseGeneration', () => {
  it('extracts the generation query parameter', () => {
    expect(parseGeneration(`${GCS}/b/o?generation=12345`)).toBe('12345');
    expect(parseGeneration(`${GCS}/b/o?foo=1&generation=678`)).toBe('678');
  });

  it('returns null when absent or empty', () => {
    expect(parseGeneration(`${GCS}/b/o`)).toBeNull();
    expect(parseGeneration(null)).toBeNull();
    expect(parseGeneration(undefined)).toBeNull();
  });
});

describe('selectVersionsToDelete', () => {
  const v = (generation) => ({ metadata: { generation } });

  it('keeps only the new and production generations', () => {
    const versions = [v('1'), v('2'), v('3'), v('4')];
    const toDelete = selectVersionsToDelete(versions, ['4', '2']);
    expect(toDelete.map((x) => x.metadata.generation)).toEqual(['1', '3']);
  });

  it('handles a null production generation (keeps only the new one)', () => {
    const versions = [v('1'), v('2')];
    expect(selectVersionsToDelete(versions, ['2', null]).map((x) => x.metadata.generation)).toEqual(['1']);
  });

  it('compares generations regardless of string/number type', () => {
    const versions = [v(1), v(2)];
    expect(selectVersionsToDelete(versions, ['1']).map((x) => x.metadata.generation)).toEqual([2]);
  });
});

describe('buildMultipartRelated', () => {
  it('frames the JSON metadata and media parts with the boundary', () => {
    const media = Buffer.from([0x01, 0x02, 0x03]);
    const { body, contentType } = buildMultipartRelated({
      metadata: { name: 'index.html', contentEncoding: 'br' },
      media,
      mediaContentType: 'text/html; charset=utf-8',
      boundary: 'B',
    });
    expect(contentType).toBe('multipart/related; boundary=B');
    const text = body.toString('latin1');
    expect(text).toContain(
      '--B\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n{"name":"index.html","contentEncoding":"br"}',
    );
    expect(text).toContain('--B\r\nContent-Type: text/html; charset=utf-8\r\n\r\n');
    expect(text.endsWith('\r\n--B--\r\n')).toBe(true);
    // media bytes survive verbatim
    expect(body.includes(media)).toBe(true);
  });
});

describe('parseConfig', () => {
  it('parses a plain JSON buffer', () => {
    const buf = Buffer.from(JSON.stringify({ url: 'x' }), 'utf-8');
    expect(parseConfig(buf)).toEqual({ url: 'x' });
  });

  it('parses a gzip-compressed JSON buffer', () => {
    const buf = gzipSync(Buffer.from(JSON.stringify({ url: 'y' }), 'utf-8'));
    expect(parseConfig(buf)).toEqual({ url: 'y' });
  });

  it('throws on content that is neither JSON nor gzip', () => {
    expect(() => parseConfig(Buffer.from('not json', 'utf-8'))).toThrow();
  });
});

describe('classifyConfigUrl', () => {
  const ctx = { bucket: 'mybucket', productionUrl: `${GCS}/mybucket/app?generation=100`, newUrl: `${GCS}/mybucket/app?generation=200` };

  it('skips empty, production and new URLs', () => {
    expect(classifyConfigUrl('', ctx).action).toBe('skip');
    expect(classifyConfigUrl(ctx.productionUrl, ctx).action).toBe('skip');
    expect(classifyConfigUrl(ctx.newUrl, ctx).action).toBe('skip');
  });

  it('flags a syntactically invalid URL', () => {
    expect(classifyConfigUrl('http://[bad', ctx)).toEqual({ action: 'problem', kind: 'invalid' });
  });

  it('deletes a stale object in our own bucket', () => {
    const url = `${GCS}/mybucket/app?generation=50`;
    expect(classifyConfigUrl(url, ctx)).toEqual({ action: 'deleteObject', object: 'app', generation: '50' });
  });

  it('flags a GCS URL with no generation', () => {
    expect(classifyConfigUrl(`${GCS}/mybucket/app`, ctx)).toEqual({ action: 'problem', kind: 'no-generation' });
  });

  it('requires a different-bucket GCS URL to be already gone (404)', () => {
    const url = `${GCS}/otherbucket/app?generation=50`;
    expect(classifyConfigUrl(url, ctx)).toMatchObject({ action: 'verify404', kind: 'different-bucket' });
  });

  it('requires an external URL to be already gone (404)', () => {
    const url = 'https://example.com/app.html';
    expect(classifyConfigUrl(url, ctx)).toMatchObject({ action: 'verify404', kind: 'external' });
  });
});
