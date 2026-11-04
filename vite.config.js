import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" makes all asset paths relative, so the site works on GitHub Pages
// no matter what the repository is called (https://user.github.io/<repo>/).
export default defineConfig({
  base: "./",
  plugins: [react()],
});
