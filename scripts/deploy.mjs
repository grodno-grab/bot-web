import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { Storage } from '@google-cloud/storage';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local', override: true });

const required = ['GCS_BUCKET', 'GCS_OBJECT', 'GCS_CREDENTIALS'];
const missing = required.filter(k => !process.env[k]);
if (missing.length > 0) {
  console.error(`Missing required environment variables: ${missing.join(', ')}`);
  process.exit(1);
}

const { GCS_BUCKET, GCS_OBJECT, SKIP_BUILD } = process.env;

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
const url = `https://storage.googleapis.com/${GCS_BUCKET}/${GCS_OBJECT}?generation=${metadata.generation}`;
console.log(`\nDeployed: ${url}`);
