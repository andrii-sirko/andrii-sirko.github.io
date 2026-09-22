# andrii-sirko.github.io

Personal portfolio. Static single page, no build step, no framework, no runtime
dependencies.

**Live:** https://andrii-sirko.github.io/

## Run it locally

ES modules need a real origin, so opening `index.html` from the filesystem won't
work.

```bash
python3 -m http.server 4321
```

The Cloudflare analytics beacon fails with a CORS error on localhost. That's
expected and harmless.

## Update the CV

Everything career-related lives in [`assets/js/data.js`](assets/js/data.js):

| Export | |
|---|---|
| `OUTCOMES` | The six headline results on the outcomes board |
| `PRACTICE` | The freelance practice since 2019 and its clients (no per-client dates) |
| `EMPLOYMENT` | Earlier full-time roles, newest first |
| `SKILL_GROUPS`, `SKILL_ALIASES` | The stack chips that filter the experience rows |

Edit there, then regenerate:

```bash
node tools/build-seo.mjs
```

This writes the outcomes board and experience section into `index.html` as
static HTML, plus the JSON-LD graph, `llms.txt`, `cv.md` and `sitemap.xml`, so
crawlers that don't run JavaScript still see everything. Skipping it leaves the
page itself stale, not just the crawlable copies.

To verify nothing is stale before committing:

```bash
node tools/build-seo.mjs --check
```

Hand-written copy (hero, about, the Live demo section, contact) lives directly
in `index.html`. See [`CLAUDE.md`](CLAUDE.md) for the full field reference and
design rules.

## OG card

`assets/img/og.png` is rendered from `assets/img/og.svg` with vendored fonts.
Re-render only when the name, title, location or headline numbers change:

```bash
npm install --no-save @resvg/resvg-js
```

```bash
node tools/build-og.mjs
```

## Deploy

GitHub Pages serves the `main` branch from the repository root (Deploy from a
branch → `main` / `/ (root)`). Push and it's live; there's no Actions workflow.

## What's in here

| Path | |
|---|---|
| `index.html` | Markup, hand-written copy, and the generated sections between `<!-- seo:* -->` markers |
| `assets/js/data.js` | Outcomes, practice, employment and stack data — the single source of truth |
| `assets/js/main.js` | Stack filter, derived readouts ("years shipping/freelance"), scroll effects |
| `assets/css/styles.css` | Design tokens and all styling |
| `assets/img/` | Favicon, OG card source (`og.svg`) and render (`og.png`) |
| `tools/build-seo.mjs` | Generates the static sections, JSON-LD, `llms.txt`, `cv.md`, `sitemap.xml` |
| `tools/build-og.mjs`, `tools/fonts/` | Renders the OG card |
| `llms.txt`, `cv.md` | Plain-text routes for LLMs and answer engines |
| `robots.txt` | Hand-written; explicitly allows AI crawlers |
| `CLAUDE.md`, `AGENTS.md` | Instructions for coding agents (identical copies) |
