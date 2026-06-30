import { defineConfig, Plugin } from 'vite';
import preact from '@preact/preset-vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function workerFakeIdbPlugin(): Plugin {
  const VIRTUAL_ID = 'virtual:worker-idb-code';
  const RESOLVED_ID = '\0' + VIRTUAL_ID;
  let workerCode = '';

  return {
    name: 'worker-fake-idb',
    enforce: 'pre',
    async buildStart() {
      const esbuild = await import('esbuild');
      const result = await esbuild.build({
        entryPoints: [path.resolve(__dirname, 'src/worker-idb-setup.ts')],
        bundle: true,
        format: 'iife',
        write: false,
        platform: 'browser',
        minify: true,
        target: 'es2017',
      });
      workerCode = result.outputFiles[0].text;
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    load(id) {
      if (id === RESOLVED_ID)
        return `export const WORKER_IDB_CODE = ${JSON.stringify(workerCode)};`;
    },
  };
}

function inlineTdwebPlugin(): Plugin {
  return {
    name: 'inline-tdweb',
    enforce: 'pre',
    transformIndexHtml(html) {
      // E2E runs serve a fake tdweb via request interception, so the real
      // bundle must NOT be inlined into index.html.
      if (process.env.E2E_FAKE_TDWEB === '1') {
        return html;
      }

      const filePath = path.resolve(__dirname, 'public/tdweb.inlined.js');

      if (!fs.existsSync(filePath)) {
        return html;
      }
      
      const content = fs.readFileSync(filePath, 'utf-8');
      
      const scriptTagRegex = /<script\s+src=["']\.?\/tdweb\.inlined\.js["']><\/script>/i;

      if (!scriptTagRegex.test(html)) {
        return html;
      }
      
      return html.replace(scriptTagRegex, `<script>${content}</script>`);
    }
  };
}

export default defineConfig({
  plugins: [
    workerFakeIdbPlugin(),
    inlineTdwebPlugin(),
    preact(),
    viteSingleFile()
  ],
  build: {
    target: 'es2017',
    sourcemap: false,
  },
});