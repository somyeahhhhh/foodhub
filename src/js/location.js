import { ALL_CITIES, CITY_DIRECTORY, findCity } from './config.js';

const CITY_STORAGE_KEY = 'foodhub_city';

const locationBtn      = document.getElementById('locationBtn');
const locationDropdown = document.getElementById('locationDropdown');
const locationText     = document.getElementById('locationText');
const locSearchInput   = document.getElementById('locSearchInput');
const citiesList       = document.getElementById('citiesList');
const geoBtn           = document.getElementById('geoBtn');

let currentCity = null;
let onCityChangeCb = null;

export function onCityChange(cb) {
  onCityChangeCb = cb;
}

export function getCurrentCity() {
  return currentCity;
}

export function loadSavedCity() {
  try {
    const id = localStorage.getItem(CITY_STORAGE_KEY);
    return id ? findCity(id) : null;
  } catch {
    return null;
  }
}

function saveCityToStorage(cityId) {
  try {
    localStorage.setItem(CITY_STORAGE_KEY, cityId);
  } catch (err) {
    console.warn('Location: could not persist city to localStorage', err);
  }
}

export function selectCity(cityId) {
  const city = findCity(cityId);
  if (!city) { console.warn(`selectCity: unknown id "${cityId}"`); return; }
  currentCity = city;
  saveCityToStorage(cityId);
  locationText.textContent = `${city.emoji} ${city.name}`;
  closeLocationDropdown();
  if (onCityChangeCb) onCityChangeCb(city);
}

function openLocationDropdown() {
  locationDropdown.classList.add('open');
  locationBtn.classList.add('open');
  locationBtn.setAttribute('aria-expanded', 'true');
  locSearchInput.value = '';
  renderCityList(ALL_CITIES, true);
  setTimeout(() => locSearchInput.focus(), 80);
}

export function closeLocationDropdown() {
  locationDropdown.classList.remove('open');
  locationBtn.classList.remove('open');
  locationBtn.setAttribute('aria-expanded', 'false');
}

locationBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = locationDropdown.classList.contains('open');
  if (isOpen) closeLocationDropdown();
  else openLocationDropdown();
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-location-wrap')) closeLocationDropdown();
});

locationDropdown.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLocationDropdown();
});

citiesList.addEventListener('click', (e) => {
  const item = e.target.closest('.loc-city-item[data-city-id]');
  if (item) selectCity(item.dataset.cityId);
});

export function filterCities(val) {
  const q = val.toLowerCase().trim();
  const filtered = q
    ? ALL_CITIES.filter(c =>
        c.name.toLowerCase().includes(q) || c.state.toLowerCase().includes(q))
    : ALL_CITIES;
  renderCityList(filtered, q === '');
}

export function renderCityList(cities, grouped = true) {
  if (!cities.length) {
    citiesList.innerHTML = `<div class="loc-empty">No cities found</div>`;
    return;
  }

  if (!grouped) {
    citiesList.innerHTML = cities.map(cityItemHTML).join('');
    return;
  }

  let html = '';
  CITY_DIRECTORY.forEach(group => {
    const groupCities = group.cities.filter(c => cities.includes(c));
    if (!groupCities.length) return;
    html += `<div class="loc-group-label">${group.group}</div>`;
    html += groupCities.map(cityItemHTML).join('');
  });
  citiesList.innerHTML = html;
}

function cityItemHTML(c) {
  const selected = currentCity?.id === c.id;
  return `
    <div class="loc-city-item ${selected ? 'selected' : ''}"
         data-city-id="${c.id}"
         role="option"
         aria-selected="${selected}"
         tabindex="0">
      <span class="loc-city-icon" aria-hidden="true">${c.emoji}</span>
      <div>
        <div class="loc-city-name">${c.name}</div>
        <div class="loc-city-sub">${c.state}</div>
      </div>
      ${selected ? '<span class="loc-tick" aria-hidden="true">✓</span>' : ''}
    </div>`;
}

locSearchInput.addEventListener('input', (e) => filterCities(e.target.value));

export function detectLocation() {
  if (!('geolocation' in navigator)) return;

  if (geoBtn) {
    geoBtn.textContent = '📍 Detecting…';
    geoBtn.disabled = true;
  }

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const nearest = findNearestCity(coords.latitude, coords.longitude);
      if (nearest) selectCity(nearest.id);
      if (geoBtn) { geoBtn.textContent = '📍 Use my location'; geoBtn.disabled = false; }
    },
    (err) => {
      console.warn('Geolocation error:', err.message);
      if (geoBtn) { geoBtn.textContent = '📍 Use my location'; geoBtn.disabled = false; }
    },
    { timeout: 8000 }
  );
}

function findNearestCity(lat, lng) {
  let nearest = null;
  let minDist = Infinity;
  ALL_CITIES.forEach(city => {
    const dist = haversineKm(lat, lng, city.lat, city.lng);
    if (dist < minDist) { minDist = dist; nearest = city; }
  });
  return nearest;
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const R    = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a    =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const toRad = (deg) => (deg * Math.PI) / 180;

if (geoBtn) {
  geoBtn.addEventListener('click', detectLocation);
}
