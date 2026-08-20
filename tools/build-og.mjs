#!/usr/bin/env node
/**
 * Renders assets/img/og.png (1200×630) from assets/img/og.svg.
 *
 *   npm install --no-save @resvg/resvg-js   # once, not committed
 *   node tools/build-og.mjs
 *
 * Fonts are vendored in tools/fonts so the render is reproducible offline.
 * Run this whenever the name, title or headline numbers on the card change,
 * and keep og.svg in sync with the readouts in index.html.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

let Resvg;
try {
  ({ Resvg } = await import('@resvg/resvg-js'));
} catch {
  console.error('Missing renderer. Run: npm install --no-save @resvg/resvg-js');
  process.exit(1);
}

const svg = await readFile(join(ROOT, 'assets/img/og.svg'), 'utf8');

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  font: {
    loadSystemFonts: false,
    fontFiles: [
      join(ROOT, 'tools/fonts/ArchivoBlack-Regular.ttf'),
      join(ROOT, 'tools/fonts/IBMPlexMono-Regular.ttf'),
      join(ROOT, 'tools/fonts/IBMPlexMono-Medium.ttf')
    ]
  }
});

const png = resvg.render().asPng();
await writeFile(join(ROOT, 'assets/img/og.png'), png);
console.log(`wrote: assets/img/og.png (${(png.length / 1024).toFixed(0)} KB)`);
