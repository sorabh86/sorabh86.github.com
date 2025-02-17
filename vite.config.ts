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
        // entryFileNames: '[name].js',
        // chunkFileNames: '[name].js',
        // assetFileNames: '[name][extname]'
        entryFileNames: `sorabh86${Math.random().toString(36).substring(2, 10)}.js`,
        chunkFileNames: `sorabh86${Math.random().toString(36).substring(2, 10)}.js`,
        assetFileNames: `sorabh86${Math.random().toString(36).substring(2, 10)}[extname]`
      },
    },
  },
})
