// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';
import eslint from 'vite-plugin-eslint';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    eslint(),
    dts({
      tsconfigPath: './tsconfig.dts.json',
      entryRoot: 'lib',
      outDir: 'dist',
      rollupTypes: true
    })
  ],
  server: {
    watch: {
      include: ['src/**', 'lib/**']
    }
  },
  build: {
    lib: {
      entry: path.resolve(import.meta.dirname, 'lib/external-links.ts'),
      name: 'external-links',
      fileName: (format) => `external-links.${format}.js`
    },
  },
  test: {
    setupFiles: [path.resolve(import.meta.dirname, './test-setup.js')],
    coverage: {
      provider: 'v8',
    },
    reporters:['verbose']
  },
});
