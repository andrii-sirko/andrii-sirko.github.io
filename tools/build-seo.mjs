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
 *   index.html    the outcomes board, the experience section + the JSON-LD graph
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

import { OUTCOMES, PRACTICE, EMPLOYMENT, SKILL_GROUPS } from '../assets/js/data.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');

const SITE = 'https://andrii-sirko.github.io';
const PERSON = {
  name: 'Andrii Sirko',
  title: 'Senior Frontend Engineer · Full-Stack Contractor',
  email: 'andrii.sirko@gmail.com',
  phone: '+49 176 4340 4914',
  city: 'Berlin',
  region: 'Berlin',
  country: 'DE',
  linkedin: 'https://www.linkedin.com/in/andrii-sirko',
  github: 'https://github.com/andrii-sirko',
  summary:
    'Senior React/TypeScript engineer with 10+ years in production e-commerce, fintech, '
    + 'automotive and SaaS products. Frontend Lead who owned the architecture of a 1M+ MAU '
    + 'platform for 4 years (client onboarding cut from 4 months to 30 minutes), and engineer '
    + 'on ABOUT YOU’s 40M+ MAU shop. Freelance contractor since 2019 with repeat multi-year '
    + 'engagements for companies including ABOUT YOU, Mehrwerk, eBay (Adevinta) and Accenture '
    + '(VW, Audi, smart / Daimler); strong in component architecture, performance, testing '
    + 'and, recently, RAG/LLM product features.'
};

/* Side project shown in the "Live demo" section. Hand-written, like the work cards. */
const DEMO = {
  url: 'https://ask-andrii.vercel.app/',
  repo: 'https://github.com/andrii-sirko/ask-andrii',
  blurb:
    'A voice agent built on ElevenLabs Agents that answers questions about this CV from a '
    + 'RAG knowledge base and drives the UI while it talks, through client tools '
    + '(highlightProject, filterByTech, showContact). The browser never sees an API key: a '
    + 'Next.js route mints a short-lived signed URL, throttled per IP. Has a text mode for '
    + 'use without a microphone; the agent config, tools and knowledge base live in the repo.',
  stack: ['Next.js', 'React', 'TypeScript', 'ElevenLabs Agents', 'RAG', 'Tailwind', 'Vitest', 'Vercel']
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

const SHORT = MONTHS.map((m) => m.slice(0, 3));
const brief = (ym) => {
  const [y, m] = ym.split('-').map(Number);
  return `${SHORT[m - 1]} ${y}`;
};

const when = (e, fmt = pretty) =>
  `<time datetime="${e.start}">${fmt(e.start)}</time> — `
  + (e.end ? `<time datetime="${e.end}">${fmt(e.end)}</time>` : 'Present');

/* ── index.html: outcomes board ─────────────────────────────────────────── */

function outcomesHtml() {
  const items = OUTCOMES.map((o) => `        <li class="outcome" data-reveal>
          <p class="outcome__for"><span class="outcome__co">${esc(o.client)}</span><span class="outcome__role">${esc(o.role)}</span></p>
          <p class="outcome__metric">${esc(o.metric)}</p>
          <h3 class="outcome__title">${esc(o.title)}</h3>
          <p class="outcome__body">${esc(o.body)}</p>
          <ul class="case__tags">${o.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
        </li>`);

  return `      <ol class="outcomes">\n${items.join('\n')}\n      </ol>`;
}

/* ── index.html: experience ─────────────────────────────────────────────── */

/* One row per client or employer. Clients of the practice have no dates of
   their own; full-time roles do. */
function roleHtml(e) {
  const site = e.url
    ? ` · <a href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.site)}</a>`
    : '';
  const terms = e.kind ? ` · ${esc(e.kind)} · ${esc(e.place)}` : '';

  return `          <li class="client" data-id="${e.id}" data-reveal>
            <div class="client__head">
              <h4 class="client__co">${esc(e.company)}</h4>
              <p class="client__tag">${esc(e.tagline)}</p>
${e.start ? `              <p class="client__when">${when(e, brief)}</p>\n` : ''}\
              <p class="client__role">${esc(e.role)}${terms}${site}</p>
            </div>
            <div class="client__main">
              <ul class="client__points">
${e.bullets.map((b) => `                <li>${esc(b)}</li>`).join('\n')}
              </ul>
              <p class="client__stack"><span>Stack</span> ${e.stack.map(esc).join(' · ')}</p>
            </div>
          </li>`;
}

function experienceHtml() {
  return `      <article class="practice" data-experience>
        <header class="practice__head" data-reveal>
          <div>
            <h3 class="practice__title">${esc(PRACTICE.title)}</h3>
            <p class="practice__meta">${esc(PRACTICE.kind)} · ${esc(PRACTICE.place)}</p>
          </div>
          <p class="practice__when">${when(PRACTICE, brief)}</p>
          <p class="practice__sum">${esc(PRACTICE.summary)} Clients and outcomes:</p>
        </header>
        <ul class="clients">
${PRACTICE.clients.map(roleHtml).join('\n')}
        </ul>
      </article>

      <section class="earlier" data-experience>
        <h3 class="earlier__title" data-reveal>Before the practice — full-time roles</h3>
        <ul class="clients">
${EMPLOYMENT.map(roleHtml).join('\n')}
        </ul>
      </section>`;
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
        worksFor: PRACTICE.end ? [] : [{
          '@type': 'Organization',
          name: `${PERSON.name} — ${PRACTICE.kind}`,
          url: `${SITE}/`
        }],
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'degree',
          name: 'MSc Computer Science',
          educationalLevel: 'Master of Science'
        }
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE}/#experience`,
        name: 'Professional experience',
        numberOfItems: 1 + EMPLOYMENT.length,
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        itemListElement: [
          {
            role: PRACTICE.title,
            start: PRACTICE.start,
            end: PRACTICE.end,
            description: `${PRACTICE.summary} Clients: ${PRACTICE.clients.map((c) => c.company).join(', ')}.`,
            org: { '@type': 'Organization', name: `${PERSON.name} — ${PRACTICE.kind}`, url: `${SITE}/` }
          },
          ...EMPLOYMENT.map((e) => ({
            role: e.role,
            start: e.start,
            end: e.end,
            description: e.bullets.join(' '),
            org: { '@type': 'Organization', name: e.company, ...(e.url ? { url: e.url } : {}) }
          }))
        ].map((r, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'OrganizationRole',
            roleName: r.role,
            startDate: r.start,
            ...(r.end ? { endDate: r.end } : {}),
            description: r.description,
            memberOf: r.org
          }
        }))
      }
    ]
  };

  return JSON.stringify(graph, null, 2);
}

/* A client of the practice, in Markdown. No dates — the practice carries them. */
const clientMd = (c) => `**${c.company}** — ${c.tagline}
${c.role}${c.site ? ` · ${c.site}` : ''}

${c.bullets.map((b) => `- ${b}`).join('\n')}

Stack: ${c.stack.join(', ')}`;

/* ── llms.txt ───────────────────────────────────────────────────────────── */

function llmsTxt() {
  return `# ${PERSON.name}

> ${PERSON.summary}

${PERSON.name} is a senior frontend engineer and full-stack contractor based in \
${PERSON.city}, Germany. He has run a single freelance practice since ${pretty(PRACTICE.start)}, \
works remotely across European time zones and is available for contract work.

- Website: ${SITE}/
- Email: ${PERSON.email}
- LinkedIn: ${PERSON.linkedin}
- GitHub: ${PERSON.github}
- Location: ${PERSON.city}, Germany
- Languages: Ukrainian (native), English (fluent, C1), German (fluent, C1)

## Core expertise

${SKILL_GROUPS.map((g) => `- **${g.label}**: ${g.items.join(', ')}`).join('\n')}

## Notable outcomes

${OUTCOMES.map((o) => `- **${o.metric}** — ${o.title}. ${o.body} (${o.client})`).join('\n')}

## Live demo

- [Ask Andrii](${DEMO.url}) — ${DEMO.blurb} Source: ${DEMO.repo}

## Experience

### ${PRACTICE.title}
${period(PRACTICE)} · ${PRACTICE.kind} · ${PRACTICE.place}

${PRACTICE.summary} Clients and outcomes:

${PRACTICE.clients.map(clientMd).join('\n\n')}

${EMPLOYMENT.map((e) => `### ${e.company} — ${e.role}
${period(e)} · ${e.kind} · ${e.place}${e.site ? ` · ${e.site}` : ''}

${e.tagline}.

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

### ${PRACTICE.title}
${PRACTICE.kind} · ${PRACTICE.place}
*${period(PRACTICE)}*

${PRACTICE.summary} Clients and outcomes:

${PRACTICE.clients.map(clientMd).join('\n\n')}

${EMPLOYMENT.map((e) => `### ${e.company} — ${e.tagline.toLowerCase()}
**${e.role}** · ${e.kind} · ${e.place}${e.site ? ` · ${e.site}` : ''}
*${period(e)}*

${e.bullets.map((b) => `- ${b}`).join('\n')}

**Stack:** ${e.stack.join(', ')}`).join('\n\n')}

## Projects

**[Ask Andrii](${DEMO.url})** — voice agent demo · 2026 · [source](${DEMO.repo})

${DEMO.blurb}

**Stack:** ${DEMO.stack.join(', ')}

## Education

**Lviv Polytechnic National University** — MSc Computer Science · Lviv, Ukraine · 2010–2015

Thesis: context-aware web service for booking personal services. Coursework included
building a compiler in C/Assembler and implementing virtual desktops for Windows 7
using the WinAPI.

## Languages

Ukrainian (native) · English (fluent, C1) · German (fluent, C1)

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
  return html.replace(re, () => `${open}\n${body}\n    ${close}`);
}

const outputs = [];

let html = await readFile(join(ROOT, 'index.html'), 'utf8');
html = replaceBlock(html, 'seo:outcomes', outcomesHtml());
html = replaceBlock(html, 'seo:experience', experienceHtml());
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
