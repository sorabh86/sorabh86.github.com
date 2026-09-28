import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
// import {renderDefaultPageHtml} from "./renderDefaultPage";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'prerender-plugin', // Name of the plugin
      async closeBundle() {
        // await renderDefaultPageHtml(); // Run the pre-rendering function
      },
    },
  ],
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, './src/'), // Optional: Add alias for src directory
  //   },
  // },
  // Add this to handle static assets
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.jpeg', '**/*.gif', '**/*.svg'],
  build: {
    outDir: 'dist', // Ensure the output directory is set
    rollupOptions: {
      output: {
        // manualChunks: undefined, // Optional: Customize chunking behavior
        // entryFileNames: 'js/[name].js',
        // chunkFileNames: 'js/[name].js',
        // assetFileNames: '[name][extname]',
        entryFileNames: `js/sorabh86${Math.random().toString(36).substring(2, 10)}.js`,
        chunkFileNames: `js/sorabh86${Math.random().toString(36).substring(2, 10)}.js`,
        assetFileNames: `sorabh86${Math.random().toString(36).substring(2, 10)}[extname]`,
        manualChunks(id) {
          const moduleId = id.replaceAll('\\', '/');

          if (!moduleId.includes('/node_modules/')) return;

          if (moduleId.includes('/@firebase/') || moduleId.includes('/node_modules/firebase/')) {
            return 'firebase-vendor';
          }
          if (/\/node_modules\/(react|react-dom|scheduler)\//.test(moduleId)) {
            return 'react-vendor';
          }
          if (/\/node_modules\/(react-router|react-router-dom|@remix-run)\//.test(moduleId)) {
            return 'router-vendor';
          }
          if (moduleId.includes('/node_modules/framer-motion/')) return 'motion-vendor';
          if (moduleId.includes('/node_modules/@fortawesome/')) return 'icons-vendor';
          if (moduleId.includes('/node_modules/@headlessui/')) return 'headlessui-vendor';
          if (/\/node_modules\/(zustand|immer)\//.test(moduleId)) return 'state-vendor';

          return 'vendor';
        }
      },
    },
  },
})
