import dts from 'vite-plugin-dts';
import path from 'path';
import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vite';

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
  test: {
    environment: 'happy-dom',
    setupFiles: [path.resolve(import.meta.dirname, './test-setup.js')],
    reporters: ['verbose'],
    coverage: {
      provider: 'v8',
      include: ['lib/']
    }
  },
  build: {
    lib: {
      entry: path.resolve(import.meta.dirname, 'lib/external-links.ts'),
      name: 'external-links',
      fileName: (format) => `external-links.${format}.js`
    },
  }
});
