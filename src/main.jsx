import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";

// Styles for Mafs (graphs) and KaTeX (formulas), then our own styles.
import "mafs/core.css";
import "mafs/font.css";
import "katex/dist/katex.min.css";
import "./styles.css";

// HashRouter keeps the page in the URL after "#" (e.g. /#/concept/compound-interest).
// This works on GitHub Pages without any server configuration.
createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />
  </HashRouter>
);
