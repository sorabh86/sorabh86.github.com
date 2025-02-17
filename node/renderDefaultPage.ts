import fs from "fs";
import ReactDOMServer from "react-dom/server";
import React from "react";
import App from "../src/App.js"; // Ensure this path is correct
import { StaticRouter } from "react-router-dom";
import path from "path";
import { fileURLToPath } from "url";

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function renderDefaultPageHtml() {
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

  // Inject the pre-rendered HTML into the <div id="root">
  indexHtml = indexHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`
  );

  // Write the updated index.html file
  fs.writeFileSync(indexHtmlPath, indexHtml);

  console.log("===================== Pre-rendering Completed ==================");
}

// Execute the function
renderDefaultPageHtml();