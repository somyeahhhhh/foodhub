import { FALLBACK_BY_CITY, GRADIENTS } from './config.js';
const hasApiKey = () => true;
import { fetchRestaurants }    from './api.js';
import { renderRestaurants, renderCategories, setActiveCategoryChip, applyFilter, applySort, getGradient } from './restaurants.js';
import { renderDineIn }        from './dineIn.js';
import { updateCartBadge }     from './cart.js';
import {
  onCityChange, selectCity, loadSavedCity, renderCityList,
  getCurrentCity as getCurrentCityFromLocation
} from './location.js';
import { ALL_CITIES }          from './config.js';
import { setRestaurantSource, onSearch } from './search.js';
import { openMenuModal, setCurrentRestaurants, onMenuClose, getRecentlyViewed } from './menu.js';
import { showLoading, hideLoading, showError, hideError, updateFloatETA } from './ui.js';
import './darkmode.js';
import { getFavourites, toggleFav as _toggleFav } from './favourites.js';

/* ── App State ──────────────────────────────────────────────────────────── */
let currentRestaurants = [];
let activeCategoryId   = 'all';


/* ── Hero Restaurant Photo ──────────────────────────────────────────────── */

/**
 * Update the hero section to show the top-rated restaurant's photo.
 * Falls back to the emoji gradient if the restaurant has no photo.
 *
 * @param {Array} restaurants - Full restaurant list for the current city
 */
function updateHeroRestaurant(restaurants) {
  if (!restaurants?.length) return;

  const top = [...restaurants].sort((a, b) => b.rating - a.rating)[0];

  const placeholder = document.getElementById('heroImgPlaceholder');
  const emojiEl     = document.getElementById('heroEmoji');
  const ratingCard  = document.getElementById('heroRatingCard');

  if (!placeholder) return;

  /* Always update the emoji */
  if (emojiEl) emojiEl.textContent = top.emoji;

  /* Update the rating card */
  if (ratingCard) {
    ratingCard.innerHTML = `
  <div class="hero-rating-stars">★ ${top.rating}</div>
  <div class="hero-rest-name" style="font-size:12px;white-space:normal;word-break:break-word;max-width:200px;line-height:1.4;">${escHtml(top.name)}</div>
`;
  }

  if (top.photo) {
    /* Remove any previous photo */
    placeholder.querySelectorAll('.hero-rest-image').forEach(el => el.remove());

    const img = document.createElement('img');
    img.src       = top.photo;
    img.alt       = top.name;
    img.className = 'hero-rest-image';
    img.loading   = 'lazy';

    img.addEventListener('load', () => {
      img.classList.add('loaded');
      placeholder.classList.add('has-photo');
    });

    img.addEventListener('error', () => {
      /* Photo failed — keep the gradient emoji fallback */
      placeholder.classList.remove('has-photo');
    });

    placeholder.appendChild(img);
  } else {
    placeholder.classList.remove('has-photo');
    placeholder.querySelectorAll('.hero-rest-image').forEach(el => el.remove());
  }
}


/* ── Restaurant Data Pipeline ───────────────────────────────────────────── */

async function loadRestaurants(city, categoryId = '13000') {
  showLoading(`Finding restaurants in ${city.name}…`);
  hideError();

  let restaurants;

  if (!hasApiKey()) {
    console.warn('⚠️ Foursquare API key not set — using local fallback data.');
    await delay(700);
    restaurants = getFallbackData(city);
  } else {
    try {
      const apiData = await fetchRestaurants(city, categoryId);
      if (!apiData?.length) {
        showError('No restaurants found in this area. Showing sample data.');
        restaurants = getFallbackData(city);
      } else {
        restaurants = apiData;
      }
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error('Foursquare API error:', err);
      hideLoading();
      showError(`API error: ${err.message}. Showing sample data.`);
      restaurants = getFallbackData(city);
    }
  }

  hideLoading();
  currentRestaurants = restaurants;
  updateFloatETA(city.id);

  setRestaurantSource(currentRestaurants);
  setCurrentRestaurants(currentRestaurants);
  renderRestaurants(currentRestaurants);
  renderDineIn(currentRestaurants);
  renderFavourites();
  updateHeroRestaurant(currentRestaurants);
}

function getFallbackData(city) {
  return [...(FALLBACK_BY_CITY[city.id] ?? FALLBACK_BY_CITY.default)];
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


/* ── Recently Viewed ─────────────────────────────────────────────────────── */

const rvSection  = document.getElementById('recentlyViewedSection');
const rvScroll   = document.getElementById('rvScroll');
const rvClearBtn = document.getElementById('rvClearBtn');

const renderedRvIds = new Set();

function renderRecentlyViewed() {
  const ids = getRecentlyViewed();
  const restaurants = ids
    .map(id => currentRestaurants.find(r => String(r.id) === id))
    .filter(Boolean);

  if (!restaurants.length) {
    rvSection.style.display = 'none';
    return;
  }

  rvSection.style.display = '';
  rvScroll.innerHTML = '';
  renderedRvIds.clear();

  restaurants.forEach((r, idx) => {
    const gradient  = getGradient(String(r.id));
    const isNew     = idx === 0;

    const imgContent = r.photo
      ? `<img src="${r.photo}" alt="${escHtml(r.name)}" class="rv-card-photo" loading="lazy"/>
         <span class="rv-card-emoji" aria-hidden="true">${r.emoji}</span>`
      : `<span class="rv-card-emoji" aria-hidden="true">${r.emoji}</span>`;

    const card = document.createElement('article');
    card.className = `rv-card${isNew ? ' rv-card--new' : ''}`;
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View menu for ${r.name}`);
    card.dataset.id = r.id;
    card.style.setProperty('--card-gradient', gradient);

    card.innerHTML = `
      <div class="rv-card-img">${imgContent}</div>
      <div class="rv-card-body">
        <div class="rv-card-name"></div>
        <div class="rv-card-meta">
          <span class="rv-card-rating">★ ${r.rating}</span>
          <span class="rv-card-time">⏱ ${r.delivery}m</span>
        </div>
      </div>`;

    card.querySelector('.rv-card-name').textContent = r.name;
    rvScroll.appendChild(card);
    renderedRvIds.add(String(r.id));
  });
}

rvScroll.addEventListener('click', (e) => {
  const card = e.target.closest('.rv-card[data-id]');
  if (card) openMenuModal(card.dataset.id);
});
rvScroll.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    const card = e.target.closest('.rv-card[data-id]');
    if (card) { e.preventDefault(); openMenuModal(card.dataset.id); }
  }
});

if (rvClearBtn) {
  rvClearBtn.addEventListener('click', () => {
    rvScroll.innerHTML = '';
    rvSection.style.display = 'none';
    renderedRvIds.clear();
  });
}

onMenuClose(renderRecentlyViewed);


/* ── Category Selection ─────────────────────────────────────────────────── */

function selectCategory(id, fsqCat) {
  activeCategoryId = id;
  setActiveCategoryChip(id);

  const currentCity = getCurrentCityFromLocation();

  if (currentCity && hasApiKey()) {
    loadRestaurants(currentCity, fsqCat);
  } else {
    const source = currentCity
      ? (FALLBACK_BY_CITY[currentCity.id] ?? FALLBACK_BY_CITY.default)
      : FALLBACK_BY_CITY.default;

    const filtered = id === 'all'
      ? source
      : source.filter(r => r.cuisineSlug.includes(id));

    const result = filtered.length ? filtered : source;
    currentRestaurants = result;
    setRestaurantSource(result);
    setCurrentRestaurants(result);
    renderRestaurants(result);
    renderDineIn(result);
    updateHeroRestaurant(result);
  }
}


/* ── Filter & Sort Buttons ──────────────────────────────────────────────── */

function wireFilterSortButtons() {
  const filterBar = document.querySelector('.filter-sort-bar');
  if (!filterBar) return;

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn[data-filter], .filter-btn[data-sort]');
    if (!btn) return;

    filterBar.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');

    const filterKey = btn.dataset.filter;
    const sortKey   = btn.dataset.sort;

    let result = [...currentRestaurants];
    if (filterKey && filterKey !== 'all') result = applyFilter(filterKey, result);
    if (sortKey)                          result = applySort(sortKey, result);
    renderRestaurants(result);
  });
}


/* ── Category Chip Delegation ───────────────────────────────────────────── */

function wireCategoryChips() {
  const scroll = document.getElementById('categoriesScroll');
  if (!scroll) return;

  scroll.addEventListener('click', (e) => {
    const chip = e.target.closest('.cat-chip[data-id]');
    if (chip) selectCategory(chip.dataset.id, chip.dataset.fsq);
  });

  scroll.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const chip = e.target.closest('.cat-chip[data-id]');
      if (chip) { e.preventDefault(); selectCategory(chip.dataset.id, chip.dataset.fsq); }
    }
  });
}


/* ── Init ───────────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderCityList(ALL_CITIES);
  updateCartBadge();

  wireFilterSortButtons();
  wireCategoryChips();

  onSearch((filtered) => {
    currentRestaurants = filtered;
    setCurrentRestaurants(filtered);
    renderRestaurants(filtered);
  });

  onCityChange((city) => {
    activeCategoryId = 'all';
    setActiveCategoryChip('all');
    setCurrentRestaurants([]);
    loadRestaurants(city);
  });

  const savedCity = loadSavedCity();
  selectCity(savedCity?.id ?? 'bhopal');
});


/* ── Favourites ──────────────────────────────────────────────────────────── */

const favSection  = document.getElementById('favSection');
const favScroll   = document.getElementById('favScroll');
const favClearBtn = document.getElementById('favClearBtn');

function renderFavourites() {
  const ids  = [...getFavourites()];
  const list = ids
    .map(id => currentRestaurants.find(r => String(r.id) === id))
    .filter(Boolean);

  if (!list.length) { favSection.style.display = 'none'; return; }
  favSection.style.display = '';
  favScroll.innerHTML = '';

  list.forEach(r => {
    const card = document.createElement('article');
    card.className = 'fav-card fav-card--new';
    card.dataset.id = r.id;
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'listitem');
    card.setAttribute('aria-label', `View menu for ${r.name}`);

    card.innerHTML = `
      <div class="fav-card-img">
        <span aria-hidden="true">${r.emoji}</span>
        <button class="fav-card-remove" data-action="unfav"
                aria-label="Remove from favourites">✕</button>
      </div>
      <div class="fav-card-body">
        <div class="fav-card-name"></div>
        <div class="fav-card-cat"></div>
        <div class="fav-card-meta">
          <span class="fav-card-rating">★ ${r.rating}</span>
          <span>⏱ ${r.delivery}m · ${r.price}</span>
        </div>
      </div>`;

    card.querySelector('.fav-card-name').textContent = r.name;
    card.querySelector('.fav-card-cat').textContent  = r.category;
    favScroll.appendChild(card);
  });
}

favScroll.addEventListener('click', (e) => {
  const removeBtn = e.target.closest('[data-action="unfav"]');
  if (removeBtn) {
    const card = removeBtn.closest('.fav-card[data-id]');
    if (card) document.dispatchEvent(new CustomEvent('unfav', { detail: { id: card.dataset.id } }));
    return;
  }
  const card = e.target.closest('.fav-card[data-id]');
  if (card) openMenuModal(card.dataset.id);
});

favScroll.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    const card = e.target.closest('.fav-card[data-id]');
    if (card) { e.preventDefault(); openMenuModal(card.dataset.id); }
  }
});

if (favClearBtn) {
  favClearBtn.addEventListener('click', () => {
    [...getFavourites()].forEach(id =>
      document.dispatchEvent(new CustomEvent('unfav', { detail: { id } }))
    );
  });
}

document.addEventListener('favchange', renderFavourites);

document.addEventListener('unfav', (e) => {
  _toggleFav(e.detail.id);
  const btn = document.querySelector(`.rest-card[data-id="${e.detail.id}"] .rest-fav-btn`);
  if (btn) { btn.textContent = '♡'; btn.classList.remove('fav'); btn.setAttribute('aria-pressed', 'false'); }
});


/* ── Helpers ────────────────────────────────────────────────────────────── */

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
