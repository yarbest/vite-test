import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@containers': path.resolve(__dirname, 'src/containers'),
    },
  },
  base: '/vite-test', // adds to the url: http://localhost:5173/vite-test
  // build: {
  //   outDir: 'public',
  // },
});
