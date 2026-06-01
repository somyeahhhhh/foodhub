import { FOOD_CATEGORIES, FALLBACK_BY_CITY, GRADIENTS } from './config.js';
import { openMenuModal }    from './menu.js';
import { renderDineIn }     from './dineIn.js';
import { toggleFav, isFav } from './favourites.js';

const restaurantGrid    = document.getElementById('restaurantGrid');
const categoriesScroll  = document.getElementById('categoriesScroll');
const statRestaurants   = document.getElementById('statRestaurants');

export function getGradient(id) {
  const n = typeof id === 'number'
    ? id
    : String(id).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return GRADIENTS[n % GRADIENTS.length];
}

export function renderRestaurants(list) {
  if (!list.length) {
    restaurantGrid.innerHTML = `
      <div class="no-results" style="grid-column:1/-1;">
        <div class="no-results-icon" aria-hidden="true">🍽️</div>
        <p>No restaurants found. Try a different filter.</p>
      </div>`;
    return;
  }

  restaurantGrid.innerHTML = list.map(r => {
    const gradient = getGradient(String(r.id));
    const imgContent = r.photo
      ? `<img src="${r.photo}" alt="${escHtml(r.name)}" class="rest-photo" loading="lazy"/><span class="rest-emoji-overlay" aria-hidden="true">${r.emoji}</span>`
      : `<span aria-hidden="true">${r.emoji}</span>`;

    return `
      <article class="rest-card" data-id="${r.id}" role="button" tabindex="0"
               aria-label="View menu for ${escHtml(r.name)}"
               style="--card-gradient:${gradient}">
        <div class="rest-img ${r.photo ? '' : 'rest-img--gradient'}">
          ${imgContent}
          <button class="rest-fav-btn ${isFav(r.id) ? 'fav' : ''}" data-action="fav"
                  aria-label="${isFav(r.id) ? 'Remove' : 'Add'} ${escHtml(r.name)} from favourites"
                  aria-pressed="${isFav(r.id)}">${isFav(r.id) ? '♥' : '♡'}</button>
          ${r.promo ? `<span class="rest-promo-tag">${escHtml(r.promo)}</span>` : ''}
        </div>
        <div class="rest-body">
          <div class="rest-name">${escHtml(r.name)}</div>
          <div class="rest-cat">${escHtml(r.category)}</div>
          <div class="rest-meta">
            <span class="rest-rating" aria-label="Rating ${r.rating} out of 5">★ ${r.rating}</span>
            <span class="rest-time" aria-label="${r.delivery} minutes delivery time">⏱ ${r.delivery} min</span>
            <span class="rest-separator" aria-hidden="true">·</span>
            <span class="rest-price">${r.price}</span>
            ${r.veg ? '<span class="badge badge-green">Veg</span>' : ''}
          </div>
        </div>
      </article>`;
  }).join('');

  updateRestaurantCount(list.length);
}

export function updateRestaurantCount(count) {
  if (statRestaurants) statRestaurants.textContent = `${count}+`;
}

restaurantGrid.addEventListener('click', handleGridClick);
restaurantGrid.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleGridClick(e);
  }
});

function handleGridClick(e) {
  const favBtn = e.target.closest('[data-action="fav"]');
  if (favBtn) {
    e.stopPropagation();
    const card = favBtn.closest('.rest-card[data-id]');
    if (!card) return;
    const isNowFav = toggleFav(card.dataset.id);
    favBtn.setAttribute('aria-pressed', String(isNowFav));
    favBtn.classList.toggle('fav', isNowFav);
    favBtn.textContent = isNowFav ? '♥' : '♡';
    favBtn.setAttribute('aria-label',
      `${isNowFav ? 'Remove' : 'Add'} ${card.querySelector('.rest-name')?.textContent ?? ''} from favourites`
    );
    return;
  }

  const card = e.target.closest('.rest-card[data-id]');
  if (card) openMenuModal(card.dataset.id);
}

export function renderCategories() {
  categoriesScroll.innerHTML = FOOD_CATEGORIES.map(c => `
    <div class="cat-chip ${c.id === 'all' ? 'active' : ''}"
         data-id="${c.id}"
         data-fsq="${c.fsqCategory}"
         role="button"
         tabindex="0"
         aria-pressed="${c.id === 'all'}"
         aria-label="Filter by ${c.label}">
      <span class="cat-chip-icon" aria-hidden="true">${c.emoji}</span>
      <span class="cat-chip-label">${c.label}</span>
    </div>
  `).join('');
}

export function setActiveCategoryChip(id) {
  categoriesScroll.querySelectorAll('.cat-chip').forEach(chip => {
    const isActive = chip.dataset.id === id;
    chip.classList.toggle('active', isActive);
    chip.setAttribute('aria-pressed', String(isActive));
  });
}

export function applyFilter(key, source) {
  if (key === 'veg')    return source.filter(r => r.veg);
  if (key === 'offers') return source.filter(r => r.promo);
  return [...source];
}

export function applySort(key, source) {
  return [...source].sort((a, b) =>
    key === 'rating' ? b.rating - a.rating : a.delivery - b.delivery
  );
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
