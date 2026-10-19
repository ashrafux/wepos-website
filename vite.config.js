import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// One HTML entry per page; each loads its own React entry from src/pages/.
const pages = ["index", "features", "pricing", "try-demo", "about", "blog", "docs", "faq", "wepos-for-dokan"];

export default defineConfig({
  // Relative base so the built site works from any folder or sub-path.
  base: "./",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((p) => [p, resolve(import.meta.dirname, `${p}.html`)])),
    },
  },
});
