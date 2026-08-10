#!/usr/bin/env node
/**
 * Regenerates the crawlable artefacts from assets/js/data.js.
 *
 *   node tools/build-seo.mjs
 *
 * Most AI crawlers (GPTBot, ClaudeBot, CCBot, PerplexityBot) do not execute
 * JavaScript, so anything only rendered by main.js is invisible to them. This
 * writes the same data into static HTML and plain text:
 *
 *   index.html    the engagement history block + the JSON-LD graph
 *   llms.txt      markdown summary for LLM retrieval
 *   cv.md         full plain-text CV
 *   sitemap.xml   lastmod bump
 *
 * Run it after every edit to data.js. `--check` exits non-zero if the output
 * would change, so CI or a pre-commit hook can catch a forgotten run.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { ENGAGEMENTS, SKILL_GROUPS } from '../assets/js/data.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');

const SITE = 'https://andrii-sirko.github.io';
const PERSON = {
  name: 'Andrii Sirko',
  title: 'Senior Frontend Engineer · Full-Stack Contractor',
  email: 'andrii.sirko@gmail.com',
  phone: '+49 176 4340 4914',
  city: 'Borkheide',
  region: 'Brandenburg',
  country: 'DE',
  linkedin: 'https://www.linkedin.com/in/andrii-sirko',
  github: 'https://github.com/andrii-sirko',
  summary:
    'Senior frontend engineer and full-stack contractor with over ten years building '
    + 'production React applications for European technology companies including ABOUT YOU, '
    + 'eBay (Adevinta), Daimler/smart, Volkswagen/Audi and Careem. Frontend lead at 1M+ '
    + 'monthly-active-user scale, specialising in TypeScript, component architecture, '
    + 'monorepos and performance.'
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const pretty = (ym) => {
  const [y, m] = ym.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
};

const period = (e) => `${pretty(e.start)} – ${e.end ? pretty(e.end) : 'Present'}`;

/* ── index.html: static engagement history ──────────────────────────────── */

function engagementsHtml() {
  const items = ENGAGEMENTS.map((e) => {
    const when = `<span class="rec__when"><time datetime="${e.start}">${pretty(e.start)}</time> – `
      + (e.end
        ? `<time datetime="${e.end}">${pretty(e.end)}</time>`
        : 'Present')
      + '</span>';

    const where = e.url
      ? ` · <a href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.site)}</a>`
      : '';

    return `      <li class="rec">
        <h4 class="rec__co">${esc(e.company)}</h4>
        ${when}
        <p class="rec__role">${esc(e.role)} · ${esc(e.kind)} · ${esc(e.place)}${where}</p>
        <p class="rec__sum">${esc(e.summary)}</p>
        <ul class="rec__points">
${e.bullets.map((b) => `          <li>${esc(b)}</li>`).join('\n')}
        </ul>
        <p class="rec__stack"><span>Stack</span> ${e.stack.map(esc).join(' · ')}</p>
      </li>`;
  });

  return `    <ol class="records">\n${items.join('\n')}\n    </ol>`;
}

/* ── index.html: JSON-LD ────────────────────────────────────────────────── */

function jsonLd() {
  const skills = [...new Set(SKILL_GROUPS.flatMap((g) => g.items))];

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${SITE}/#page`,
        url: `${SITE}/`,
        name: `${PERSON.name} — ${PERSON.title}`,
        description: PERSON.summary,
        inLanguage: 'en',
        mainEntity: { '@id': `${SITE}/#person` },
        dateModified: new Date().toISOString().slice(0, 10)
      },
      {
        '@type': 'Person',
        '@id': `${SITE}/#person`,
        name: PERSON.name,
        givenName: 'Andrii',
        familyName: 'Sirko',
        jobTitle: 'Senior Frontend Engineer',
        description: PERSON.summary,
        url: `${SITE}/`,
        email: `mailto:${PERSON.email}`,
        telephone: PERSON.phone,
        address: {
          '@type': 'PostalAddress',
          addressLocality: PERSON.city,
          addressRegion: PERSON.region,
          addressCountry: PERSON.country
        },
        sameAs: [PERSON.linkedin, PERSON.github],
        knowsAbout: skills,
        knowsLanguage: [
          { '@type': 'Language', name: 'Ukrainian' },
          { '@type': 'Language', name: 'English' },
          { '@type': 'Language', name: 'German' }
        ],
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Lviv Polytechnic National University',
          address: { '@type': 'PostalAddress', addressLocality: 'Lviv', addressCountry: 'UA' }
        },
        hasOccupation: {
          '@type': 'Occupation',
          name: 'Senior Frontend Engineer',
          occupationLocation: { '@type': 'Country', name: 'Germany' },
          skills: skills.join(', ')
        },
        worksFor: ENGAGEMENTS.filter((e) => !e.end).map((e) => ({
          '@type': 'Organization',
          name: e.company,
          ...(e.url ? { url: e.url } : {})
        })),
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'degree',
          name: 'MSc Computer Science',
          educationalLevel: 'Master of Science'
        }
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE}/#engagements`,
        name: 'Professional engagements',
        numberOfItems: ENGAGEMENTS.length,
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        itemListElement: ENGAGEMENTS.map((e, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'OrganizationRole',
            roleName: e.role,
            startDate: e.start,
            ...(e.end ? { endDate: e.end } : {}),
            description: e.summary,
            memberOf: {
              '@type': 'Organization',
              name: e.company,
              ...(e.url ? { url: e.url } : {})
            }
          }
        }))
      }
    ]
  };

  return JSON.stringify(graph, null, 2);
}

/* ── llms.txt ───────────────────────────────────────────────────────────── */

function llmsTxt() {
  return `# ${PERSON.name}

> ${PERSON.summary}

${PERSON.name} is a senior frontend engineer and full-stack contractor based in \
${PERSON.city}, Germany, working remotely across European time zones and available \
for contract work.

- Website: ${SITE}/
- Email: ${PERSON.email}
- LinkedIn: ${PERSON.linkedin}
- GitHub: ${PERSON.github}
- Location: ${PERSON.city}, ${PERSON.region}, Germany
- Languages: Ukrainian (native), English (fluent, B2), German (fluent, B2)

## Core expertise

${SKILL_GROUPS.map((g) => `- **${g.label}**: ${g.items.join(', ')}`).join('\n')}

## Notable outcomes

- Reduced client onboarding from 4 months to 30 minutes by architecting a reusable
  React application framework (Mehrwerk).
- Built a UI Editor serving real-time content to 1M+ monthly active users across web
  and native platforms (Mehrwerk).
- Shipped a white-label Dealer Search used on Audi.de across 90+ markets, integrated
  as a micro-frontend (Accenture · VW / Audi).
- Owned a full k6 load-testing suite — smoke, stress, soak and spike — for SSR and
  GraphQL services (Mehrwerk).
- Led a team of 5 engineers as Frontend Lead over a four-year engagement (Mehrwerk).

## Engagement history

${ENGAGEMENTS.map((e) => `### ${e.company} — ${e.role}
${period(e)} · ${e.kind} · ${e.place}${e.site ? ` · ${e.site}` : ''}

${e.summary}

${e.bullets.map((b) => `- ${b}`).join('\n')}

Stack: ${e.stack.join(', ')}`).join('\n\n')}

## Education

Lviv Polytechnic National University — MSc Computer Science, 2010–2015, Lviv, Ukraine.
Thesis: a context-aware web service for booking personal services.

## Full CV

- [Plain-text CV](${SITE}/cv.md)
`;
}

/* ── cv.md ──────────────────────────────────────────────────────────────── */

function cvMarkdown() {
  return `# ${PERSON.name}

**${PERSON.title}**

${PERSON.email} · ${PERSON.phone} · ${PERSON.city}, Germany
[${SITE.replace('https://', '')}](${SITE}/) · [LinkedIn](${PERSON.linkedin}) · [GitHub](${PERSON.github})

${PERSON.summary}

## Core skills

${SKILL_GROUPS.map((g) => `**${g.label}** — ${g.items.join(' · ')}`).join('\n\n')}

## Experience

${ENGAGEMENTS.map((e) => `### ${e.company}
**${e.role}** · ${e.kind} · ${e.place}${e.site ? ` · ${e.site}` : ''}
*${period(e)}*

${e.summary}

${e.bullets.map((b) => `- ${b}`).join('\n')}

**Stack:** ${e.stack.join(', ')}`).join('\n\n')}

## Education

**Lviv Polytechnic National University** — MSc Computer Science · Lviv, Ukraine · 2010–2015

Thesis: context-aware web service for booking personal services. Coursework included
building a compiler in C/Assembler and implementing virtual desktops for Windows 7
using the WinAPI.

## Languages

Ukrainian (native) · English (fluent, B2) · German (fluent, B2)

## Interests

Powerlifting (Candidate Master of Sport) · Reading 25+ books a year ·
Motorcycling · Travelling (30 countries) · 3D printing
`;
}

/* ── write ──────────────────────────────────────────────────────────────── */

function replaceBlock(html, key, body) {
  const open = `<!-- ${key}:start -->`;
  const close = `<!-- ${key}:end -->`;
  const re = new RegExp(`${open}[\\s\\S]*?${close}`);
  if (!re.test(html)) throw new Error(`Missing markers for "${key}" in index.html`);
  return html.replace(re, `${open}\n${body}\n    ${close}`);
}

const outputs = [];

let html = await readFile(join(ROOT, 'index.html'), 'utf8');
html = replaceBlock(html, 'seo:engagements', engagementsHtml());
html = replaceBlock(html, 'seo:jsonld',
  `    <script type="application/ld+json">\n${jsonLd()}\n    </script>`);

outputs.push(['index.html', html]);
outputs.push(['llms.txt', llmsTxt()]);
outputs.push(['cv.md', cvMarkdown()]);
outputs.push(['sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE}/cv.md</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
`]);

let stale = 0;
for (const [name, body] of outputs) {
  const path = join(ROOT, name);
  const before = await readFile(path, 'utf8').catch(() => null);
  if (before === body) continue;
  stale += 1;
  if (CHECK) {
    console.error(`stale: ${name}`);
    continue;
  }
  await writeFile(path, body);
  console.log(`wrote: ${name}`);
}

if (CHECK && stale) {
  console.error(`\n${stale} file(s) out of date. Run: node tools/build-seo.mjs`);
  process.exit(1);
}
if (!stale) console.log('up to date');
