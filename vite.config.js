// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';
import eslint from 'vite-plugin-eslint';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    eslint(),
    dts({
      insertTypesEntry: true,
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/external-links.ts'),
      name: 'external-links',
      fileName: (format) => `external-links.${format}.js`
    },
  },
  test: {
    setupFiles: [path.resolve(__dirname, './test-setup.js')],
    coverage: {
      provider: 'v8',
    },
    reporters:['verbose']
  },
});
