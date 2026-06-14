'use strict';

/* ═══════════════════════════════════════════════════════════════════════════════
   PRODUCT DATA
═══════════════════════════════════════════════════════════════════════════════ */
const PRODUCTS = [
  {
    id: 1, name: "Wireless Pro Mouse", category: "Electronics",
    price: 59.99, originalPrice: 79.99,
    emoji: "🖱️", color: "#6366f1",
    description: "Ergonomic wireless mouse with 3000 DPI laser precision. Up to 90 days battery life. Silent click technology reduces noise by 90%. Works on any surface.",
    features: ["3000 DPI precision", "90-day battery", "Silent clicks", "Universal compat."],
    rating: 4.8, reviews: 234, stock: 15, badge: "Best Seller"
  },
  {
    id: 2, name: "Mechanical Keyboard", category: "Electronics",
    price: 89.99, originalPrice: null,
    emoji: "⌨️", color: "#8b5cf6",
    description: "Compact 75% mechanical keyboard with per-key RGB backlighting. Hot-swappable tactile switches, aircraft-grade aluminium body, USB-C connection.",
    features: ["75% compact layout", "Hot-swap switches", "RGB backlight", "Aluminium body"],
    rating: 4.6, reviews: 189, stock: 8, badge: null
  },
  {
    id: 3, name: "USB-C Hub 7-in-1", category: "Electronics",
    price: 39.99, originalPrice: 54.99,
    emoji: "🔌", color: "#06b6d4",
    description: "7-in-1 multiport hub with 4K HDMI, 3× USB 3.0, SD/microSD card readers, and 100W Power Delivery passthrough charging.",
    features: ["4K HDMI output", "3× USB 3.0", "100W PD passthrough", "SD/microSD"],
    rating: 4.5, reviews: 312, stock: 20, badge: "Sale"
  },
  {
    id: 4, name: "LED Desk Lamp", category: "Home",
    price: 34.99, originalPrice: null,
    emoji: "💡", color: "#f59e0b",
    description: "Modern LED lamp with 5 brightness levels and 3 color temperatures. Touch controls, USB-A charging port, and a 360° flexible arm.",
    features: ["5 brightness levels", "3 color temps", "USB charging port", "Flexible arm"],
    rating: 4.7, reviews: 145, stock: 12, badge: null
  },
  {
    id: 5, name: "Minimalist Notebook", category: "Stationery",
    price: 14.99, originalPrice: null,
    emoji: "📒", color: "#10b981",
    description: "A5 dotted hardcover notebook with 200 pages of 120gsm acid-free paper. Lay-flat binding, ribbon bookmark, and elastic closure.",
    features: ["200 pages", "120gsm acid-free", "Lay-flat binding", "Elastic closure"],
    rating: 4.9, reviews: 567, stock: 50, badge: "Popular"
  },
  {
    id: 6, name: "Ceramic Mug", category: "Home",
    price: 19.99, originalPrice: 24.99,
    emoji: "☕", color: "#f97316",
    description: "Handcrafted 350ml matte ceramic mug. Microwave and dishwasher safe. Available in 6 pastel shades. Perfect gift for coffee and tea lovers.",
    features: ["350ml capacity", "Matte finish", "Dishwasher safe", "6 colors"],
    rating: 4.4, reviews: 203, stock: 30, badge: "Sale"
  },
  {
    id: 7, name: "Adjustable Phone Stand", category: "Accessories",
    price: 24.99, originalPrice: null,
    emoji: "📱", color: "#ec4899",
    description: "Aluminium stand compatible with phones and tablets from 4″ to 13″. Anti-slip silicone pads, foldable design, and cable management slot.",
    features: ["4″–13″ compatible", "Adjustable angle", "Anti-slip pads", "Foldable"],
    rating: 4.6, reviews: 178, stock: 25, badge: null
  },
  {
    id: 8, name: "Cable Organizer Kit", category: "Accessories",
    price: 9.99, originalPrice: null,
    emoji: "🔧", color: "#64748b",
    description: "20 reusable velcro cable ties in 4 sizes with write-on label tabs. Made from premium nylon. Keeps your desk, bag, and AV setup perfectly tidy.",
    features: ["20-piece set", "4 sizes", "Label tabs", "Reusable nylon"],
    rating: 4.3, reviews: 89, stock: 60, badge: null
  },
  {
    id: 9, name: "Wireless Earbuds", category: "Electronics",
    price: 79.99, originalPrice: 99.99,
    emoji: "🎧", color: "#7c3aed",
    description: "True wireless earbuds with hybrid active noise cancellation. 8h playback + 24h via case. IPX5 water resistance and touch controls.",
    features: ["ANC technology", "32h total battery", "IPX5 water resist.", "Touch controls"],
    rating: 4.7, reviews: 445, stock: 18, badge: "Hot"
  },
  {
    id: 10, name: "Self-Watering Plant Pot", category: "Home",
    price: 16.99, originalPrice: null,
    emoji: "🌿", color: "#16a34a",
    description: "Minimalist ceramic pot with bamboo saucer and built-in reservoir. Keeps soil moist for up to 2 weeks. Ideal for succulents, herbs, and air plants.",
    features: ["Self-watering", "Bamboo saucer", "2-week reservoir", "Minimal design"],
    rating: 4.8, reviews: 302, stock: 22, badge: "New"
  },
  {
    id: 11, name: "Sticky Note Bundle", category: "Stationery",
    price: 7.99, originalPrice: null,
    emoji: "📌", color: "#fbbf24",
    description: "12 pads of pastel-colored sticky notes, 50 sheets each. Super-sticky adhesive, repositionable without residue. Great for planning and reminders.",
    features: ["12 pads included", "50 sheets each", "Super-sticky", "Pastel palette"],
    rating: 4.5, reviews: 156, stock: 45, badge: null
  },
  {
    id: 12, name: "Aluminium Laptop Stand", category: "Electronics",
    price: 44.99, originalPrice: 59.99,
    emoji: "💻", color: "#0ea5e9",
    description: "Premium 6-angle adjustable laptop stand in aircraft-grade aluminium. Improves airflow, ergonomics, and posture. Folds flat for travel.",
    features: ["6 height settings", "Better airflow", "Foldable portable", "Aluminium build"],
    rating: 4.8, reviews: 389, stock: 14, badge: "Sale"
  },
];

/* ═══════════════════════════════════════════════════════════════════════════════
   CART MODULE
═══════════════════════════════════════════════════════════════════════════════ */
const Cart = {
  _key: 'shop_cart',

  get() {
    try { return JSON.parse(localStorage.getItem(this._key) || '[]'); }
    catch { return []; }
  },

  save(cart) {
    localStorage.setItem(this._key, JSON.stringify(cart));
  },

  add(productId, qty = 1) {
    const cart = this.get();
    const idx  = cart.findIndex(i => i.id === productId);
    if (idx >= 0) cart[idx].qty += qty;
    else          cart.push({ id: productId, qty });
    this.save(cart);
    this._updateBadge();
  },

  remove(productId) {
    const cart = this.get().filter(i => i.id !== productId);
    this.save(cart);
    this._updateBadge();
  },

  update(productId, qty) {
    if (qty <= 0) { this.remove(productId); return; }
    const cart = this.get();
    const idx  = cart.findIndex(i => i.id === productId);
    if (idx >= 0) cart[idx].qty = qty;
    this.save(cart);
    this._updateBadge();
  },

  clear() {
    localStorage.removeItem(this._key);
    this._updateBadge();
  },

  count()  { return this.get().reduce((s, i) => s + i.qty, 0); },
  total()  { return this.items().reduce((s, i) => s + i.product.price * i.qty, 0); },

  items() {
    return this.get()
      .map(i => ({ product: PRODUCTS.find(p => p.id === i.id), qty: i.qty }))
      .filter(i => i.product);
  },

  _updateBadge() {
    const count = this.count();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.classList.toggle('hidden', count === 0);
      el.classList.add('bump');
      setTimeout(() => el.classList.remove('bump'), 350);
    });
  }
};

/* ═══════════════════════════════════════════════════════════════════════════════
   UTILITIES
═══════════════════════════════════════════════════════════════════════════════ */
function fmt(price) { return '$' + price.toFixed(2); }

function stars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function badgeHTML(badge) {
  if (!badge) return '';
  const map = { 'Sale': 'sale', 'New': 'new', 'Hot': 'hot', 'Popular': 'popular', 'Best Seller': 'best' };
  return `<span class="card-badge badge-${map[badge] || 'best'}">${badge}</span>`;
}

function discount(orig, cur) {
  if (!orig) return '';
  return `<span class="price-discount">–${Math.round((1 - cur / orig) * 100)}%</span>`;
}

function showToast(msg, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span class="toast-icon">${type === 'success' ? '✅' : '❌'}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 260);
  }, 3000);
}

function renderProductCard(p) {
  const bg = p.color + '18';
  return `
    <div class="product-card reveal" data-id="${p.id}">
      <div class="card-image" style="background:${bg}">
        <div class="card-img-inner">${p.emoji}</div>
        ${badgeHTML(p.badge)}
        <div class="quick-add-overlay">
          <button class="btn btn-white btn-sm" onclick="quickView(${p.id});event.stopPropagation()">Quick view</button>
          <button class="btn btn-primary btn-sm" onclick="addToCart(${p.id});event.stopPropagation()">Add to cart</button>
        </div>
      </div>
      <div class="card-body">
        <p class="card-category">${p.category}</p>
        <p class="card-name"><a href="product.html?id=${p.id}">${p.name}</a></p>
        <div class="card-rating">
          <span class="stars" title="${p.rating}">${stars(p.rating)}</span>
          <span class="rating-count">(${p.reviews})</span>
        </div>
        <div class="card-price">
          <span class="price-current">${fmt(p.price)}</span>
          ${p.originalPrice ? `<span class="price-original">${fmt(p.originalPrice)}</span>` : ''}
          ${discount(p.originalPrice, p.price)}
        </div>
      </div>
    </div>`;
}

function addToCart(id, qty = 1) {
  const p = PRODUCTS.find(p => p.id === id);
  if (!p) return;
  Cart.add(id, qty);
  showToast(`${p.emoji} <strong>${p.name}</strong> added to cart`);
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════════════════════════════════
   HEADER
═══════════════════════════════════════════════════════════════════════════════ */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 16);
    }, { passive: true });
  }

  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }

  Cart._updateBadge();
}

/* ═══════════════════════════════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════════════════════════════ */
function initHome() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;

  const featured = [1, 9, 5, 12, 7, 4, 3, 10];
  grid.innerHTML = featured
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean)
    .map(renderProductCard)
    .join('');

  initScrollReveal();
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SHOP PAGE
═══════════════════════════════════════════════════════════════════════════════ */
function initShop() {
  const grid    = document.getElementById('products-grid');
  const chips   = document.querySelectorAll('.filter-chip');
  const search  = document.getElementById('search-input');
  const counter = document.getElementById('results-count');
  if (!grid) return;

  let activeCategory = 'All';
  let searchQuery    = '';

  function renderGrid() {
    const filtered = PRODUCTS.filter(p => {
      const catMatch  = activeCategory === 'All' || p.category === activeCategory;
      const txtMatch  = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return catMatch && txtMatch;
    });

    if (counter) counter.innerHTML = `<strong>${filtered.length}</strong> product${filtered.length !== 1 ? 's' : ''}`;

    if (filtered.length === 0) {
      grid.innerHTML = '<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:48px 0">No products found. Try a different search.</p>';
      return;
    }

    grid.innerHTML = filtered.map(renderProductCard).join('');
    initScrollReveal();
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.dataset.cat;
      renderGrid();
    });
  });

  if (search) {
    search.addEventListener('input', e => {
      searchQuery = e.target.value;
      renderGrid();
    });
  }

  renderGrid();
}

/* ═══════════════════════════════════════════════════════════════════════════════
   PRODUCT DETAIL PAGE
═══════════════════════════════════════════════════════════════════════════════ */
function initProduct() {
  const params = new URLSearchParams(window.location.search);
  const id     = parseInt(params.get('id'));
  const p      = PRODUCTS.find(p => p.id === id);

  if (!p) {
    document.getElementById('product-root').innerHTML =
      '<p style="padding:80px 0;text-align:center;color:var(--text-muted)">Product not found. <a href="shop.html">Back to shop</a></p>';
    return;
  }

  document.title = p.name + ' — MyShop';
  document.getElementById('page-product-name').textContent = p.name;

  const bg = p.color + '18';
  const saveAmt = p.originalPrice ? fmt(p.originalPrice - p.price) : null;

  document.getElementById('product-root').innerHTML = `
    <div class="product-layout container">

      <div class="product-gallery">
        <div class="product-img-main" style="background:${bg}">${p.emoji}</div>
      </div>

      <div class="product-info">
        <div class="product-breadcrumb">
          <a href="index.html">Home</a><span>/</span>
          <a href="shop.html">Shop</a><span>/</span>
          <a href="shop.html?cat=${encodeURIComponent(p.category)}">${p.category}</a>
        </div>

        ${badgeHTML(p.badge)}
        <h1 class="product-title mt-8">${p.name}</h1>

        <div class="product-rating-row">
          <span class="stars">${stars(p.rating)}</span>
          <span class="text-muted" style="font-size:.875rem">${p.rating} (${p.reviews} reviews)</span>
        </div>

        <div class="product-price-row">
          <span class="product-price-current">${fmt(p.price)}</span>
          ${p.originalPrice ? `<span class="product-price-original">${fmt(p.originalPrice)}</span>` : ''}
          ${saveAmt ? `<span class="product-save-badge">Save ${saveAmt}</span>` : ''}
        </div>

        <p class="product-desc">${p.description}</p>

        <div class="product-features">
          <h4>What's included</h4>
          <div class="feature-list">
            ${p.features.map(f => `<div class="feature-item">${f}</div>`).join('')}
          </div>
        </div>

        <div class="qty-row">
          <span class="qty-label">Quantity</span>
          <div class="qty-control">
            <button class="qty-btn" id="qty-minus">−</button>
            <input class="qty-val" id="qty-val" type="number" value="1" min="1" max="${p.stock}" readonly>
            <button class="qty-btn" id="qty-plus">+</button>
          </div>
          <span class="text-muted" style="font-size:.8125rem">${p.stock} in stock</span>
        </div>

        <div class="add-to-cart-row">
          <button id="btn-add-cart" class="btn btn-primary btn-lg" style="flex:1">
            🛒 Add to cart
          </button>
          <button id="btn-wishlist" class="icon-btn" style="border:1px solid var(--border);width:46px;height:46px" title="Add to wishlist">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>

        <div class="product-meta">
          <div class="meta-row"><span class="meta-key">Category</span><span class="meta-val">${p.category}</span></div>
          <div class="meta-row"><span class="meta-key">Stock</span><span class="meta-val" style="color:#16a34a">✓ In Stock (${p.stock} units)</span></div>
          <div class="meta-row"><span class="meta-key">Shipping</span><span class="meta-val">Free over $50</span></div>
        </div>
      </div>
    </div>
  `;

  // Quantity controls
  let qty = 1;
  const qtyVal   = document.getElementById('qty-val');
  const qtyMinus = document.getElementById('qty-minus');
  const qtyPlus  = document.getElementById('qty-plus');

  qtyMinus.addEventListener('click', () => { if (qty > 1) { qty--; qtyVal.value = qty; } });
  qtyPlus.addEventListener('click',  () => { if (qty < p.stock) { qty++; qtyVal.value = qty; } });

  document.getElementById('btn-add-cart').addEventListener('click', () => {
    addToCart(p.id, qty);
  });

  document.getElementById('btn-wishlist').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    btn.style.color = '#ec4899';
    btn.style.borderColor = '#ec4899';
    showToast('Added to wishlist ❤️');
  });

  // Related products
  const relatedEl = document.getElementById('related-grid');
  if (relatedEl) {
    const related = PRODUCTS.filter(r => r.category === p.category && r.id !== p.id).slice(0, 4);
    relatedEl.innerHTML = related.map(renderProductCard).join('');
  }

  initScrollReveal();
}

/* ═══════════════════════════════════════════════════════════════════════════════
   CART PAGE
═══════════════════════════════════════════════════════════════════════════════ */
function initCart() {
  const cartRoot = document.getElementById('cart-root');
  const summaryEl = document.getElementById('order-summary');
  if (!cartRoot) return;

  function renderCart() {
    const items = Cart.items();

    if (items.length === 0) {
      cartRoot.innerHTML = `
        <div class="cart-empty">
          <div class="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet.</p>
          <a href="shop.html" class="btn btn-primary">Start shopping</a>
        </div>`;
      if (summaryEl) summaryEl.style.display = 'none';
      return;
    }

    if (summaryEl) summaryEl.style.display = '';

    cartRoot.innerHTML = `
      <div class="cart-items">
        ${items.map(({ product: p, qty }) => {
          const bg = p.color + '18';
          return `
          <div class="cart-item" data-id="${p.id}">
            <div class="cart-item-img" style="background:${bg}">${p.emoji}</div>
            <div class="cart-item-info">
              <p class="item-name">${p.name}</p>
              <p class="item-cat">${p.category}</p>
              <p class="item-price">${fmt(p.price)} each</p>
            </div>
            <div class="cart-item-actions">
              <span class="item-total">${fmt(p.price * qty)}</span>
              <div class="qty-control">
                <button class="qty-btn" data-action="minus" data-id="${p.id}">−</button>
                <span class="qty-val" style="width:44px;text-align:center;font-weight:700">${qty}</span>
                <button class="qty-btn" data-action="plus" data-id="${p.id}">+</button>
              </div>
              <button class="remove-btn" data-id="${p.id}">Remove</button>
            </div>
          </div>`;
        }).join('')}
      </div>`;

    const subtotal  = Cart.total();
    const shipping  = subtotal >= 50 ? 0 : 4.99;
    const tax       = subtotal * 0.08;
    const grandTotal = subtotal + shipping + tax;

    if (summaryEl) {
      summaryEl.innerHTML = `
        <h2>Order Summary</h2>
        <div class="summary-line"><span>Subtotal (${Cart.count()} items)</span><span>${fmt(subtotal)}</span></div>
        <div class="summary-line"><span>Shipping</span><span>${shipping === 0 ? '<span style="color:#16a34a">Free</span>' : fmt(shipping)}</span></div>
        <div class="summary-line"><span>Tax (8%)</span><span>${fmt(tax)}</span></div>
        <div class="summary-line total"><span>Total</span><span>${fmt(grandTotal)}</span></div>
        ${subtotal < 50 ? `<p style="font-size:.8125rem;color:#16a34a;margin-top:8px">Add ${fmt(50 - subtotal)} more for free shipping!</p>` : ''}
        <div class="promo-row">
          <input class="promo-input" id="promo-input" placeholder="Promo code" type="text">
          <button class="btn btn-outline-dark btn-sm" id="apply-promo">Apply</button>
        </div>
        <a href="checkout.html" class="btn btn-primary btn-block btn-lg mt-8">Proceed to Checkout</a>
        <a href="shop.html" class="btn btn-ghost btn-block mt-8" style="text-align:center">← Continue Shopping</a>`;

      document.getElementById('apply-promo')?.addEventListener('click', () => {
        const code = document.getElementById('promo-input').value.toUpperCase().trim();
        if (code === 'SAVE10') showToast('Promo code applied! 10% off 🎉');
        else showToast('Invalid promo code', 'error');
      });
    }

    // Events
    document.querySelectorAll('[data-action="minus"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id  = parseInt(btn.dataset.id);
        const item = Cart.get().find(i => i.id === id);
        if (item) Cart.update(id, item.qty - 1);
        renderCart();
      });
    });
    document.querySelectorAll('[data-action="plus"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id  = parseInt(btn.dataset.id);
        const item = Cart.get().find(i => i.id === id);
        if (item) Cart.update(id, item.qty + 1);
        renderCart();
      });
    });
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        Cart.remove(parseInt(btn.dataset.id));
        renderCart();
        showToast('Item removed from cart');
      });
    });
  }

  renderCart();
}

/* ═══════════════════════════════════════════════════════════════════════════════
   CHECKOUT PAGE
═══════════════════════════════════════════════════════════════════════════════ */
function initCheckout() {
  const form = document.getElementById('checkout-form');
  if (!form) return;

  // Render order summary
  const summaryEl = document.getElementById('checkout-summary');
  if (summaryEl) {
    const items    = Cart.items();
    const subtotal = Cart.total();
    const shipping = subtotal >= 50 ? 0 : 4.99;
    const tax      = subtotal * 0.08;
    const total    = subtotal + shipping + tax;

    summaryEl.innerHTML = `
      <h2>Your order</h2>
      ${items.map(({ product: p, qty }) => `
        <div class="summary-line">
          <span>${p.emoji} ${p.name} × ${qty}</span>
          <span>${fmt(p.price * qty)}</span>
        </div>`).join('')}
      <hr class="summary-divider">
      <div class="summary-line"><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
      <div class="summary-line"><span>Shipping</span><span>${shipping === 0 ? 'Free' : fmt(shipping)}</span></div>
      <div class="summary-line"><span>Tax</span><span>${fmt(tax)}</span></div>
      <hr class="summary-divider">
      <div class="summary-line total"><span>Total</span><span>${fmt(total)}</span></div>`;
  }

  // Payment option toggle
  document.querySelectorAll('.payment-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      opt.querySelector('input[type="radio"]').checked = true;
    });
  });

  // Submit
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Placing order…';
    btn.disabled = true;
    setTimeout(() => {
      Cart.clear();
      document.getElementById('checkout-content').innerHTML = `
        <div style="text-align:center;padding:80px 20px">
          <div style="font-size:4rem;margin-bottom:16px">🎉</div>
          <h2 style="font-size:1.75rem;font-weight:800;margin-bottom:8px">Order confirmed!</h2>
          <p style="color:var(--text-muted);margin-bottom:8px">Thank you for your purchase. You'll receive an email shortly.</p>
          <p style="font-size:.875rem;color:var(--text-muted);margin-bottom:32px">Order #${Math.floor(Math.random() * 90000) + 10000}</p>
          <a href="index.html" class="btn btn-primary btn-lg">Back to home</a>
        </div>`;
    }, 1800);
  });
}

/* ═══════════════════════════════════════════════════════════════════════════════
   ACCOUNT PAGE (UI only)
═══════════════════════════════════════════════════════════════════════════════ */
function initAccount() {
  const menuItems = document.querySelectorAll('.account-menu-item');
  const panels    = document.querySelectorAll('.account-panel');

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      menuItems.forEach(i => i.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      item.classList.add('active');
      const target = document.getElementById('panel-' + item.dataset.panel);
      if (target) target.classList.add('active');
    });
  });
}

/* ═══════════════════════════════════════════════════════════════════════════════
   QUICK VIEW (simple alert replacement)
═══════════════════════════════════════════════════════════════════════════════ */
function quickView(id) {
  window.location.href = 'product.html?id=' + id;
}

/* ═══════════════════════════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initScrollReveal();

  const page = document.body.dataset.page;
  if (page === 'home')     initHome();
  if (page === 'shop')     initShop();
  if (page === 'product')  initProduct();
  if (page === 'cart')     initCart();
  if (page === 'checkout') initCheckout();
  if (page === 'account')  initAccount();
});
