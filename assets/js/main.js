import { PRACTICE, EMPLOYMENT, ROLES, SKILL_GROUPS, SKILL_ALIASES } from './data.js';

/* ── career maths ───────────────────────────────────────────────────────── */

const NOW = new Date();

/* Whole years between a "YYYY-MM" and an end month (this month when open). */
const yearsSince = (ym, end) => {
  const [y, m] = ym.split('-').map(Number);
  const [ey, em] = end
    ? end.split('-').map(Number)
    : [NOW.getFullYear(), NOW.getMonth() + 1];
  return Math.floor(((ey - y) * 12 + (em - m)) / 12);
};

const FIRST_START = [PRACTICE, ...EMPLOYMENT].map((e) => e.start).sort()[0];
const CAREER_YEARS = yearsSince(FIRST_START);
const FREELANCE_YEARS = yearsSince(PRACTICE.start, PRACTICE.end);

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
  // Two of the four readouts are date arithmetic, so compute them from data.js.
  const derived = { years: CAREER_YEARS, freelance: FREELANCE_YEARS };
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

/* ── stack ──────────────────────────────────────────────────────────────── */

const matchesTech = (role, tech) => {
  const names = SKILL_ALIASES[tech] || [tech];
  return role.stack.some((s) => names.some((n) => s.toLowerCase() === n.toLowerCase()));
};

function initStack() {
  const host = $('[data-stack]');
  const result = $('[data-stack-result]');
  const blocks = document.querySelectorAll('[data-experience]');
  const rows = document.querySelectorAll('.client[data-id]');
  if (!host) return;

  host.innerHTML = SKILL_GROUPS.map((g) => `
    <div class="group">
      <h3 class="group__label">${esc(g.label)}</h3>
      <div class="group__items">
        ${g.items.map((t) => {
          const n = ROLES.filter((r) => matchesTech(r, t)).length;
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
    blocks.forEach((b) => b.classList.remove('is-filtered'));
    rows.forEach((r) => r.classList.remove('is-match'));
    result.innerHTML = '';
  };

  const apply = (tech) => {
    current = tech;
    host.querySelectorAll('.tech').forEach((c) => {
      const on = c.dataset.tech === tech;
      c.classList.toggle('is-on', on);
      c.setAttribute('aria-pressed', String(on));
    });

    const hits = ROLES.filter((r) => matchesTech(r, tech));
    blocks.forEach((b) => b.classList.add('is-filtered'));
    rows.forEach((el) => {
      el.classList.toggle('is-match', hits.some((h) => h.id === el.dataset.id));
      el.classList.add('is-in');                 // never leave a match un-revealed
    });

    result.innerHTML = hits.length
      ? `<b>${esc(tech)}</b> — used for ${hits.length} client${hits.length === 1 ? '' : 's'}
         and role${hits.length === 1 ? '' : 's'}, highlighted under Experience
         <button type="button" data-clear>Clear</button>`
      : `<b>${esc(tech)}</b> — no role lists this by name
         <button type="button" data-clear>Clear</button>`;

    const first = [...rows].find((el) => el.classList.contains('is-match'));
    (first || $('#experience')).scrollIntoView({
      behavior: reduced.matches ? 'auto' : 'smooth',
      block: first ? 'center' : 'start'
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
initStack();
initChrome();
