import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { Storage } from '@google-cloud/storage';
import dotenv from 'dotenv';
import {
  parseGeneration,
  selectVersionsToDelete,
  parseConfig,
  classifyConfigUrl,
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
const compressed = gzipSync(readFileSync('dist/index.html'), { level: 9 });
console.log(`Compressed: ${(compressed.length / 1024).toFixed(1)} KB`);

const creds = JSON.parse(process.env.GCS_CREDENTIALS);
const storage = new Storage({ credentials: creds, projectId: creds.project_id });

console.log(`Uploading to gs://${GCS_BUCKET}/${GCS_OBJECT}...`);
const file = storage.bucket(GCS_BUCKET).file(GCS_OBJECT);
await file.save(compressed, {
  metadata: {
    contentType: 'text/html; charset=utf-8',
    contentEncoding: 'gzip',
    cacheControl: 'no-store, no-cache, must-revalidate, max-age=0',
  },
});

const [metadata] = await file.getMetadata();
const newGeneration = String(metadata.generation);
const newUrl = `https://storage.googleapis.com/${GCS_BUCKET}/${GCS_OBJECT}?generation=${newGeneration}`;

const productionGeneration = parseGeneration(productionUrl);

const [allVersions] = await storage.bucket(GCS_BUCKET).getFiles({ prefix: GCS_OBJECT, versions: true });
const versionsOfObject = allVersions.filter(f => f.name === GCS_OBJECT);
for (const v of selectVersionsToDelete(versionsOfObject, [newGeneration, productionGeneration])) {
  await v.delete();
  console.log(`Deleted old version: generation ${v.metadata.generation}`);
}

const [remaining] = await storage.bucket(GCS_BUCKET).getFiles({ prefix: GCS_OBJECT, versions: true });
console.log(`Remaining versions: ${remaining.filter(f => f.name === GCS_OBJECT).length}`);

// Check all config.json versions for stale URLs
const [configVersions] = await storage.bucket(GCS_BUCKET).getFiles({ prefix: 'config.json', versions: true });
const allConfigVersions = configVersions.filter(f => f.name === 'config.json');
console.log(`\nChecking ${allConfigVersions.length} config.json version(s) for stale URLs...`);

const problemUrls = [];
for (const configVersion of allConfigVersions) {
  const configUrl = `https://storage.googleapis.com/${GCS_BUCKET}/config.json?generation=${configVersion.metadata.generation}`;
  const [rawContent] = await configVersion.download();
  let config;
  try {
    config = parseConfig(rawContent);
  } catch (e) {
    console.log(`Could not parse config.json generation ${configVersion.metadata.generation}: ${e.message}`);
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
    try {
      await storage.bucket(GCS_BUCKET).file(decision.object, { generation: decision.generation }).delete();
      console.log(`Deleted stale object: ${url}`);
    } catch (e) {
      if (e.code === 404) {
        console.log(`Already gone: ${url}`);
      } else {
        throw e;
      }
    }
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
