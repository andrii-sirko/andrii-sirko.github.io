import { ENGAGEMENTS, SKILL_GROUPS, SKILL_ALIASES } from './data.js';

/* ── timeline maths ─────────────────────────────────────────────────────── */

const NOW = new Date();
const yearOf = (ym) => Number(ym.slice(0, 4));

/* The axis stretches to fit whatever is in data.js — add a 2027 role and the
   chart, gridlines and year labels all grow on their own. */
const BASE_YEAR = Math.min(...ENGAGEMENTS.map((e) => yearOf(e.start)));
const END_YEAR = Math.max(
  NOW.getFullYear(),
  ...ENGAGEMENTS.map((e) => yearOf(e.end || e.start))
);
const YEARS = END_YEAR - BASE_YEAR + 1;
const MONTHS = YEARS * 12;

const toIndex = (ym) => {
  const [y, m] = ym.split('-').map(Number);
  return (y - BASE_YEAR) * 12 + (m - 1);
};

const nowIndex = Math.min(
  MONTHS - 1,
  (NOW.getFullYear() - BASE_YEAR) * 12 + NOW.getMonth()
);

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const label = (ym) => {
  const [y, m] = ym.split('-').map(Number);
  return `${MONTH_NAMES[m - 1]} ${y}`;
};

const spanText = (months) => {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (!y) return `${m} mo${m === 1 ? '' : 's'}`;
  if (!m) return `${y} yr${y === 1 ? '' : 's'}`;
  return `${y} yr${y === 1 ? '' : 's'} ${m} mo${m === 1 ? '' : 's'}`;
};

/** Engagements decorated with resolved month bounds. `start`/`end` stay as the
    authored "YYYY-MM" strings; `from`/`to` are the month indices used for layout. */
const BARS = ENGAGEMENTS.map((e) => {
  const from = toIndex(e.start);
  const to = e.end ? toIndex(e.end) : nowIndex;
  return { ...e, from, to, months: to - from + 1 };
});

/* How many contracts were running in each month on record. Drives both the hero
   curve and the "peak N" caption. */
const LOAD = Array.from({ length: MONTHS }, (_, i) =>
  BARS.reduce((n, b) => n + (i >= b.from && i <= b.to ? 1 : 0), 0));

const PEAK = (() => {
  const value = Math.max(...LOAD, 1);
  const at = LOAD.indexOf(value);
  return { value, year: BASE_YEAR + Math.floor(at / 12) };
})();

const CAREER_YEARS = Math.floor((nowIndex - Math.min(...BARS.map((b) => b.from))) / 12);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const $ = (sel, root = document) => root.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ── scroll reveal ──────────────────────────────────────────────────────── */

function initReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (reduced.matches || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver((entries, obs) => {
    // stagger only within the same batch, so a fast scroll doesn't queue delays
    let n = 0;
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.style.setProperty('--d', `${Math.min(n, 5) * 70}ms`);
      entry.target.classList.add('is-in');
      obs.unobserve(entry.target);
      n += 1;
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

  items.forEach((el) => io.observe(el));
}

/* ── hero entrance ──────────────────────────────────────────────────────── */

function initHero() {
  const name = $('.hero__name');
  if (!name) return;
  name.querySelectorAll('.hero__word').forEach((w, i) => {
    w.style.setProperty('--wd', `${120 + i * 110}ms`);
  });
  requestAnimationFrame(() => name.classList.add('is-in'));
}

/* ── stat count-up ──────────────────────────────────────────────────────── */

function initCounters() {
  // Two of the four readouts are facts about the ledger, so read them from it.
  const derived = { years: CAREER_YEARS, engagements: BARS.length };
  document.querySelectorAll('[data-derive]').forEach((el) => {
    const v = derived[el.dataset.derive];
    if (v == null) return;
    el.dataset.count = v;
    el.textContent = v + (el.dataset.suffix || '');
  });

  const nodes = document.querySelectorAll('[data-count]');
  if (reduced.matches || !('IntersectionObserver' in window)) return;

  const run = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (target < 5) return;                       // "1M+" doesn't need a runway

    const dur = 1100;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    el.textContent = '0' + suffix;
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      run(e.target);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.6 });

  nodes.forEach((n) => io.observe(n));
}

/* ── concurrency curve ──────────────────────────────────────────────────── */

function initCurve() {
  const plot = $('[data-curve-plot]');
  const axis = $('[data-curve-axis]');
  if (!plot) return;

  const H = 100;
  const y = (v) => H - 6 - (v / PEAK.value) * (H - 18);

  let d = `M0,${y(LOAD[0])}`;
  for (let i = 0; i < MONTHS; i += 1) {
    d += ` H${i + 1}`;
    if (i + 1 < MONTHS && LOAD[i + 1] !== LOAD[i]) d += ` V${y(LOAD[i + 1])}`;
  }
  const area = `${d} V${H} H0 Z`;

  plot.innerHTML = `
    <svg viewBox="0 0 ${MONTHS} ${H}" preserveAspectRatio="none" role="img"
         aria-label="Concurrent engagements per month, ${BASE_YEAR} to ${END_YEAR}, peaking at ${PEAK.value}.">
      <defs>
        <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffd100" stop-opacity=".28"/>
          <stop offset="100%" stop-color="#ffd100" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path class="curve__area" d="${area}" opacity="0"/>
      <path class="curve__line" d="${d}"/>
    </svg>`;

  axis.innerHTML = Array.from({ length: YEARS },
    (_, i) => `<span>${BASE_YEAR + i}</span>`).join('');

  const cap = $('[data-curve-label]');
  const pk = $('[data-curve-peak]');
  if (cap) cap.textContent = `Concurrent engagements, ${BASE_YEAR}–${END_YEAR}`;
  if (pk) pk.textContent = `peak ${PEAK.value} · ${PEAK.year}`;

  const line = $('.curve__line', plot);
  const fill = $('.curve__area', plot);

  if (reduced.matches) { fill.setAttribute('opacity', '1'); return; }

  const len = line.getTotalLength();
  line.style.strokeDasharray = len;
  line.style.strokeDashoffset = len;
  line.style.transition = 'stroke-dashoffset 2.1s cubic-bezier(.16,1,.3,1) .35s';
  fill.style.transition = 'opacity .9s ease 1.1s';

  requestAnimationFrame(() => {
    line.style.strokeDashoffset = '0';
    fill.setAttribute('opacity', '1');
  });
}

/* ── ledger ─────────────────────────────────────────────────────────────── */

let activeId = BARS[0].id;

function renderDetail(id) {
  const panel = $('[data-detail]');
  const b = BARS.find((x) => x.id === id);
  if (!panel || !b) return;

  const from = label(b.start);
  const to = b.end ? label(b.end) : 'Present';

  const site = b.url
    ? ` &middot; <a href="${esc(b.url)}" target="_blank" rel="noopener">${esc(b.site)}</a>`
    : '';

  panel.innerHTML = `
    <div class="detail__top">
      <h3 class="detail__co">${esc(b.company)}</h3>
      <p class="detail__when">${from} — ${to} &middot; ${spanText(b.months)}</p>
    </div>
    <p class="detail__role">${esc(b.role)} &middot; ${esc(b.kind)} &middot; ${esc(b.place)}${site}</p>
    <p class="detail__summary">${esc(b.summary)}</p>
    <ul class="detail__list">
      ${b.bullets.map((t) => `<li>${esc(t)}</li>`).join('')}
    </ul>
    <ul class="chips">
      ${b.stack.map((t) => `<li>${esc(t)}</li>`).join('')}
    </ul>`;

  panel.classList.remove('is-swap');
  void panel.offsetWidth;                      // restart the swap animation
  if (!reduced.matches) panel.classList.add('is-swap');
}

function select(id) {
  activeId = id;
  document.querySelectorAll('.bar').forEach((el) => {
    const on = el.dataset.id === id;
    el.classList.toggle('is-active', on);
    el.setAttribute('aria-pressed', String(on));
  });
  renderDetail(id);
}

function initLedger() {
  const rows = $('[data-ledger-rows]');
  const axis = $('[data-ledger-axis]');
  const grid = $('[data-ledger]');
  const scroller = $('[data-ledger-scroll]');
  if (!rows) return;

  grid.style.setProperty('--cols', MONTHS);
  grid.style.setProperty('--years', YEARS);

  axis.innerHTML = Array.from({ length: YEARS }, (_, i) => {
    const yr = BASE_YEAR + i;
    return `<span class="${yr === PEAK.year ? 'is-peak' : ''}">${yr}</span>`;
  }).join('');

  rows.innerHTML = BARS.map((b, i) => {
    const tight = b.months < 14;
    const flip = b.to > MONTHS - 22;
    const cls = ['bar', tight && 'bar--tight', tight && flip && 'bar--flip']
      .filter(Boolean).join(' ');
    const period = `${label(b.start)} to ${b.end ? label(b.end) : 'present'}`;
    return `<li class="ledger__row">
      <button class="${cls}" type="button" data-id="${b.id}" aria-pressed="false"
              aria-label="${esc(b.company)}, ${esc(b.role)}, ${period}"
              style="--s:${b.from + 1};--e:${b.to + 2};--d:${i * 55}ms">
        <span class="bar__label">${esc(b.company)}</span>
      </button>
    </li>`;
  }).join('');

  select(activeId);

  rows.addEventListener('click', (e) => {
    const bar = e.target.closest('.bar');
    if (bar) select(bar.dataset.id);
  });

  // roving arrow-key navigation between bars
  rows.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
    const bars = [...rows.querySelectorAll('.bar')];
    const at = bars.indexOf(document.activeElement);
    if (at === -1) return;
    e.preventDefault();
    const next = bars[(at + (e.key === 'ArrowDown' ? 1 : -1) + bars.length) % bars.length];
    next.focus();
    select(next.dataset.id);
  });

  // draw the bars in once the block scrolls into view
  if (reduced.matches || !('IntersectionObserver' in window)) {
    rows.classList.add('is-in');
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        rows.classList.add('is-in');
        obs.disconnect();
      });
    }, { threshold: 0.12 });
    io.observe(rows);
  }

  initDragScroll(scroller);
}

/* Pointer-drag panning for the horizontal ledger, without eating bar clicks. */
function initDragScroll(scroller) {
  if (!scroller) return;
  const hint = $('[data-ledger-hint]');
  let down = false;
  let moved = 0;
  let x0 = 0;
  let left0 = 0;

  scroller.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch') return;      // let native touch scrolling do it
    down = true; moved = 0; x0 = e.clientX; left0 = scroller.scrollLeft;
    scroller.classList.add('is-dragging');
  });

  scroller.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - x0;
    moved = Math.max(moved, Math.abs(dx));
    if (moved > 4) scroller.scrollLeft = left0 - dx;
  });

  const stop = () => { down = false; scroller.classList.remove('is-dragging'); };
  scroller.addEventListener('pointerup', stop);
  scroller.addEventListener('pointercancel', stop);
  scroller.addEventListener('pointerleave', stop);

  scroller.addEventListener('click', (e) => {
    if (moved > 6) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  scroller.addEventListener('scroll', () => {
    if (hint) hint.classList.add('is-gone');
  }, { once: true, passive: true });

  // start at the recent end — that's what people came to read
  requestAnimationFrame(() => {
    scroller.scrollLeft = scroller.scrollWidth;
  });
}

/* ── stack ──────────────────────────────────────────────────────────────── */

const matchesTech = (bar, tech) => {
  const names = SKILL_ALIASES[tech] || [tech];
  return bar.stack.some((s) => names.some((n) => s.toLowerCase() === n.toLowerCase()));
};

function initStack() {
  const host = $('[data-stack]');
  const result = $('[data-stack-result]');
  const rows = $('[data-ledger-rows]');
  if (!host) return;

  host.innerHTML = SKILL_GROUPS.map((g) => `
    <div class="group">
      <h3 class="group__label">${esc(g.label)}</h3>
      <div class="group__items">
        ${g.items.map((t) => {
          const n = BARS.filter((b) => matchesTech(b, t)).length;
          return `<button class="tech" type="button" data-tech="${esc(t)}" aria-pressed="false">
            ${esc(t)}<span class="tech__n">${n}</span>
          </button>`;
        }).join('')}
      </div>
    </div>`).join('');

  let current = null;

  const clear = () => {
    current = null;
    host.querySelectorAll('.tech').forEach((c) => {
      c.classList.remove('is-on');
      c.setAttribute('aria-pressed', 'false');
    });
    rows.classList.remove('is-filtered');
    rows.querySelectorAll('.bar').forEach((b) => b.classList.remove('is-match'));
    result.innerHTML = '';
  };

  const apply = (tech) => {
    current = tech;
    host.querySelectorAll('.tech').forEach((c) => {
      const on = c.dataset.tech === tech;
      c.classList.toggle('is-on', on);
      c.setAttribute('aria-pressed', String(on));
    });

    const hits = BARS.filter((b) => matchesTech(b, tech));
    rows.classList.add('is-filtered');
    rows.querySelectorAll('.bar').forEach((el) => {
      el.classList.toggle('is-match', hits.some((h) => h.id === el.dataset.id));
    });

    result.innerHTML = hits.length
      ? `<b>${esc(tech)}</b> — ${hits.length} engagement${hits.length === 1 ? '' : 's'},
         highlighted in the ledger <button type="button" data-clear>Clear</button>`
      : `<b>${esc(tech)}</b> — no engagement lists this by name
         <button type="button" data-clear>Clear</button>`;

    $('#ledger').scrollIntoView({
      behavior: reduced.matches ? 'auto' : 'smooth',
      block: 'center'
    });
  };

  host.addEventListener('click', (e) => {
    const chip = e.target.closest('.tech');
    if (!chip) return;
    if (chip.dataset.tech === current) clear();
    else apply(chip.dataset.tech);
  });

  result.addEventListener('click', (e) => {
    if (e.target.closest('[data-clear]')) clear();
  });
}

/* ── chrome: progress bar, sticky topbar, copy, year ────────────────────── */

function initChrome() {
  const bar = $('[data-progress]');
  const topbar = $('[data-topbar]');
  let ticking = false;

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar) bar.style.transform = `scaleX(${p})`;
      if (topbar) topbar.classList.toggle('is-stuck', window.scrollY > 24);
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const yr = $('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();

  const copyBtn = $('[data-copy]');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const hint = $('[data-copy-hint]', copyBtn);
      const text = copyBtn.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
        hint.textContent = 'Copied';
      } catch {
        window.location.href = `mailto:${text}`;
        return;
      }
      hint.classList.add('is-done');
      clearTimeout(copyBtn._t);
      copyBtn._t = setTimeout(() => {
        hint.textContent = 'Copy';
        hint.classList.remove('is-done');
      }, 1800);
    });
  }
}

/* ── go ─────────────────────────────────────────────────────────────────── */

initHero();
initReveal();
initCounters();
initCurve();
initLedger();
initStack();
initChrome();
