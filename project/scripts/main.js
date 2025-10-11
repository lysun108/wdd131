/* Yosemite Road Trip Guide — main.js
   Shared behaviors used across pages:
   - Theme toggle with localStorage + respects system preference
   - Mobile navigation open/close (ARIA updates)
   - Auto-highlight current nav link if not set manually
   - Progressive enhancement: set loading="lazy" for images that omit it
*/

const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

/* ------------------------------
   Theme toggle
   ------------------------------ */
(function(){
  const root = document.documentElement;
  const btn = document.querySelector('#theme-toggle');
  const STORE_KEY = 'theme';

  // Determine initial theme
  const saved = localStorage.getItem(STORE_KEY);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');
  if (initial === 'dark') root.classList.add('dark');

  function updateUI(){
    const dark = root.classList.contains('dark');
    if (btn) {
      btn.setAttribute('aria-pressed', String(dark));
      btn.title = dark ? 'Switch to light theme' : 'Switch to dark theme';
    }
  }
  updateUI();

  if (btn) {
    btn.addEventListener('click', () => {
      const dark = root.classList.toggle('dark');
      localStorage.setItem(STORE_KEY, dark ? 'dark' : 'light');
      updateUI();
    });
  }

  // Sync if OS theme changes and user hasn't explicitly chosen a theme
  try {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    mql.addEventListener('change', (e) => {
      if (!localStorage.getItem(STORE_KEY)) {
        root.classList.toggle('dark', e.matches);
        updateUI();
      }
    });
  } catch (_){}
})();

/* ------------------------------
   Mobile menu
   ------------------------------ */
(function(){
  const btn = document.querySelector('#menu-btn');
  const nav = document.querySelector('#site-nav');
  if (!btn || !nav) return;

  function toggle(open){
    const isOpen = (open !== undefined) ? open : !nav.classList.contains('open');
    nav.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
  }

  btn.addEventListener('click', () => toggle());

  // Close when a nav link is clicked (better mobile UX)
  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a && nav.classList.contains('open')) toggle(false);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggle(false);
  });
})();

/* ------------------------------
   Highlight current nav item if missing
   ------------------------------ */
(function(){
  const here = location.pathname.split('/').pop() || 'index.html';
  const links = Array.from(document.querySelectorAll('#site-nav a'));
  // Only auto-set when not already specified
  if (!links.some(a => a.getAttribute('aria-current') === 'page')) {
    links.forEach(a => {
      const href = a.getAttribute('href') || '';
      if (here === href || (here === 'index.html' && href.endsWith('index.html'))) {
        a.setAttribute('aria-current', 'page');
      }
    });
  }
})();

/* ------------------------------
   Progressive enhancement: ensure lazy-loading on images
   ------------------------------ */
(function(){
  Array.from(document.querySelectorAll('img:not([loading])')).forEach(img => { img.loading = 'lazy'; });
})();