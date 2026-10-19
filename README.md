# wePOS Website

Marketing site for wePOS, built with Vite + React (multi-page).

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static site in dist/
npm run preview    # serve dist/ locally
```

`dist/` uses relative paths, so it can be uploaded to any host or sub-folder.

## Structure

| Path | What it is |
| --- | --- |
| `*.html` (root) | One HTML entry per page: index, features, wepos-for-dokan, pricing, try-demo, about, blog, docs, faq |
| `src/pages/` | React entry for each page (home.jsx is index.html) |
| `src/components/` | Shared pieces: `icons.jsx`, `shell.jsx` (site header), `sections.jsx` (home sections), `dokan-footer.jsx` (footer + Resource mega menu) |
| `src/styles/` | `site.css` (shared tokens for inner pages) plus one stylesheet per page |
| `src/assets/` | Images, imported so Vite fingerprints them |
| `public/` | Files copied as-is (favicon) |

To add a page: create `name.html` at the root, `src/pages/name.jsx`, and add `"name"` to the `pages` list in `vite.config.js`.

## Notes

- Layouts are fixed-width desktop designs (home is 1440px; features is a 1920px canvas scaled to the window), carried over from the design prototype.
- GSAP drives the entrance and scroll animations on Pricing and Try Demo.
