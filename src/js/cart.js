const CART_STORAGE_KEY = 'foodhub_cart';

const dom = {
  cartDrawer:   document.getElementById('cartDrawer'),
  cartOverlay:  document.getElementById('cartOverlay'),
  cartItems:    document.getElementById('cartItems'),
  cartFooter:   document.getElementById('cartFooter'),
  cartCount:    document.getElementById('cartCount'),
  cartSubtotal: document.getElementById('cartSubtotal'),
  cartTaxes:    document.getElementById('cartTaxes'),
  cartTotal:    document.getElementById('cartTotal'),
  cartBtn:      document.getElementById('cartBtn'),
  cartCloseBtn: document.getElementById('cartCloseBtn'),
  checkoutBtn:  document.getElementById('checkoutBtn'),
};

let cart = loadCartFromStorage();

function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (err) {
    console.warn('Cart: could not persist to localStorage', err);
  }
}

export function addToCart(itemId, name, price, emoji) {
  if (cart[itemId]) {
    cart[itemId].qty++;
  } else {
    cart[itemId] = { name, price, qty: 1, emoji };
  }
  saveCartToStorage();
  updateCartBadge();
  flashCartButton();
}

export function removeFromCart(itemId) {
  delete cart[itemId];
  saveCartToStorage();
  updateCartBadge();
  renderCartItems();
}

export function increaseQty(itemId) {
  if (!cart[itemId]) return;
  cart[itemId].qty++;
  saveCartToStorage();
  updateCartBadge();
  renderCartItems();
}

export function decreaseQty(itemId) {
  if (!cart[itemId]) return;
  cart[itemId].qty--;
  if (cart[itemId].qty <= 0) delete cart[itemId];
  saveCartToStorage();
  updateCartBadge();
  renderCartItems();
}

export function clearCart() {
  cart = {};
  saveCartToStorage();
  updateCartBadge();
  renderCartItems();
}

export function getCart() {
  return { ...cart };
}

export function updateCartBadge() {
  const total = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  dom.cartCount.textContent = total;
}

export function renderCartItems() {
  const entries = Object.entries(cart);
  dom.cartItems.innerHTML = '';

  if (!entries.length) {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'cart-empty';
    emptyDiv.innerHTML = '<div class="cart-empty-icon">🛒</div><p>Your cart is empty.<br/>Add something delicious!</p>';
    dom.cartItems.appendChild(emptyDiv);
    dom.cartFooter.style.display = 'none';
    return;
  }

  const fragment = document.createDocumentFragment();
  entries.forEach(([id, item]) => {
    const row = document.createElement('div');
    row.className = 'cart-row';
    row.dataset.itemId = id;
    row.innerHTML = `
      <span class="cart-row-emoji" aria-hidden="true">${item.emoji}</span>
      <div class="cart-row-info">
        <div class="cart-row-name"></div>
        <div class="cart-row-price">₹${item.price} each</div>
      </div>
      <div class="cart-qty-ctrl">
        <button class="qty-btn" data-action="decrease" aria-label="Decrease quantity">−</button>
        <span class="qty-num" aria-label="Quantity">${item.qty}</span>
        <button class="qty-btn" data-action="increase" aria-label="Increase quantity">+</button>
      </div>
      <button class="cart-row-remove" data-action="remove" title="Remove item" aria-label="Remove from cart">🗑</button>
    `;
    row.querySelector('.cart-row-name').textContent = item.name;
    fragment.appendChild(row);
  });

  dom.cartItems.appendChild(fragment);

  const subtotal = entries.reduce((sum, [, item]) => sum + item.price * item.qty, 0);
  const tax      = Math.round(subtotal * 0.05);
  const total    = subtotal + tax;

  dom.cartSubtotal.textContent = `₹${subtotal}`;
  dom.cartTaxes.textContent    = `₹${tax}`;
  dom.cartTotal.textContent    = `₹${total}`;
  dom.cartFooter.style.display = 'block';
}

export function handleAddToCart(compositeItemId, name, price, emoji) {
  addToCart(compositeItemId, name, price, emoji);
  const btn = document.getElementById(`addBtn-${compositeItemId}`);
  if (!btn) return;
  btn.textContent = '✓ Added';
  btn.classList.add('added');
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '+ Add';
    btn.classList.remove('added');
    btn.disabled = false;
  }, 1200);
}

export function openCart() {
  renderCartItems();
  dom.cartDrawer.classList.add('open');
  dom.cartOverlay.classList.add('open');
  dom.cartDrawer.setAttribute('aria-hidden', 'false');
}

export function closeCart() {
  dom.cartDrawer.classList.remove('open');
  dom.cartOverlay.classList.remove('open');
  dom.cartDrawer.setAttribute('aria-hidden', 'true');
}

export function checkout() {
  alert('🎉 Order placed! (Integrate your payment gateway here.)');
  clearCart();
  closeCart();
}

function flashCartButton() {
  dom.cartBtn.style.transform = 'scale(1.12)';
  setTimeout(() => { dom.cartBtn.style.transform = ''; }, 200);
}

dom.cartItems.addEventListener('click', (e) => {
  const btn    = e.target.closest('[data-action]');
  if (!btn) return;
  const row    = btn.closest('.cart-row');
  const itemId = row?.dataset.itemId;
  if (!itemId) return;
  const action = btn.dataset.action;
  if (action === 'increase') increaseQty(itemId);
  if (action === 'decrease') decreaseQty(itemId);
  if (action === 'remove')   removeFromCart(itemId);
});

dom.cartBtn.addEventListener('click', openCart);
dom.cartOverlay.addEventListener('click', closeCart);
if (dom.cartCloseBtn) dom.cartCloseBtn.addEventListener('click', closeCart);
if (dom.checkoutBtn)  dom.checkoutBtn.addEventListener('click', checkout);
