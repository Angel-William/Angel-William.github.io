import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/My-Website/', // Base path for deployment
  plugins: [react()],      // Plugins for React support

  build: {
    outDir: 'build',   
    rollupOptions: {
      output: {
        format: 'es', // Ensure the output format is ES module
      },
    },
  },
});
