import { getGradient } from './restaurants.js';
import { openReserveModal } from './auth.js';

const dineinGrid = document.getElementById('dineinGrid');

export function renderDineIn(list = []) {
  const dineList = list.filter(r => r.dinein);

  if (!dineList.length) {
    dineinGrid.innerHTML =
      `<p class="no-dinein-msg">No dine-in restaurants found for this area.</p>`;
    return;
  }

  dineinGrid.innerHTML = dineList.map(r => {
    const gradient = getGradient(String(r.id));
    const photoImg = r.photo
      ? `<img src="${r.photo}" alt="${escHtml(r.name)}" class="dinein-photo" loading="lazy"/>`
      : '';

    return `
      <article class="dinein-card">
        <div class="dinein-img" style="--card-gradient:${gradient}">
          ${photoImg}
          <span class="dinein-emoji" aria-hidden="true">${r.emoji}</span>
          <span class="dinein-badge">Dine-In</span>
        </div>
        <div class="dinein-body">
          <div class="dinein-name">${escHtml(r.name)}</div>
          <div class="dinein-meta">${escHtml(r.category)}</div>
          <div class="dinein-row">
            <div class="dinein-info">
              <span class="dinein-info-item" aria-label="Rating ${r.rating}">★ ${r.rating}</span>
              <span class="dinein-info-item">${r.price}</span>
            </div>
            <button
              class="btn-reserve"
              data-restaurant="${escHtml(r.name)}"
              aria-label="Reserve a table at ${escHtml(r.name)}">
              🍽️ Reserve
            </button>
          </div>
        </div>
      </article>`;
  }).join('');
}

dineinGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-reserve[data-restaurant]');
  if (btn) openReserveModal(btn.dataset.restaurant);
});

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
