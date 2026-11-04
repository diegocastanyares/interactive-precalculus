# Interactive Precalculus

Interactive explanations of precalculus concepts (based on
[OpenStax Precalculus 2e](https://openstax.org/details/books/precalculus-2e), CC BY 4.0),
each connected to finance, probability/decisions, interfaces or AI.

Built with React + Vite + [Mafs](https://mafs.dev). No backend.

## Run locally

```bash
npm install
npm run dev
```

## Add a concept

1. Copy an existing file in `src/concepts/` and edit it.
2. Import it in `src/chapters.js` and add one entry to a chapter.

## Deploy

Push to `main`. In the repository go to Settings > Pages > Source: **GitHub Actions**.
