const STORAGE_KEY = 'foodhub_favourites';

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch { return new Set(); }
}

function save(set) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}

const _favs = load();

export function toggleFav(id) {
  const sid = String(id);
  if (_favs.has(sid)) { _favs.delete(sid); }
  else                { _favs.add(sid);    }
  save(_favs);
  document.dispatchEvent(new CustomEvent('favchange', { detail: { id: sid } }));
  return _favs.has(sid);
}

export function isFav(id) { return _favs.has(String(id)); }

export function getFavourites() { return _favs; }

export function clearFavourites() {
  _favs.clear(); save(_favs);
  document.dispatchEvent(new CustomEvent('favchange'));
}
