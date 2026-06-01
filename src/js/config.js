
export const CITY_DIRECTORY = [
  {
    group: "🏙️ Metro Cities",
    cities: [
      { id: "mumbai",    name: "Mumbai",    state: "Maharashtra",    emoji: "🌊", lat: 19.0760, lng: 72.8777 },
      { id: "delhi",     name: "Delhi",     state: "NCR",            emoji: "🏛️", lat: 28.6139, lng: 77.2090 },
      { id: "bangalore", name: "Bangalore", state: "Karnataka",      emoji: "🌿", lat: 12.9716, lng: 77.5946 },
      { id: "hyderabad", name: "Hyderabad", state: "Telangana",      emoji: "💎", lat: 17.3850, lng: 78.4867 },
      { id: "chennai",   name: "Chennai",   state: "Tamil Nadu",     emoji: "🌴", lat: 13.0827, lng: 80.2707 },
      { id: "kolkata",   name: "Kolkata",   state: "West Bengal",    emoji: "🎭", lat: 22.5726, lng: 88.3639 },
    ],
  },
  {
    group: "🌆 Tier 2 Cities",
    cities: [
      { id: "pune",       name: "Pune",       state: "Maharashtra",    emoji: "🎓", lat: 18.5204, lng: 73.8567 },
      { id: "ahmedabad",  name: "Ahmedabad",  state: "Gujarat",        emoji: "🦁", lat: 23.0225, lng: 72.5714 },
      { id: "jaipur",     name: "Jaipur",     state: "Rajasthan",      emoji: "🏰", lat: 26.9124, lng: 75.7873 },
      { id: "lucknow",    name: "Lucknow",    state: "Uttar Pradesh",  emoji: "🕌", lat: 26.8467, lng: 80.9462 },
      { id: "bhopal",     name: "Bhopal",     state: "Madhya Pradesh", emoji: "🏞️", lat: 23.2599, lng: 77.4126 },
      { id: "indore",     name: "Indore",     state: "Madhya Pradesh", emoji: "🌃", lat: 22.7196, lng: 75.8577 },
      { id: "surat",      name: "Surat",      state: "Gujarat",        emoji: "💍", lat: 21.1702, lng: 72.8311 },
      { id: "nagpur",     name: "Nagpur",     state: "Maharashtra",    emoji: "🍊", lat: 21.1458, lng: 79.0882 },
    ],
  },
  {
    group: "🏖️ Coastal & Tourist",
    cities: [
      { id: "goa",        name: "Goa",        state: "Goa",            emoji: "🏝️", lat: 15.2993, lng: 74.1240 },
      { id: "kochi",      name: "Kochi",      state: "Kerala",         emoji: "⛵", lat:  9.9312, lng: 76.2673 },
      { id: "chandigarh", name: "Chandigarh", state: "Punjab",         emoji: "🌸", lat: 30.7333, lng: 76.7794 },
      { id: "agra",       name: "Agra",       state: "Uttar Pradesh",  emoji: "🕌", lat: 27.1767, lng: 78.0081 },
    ],
  },
];

export const ALL_CITIES = CITY_DIRECTORY.flatMap(g => g.cities);
export const findCity = (id) => ALL_CITIES.find(c => c.id === id) ?? null;

export const FOOD_CATEGORIES = [
  { id: "all",      label: "All",      emoji: "✨", fsqCategory: "13000" },
  { id: "pizza",    label: "Pizza",    emoji: "🍕", fsqCategory: "13064" },
  { id: "burgers",  label: "Burgers",  emoji: "🍔", fsqCategory: "13031" },
  { id: "indian",   label: "Indian",   emoji: "🍛", fsqCategory: "13199" },
  { id: "chinese",  label: "Chinese",  emoji: "🥡", fsqCategory: "13169" },
  { id: "sushi",    label: "Sushi",    emoji: "🍱", fsqCategory: "13267" },
  { id: "healthy",  label: "Healthy",  emoji: "🥗", fsqCategory: "13145" },
  { id: "desserts", label: "Desserts", emoji: "🍰", fsqCategory: "13040" },
  { id: "coffee",   label: "Coffee",   emoji: "☕", fsqCategory: "13035" },
  { id: "biryani",  label: "Biryani",  emoji: "🫕", fsqCategory: "13199" },
  { id: "pasta",    label: "Pasta",    emoji: "🍝", fsqCategory: "13236" },
  { id: "street",   label: "Street",   emoji: "🌮", fsqCategory: "13302" },
];

export const MENU_BY_RESTAURANT = {
  1: [
    { id: "m1", name: "Signature Curry",  emoji: "🍛", price: 280, rating: "4.8" },
    { id: "m2", name: "Butter Naan",      emoji: "🫓", price:  60, rating: "4.6" },
    { id: "m3", name: "Paneer Tikka",     emoji: "🧀", price: 320, rating: "4.7" },
    { id: "m4", name: "Dal Makhani",      emoji: "🫕", price: 220, rating: "4.9" },
    { id: "m5", name: "Gulab Jamun",      emoji: "🍮", price:  90, rating: "4.5" },
    { id: "m6", name: "Masala Chai",      emoji: "☕", price:  50, rating: "4.4" },
  ],
  2: [
    { id: "m1", name: "Classic Burger",   emoji: "🍔", price: 199, rating: "4.5" },
    { id: "m2", name: "Cheese Fries",     emoji: "🍟", price: 129, rating: "4.3" },
    { id: "m3", name: "Chicken Wrap",     emoji: "🌯", price: 179, rating: "4.6" },
    { id: "m4", name: "Milkshake",        emoji: "🥤", price: 149, rating: "4.7" },
    { id: "m5", name: "Onion Rings",      emoji: "🧅", price:  99, rating: "4.2" },
    { id: "m6", name: "Double Patty",     emoji: "🍔", price: 259, rating: "4.8" },
  ],
  3: [
    { id: "m1", name: "Caesar Salad",     emoji: "🥗", price: 249, rating: "4.6" },
    { id: "m2", name: "Quinoa Bowl",      emoji: "🥙", price: 299, rating: "4.7" },
    { id: "m3", name: "Avocado Toast",    emoji: "🥑", price: 199, rating: "4.5" },
    { id: "m4", name: "Detox Juice",      emoji: "🥤", price: 149, rating: "4.4" },
    { id: "m5", name: "Fruit Bowl",       emoji: "🍓", price: 179, rating: "4.8" },
    { id: "m6", name: "Greek Yogurt",     emoji: "🍦", price: 129, rating: "4.3" },
  ],
  4: [
    { id: "m1", name: "Margherita Pizza", emoji: "🍕", price: 349, rating: "4.7" },
    { id: "m2", name: "Pepperoni Pizza",  emoji: "🍕", price: 399, rating: "4.8" },
    { id: "m3", name: "Garlic Bread",     emoji: "🥖", price: 129, rating: "4.5" },
    { id: "m4", name: "Pasta Arrabbiata", emoji: "🍝", price: 299, rating: "4.6" },
    { id: "m5", name: "Tiramisu",         emoji: "🍰", price: 199, rating: "4.9" },
    { id: "m6", name: "Sparkling Water",  emoji: "💧", price:  60, rating: "4.0" },
  ],
  5: [
    { id: "m1", name: "Hakka Noodles",    emoji: "🍜", price: 199, rating: "4.5" },
    { id: "m2", name: "Fried Rice",       emoji: "🍚", price: 179, rating: "4.4" },
    { id: "m3", name: "Manchurian",       emoji: "🥢", price: 229, rating: "4.7" },
    { id: "m4", name: "Dim Sum (6 pc)",   emoji: "🥟", price: 249, rating: "4.6" },
    { id: "m5", name: "Chilli Paneer",    emoji: "🌶️", price: 259, rating: "4.8" },
    { id: "m6", name: "Hot & Sour Soup",  emoji: "🍲", price: 149, rating: "4.3" },
  ],
  6: [
    { id: "m1", name: "Salmon Nigiri",    emoji: "🍱", price: 499, rating: "4.9" },
    { id: "m2", name: "Dragon Roll",      emoji: "🍣", price: 549, rating: "4.8" },
    { id: "m3", name: "Edamame",          emoji: "🫘", price: 199, rating: "4.5" },
    { id: "m4", name: "Miso Soup",        emoji: "🍵", price: 149, rating: "4.4" },
    { id: "m5", name: "Tempura",          emoji: "🍤", price: 349, rating: "4.7" },
    { id: "m6", name: "Green Tea",        emoji: "🍵", price:  99, rating: "4.6" },
  ],
};

export const DEFAULT_MENU = [
  { id: "m1", name: "Chef's Special",  emoji: "🍽️", price: 349, rating: "4.7" },
  { id: "m2", name: "House Curry",     emoji: "🍛", price: 259, rating: "4.5" },
  { id: "m3", name: "Fresh Bread",     emoji: "🫓", price:  79, rating: "4.3" },
  { id: "m4", name: "Dessert Platter", emoji: "🍰", price: 199, rating: "4.6" },
  { id: "m5", name: "Cold Beverage",   emoji: "🥤", price:  99, rating: "4.4" },
  { id: "m6", name: "House Salad",     emoji: "🥗", price: 149, rating: "4.2" },
];

function mkR(id, name, category, emoji, rating, delivery, price, promo, veg, dinein) {
  return {
    id, name, category, emoji, rating, delivery, price,
    promo: promo ?? null, veg, dinein,
    cuisineSlug: category.toLowerCase().split(' ')[0],
  };
}

export const FALLBACK_BY_CITY = {
  mumbai:    [ mkR(1,"Mahesh Lunch Home","Seafood · Coastal","🦐",4.8,25,"₹₹","20% OFF",false,true), mkR(2,"Britannia & Co.","Parsi · Cafe","🥚",4.9,30,"₹₹",null,false,true), mkR(3,"Swati Snacks","Gujarati · Snacks","🥙",4.7,20,"₹","Free drink",true,false), mkR(4,"Bademiya","Kebabs · Street","🍢",4.6,18,"₹",null,false,false), mkR(5,"The Table","European · Fine","🥗",4.8,40,"₹₹₹","Chef special",false,true), mkR(6,"Haji Ali Juice","Juices · Snacks","🥤",4.5,15,"₹",null,true,false) ],
  delhi:     [ mkR(1,"Karim's","Mughlai · Kebabs","🍢",4.9,20,"₹₹","30% OFF",false,true), mkR(2,"Bukhara (ITC)","North Indian · Fine","🍛",4.8,35,"₹₹₹",null,false,true), mkR(3,"Paranthe Wali Gali","Street · Parathas","🫓",4.6,15,"₹",null,true,false), mkR(4,"Saravana Bhavan","South Indian · Veg","🥘",4.7,22,"₹",null,true,false), mkR(5,"Gulati","North Indian · Mughlai","🍲",4.5,28,"₹₹","Family packs",false,true), mkR(6,"Indian Accent","Fusion · Fine","🍽️",4.9,45,"₹₹₹","Tasting menu",false,true) ],
  bangalore: [ mkR(1,"Vidyarthi Bhavan","South Indian · Veg","🥘",4.9,20,"₹",null,true,false), mkR(2,"Toit Brewpub","Burgers · Craft Beer","🍺",4.7,30,"₹₹","Happy hours",false,true), mkR(3,"Truffles","Burgers · American","🍔",4.6,25,"₹₹",null,false,false), mkR(4,"Meghana Foods","Biryani · Andhra","🫕",4.8,22,"₹₹","Bestseller",false,false), mkR(5,"Koshy's","Bakery · Continental","☕",4.6,35,"₹₹",null,false,true), mkR(6,"Airlines Hotel","South Indian","🍛",4.7,18,"₹",null,true,false) ],
  hyderabad: [ mkR(1,"Paradise Biryani","Biryani · Mughlai","🫕",4.9,22,"₹₹","Family packs",false,true), mkR(2,"Shah Ghouse","Biryani · Nihari","🍲",4.8,25,"₹₹",null,false,false), mkR(3,"Chutneys","South Indian · Veg","🥘",4.7,20,"₹",null,true,false), mkR(4,"Kritunga","Andhra · Non-Veg","🍛",4.6,28,"₹₹","30% OFF",false,true), mkR(5,"Café Bahar","Irani Café","☕",4.5,18,"₹",null,false,false), mkR(6,"Barbeque Nation","BBQ · Grill","🔥",4.7,35,"₹₹₹","Live grill",false,true) ],
  chennai:   [ mkR(1,"Murugan Idli Shop","South Indian · Veg","🥘",4.9,18,"₹","Free chutney",true,false), mkR(2,"Anjappar","Chettinad · Spicy","🍛",4.7,25,"₹₹",null,false,true), mkR(3,"Saravana Bhavan","South Indian · Veg","🍽️",4.8,22,"₹",null,true,false), mkR(4,"Junior Kuppanna","Kongu · Non-Veg","🍖",4.6,28,"₹₹","Weekend special",false,true), mkR(5,"Buhari","Mughlai · Kebabs","🍢",4.5,30,"₹₹",null,false,false), mkR(6,"Thalappakatti","Biryani","🫕",4.7,20,"₹₹","Bestseller",false,false) ],
  kolkata:   [ mkR(1,"Peter Cat","Continental · Chelo","🍽️",4.8,30,"₹₹","Chelo kebab",false,true), mkR(2,"Kewpies","Bengali · Homestyle","🐟",4.9,35,"₹₹",null,false,true), mkR(3,"Arsalan","Biryani · Mughlai","🫕",4.8,22,"₹₹","30% OFF",false,false), mkR(4,"Flurys","Bakery · Cafe","🥐",4.7,25,"₹₹",null,false,true), mkR(5,"Oh Calcutta!","Bengali · Fine","🐟",4.7,40,"₹₹₹","Chef special",false,true), mkR(6,"Anadi Cabin","Street · Bengali","🥙",4.5,15,"₹",null,true,false) ],
  pune:      [ mkR(1,"Vaishali","South Indian · Veg","🥘",4.8,20,"₹","Best misal",true,false), mkR(2,"Shabree","Maharashtrian · Veg","🥙",4.7,22,"₹",null,true,false), mkR(3,"Cafe Goodluck","Irani Cafe","☕",4.6,18,"₹",null,false,false), mkR(4,"Malaka Spice","Pan-Asian","🍜",4.6,30,"₹₹",null,false,true), mkR(5,"Raan Ki Rasoi","Mughlai · Kebabs","🍢",4.7,28,"₹₹","Weekend offer",false,true), mkR(6,"German Bakery","Cafe · Continental","🥐",4.5,25,"₹₹",null,false,true) ],
  bhopal:    [ mkR(1,"Bapu Ki Kutia","Street · Chaat","🥙",4.7,15,"₹","Free raita",true,false), mkR(2,"Manohar Dairy","Snacks · Sweets","🍮",4.8,12,"₹",null,true,false), mkR(3,"Wind & Waves","Continental · Lake","🌊",4.6,30,"₹₹",null,false,true), mkR(4,"Hotel Jehan Numa","Mughlai · Fine","🍲",4.5,35,"₹₹₹","Lake view",false,true), mkR(5,"Mangaliya","North Indian","🍛",4.4,22,"₹₹",null,false,false), mkR(6,"Indian Coffee House","Coffee · Snacks","☕",4.3,18,"₹",null,true,false) ],
  jaipur:    [ mkR(1,"Laxmi Mishtan Bhandar","Sweets · Snacks","🍮",4.9,15,"₹",null,true,false), mkR(2,"Chokhi Dhani","Rajasthani · Thali","🥘",4.8,20,"₹₹","Cultural show",true,true), mkR(3,"Suvarna Mahal","Fine Dining · Royal","🍽️",4.8,40,"₹₹₹","Royal thali",false,true), mkR(4,"Niros","Mughlai · North Indian","🍛",4.6,28,"₹₹",null,false,true), mkR(5,"Peacock Rooftop","Rooftop · Fusion","🌅",4.7,35,"₹₹","View combo",false,true), mkR(6,"Bar Palladio","Italian · Garden","🌿",4.7,38,"₹₹₹",null,false,true) ],
  goa:       [ mkR(1,"Britto's","Seafood · Beachside","🦞",4.8,30,"₹₹","Happy hours",false,true), mkR(2,"Gunpowder","Kerala · Goan","🌶️",4.8,35,"₹₹",null,false,true), mkR(3,"Cafe Chocolatti","Cafe · Desserts","🍰",4.7,20,"₹₹",null,false,false), mkR(4,"A Reverie","Fusion · Garden","🌿",4.9,40,"₹₹₹","Chef tasting",false,true), mkR(5,"Vinayak Family Restaurant","Goan · Local","🍤",4.6,22,"₹₹",null,false,false), mkR(6,"Fisherman's Wharf","Seafood · Riverside","⛵",4.7,35,"₹₹","Catch of day",false,true) ],
  default:   [ mkR(1,"The Grand Spice","North Indian","🍛",4.8,25,"₹₹","30% OFF",false,true), mkR(2,"Burger Republic","Burgers · Fast Food","🍔",4.5,18,"₹","Free drink",false,false), mkR(3,"Green Bowl","Salads · Healthy","🥗",4.7,22,"₹₹",null,true,false), mkR(4,"Pizza Piazza","Pizza · Italian","🍕",4.6,30,"₹₹","2 for 1",false,true), mkR(5,"Dragon Wok","Chinese · Pan-Asian","🍜",4.4,28,"₹",null,false,false), mkR(6,"Sushi Sakura","Japanese · Sushi","🍱",4.9,35,"₹₹₹","Premium",false,true) ],
};

export const GRADIENTS = [
  'linear-gradient(135deg,#1A0A00,#6B2B00)',
  'linear-gradient(135deg,#002B1A,#00693E)',
  'linear-gradient(135deg,#00182B,#0056A6)',
  'linear-gradient(135deg,#2B001A,#8A0052)',
  'linear-gradient(135deg,#1A1A00,#5C5C00)',
  'linear-gradient(135deg,#0A001A,#5200A0)',
  'linear-gradient(135deg,#001A28,#007AB5)',
  'linear-gradient(135deg,#280000,#A00000)',
];

export const STATIC_SUGGESTIONS = [
  { label: "Pizza near me",       emoji: "🍕", type: "query" },
  { label: "Biryani",             emoji: "🫕", type: "query" },
  { label: "Healthy food",        emoji: "🥗", type: "query" },
  { label: "Late night delivery", emoji: "🌙", type: "query" },
  { label: "Best rated",          emoji: "⭐", type: "query" },
];
