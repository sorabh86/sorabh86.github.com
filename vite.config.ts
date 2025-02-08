// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import fs from "fs";
import path from "path";
import ReactDOMServer from "react-dom/server";
import React from "react";
import App from "./src/App";
import { StaticRouter } from "react-router";


// https://vite.dev/config/
export default defineConfig({
  plugins: [
  	react(), 
	  // tailwindcss(),
    { 
      name:"preredner-defaultpage", 
      // closeBundle:renderDefaultPageHtml
	  }
  ],
  base: '/',
  assetsInclude: ['**/*'],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name][extname]'
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Optional: Add path aliases
    },
  },
  css: {
    postcss: './postcss.config.js', // Point to your PostCSS config
  },
})

async function renderDefaultPageHtml() {
  console.log("===================== Running Pre-rendering ==================");

  // Wrap the App component with StaticRouter for SSR
  const reactElement = React.createElement(
    StaticRouter,
    { location: "/" }, // Set the location for the router
    React.createElement(App)
  );

  // Render the React element to an HTML string
  const html = ReactDOMServer.renderToString(reactElement);

  // Read the generated index.html file
  const indexHtmlPath = path.resolve(__dirname, "dist", "index.html");
  let indexHtml = fs.readFileSync(indexHtmlPath, "utf8");

  // console.log(html);
  // console.log(indexHtmlPath);

  // Inject the pre-rendered HTML into the <div id="app">
  indexHtml = indexHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`
  );
  // console.log(indexHtml);

  // Write the updated index.html file
  fs.writeFileSync(indexHtmlPath, indexHtml);

  console.log( "===================== Pre-rendering Completed ==================" );
}
