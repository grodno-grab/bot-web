import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// viteSingleFile inlines the whole app (including the mtcute client) into one
// self-contained dist/index.html.
export default defineConfig({
  plugins: [preact(), viteSingleFile()],
  build: {
    target: 'es2017',
    sourcemap: false,
  },
});
