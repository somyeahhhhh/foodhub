const apiLoadingText = document.getElementById('apiLoadingText');
const apiLoadingBar  = document.getElementById('apiLoadingBar');
const apiErrorText   = document.getElementById('apiErrorText');
const apiErrorBar    = document.getElementById('apiErrorBar');
const restaurantGrid = document.getElementById('restaurantGrid');
const floatETA       = document.getElementById('floatETA');

const SKELETON_COUNT = 6;

export function showLoading(msg = 'Finding restaurants…') {
  apiLoadingText.textContent = msg;
  apiLoadingBar.classList.add('show');
  restaurantGrid.innerHTML   = buildSkeletons(SKELETON_COUNT);
}

export function hideLoading() {
  apiLoadingBar.classList.remove('show');
}

export function showError(msg) {
  apiErrorText.textContent = msg;
  apiErrorBar.classList.add('show');
}

export function hideError() {
  apiErrorBar.classList.remove('show');
}

export function updateFloatETA(cityId) {
  if (!floatETA) return;
  floatETA.textContent = `~${cityId === 'goa' ? 35 : 25} min`;
}

function buildSkeletons(count) {
  const card = `
    <div class="rest-card" aria-hidden="true">
      <div class="rest-img skeleton" style="height:170px;"></div>
      <div class="rest-body">
        <div class="skeleton" style="height:18px;width:60%;margin-bottom:8px;"></div>
        <div class="skeleton" style="height:13px;width:40%;"></div>
      </div>
    </div>`;
  return Array(count).fill(card).join('');
}
