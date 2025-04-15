import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Set the base path if you're hosting at the root (adjust if deploying to a subdirectory)
  build: {
    outDir: 'dist', // Ensure that the build output goes to the 'dist' directory
  },
  server: {
    open: true, // Automatically open the app in the browser when the dev server starts
  },
});

