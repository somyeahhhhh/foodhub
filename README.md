# 🍔 Foodhub – Food Delivery Web Application

A responsive food delivery web app built with vanilla HTML, CSS, and JavaScript — inspired by Zomato and Swiggy. Features real restaurant data, Firebase authentication, dark mode, cart management, and more.

**Live Demo → [foodhub-97b0f.web.app](https://foodhub-97b0f.web.app)**

---

## Screenshots

> Landing page with hero section, search, categories, and featured restaurants.

---

## Features Implemented

### Core
- **Landing Page** — Hero section, promotional banner, food category chips, featured restaurants
- **Restaurant Listing** — Cards with name, rating, delivery time, cuisine, price indicator
- **Search** — Live search with suggestions across restaurant names and cuisines
- **Filter & Sort** — Filter by Veg, Offers; sort by Top Rated or Fastest delivery
- **Food Menu** — Per-restaurant menu modal with food items, prices, ratings, and Add to Cart
- **Cart System** — Add, remove, increase/decrease quantity, subtotal, GST, total bill
- **Dine-In & Reservations** — Reserve a table with date, time, guests, and special requests

### Bonus Features ✅
- **Dark Mode** — Toggle between light and dark themes, persisted in localStorage
- **Firebase Authentication** — Email/password sign up and login via Firebase Auth
- **Dynamic API Data** — Live restaurant data fetched from OpenStreetMap Overpass API
- **Recently Viewed** — Tracks last visited restaurants using a Stack
- **Favourites / Wishlist** — Save and manage favourite restaurants
- **Responsive Design** — Works on mobile and desktop screens
- **Animations & Transitions** — Hover effects, smooth loading, float cards

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom, no framework) |
| Logic |  JavaScript |
| Auth | Firebase Authentication |
| Data | OpenStreetMap Overpass API |
| Hosting | Firebase Hosting |

---

## Data Structures Used

### 1. Array — Cart Management
**Where:** `src/js/cart.js`  
**Why:** Cart items are stored as an array of objects. Arrays provide O(1) push for adding items and O(n) find for updating quantity — ideal for a small, ordered list of cart items.  
**Operations:**
- Add item → `Array.push()` → O(1)
- Remove item → `Array.filter()` → O(n)
- Update quantity → `Array.find()` → O(n)

### 2. Array Filtering — Search Suggestions
**Where:** `src/js/search.js`  
**Why:** Restaurant list is filtered in real-time using `Array.filter()` on name and cuisine fields. Simple and efficient for the dataset size.  
**Operations:**
- Search filter → `Array.filter()` → O(n)

### 3. Sorting Algorithms — Restaurant Sorting
**Where:** `src/js/restaurants.js`  
**Why:** `Array.sort()` (Timsort, O(n log n)) is used to sort restaurants by rating (descending) or delivery time (ascending).  
**Operations:**
- Sort by rating → O(n log n)
- Sort by delivery time → O(n log n)

### 4. Stack — Recently Viewed
**Where:** `src/js/menu.js`  
**Why:** A Stack (LIFO) is used to track recently viewed restaurants. New views are pushed to the top; only the last 5 are shown. Perfect for history tracking.  
**Operations:**
- Push view → O(1)
- Display top N → O(n)

### 5. HashMap (Object) — Category Filtering
**Where:** `src/js/config.js`, `src/js/restaurants.js`  
**Why:** Food categories are stored as a HashMap with category ID as key and metadata as value — O(1) lookup when filtering restaurants by category.  
**Operations:**
- Category lookup → O(1)

---

## Project Setup

### Prerequisites
- [Node.js](https://nodejs.org) (v18 or above)
- A modern browser (Chrome, Firefox, Edge)

### Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/foodhub.git
cd foodhub

# 2. Install dependencies
npm install

# 3. Start local server
npm start

# 4. Open in browser
# Go to http://localhost:3000
```

### Deploy to Firebase

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Deploy
firebase deploy
```

---

## Project Structure

```
foodhub/
├── index.html          # Main HTML entry point
├── src/
│   ├── js/
│   │   ├── api.js          # OpenStreetMap API integration
│   │   ├── auth.js         # Firebase authentication
│   │   ├── cart.js         # Cart logic (Array DS)
│   │   ├── config.js       # City list, categories, menu data
│   │   ├── darkmode.js     # Dark mode toggle
│   │   ├── dineIn.js       # Dine-in section
│   │   ├── favourites.js   # Favourites / wishlist
│   │   ├── firebase.js     # Firebase config
│   │   ├── location.js     # City selection
│   │   ├── main.js         # App entry, restaurant pipeline
│   │   ├── menu.js         # Menu modal, recently viewed (Stack DS)
│   │   ├── restaurants.js  # Render, filter, sort (Sorting DS)
│   │   ├── search.js       # Live search (Array filter DS)
│   │   └── ui.js           # Loading, error states
│   └── styles.css          # All styling
└── package.json
```

---

## API

Restaurant data is fetched live from the **OpenStreetMap Overpass API** based on the selected city's coordinates. No API key required.

```
https://overpass-api.de/api/interpreter
```


## Live Demo

🌐 **[foodhub-97b0f.web.app](https://foodhub-97b0f.web.app)**

---

