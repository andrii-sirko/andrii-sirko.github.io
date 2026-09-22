# Portfolio — andrii-sirko.github.io

Static single-page portfolio for Andrii Sirko. No build step, no framework, no
dependencies. Three source files do all the work.

```
index.html                 markup + static copy (work, about, contact)
assets/js/data.js          ← THE DATA. Edit this for anything career-related.
assets/js/main.js          rendering + interaction
assets/css/styles.css      design tokens + all styling
tools/build-seo.mjs        regenerates the crawlable copies of data.js
```

## The one rule

**Career facts live in `assets/js/data.js`. Nothing else.**

The site mirrors the CV: **one freelance practice since 2019**, presented as a
single continuous line, with clients and outcomes underneath it — not a timeline
of short projects. Do not reintroduce per-client dates, a Gantt/ledger chart, or
an "N engagements" counter; HR reads those as job-hopping.

`data.js` exports:

| Export | What it is |
|---|---|
| `OUTCOMES` | The six headline results on the outcomes board (`#outcomes`) |
| `PRACTICE` | The freelance practice: title, `start`/`end`, and its `clients` (**no dates on clients**) |
| `EMPLOYMENT` | Full-time roles before the practice, newest first, with dates |
| `ROLES` | `PRACTICE.clients` + `EMPLOYMENT` — what the stack chips match against |
| `SKILL_GROUPS`, `SKILL_ALIASES` | The stack chips |

The outcomes board and the whole experience section in `index.html` are
**generated as static HTML** from these by `tools/build-seo.mjs`, along with the
JSON-LD graph, `llms.txt` and `cv.md`. `main.js` renders none of it — it only
adds the stack chips/filter, the derived readouts ("12 years shipping",
"7 years freelance") and scroll effects.

## Adding a client

**1. Add an object to `PRACTICE.clients`** in `assets/js/data.js`. Order is by
weight (strongest first), not chronology.

```js
{
  id: 'acme',                    // unique slug, lowercase, no spaces
  company: 'Acme GmbH',
  tagline: 'Fintech, 2M+ MAU',   // what the company/product is, plus scale
  role: 'Frontend Lead',
  site: 'acme.com',              // display text for the link, or null
  url: 'https://acme.com',       // href, or null
  bullets: [
    'What changed because of the work, with a number in it where one exists.'
  ],
  stack: ['React', 'TypeScript'] // exact tool names, see matching rules below
}
```

Write bullets as outcomes (before → after, a metric, who benefited), not as
task lists. If the result is headline-worthy, also add a card to `OUTCOMES`
(`metric`, `title`, `body`, `client`, `role`, `tags`) — keep the board at six;
swap the weakest out rather than growing it.

A full-time role goes into `EMPLOYMENT` instead, with the extra fields `kind`,
`place`, `start` and `end` (`"YYYY-MM"`).

**2. Run the generator:**

```bash
node tools/build-seo.mjs
```

### Never skip step 2

The outcomes and experience markup only exists in `index.html` because the
generator wrote it there — skip it and the page itself is stale, not just the
crawlable copies. Most AI crawlers — GPTBot, ClaudeBot, CCBot, PerplexityBot —
do not execute JavaScript, which is why this content is static HTML and plain
text rather than rendered by `main.js`.

`node tools/build-seo.mjs --check` exits non-zero when the generated files are
out of date, which makes it usable as a pre-commit or CI check.

### If the practice ends

Set `PRACTICE.end` to the last month, then re-run the generator. `end: null`
means "Present".

## Editing the stack section

`SKILL_GROUPS` in `data.js` defines the chips. A chip matches a role (client or
employer) when the chip's name equals one of its `stack` entries,
case-insensitively. Picking a chip highlights the matching rows under
Experience in `--depth` blue and dims the rest.

If a chip should match entries that are spelled differently per role, add
it to `SKILL_ALIASES`:

```js
'CI/CD': ['GitLab CI', 'CircleCI', 'Jenkins', 'GitLab'],
```

The number on each chip is the match count, computed at render. A chip showing
`0` means the name doesn't match any `stack` entry — fix the spelling rather
than removing the chip.

## Generated files — do not hand-edit

`tools/build-seo.mjs` owns these. Edits to them are overwritten on the next run.

| File | Purpose |
|---|---|
| `index.html` between `<!-- seo:outcomes:* -->` | The outcomes board |
| `index.html` between `<!-- seo:experience:* -->` | The practice, its clients, and earlier full-time roles |
| `index.html` between `<!-- seo:jsonld:* -->` | schema.org `ProfilePage` + `Person` + `ItemList` graph |
| `llms.txt` | Markdown summary at `/llms.txt` for LLM retrieval |
| `cv.md` | Full plain-text CV at `/cv.md` |
| `sitemap.xml` | URLs plus `lastmod` |

`robots.txt` is hand-written and explicitly allows AI crawlers by name. Leave it
that way — the point is to be quotable by answer engines.

The OG card at `assets/img/og.png` is rendered from `assets/img/og.svg` by
`node tools/build-og.mjs` (needs a one-off `npm install --no-save @resvg/resvg-js`;
fonts are vendored in `tools/fonts`). Edit the SVG, then re-render. Regenerate
only if the name, title, location or headline numbers change, and keep the SVG's
stats in sync with the hero readouts and `og:image:alt`.

## What is NOT in data.js

These are hand-written prose and live in `index.html`:

- The **Live demo** section (`#demo`). One side project, the Ask Andrii voice
  agent, hand-written like the work cards. Its `llms.txt` / `cv.md` entry comes
  from the `DEMO` constant in `tools/build-seo.mjs`; keep the two in sync.
- The **hero pitch**, the **about** copy, education, languages, personal facts.
- Section headings and ledes for `#outcomes` and `#experience` (the content
  between the `seo:` markers is generated; the headers around it are not).
- Two readouts — **Peak MAU** (`40M+`) and **Markets served** (`90+`). These are
  claims about specific projects, not date arithmetic, so they're literals.
  The other two (**Years shipping**, **Years freelance**) carry `data-derive`
  and are computed in `main.js`; keep their static fallbacks, the OG card and
  `og:image:alt` in sync when the year rolls over.
- Contact details and the JSON-LD `Person` block in `<head>`.

## Design system

Tokens are at the top of `styles.css`. Do not introduce colours outside them.

- Palette is IPF powerlifting plate colours: `--signal` (#ffd100, 15 kg yellow)
  is the single accent, `--depth` (#4c8dff, 20 kg blue) is used **only** for the
  stack-filter highlight state on experience rows. Everything else is graphite.
- Type is one superfamily: Archivo, with the `wdth` axis carrying the display
  vs. body distinction, plus IBM Plex Mono for data, labels and eyebrows.
  Set width via `font-variation-settings: 'wdth' N`.
- Spend boldness in one place: the outcomes board, with its big yellow metrics,
  is the signature element. Resist adding effects elsewhere.

## Constraints to keep

- **Mobile first.** Every media query in `styles.css` is `min-width`. Keep it
  that way.
- **`prefers-reduced-motion` is respected.** Any new animation needs a path
  through the guard at the bottom of `styles.css` and, if JS-driven, a check
  against the `reduced` media query in `main.js`.
- **Keyboard accessible.** Stack chips are real `<button>`s with `aria-pressed`.
  Keep interactive things focusable.
- **No dependencies and no build.** ES modules loaded directly. If you find
  yourself wanting a bundler, the answer is no.
- **External requests are limited to two:** Google Fonts and Cloudflare Web
  Analytics (cookieless beacon at the bottom of `<head>` in `index.html`; no
  consent banner needed). Do not add more.

## Local preview

ES modules need a real origin — opening `index.html` from the filesystem will
fail on CORS.

```bash
python3 -m http.server 4321
```

## Deploying

GitHub Pages serves `main` at the repo root. Push and it's live; there is no
build to run and no Actions workflow to wait on.
