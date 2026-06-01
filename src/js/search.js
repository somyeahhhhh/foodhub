import { STATIC_SUGGESTIONS } from './config.js';

const heroSearch        = document.getElementById('heroSearch');
const searchSuggestions = document.getElementById('searchSuggestions');
const searchBtn         = document.getElementById('searchBtn');

let restaurantSource = [];
let onSearchCb = null;

export function setRestaurantSource(list) {
  restaurantSource = list;
}

export function onSearch(cb) {
  onSearchCb = cb;
}

export function handleSearchInput(val) {
  if (!val.trim()) { hideSuggestions(); return; }
  const q = val.toLowerCase();

  const restSuggs = restaurantSource
    .filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q))
    .slice(0, 4)
    .map(r => ({ label: r.name, emoji: r.emoji, type: 'restaurant' }));

  const staticSuggs = STATIC_SUGGESTIONS.filter(s =>
    s.label.toLowerCase().includes(q));

  renderSuggestions([...restSuggs, ...staticSuggs]);
}

function renderSuggestions(items) {
  if (!items.length) { hideSuggestions(); return; }

  searchSuggestions.innerHTML = items.slice(0, 6).map(s => `
    <div class="suggestion-item"
         data-value="${escAttr(s.label)}"
         role="option"
         tabindex="0">
      <span class="sug-icon" aria-hidden="true">${s.emoji}</span>
      <span class="sug-label">${escHtml(s.label)}</span>
      <span class="sug-type" aria-hidden="true">${s.type}</span>
    </div>
  `).join('');

  searchSuggestions.classList.add('show');
  searchSuggestions.setAttribute('aria-expanded', 'true');
}

export function hideSuggestions() {
  searchSuggestions.classList.remove('show');
  searchSuggestions.setAttribute('aria-expanded', 'false');
}

function selectSuggestion(val) {
  heroSearch.value = val;
  hideSuggestions();
  doSearch();
}

export function doSearch() {
  const q = heroSearch.value.toLowerCase().trim();
  hideSuggestions();
  const result = q
    ? restaurantSource.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q))
    : restaurantSource;
  if (onSearchCb) onSearchCb(result);
}

heroSearch.addEventListener('input',   (e) => handleSearchInput(e.target.value));
heroSearch.addEventListener('focus',   (e) => { if (e.target.value) handleSearchInput(e.target.value); });
heroSearch.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSearch(); });
searchBtn.addEventListener('click', doSearch);

document.addEventListener('click', (e) => {
  if (!e.target.closest('.hero-search-wrap')) hideSuggestions();
});

searchSuggestions.addEventListener('click', (e) => {
  const item = e.target.closest('.suggestion-item[data-value]');
  if (item) selectSuggestion(item.dataset.value);
});

searchSuggestions.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    const item = e.target.closest('.suggestion-item[data-value]');
    if (item) { e.preventDefault(); selectSuggestion(item.dataset.value); }
  }
});

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escAttr(str) {
  return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
