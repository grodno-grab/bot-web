import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { brotliCompressSync, constants as zlibConstants } from 'node:zlib';
import { JWT } from 'google-auth-library';
import dotenv from 'dotenv';
import {
  parseGeneration,
  selectVersionsToDelete,
  parseConfig,
  classifyConfigUrl,
  buildMultipartRelated,
} from './deploy-logic.mjs';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local', override: true });

const required = ['GCS_BUCKET', 'GCS_OBJECT', 'GCS_CREDENTIALS'];
const missing = required.filter(k => !process.env[k]);
if (missing.length > 0) {
  console.error(`Missing required environment variables: ${missing.join(', ')}`);
  process.exit(1);
}

const { GCS_BUCKET, GCS_OBJECT, SKIP_BUILD } = process.env;

const configJsonUrl = `https://storage.googleapis.com/${GCS_BUCKET}/config.json`;
let productionUrl = null;
try {
  const resp = await fetch(configJsonUrl);
  if (resp.ok) {
    const config = await resp.json();
    productionUrl = config.url ?? null;
    if (productionUrl) console.log(`Production URL from config.json: ${productionUrl}`);
  }
} catch (e) {
  console.log(`config.json not found or error: ${e.message}`);
}

if (SKIP_BUILD !== '1') {
  console.log('Building...');
  execSync('npx vite build', { stdio: 'inherit' });
}

console.log('Compressing dist/index.html...');
const compressed = brotliCompressSync(readFileSync('dist/index.html'), {
  params: { [zlibConstants.BROTLI_PARAM_QUALITY]: 11 },
});
console.log(`Compressed: ${(compressed.length / 1024).toFixed(1)} KB`);

// Mint an OAuth token with google-auth-library and talk to the GCS JSON API directly
// over Node's native fetch. We deliberately do NOT use @google-cloud/storage: its 7.x
// line is written against gaxios 6 / google-auth 9 and breaks when handed a google-auth 10
// (gaxios 7) auth client, and no storage major supports auth 10 yet. Talking to the REST
// API ourselves keeps us on the newest auth stack — whose gaxios 7 defaults to native fetch,
// which also side-steps the old node-fetch token flake (ERR_STREAM_PREMATURE_CLOSE).
const creds = JSON.parse(process.env.GCS_CREDENTIALS);
const authClient = new JWT({
  email: creds.client_email,
  key: creds.private_key,
  scopes: ['https://www.googleapis.com/auth/devstorage.full_control'],
});
const { token } = await authClient.getAccessToken();
if (!token) throw new Error('Failed to obtain a GCS access token');
const authHeader = { Authorization: `Bearer ${token}` };

const GCS_API = 'https://storage.googleapis.com/storage/v1';
const GCS_UPLOAD = 'https://storage.googleapis.com/upload/storage/v1';

/** List every stored version of the objects under `prefix` (auto-paginating). */
async function listVersions(prefix) {
  const items = [];
  let pageToken;
  do {
    const url = new URL(`${GCS_API}/b/${GCS_BUCKET}/o`);
    url.searchParams.set('prefix', prefix);
    url.searchParams.set('versions', 'true');
    if (pageToken) url.searchParams.set('pageToken', pageToken);
    const resp = await fetch(url, { headers: authHeader });
    if (!resp.ok) throw new Error(`List ${prefix} failed: ${resp.status} ${await resp.text()}`);
    const data = await resp.json();
    for (const it of data.items ?? []) items.push({ name: it.name, metadata: { generation: it.generation } });
    pageToken = data.nextPageToken;
  } while (pageToken);
  return items;
}

/** Delete a specific generation of an object. Returns the HTTP status (404 = already gone). */
async function deleteObject(object, generation) {
  const url = new URL(`${GCS_API}/b/${GCS_BUCKET}/o/${encodeURIComponent(object)}`);
  url.searchParams.set('generation', String(generation));
  const resp = await fetch(url, { method: 'DELETE', headers: authHeader });
  if (!resp.ok && resp.status !== 404) {
    throw new Error(`Delete ${object}#${generation} failed: ${resp.status} ${await resp.text()}`);
  }
  return resp.status;
}

/** Download the raw bytes of a specific generation of an object. */
async function downloadObject(object, generation) {
  const url = new URL(`${GCS_API}/b/${GCS_BUCKET}/o/${encodeURIComponent(object)}`);
  url.searchParams.set('alt', 'media');
  url.searchParams.set('generation', String(generation));
  const resp = await fetch(url, { headers: authHeader });
  if (!resp.ok) throw new Error(`Download ${object}#${generation} failed: ${resp.status}`);
  return Buffer.from(await resp.arrayBuffer());
}

console.log(`Uploading to gs://${GCS_BUCKET}/${GCS_OBJECT}...`);
// The payload is tiny (~180 KB), so a single simple (non-resumable) multipart upload beats
// a three-request resumable session.
const { body: uploadBody, contentType: uploadContentType } = buildMultipartRelated({
  metadata: {
    name: GCS_OBJECT,
    contentType: 'text/html; charset=utf-8',
    contentEncoding: 'br',
    cacheControl: 'no-store, no-cache, must-revalidate, max-age=0',
  },
  media: compressed,
  mediaContentType: 'text/html; charset=utf-8',
  boundary: `boundary_${Date.now()}`,
});
const uploadUrl = new URL(`${GCS_UPLOAD}/b/${GCS_BUCKET}/o`);
uploadUrl.searchParams.set('uploadType', 'multipart');
const uploadResp = await fetch(uploadUrl, {
  method: 'POST',
  headers: { ...authHeader, 'Content-Type': uploadContentType },
  body: uploadBody,
});
if (!uploadResp.ok) throw new Error(`Upload failed: ${uploadResp.status} ${await uploadResp.text()}`);
const uploaded = await uploadResp.json();
const newGeneration = String(uploaded.generation);
const newUrl = `https://storage.googleapis.com/${GCS_BUCKET}/${GCS_OBJECT}?generation=${newGeneration}`;

const productionGeneration = parseGeneration(productionUrl);

const allVersions = await listVersions(GCS_OBJECT);
const versionsOfObject = allVersions.filter(f => f.name === GCS_OBJECT);
for (const v of selectVersionsToDelete(versionsOfObject, [newGeneration, productionGeneration])) {
  await deleteObject(GCS_OBJECT, v.metadata.generation);
  console.log(`Deleted old version: generation ${v.metadata.generation}`);
}

const remaining = await listVersions(GCS_OBJECT);
console.log(`Remaining versions: ${remaining.filter(f => f.name === GCS_OBJECT).length}`);

// Check all config.json versions for stale URLs
const configVersions = await listVersions('config.json');
const allConfigVersions = configVersions.filter(f => f.name === 'config.json');
console.log(`\nChecking ${allConfigVersions.length} config.json version(s) for stale URLs...`);

const problemUrls = [];
for (const configVersion of allConfigVersions) {
  const generation = configVersion.metadata.generation;
  const configUrl = `https://storage.googleapis.com/${GCS_BUCKET}/config.json?generation=${generation}`;
  const rawContent = await downloadObject('config.json', generation);
  let config;
  try {
    config = parseConfig(rawContent);
  } catch (e) {
    console.log(`Could not parse config.json generation ${generation}: ${e.message}`);
    continue;
  }

  const url = config.url;
  const decision = classifyConfigUrl(url, { bucket: GCS_BUCKET, productionUrl, newUrl });

  if (decision.action === 'skip') continue;

  if (decision.action === 'problem') {
    problemUrls.push(
      decision.kind === 'invalid'
        ? `Invalid URL in config.json: ${url} (Config URL: ${configUrl})`
        : `No generation parameter in URL: ${url} (Config URL: ${configUrl})`,
    );
    continue;
  }

  if (decision.action === 'deleteObject') {
    const status = await deleteObject(decision.object, decision.generation);
    console.log(status === 404 ? `Already gone: ${url}` : `Deleted stale object: ${url}`);
    continue;
  }

  // decision.action === 'verify404'
  const resp = await fetch(url);
  if (resp.status !== 404) {
    problemUrls.push(`${url} (Config URL: ${configUrl})`);
  } else {
    console.log(`Verified 404 (${decision.kind}): ${url}`);
  }
}

if (problemUrls.length > 0) {
  console.error('\nThe following URLs are still accessible and must be removed manually:');
  for (const u of problemUrls) console.error(`  ${u}`);
  process.exit(1);
}

if (productionUrl) {
  console.log(`\nCurrently on production: ${productionUrl}`);
}
console.log(`Release candidate: ${newUrl}`);
