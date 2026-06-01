const STORAGE_KEY = 'foodhub_theme';
const html = document.documentElement;
const btn  = document.getElementById('darkToggle');

const saved = localStorage.getItem(STORAGE_KEY);
if (saved) {
  applyTheme(saved);
} else {
  applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

if (btn) btn.addEventListener('click', () => {
  applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

function applyTheme(theme) {
  if (theme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    if (btn) { btn.textContent = '☀️'; btn.setAttribute('aria-label', 'Switch to light mode'); }
  } else {
    html.removeAttribute('data-theme');
    if (btn) { btn.textContent = '🌙'; btn.setAttribute('aria-label', 'Switch to dark mode'); }
  }
  localStorage.setItem(STORAGE_KEY, theme);
}
