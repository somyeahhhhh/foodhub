import { MENU_BY_RESTAURANT, DEFAULT_MENU } from './config.js';
import { handleAddToCart }                  from './cart.js';

const menuModal       = document.getElementById('menuModal');
const menuModalHeader = document.getElementById('menuModalHeader');
const menuGrid        = document.getElementById('menuGrid');
const menuClose       = document.getElementById('menuClose');

let _restaurants = [];

export function setCurrentRestaurants(list) {
  _restaurants = list;
}

const recentlyViewed = [];

function trackView(id) {
  const idx = recentlyViewed.indexOf(String(id));
  if (idx !== -1) recentlyViewed.splice(idx, 1);
  recentlyViewed.push(String(id));
  if (recentlyViewed.length > 10) recentlyViewed.shift();
}

export function getRecentlyViewed() {
  return [...recentlyViewed].reverse();
}

let _onMenuCloseCb = null;

export function onMenuClose(cb) {
  _onMenuCloseCb = cb;
}

export function openMenuModal(id) {
  const restaurant = _restaurants.find(r => String(r.id) === String(id));
  if (!restaurant) {
    console.warn(`openMenuModal: restaurant "${id}" not found in current list.`);
    return;
  }

  trackView(id);

  menuModalHeader.innerHTML = '';
  const h3 = document.createElement('h3');
  h3.textContent = `${restaurant.emoji} ${restaurant.name}`;
  const p = document.createElement('p');
  p.textContent = `${restaurant.category} · ★ ${restaurant.rating} · ⏱ ${restaurant.delivery} min · ${restaurant.price}`;
  menuModalHeader.append(h3, p);

  const items = MENU_BY_RESTAURANT[Number(id)] ?? DEFAULT_MENU;
  menuGrid.innerHTML = '';
  const fragment = document.createDocumentFragment();

  items.forEach(item => {
    const compositeId = `${item.id}-${id}`;
    const card = document.createElement('div');
    card.className = 'menu-item';
    card.setAttribute('role', 'listitem');
    card.innerHTML = `
      <div class="menu-item-img" aria-hidden="true">${item.emoji}</div>
      <div class="menu-item-body">
        <div class="menu-item-name"></div>
        <div class="menu-item-rating" aria-label="Rating ${item.rating} out of 5">★ ${item.rating}</div>
        <div class="menu-item-footer">
          <span class="menu-item-price">₹${item.price}</span>
          <button
            class="btn-add-cart"
            id="addBtn-${compositeId}"
            data-item-id="${compositeId}"
            data-name=""
            data-price="${item.price}"
            data-emoji="${item.emoji}"
            aria-label="Add ${escHtml(item.name)} to cart"
          >+ Add</button>
        </div>
      </div>`;

    card.querySelector('.menu-item-name').textContent = item.name;
    card.querySelector('.btn-add-cart').dataset.name  = item.name;
    fragment.appendChild(card);
  });

  menuGrid.appendChild(fragment);
  menuModal.classList.add('open');
  menuModal.setAttribute('aria-hidden', 'false');
  menuClose.focus();
}

function closeMenuModal() {
  menuModal.classList.remove('open');
  menuModal.setAttribute('aria-hidden', 'true');
  if (_onMenuCloseCb) _onMenuCloseCb();
}

menuClose.addEventListener('click', closeMenuModal);
menuModal.addEventListener('click', (e) => { if (e.target === menuModal) closeMenuModal(); });
menuModal.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenuModal(); });

menuGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-add-cart[data-item-id]');
  if (!btn) return;
  const itemId = btn.dataset.itemId;
  const name   = btn.dataset.name;
  const price  = Number(btn.dataset.price);
  const emoji  = btn.dataset.emoji;
  handleAddToCart(itemId, name, price, emoji);
});

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
