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

The ledger chart, the hero concurrency curve, the year axis, the "13
engagements" and "12 years" readouts, the stack chip counts and the detail panel
are all derived from `ENGAGEMENTS` at runtime.

The same array is *also* the source for the static, crawlable copies — the
engagement history block in `index.html`, the JSON-LD graph, `llms.txt` and
`cv.md`. Those are generated, never hand-edited.

## Adding a role

**1. Prepend an object to `ENGAGEMENTS`** in `assets/js/data.js`. The array is
ordered **newest first** — the ledger renders it top to bottom in that order.

```js
{
  id: 'acme',                    // unique slug, lowercase, no spaces
  company: 'Acme GmbH',
  role: 'Frontend Lead',
  kind: 'Contract',              // or 'Full-time'
  place: 'Remote',               // or a city
  site: 'acme.com',              // display text for the link, or null
  url: 'https://acme.com',       // href, or null
  start: '2027-02',              // "YYYY-MM", always
  end: null,                     // "YYYY-MM", or null for a current role
  featured: true,                // marks it as case-study material (see below)
  summary: 'One sentence on what the engagement was.',
  bullets: [
    'What shipped, with a number in it where one exists.'
  ],
  stack: ['React', 'TypeScript'] // exact tool names, see matching rules below
}
```

**2. Run the generator:**

```bash
node tools/build-seo.mjs
```

That's it. No layout work: the timeline recomputes `BASE_YEAR` from the earliest
`start` and `END_YEAR` from the latest `end` or the current year, so a 2027 role
widens the axis, adds a year gridline and extends the curve on its own.

### Never skip step 2

Most AI crawlers — GPTBot, ClaudeBot, CCBot, PerplexityBot — do not execute
JavaScript. Anything only rendered by `main.js` is invisible to them. The
generator writes the same content into static HTML and plain text so it isn't.

`node tools/build-seo.mjs --check` exits non-zero when the generated files are
out of date, which makes it usable as a pre-commit or CI check.

### When a current role ends

Set its `end` to the last month, then re-run the generator. `end: null` means
"Present" and pins the bar to the current month.

## Editing the stack section

`SKILL_GROUPS` in `data.js` defines the chips. A chip matches an engagement when
the chip's name equals one of that engagement's `stack` entries, case-insensitively.

If a chip should match entries that are spelled differently per engagement, add
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
| `index.html` between `<!-- seo:engagements:* -->` | Static engagement history, readable without JS |
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

- The **Selected work** cards (`#work`). Six hand-picked engagements with a
  headline framing. When you add a `featured: true` role, decide separately
  whether it earns a card — the section is a curated six, not a feed.
- The **hero pitch**, the **about** copy, education, languages, personal facts.
- Two readouts — **Peak MAU** (`1M+`) and **Markets served** (`90+`). These are
  claims about specific projects, not ledger arithmetic, so they're literals.
  The other two readouts carry `data-derive` and are computed.
- Contact details and the JSON-LD `Person` block in `<head>`.

## Design system

Tokens are at the top of `styles.css`. Do not introduce colours outside them.

- Palette is IPF powerlifting plate colours: `--signal` (#ffd100, 15 kg yellow)
  is the single accent, `--depth` (#4c8dff, 20 kg blue) is used **only** for the
  stack-filter highlight state on ledger bars. Everything else is graphite.
- Type is one superfamily: Archivo, with the `wdth` axis carrying the display
  vs. body distinction, plus IBM Plex Mono for data, labels and eyebrows.
  Set width via `font-variation-settings: 'wdth' N`.
- Spend boldness in one place: the ledger is the signature element. Resist
  adding effects elsewhere.

## Constraints to keep

- **Mobile first.** Every media query in `styles.css` is `min-width`. Keep it
  that way.
- **`prefers-reduced-motion` is respected.** Any new animation needs a path
  through the guard at the bottom of `styles.css` and, if JS-driven, a check
  against the `reduced` media query in `main.js`.
- **Keyboard accessible.** Ledger bars are real `<button>`s with `aria-pressed`
  and arrow-key navigation. Keep interactive things focusable.
- **No dependencies and no build.** ES modules loaded directly. If you find
  yourself wanting a bundler, the answer is no.
- **No tracking.** Fonts from Google Fonts are the only external request.

## Local preview

ES modules need a real origin — opening `index.html` from the filesystem will
fail on CORS.

```bash
python3 -m http.server 4321
```

## Deploying

GitHub Pages serves `main` at the repo root. Push and it's live; there is no
build to run and no Actions workflow to wait on.
