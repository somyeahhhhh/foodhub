

let activeController = null;

export async function fetchRestaurants(city, categoryId = "13000") {
  if (activeController) activeController.abort();
  activeController = new AbortController();

  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="restaurant"](around:5000,${city.lat},${city.lng});
      node["amenity"="cafe"](around:5000,${city.lat},${city.lng});
      node["amenity"="fast_food"](around:5000,${city.lat},${city.lng});
    );
    out body 16;
  `;

  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: query,
    signal: activeController.signal,
  });

  if (!res.ok) throw new Error(`API error: HTTP ${res.status}`);
  const json = await res.json();
  if (!json.elements?.length) return null;
  return json.elements.map((place, i) => mapOSMPlace(place, i));
}

function mapOSMPlace(place, idx) {
  const tags = place.tags || {};
  const name = tags.name || "Restaurant";
  const cuisine = tags.cuisine || "restaurant";
  const emoji = getCategoryEmoji(cuisine);
  const rating = (3.8 + Math.random() * 1.1).toFixed(1);
  const priceSymbols = ["₹", "₹₹", "₹₹₹", "₹₹₹₹"];
  const price = priceSymbols[Math.floor(Math.random() * 2)];
  const promos = ["20% OFF", "Free delivery", "Chef's special"];

  return {
    id: place.id ?? idx + 1,
    name,
    category: cuisine.replace(/_/g, " "),
    emoji,
    rating: parseFloat(rating),
    delivery: 15 + Math.floor(Math.random() * 30),
    price,
    promo: idx < 3 ? promos[idx] : null,
    veg: Math.random() > 0.6,
    dinein: Math.random() > 0.5,
    cuisineSlug: cuisine.toLowerCase().replace(/\s+/g, "-"),
    photo: null,
    address: tags["addr:street"] || tags["addr:city"] || "",
  };
}

export function getCategoryEmoji(cat) {
  const c = cat.toLowerCase();
  const mapping = [
    [["pizza"], "🍕"],
    [["burger"], "🍔"],
    [["indian", "biryani", "curry"], "🍛"],
    [["chinese", "asian"], "🥡"],
    [["sushi", "japanese"], "🍱"],
    [["italian", "pasta"], "🍝"],
    [["cafe", "coffee"], "☕"],
    [["dessert", "ice cream"], "🍰"],
    [["seafood", "fish"], "🦐"],
    [["kebab", "bbq", "grill"], "🍢"],
    [["bakery", "bread"], "🥐"],
    [["salad", "healthy"], "🥗"],
    [["mexican", "taco"], "🌮"],
    [["thai"], "🍜"],
    [["south_indian"], "🥘"],
  ];
  for (const [keywords, emoji] of mapping) {
    if (keywords.some((k) => c.includes(k))) return emoji;
  }
  return "🍽️";
}