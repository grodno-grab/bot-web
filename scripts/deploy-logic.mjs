import { gunzipSync } from 'node:zlib';

/** Extract the `generation` query parameter from a GCS URL, or null. */
export function parseGeneration(url) {
  if (!url) return null;
  const m = String(url).match(/[?&]generation=(\d+)/);
  return m ? m[1] : null;
}

/**
 * From all stored versions of an object, pick the ones to delete: everything
 * except the generations we want to keep (the new upload + current production).
 */
export function selectVersionsToDelete(versions, keepGenerations) {
  const keep = new Set(keepGenerations.filter(Boolean).map(String));
  return versions.filter((v) => !keep.has(String(v.metadata.generation)));
}

/**
 * Build a `multipart/related` request body for the GCS JSON upload API: a JSON
 * metadata part followed by the media part. Pure/synchronous so it can be tested.
 * Returns the body Buffer and the matching Content-Type header value.
 */
export function buildMultipartRelated({ metadata, media, mediaContentType, boundary }) {
  const head = Buffer.from(
    `--${boundary}\r\n` +
      'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
      `${JSON.stringify(metadata)}\r\n` +
      `--${boundary}\r\n` +
      `Content-Type: ${mediaContentType}\r\n\r\n`,
    'utf-8',
  );
  const tail = Buffer.from(`\r\n--${boundary}--\r\n`, 'utf-8');
  return {
    body: Buffer.concat([head, media, tail]),
    contentType: `multipart/related; boundary=${boundary}`,
  };
}

/** Parse a config.json buffer, transparently handling gzip-compressed content. */
export function parseConfig(rawBuffer) {
  try {
    return JSON.parse(rawBuffer.toString('utf-8'));
  } catch {
    return JSON.parse(gunzipSync(rawBuffer).toString('utf-8'));
  }
}

/**
 * Decide what to do with a `url` found in some version of config.json.
 *  - skip          — current production URL, the new URL, or empty
 *  - problem       — unusable URL (invalid, or a GCS URL with no generation)
 *  - deleteObject  — a GCS object in our bucket that should be removed
 *  - verify404     — an off-bucket / external URL that must already be gone
 */
export function classifyConfigUrl(url, { bucket, productionUrl, newUrl }) {
  if (!url || url === productionUrl || url === newUrl) return { action: 'skip' };

  let urlObj;
  try {
    urlObj = new URL(url);
  } catch {
    return { action: 'problem', kind: 'invalid' };
  }

  if (urlObj.hostname === 'storage.googleapis.com') {
    const parts = urlObj.pathname.slice(1).split('/');
    const urlBucket = parts[0];
    const urlObject = parts.slice(1).join('/');
    const generation = urlObj.searchParams.get('generation');

    if (!generation) return { action: 'problem', kind: 'no-generation' };
    if (urlBucket === bucket) return { action: 'deleteObject', object: urlObject, generation };
    return { action: 'verify404', url, kind: 'different-bucket' };
  }

  return { action: 'verify404', url, kind: 'external' };
}
