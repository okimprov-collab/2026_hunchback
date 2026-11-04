import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'spa-Static-routes',
      closeBundle() {
        const outDir = resolve(__dirname, 'dist');
        const indexHtml = resolve(outDir, 'index.html');
        if (existsSync(indexHtml)) {
          copyFileSync(indexHtml, resolve(outDir, 'feedback.html'));
          copyFileSync(indexHtml, resolve(outDir, '404.html'));
        }
      },
    },
  ],
  // Relative base path ensures assets load properly on any GitHub Pages sub-repository path
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'lucide-react'],
        },
      },
    },
  },
});
