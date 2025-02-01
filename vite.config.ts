import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Base path for deployment
  plugins: [react()],      // Plugins for React support

  build: {
    outDir: 'build',        // Output directory for the build
  },
});