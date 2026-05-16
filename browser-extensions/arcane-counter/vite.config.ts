import { defineConfig } from 'vite';
import { resolve } from 'path';

/**
 * Expert Architect Note:
 * For browser extensions, we disable hashing because files are loaded locally from the 
 * extension package. Hashing is redundant since the browser updates the entire bundle.
 * We define multiple entry points: the popup (index.html) and the background service worker.
 */
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // The popup UI entry point
        popup: resolve(__dirname, 'index.html'),
        // The background script entry point
        background: resolve(__dirname, 'src/background.ts'),
      },
      output: {
        // Force clean, predictable filenames for the manifest to reference
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
    // Ensure the background.js is at the root of the dist folder for manifest compatibility
    emptyOutDir: true,
  },
});
