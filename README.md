# andrii-sirko.github.io

Personal portfolio. Static site, no build step, no framework, no dependencies.

**Live:** https://andrii-sirko.github.io/

## Run it locally

ES modules need a real origin, so opening `index.html` from the filesystem won't
work.

```bash
python3 -m http.server 4321
```

## Update your CV

Everything career-related lives in [`assets/js/data.js`](assets/js/data.js):
`OUTCOMES` (headline results), `PRACTICE` (the freelance practice and its
clients) and `EMPLOYMENT` (earlier full-time roles). Edit there, then:

```bash
node tools/build-seo.mjs
```

That regenerates the outcomes and experience markup in `index.html`, the JSON-LD,
`llms.txt` and `cv.md` so
crawlers that don't run JavaScript still see everything. See
[`CLAUDE.md`](CLAUDE.md) for the full field reference.

To verify nothing is stale before committing:

```bash
node tools/build-seo.mjs --check
```

## Deploy

GitHub Pages serves `main` from the repository root. Push and it's live.

Settings → Pages → Source: **Deploy from a branch** → `main` / `/ (root)`.

## What's in here

| Path | |
|---|---|
| `index.html` | Markup and hand-written copy |
| `assets/js/data.js` | Outcomes, practice and employment data — the single source of truth |
| `assets/js/main.js` | Stack filter, derived readouts, scroll effects |
| `assets/css/styles.css` | Design tokens and all styling |
| `tools/build-seo.mjs` | Generates the crawlable copies of the data |
| `llms.txt`, `cv.md` | Plain-text routes for LLMs and answer engines |
| `robots.txt` | Explicitly allows AI crawlers |
