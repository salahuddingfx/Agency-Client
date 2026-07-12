import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // No sourcemaps in production output
    sourcemap: false,

    // Suppress the 500kB chunk warning for known large vendor chunks
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        // Manually split large vendor libraries into their own cached chunks
        // so they are not re-downloaded on every deploy
        manualChunks: (id) => {
          // Three.js ecosystem (large 3D graphics library)
          if (id.includes('node_modules/three') || id.includes('@react-three')) {
            return 'vendor-three';
          }
          // Framer Motion animation library
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-framer';
          }
          // GSAP animation library
          if (id.includes('node_modules/gsap')) {
            return 'vendor-gsap';
          }
          // React core + React DOM
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          // React Router
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router';
          }
          // Lucide icons
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-lucide';
          }
          // TanStack Query
          if (id.includes('node_modules/@tanstack')) {
            return 'vendor-query';
          }
        },
      },
    },
  },
});
