import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Plugin } from 'vite';
import { defineConfig } from 'vitest/config';

const ICON_SIZES = [16, 32, 48, 128];

// The icons live in brand/ (single source of truth); emit them into dist/icons.
function brandIcons(): Plugin {
  return {
    name: 'babelbee-brand-icons',
    generateBundle() {
      for (const size of ICON_SIZES) {
        this.emitFile({
          type: 'asset',
          fileName: `icons/icon-${size}.png`,
          source: readFileSync(resolve(__dirname, `brand/icon-${size}.png`)),
        });
      }
    },
  };
}

export default defineConfig({
  root: 'src',
  base: './',
  publicDir: resolve(__dirname, 'public'),
  plugins: [brandIcons()],
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        sidepanel: resolve(__dirname, 'src/sidepanel/index.html'),
        options: resolve(__dirname, 'src/options/index.html'),
        background: resolve(__dirname, 'src/background/index.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  test: {
    root: __dirname,
    include: ['src/**/*.test.ts'],
  },
});
