/* ─────────────────────────────────────────────────────────────────────────────
   Le Labo d'Andrea — main.js
   Static e-commerce: products, cart, wishlist, page routers
───────────────────────────────────────────────────────────────────────────── */

// ══════════════════════════════════════════════════════════════════════════════
// PRODUCT DATA
// ══════════════════════════════════════════════════════════════════════════════
const PRODUCTS = [
  /* ── KAWAII ─────────────────────────────────────────────────────────── */
  { id:1, name:"Test 1 — Poisson-Globe Figurine", category:"kawaii", price:12.99, originalPrice:null,
    emoji:"🐡", bg:"#f5e8ff", badge:"Nouveau", rating:5.0, reviews:0, stock:10,
    img:"public/il_794xN.7789090942_kw3v.webp",
    description:"Adorable poisson-globe imprimé en 3D. Couleur entièrement personnalisable sur demande. Fabriqué artisanalement en France avec du PLA premium.",
    features:["Hauteur ~6 cm","PLA premium biodégradable","Couleur au choix (24 coloris)","Fait à la main en France"] },

  { id:2, name:"Test 2 — Poisson-Globe Porte-Clés", category:"kawaii", price:9.99, originalPrice:null,
    emoji:"🐡", bg:"#f5e8ff", badge:"Nouveau", rating:5.0, reviews:0, stock:10,
    img:"public/il_794xN.7837017405_sj73.webp",
    description:"Porte-clés poisson-globe imprimé en 3D. Couleur personnalisable parmi 24 coloris disponibles. Anneau porte-clés ou dragonne au choix.",
    features:["Taille ~3 cm","PLA premium biodégradable","Couleur au choix (24 coloris)","Anneau ou dragonne inclus"] },

  /* ── GEEK ──────────────────────────────────────────────────────────── */
  { id:3, name:"Test 3 — Bol Métamorph", category:"geek", price:14.99, originalPrice:null,
    emoji:"🌸", bg:"#ffe4ed", badge:"Nouveau", rating:5.0, reviews:0, stock:8,
    img:"public/il_794xN.7842117151_8r2x.webp",
    description:"Vide-poche en forme de Métamorph imprimé en 3D. Parfait pour ranger bijoux, clés ou petits accessoires. Design Pokémon original.",
    features:["~15 cm de diamètre","PLA premium","Rose pastel","Fait à la main en France"] },

  { id:4, name:"Test 4 — Boîte à Mouchoirs Pokémon", category:"geek", price:24.99, originalPrice:null,
    emoji:"👻", bg:"#ede8ff", badge:"Nouveau", rating:5.0, reviews:0, stock:5,
    img:"public/il_794xN.7903761819_h65v.webp",
    description:"Boîte à mouchoirs déco imprimée en 3D, design inspiré de l'univers Pokémon. Apporte une touche geek unique à votre bureau.",
    features:["Compatible mouchoirs standard","PLA premium bicolore","Couleur personnalisable","Fait à la main en France"] },

  { id:5, name:"Test 5 — Chikorita dans sa Pokéball", category:"geek", price:19.99, originalPrice:null,
    emoji:"🌿", bg:"#e8f5e8", badge:"Nouveau", rating:5.0, reviews:0, stock:7,
    img:"public/il_794xN.7911346603_snim.webp",
    description:"Figurine Chikorita sortant de sa Pokéball, imprimée en 3D. Fidèle à la 2e génération. Parfaite pour décorer un bureau ou une étagère.",
    features:["Hauteur ~8 cm","PLA multicolore","Détails peints à la main","Fait à la main en France"] },

  /* ── GAMING ────────────────────────────────────────────────────────── */
  { id:6, name:"Test 6 — Support Manette Cyndaquil", category:"gaming", price:29.99, originalPrice:null,
    emoji:"🎮", bg:"#e8f0ff", badge:"Nouveau", rating:5.0, reviews:0, stock:6,
    img:"public/il_794xN.7925509599_rheh.webp",
    description:"Support de manette PS5 et Xbox en forme de Cyndaquil, imprimé en 3D. Garde votre manette en sécurité avec un style gaming unique.",
    features:["Compatible PS5 et Xbox","Longueur ~20 cm","PLA premium multicolore","Fait à la main en France"] },
];

// ══════════════════════════════════════════════════════════════════════════════
// CATEGORIES META
// ══════════════════════════════════════════════════════════════════════════════
const CATEGORIES = [
  { id:"kawaii",  label:"Kawaii",  emoji:"🌸", desc:"Figurines, accessoires & déco pastel" },
  { id:"geek",    label:"Geek",    emoji:"🔮", desc:"Figurines, dioramas & objets fantastiques" },
  { id:"gaming",  label:"Gaming",  emoji:"🎮", desc:"Accessoires & déco pour gamers" },
  { id:"fidget",  label:"Fidget",  emoji:"🌀", desc:"Anti-stress & jeux satisfaisants" },
  { id:"déco",    label:"Déco",    emoji:"✨", desc:"Vases, lampes & art mural 3D" },
];

// ══════════════════════════════════════════════════════════════════════════════
// CART MODULE
// ══════════════════════════════════════════════════════════════════════════════
const Cart = {
  KEY: 'lda_cart',
  get() { try { return JSON.parse(localStorage.getItem(this.KEY)) || []; } catch { return []; } },
  save(data) { localStorage.setItem(this.KEY, JSON.stringify(data)); this._updateBadge(); },
  add(id, qty = 1) {
    const cart = this.get();
    const idx  = cart.findIndex(i => i.id === id);
    if (idx > -1) cart[idx].qty += qty; else cart.push({ id, qty });
    this.save(cart);
  },
  remove(id) { this.save(this.get().filter(i => i.id !== id)); },
  update(id, qty) {
    if (qty < 1) { this.remove(id); return; }
    const cart = this.get();
    const idx  = cart.findIndex(i => i.id === id);
    if (idx > -1) cart[idx].qty = qty;
    this.save(cart);
  },
  clear() { localStorage.removeItem(this.KEY); this._updateBadge(); },
  count() { return this.get().reduce((s, i) => s + i.qty, 0); },
  total() { return this.items().reduce((s, i) => s + i.price * i.qty, 0); },
  items() {
    return this.get().map(({ id, qty }) => {
      const p = PRODUCTS.find(x => x.id === id);
      return p ? { ...p, qty } : null;
    }).filter(Boolean);
  },
  _updateBadge() {
    const cnt = this.count();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = cnt;
      el.classList.toggle('hidden', cnt === 0);
      if (cnt > 0) { el.classList.add('bump'); setTimeout(() => el.classList.remove('bump'), 400); }
    });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// WISHLIST MODULE
// ══════════════════════════════════════════════════════════════════════════════
const Wish = {
  KEY: 'lda_wishlist',
  get() { try { return JSON.parse(localStorage.getItem(this.KEY)) || []; } catch { return []; } },
  toggle(id) {
    const w = this.get();
    const i = w.indexOf(id);
    if (i > -1) { w.splice(i, 1); localStorage.setItem(this.KEY, JSON.stringify(w)); return false; }
    w.push(id); localStorage.setItem(this.KEY, JSON.stringify(w)); return true;
  },
  has(id) { return this.get().includes(id); },
  items() { return PRODUCTS.filter(p => this.get().includes(p.id)); }
};

// ══════════════════════════════════════════════════════════════════════════════
// UTILITIES
// ══════════════════════════════════════════════════════════════════════════════
const fmt = n => n.toFixed(2).replace('.', ',') + ' €';

function stars(r) {
  const full = Math.floor(r), half = r - full >= .5;
  let s = '';
  for (let i = 0; i < 5; i++) {
    if (i < full) s += '★';
    else if (i === full && half) s += '½';
    else s += '☆';
  }
  return s;
}

function badgeClass(b) {
  if (!b) return '';
  const slug = b.toLowerCase().replace(/\s+/g, '-');
  return `badge-${slug}`;
}

function showToast(msg, type = 'success') {
  let wrap = document.querySelector('.toast-wrap');
  if (!wrap) { wrap = document.createElement('div'); wrap.className = 'toast-wrap'; document.body.appendChild(wrap); }
  const icons = { success: '✅', error: '❌', wish: '💕', info: 'ℹ️' };
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<span class="toast-icon">${icons[type] || '✨'}</span>${msg}`;
  wrap.prepend(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 260); }, 3200);
}

function addToCart(id, qty = 1) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  Cart.add(id, qty);
  showToast(`<strong>${p.name}</strong> ajouté au panier 🛒`, 'success');
}

function toggleWish(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const added = Wish.toggle(id);
  document.querySelectorAll(`.card-wish[data-id="${id}"]`).forEach(btn => btn.classList.toggle('active', added));
  showToast(added ? `<strong>${p.name}</strong> ajouté aux favoris 💕` : `Retiré des favoris`, added ? 'wish' : 'info');
}

// ══════════════════════════════════════════════════════════════════════════════
// RENDER: PRODUCT CARD
// ══════════════════════════════════════════════════════════════════════════════
function renderProductCard(p) {
  if (!p) return '';
  const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
  const wished   = Wish.has(p.id);
  return `
    <div class="product-card reveal" onclick="window.location='product.html?id=${p.id}'">
      <div class="card-img-wrap" style="background:${p.bg}">
        ${p.img ? `<img class="card-img-photo" src="${p.img}" alt="${p.name}" loading="lazy">` : `<div class="card-img-inner">${p.emoji}</div>`}
        ${p.badge ? `<span class="card-badge ${badgeClass(p.badge)}">${p.badge}</span>` : ''}
        <button class="card-wish ${wished ? 'active' : ''}" data-id="${p.id}"
          onclick="event.stopPropagation();toggleWish(${p.id})" aria-label="Ajouter aux favoris">
          <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        </button>
      </div>
      <div class="card-body">
        <p class="card-cat">${p.category}</p>
        <p class="card-name"><a href="product.html?id=${p.id}" onclick="event.stopPropagation()">${p.name}</a></p>
        <div class="card-stars">
          <span class="stars-row">${stars(p.rating)}</span>
          <span class="reviews-count">(${p.reviews})</span>
        </div>
        <div class="card-footer">
          <div class="card-price-row">
            <span class="price-curr">${fmt(p.price)}</span>
            ${p.originalPrice ? `<span class="price-orig">${fmt(p.originalPrice)}</span><span class="price-off">-${discount}%</span>` : ''}
          </div>
          <button class="card-add" onclick="event.stopPropagation();addToCart(${p.id})" title="Ajouter au panier">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      </div>
    </div>`;
}

// ══════════════════════════════════════════════════════════════════════════════
// SCROLL REVEAL
// ══════════════════════════════════════════════════════════════════════════════
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: .08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
}

// ══════════════════════════════════════════════════════════════════════════════
// HEADER
// ══════════════════════════════════════════════════════════════════════════════
function initHeader() {
  Cart._updateBadge();
  window.addEventListener('scroll', () => {
    document.querySelector('.site-header')?.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobile-nav');
  ham?.addEventListener('click', () => {
    ham.classList.toggle('open');
    mob?.classList.toggle('open');
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// HOME PAGE
// ══════════════════════════════════════════════════════════════════════════════
function initHome() {
  const featIds = [1, 2, 3, 4, 5, 6];
  const featEl  = document.getElementById('featured-grid');
  if (featEl) {
    featEl.innerHTML = featIds.map(id => renderProductCard(PRODUCTS.find(p => p.id === id))).join('');
    initReveal();
  }

  const catEl = document.getElementById('categories-grid');
  if (catEl) {
    const counts = {};
    PRODUCTS.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
    catEl.innerHTML = CATEGORIES.map(c => `
      <a href="shop.html?cat=${c.id}" class="cat-card ${c.id} reveal">
        <div class="cat-deco-circle"></div>
        <span class="cat-emoji">${c.emoji}</span>
        <p class="cat-name">${c.label}</p>
        <p class="cat-count">${counts[c.id] || 0} créations</p>
        <span class="cat-link">Explorer →</span>
      </a>`).join('');
    initReveal();
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// SHOP PAGE
// ══════════════════════════════════════════════════════════════════════════════
function initShop() {
  let activeCat = new URLSearchParams(location.search).get('cat') || 'all';
  let query     = '';
  let sortBy    = 'default';
  let maxPrice  = 9999;

  const grid     = document.getElementById('products-grid');
  const countEl  = document.getElementById('results-count');

  function getFiltered() {
    let list = PRODUCTS.slice();
    if (activeCat !== 'all') list = list.filter(p => p.category === activeCat);
    if (query) { const q = query.toLowerCase(); list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)); }
    list = list.filter(p => p.price <= maxPrice);
    if (sortBy === 'price-asc')  list.sort((a,b) => a.price - b.price);
    if (sortBy === 'price-desc') list.sort((a,b) => b.price - a.price);
    if (sortBy === 'rating')     list.sort((a,b) => b.rating - a.rating);
    if (sortBy === 'popular')    list.sort((a,b) => b.reviews - a.reviews);
    return list;
  }

  function render() {
    const list = getFiltered();
    if (countEl) countEl.innerHTML = `<strong>${list.length}</strong> résultat${list.length !== 1 ? 's' : ''}`;
    grid.innerHTML = list.length
      ? list.map(p => renderProductCard(p)).join('')
      : `<div style="grid-column:1/-1;text-align:center;padding:64px 20px;color:var(--text-muted)">
           <div style="font-size:3rem;margin-bottom:12px">🔍</div>
           <p style="font-size:1.125rem;font-weight:600">Aucun produit trouvé</p>
           <p style="margin-top:8px;font-size:.9375rem">Essayez une autre catégorie ou mot-clé.</p>
         </div>`;
    initReveal();
  }

  // Category chips
  document.querySelectorAll('.filter-chip[data-cat]').forEach(chip => {
    if (chip.dataset.cat === activeCat) chip.classList.add('active');
    chip.addEventListener('click', () => {
      activeCat = chip.dataset.cat;
      document.querySelectorAll('.filter-chip[data-cat]').forEach(c => c.classList.toggle('active', c.dataset.cat === activeCat));
      render();
    });
  });

  // Fill chip counts
  const counts = { all: PRODUCTS.length };
  PRODUCTS.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
  document.querySelectorAll('.filter-chip[data-cat]').forEach(chip => {
    const cnt = counts[chip.dataset.cat] || 0;
    const el  = chip.querySelector('.chip-count');
    if (el) el.textContent = cnt;
  });

  document.getElementById('search-input')?.addEventListener('input', e => { query = e.target.value.trim(); render(); });
  document.getElementById('sort-select')?.addEventListener('change', e => { sortBy = e.target.value; render(); });
  document.getElementById('price-max')?.addEventListener('input', e => { maxPrice = parseFloat(e.target.value) || 9999; render(); });

  render();
}

// ══════════════════════════════════════════════════════════════════════════════
// PRODUCT DETAIL PAGE
// ══════════════════════════════════════════════════════════════════════════════
function initProduct() {
  const id   = parseInt(new URLSearchParams(location.search).get('id'));
  const p    = PRODUCTS.find(x => x.id === id);
  const root = document.getElementById('product-root');

  if (!p || !root) {
    if (root) root.innerHTML = '<div class="container" style="padding:80px 0;text-align:center"><h2>Produit introuvable</h2><a href="shop.html" class="btn btn-primary mt-24">Retour boutique</a></div>';
    return;
  }

  document.title = `${p.name} — Le Labo d'Andrea`;
  const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
  const wished   = Wish.has(p.id);

  root.innerHTML = `
    <div class="container">
      <div class="product-detail-layout">
        <div class="product-gallery">
          <div class="product-img-main" style="background:${p.bg}">
            ${p.img ? `<img class="product-img-photo" src="${p.img}" alt="${p.name}">` : `<span style="font-size:9rem">${p.emoji}</span>`}
          </div>
        </div>
        <div class="product-info">
          <div class="breadcrumb">
            <a href="index.html">Accueil</a><span class="sep">/</span>
            <a href="shop.html">Boutique</a><span class="sep">/</span>
            <a href="shop.html?cat=${p.category}">${p.category.charAt(0).toUpperCase()+p.category.slice(1)}</a><span class="sep">/</span>
            <span>${p.name}</span>
          </div>
          <div class="product-badge-row">
            ${p.badge ? `<span class="card-badge ${badgeClass(p.badge)}">${p.badge}</span>` : ''}
            <span class="card-badge" style="background:${p.stock<10?'#fee2e2':'#dcfce7'};color:${p.stock<10?'#dc2626':'#16a34a'}">
              ${p.stock < 5 ? `⚠️ Plus que ${p.stock} en stock` : p.stock < 10 ? 'Dernières pièces' : '✓ En stock'}
            </span>
          </div>
          <h1 class="product-title">${p.name}</h1>
          <div class="product-rating-row">
            <span class="stars-row" style="font-size:1rem">${stars(p.rating)}</span>
            <span class="rating-val">${p.rating}</span>
            <span class="rating-cnt">(${p.reviews} avis)</span>
          </div>
          <div class="product-price-row">
            <span class="product-price-curr">${fmt(p.price)}</span>
            ${p.originalPrice ? `<span class="product-price-orig">${fmt(p.originalPrice)}</span><span class="product-save">-${discount}%</span>` : ''}
          </div>
          <p class="product-description">${p.description}</p>
          ${p.features?.length ? `
          <div class="product-features">
            <h4>Caractéristiques</h4>
            <div class="feature-grid">${p.features.map(f => `<div class="feat-item">${f}</div>`).join('')}</div>
          </div>` : ''}
          <div class="qty-row">
            <span class="qty-label">Quantité</span>
            <div class="qty-ctrl">
              <button class="qty-btn" id="qty-minus">−</button>
              <input class="qty-val" id="qty-val" type="number" value="1" min="1" max="${p.stock}">
              <button class="qty-btn" id="qty-plus">+</button>
            </div>
          </div>
          <div class="atc-row">
            <button class="btn btn-primary btn-lg" style="flex:1" id="atc-btn">🛒 Ajouter au panier</button>
            <button class="btn-icon ${wished ? 'wished' : ''}" id="wish-btn" title="Favoris" style="width:52px;height:52px;border-radius:var(--r-sm)">
              <svg viewBox="0 0 24 24" fill="${wished ? 'var(--pink)' : 'none'}" stroke="${wished ? 'var(--pink)' : 'currentColor'}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
            </button>
          </div>
          <div class="product-meta">
            <div class="meta-item"><span class="meta-key">Catégorie</span><span class="meta-val">${p.category.charAt(0).toUpperCase()+p.category.slice(1)}</span></div>
            <div class="meta-item"><span class="meta-key">Matériau</span><span class="meta-val">PLA biodégradable</span></div>
            <div class="meta-item"><span class="meta-key">Livraison</span><span class="meta-val">3–5 jours ouvrés</span></div>
            <div class="meta-item"><span class="meta-key">Retours</span><span class="meta-val">14 jours satisfait ou remboursé</span></div>
          </div>
        </div>
      </div>
    </div>`;

  const qv = document.getElementById('qty-val');
  document.getElementById('qty-minus')?.addEventListener('click', () => { if (+qv.value > 1) qv.value = +qv.value - 1; });
  document.getElementById('qty-plus') ?.addEventListener('click', () => { if (+qv.value < p.stock) qv.value = +qv.value + 1; });
  document.getElementById('atc-btn')  ?.addEventListener('click', () => addToCart(p.id, +qv.value));

  const wb = document.getElementById('wish-btn');
  wb?.addEventListener('click', () => {
    const added = Wish.toggle(p.id);
    wb.classList.toggle('wished', added);
    wb.innerHTML = `<svg viewBox="0 0 24 24" fill="${added ? 'var(--pink)' : 'none'}" stroke="${added ? 'var(--pink)' : 'currentColor'}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`;
    showToast(added ? `Ajouté aux favoris 💕` : `Retiré des favoris`, added ? 'wish' : 'info');
  });

  const related = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
  const rg = document.getElementById('related-grid');
  if (rg && related.length) { rg.innerHTML = related.map(r => renderProductCard(r)).join(''); initReveal(); }
}

// ══════════════════════════════════════════════════════════════════════════════
// CART PAGE
// ══════════════════════════════════════════════════════════════════════════════
function initCart() {
  const root    = document.getElementById('cart-root');
  const sumRoot = document.getElementById('order-summary');
  let promoApplied = false;

  function renderCart() {
    const items    = Cart.items();
    const subtotal = Cart.total();
    const ship     = subtotal >= 50 ? 0 : 5.99;
    const promo    = promoApplied ? -(subtotal * .1) : 0;
    const total    = subtotal + ship + promo;

    if (!items.length) {
      if (root) root.innerHTML = `
        <div class="cart-empty" style="grid-column:1/-1">
          <span class="empty-emoji">🛍️</span>
          <h2>Votre panier est vide</h2>
          <p>Découvrez nos créations 3D kawaii, geek & gaming !</p>
          <a href="shop.html" class="btn btn-primary btn-lg" style="margin-top:24px">Explorer la boutique</a>
        </div>`;
      if (sumRoot) sumRoot.innerHTML = '';
      return;
    }

    if (root) root.innerHTML = `
      <div class="cart-list">
        ${items.map(p => `
          <div class="cart-item">
            <div class="cart-img" style="background:${p.bg}">${p.img ? `<img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit">` : p.emoji}</div>
            <div class="cart-info">
              <p class="c-name">${p.name}</p>
              <p class="c-cat">${p.category}</p>
              <p class="c-price">${fmt(p.price)}</p>
            </div>
            <div class="cart-controls">
              <p class="c-total">${fmt(p.price * p.qty)}</p>
              <div class="c-qty-ctrl">
                <button class="c-qty-btn" onclick="Cart.update(${p.id},${p.qty-1});initCart()">−</button>
                <span class="c-qty-val">${p.qty}</span>
                <button class="c-qty-btn" onclick="Cart.update(${p.id},${p.qty+1});initCart()">+</button>
              </div>
              <button class="c-remove" onclick="Cart.remove(${p.id});initCart()">✕ Supprimer</button>
            </div>
          </div>`).join('')}
        <div style="display:flex;justify-content:space-between;padding-top:12px">
          <a href="shop.html" class="btn btn-outline btn-sm">← Continuer les achats</a>
          <button class="btn btn-danger btn-sm" onclick="if(confirm('Vider le panier ?')){Cart.clear();initCart()}">Vider le panier</button>
        </div>
      </div>`;

    if (sumRoot) sumRoot.innerHTML = `
      <div class="order-summary-card">
        <h3 class="summary-title">Récapitulatif</h3>
        <div class="summary-line"><span>Sous-total (${items.reduce((s,i)=>s+i.qty,0)} article${items.reduce((s,i)=>s+i.qty,0)>1?'s':''})</span><strong>${fmt(subtotal)}</strong></div>
        <div class="summary-line"><span>Livraison</span><strong>${ship === 0 ? '<span style="color:var(--mint)">Offerte</span>' : fmt(ship)}</strong></div>
        ${promoApplied ? `<div class="summary-line" style="color:var(--pink)"><span>Promo -10%</span><strong>${fmt(promo)}</strong></div>` : ''}
        <hr class="summary-divider">
        <div class="summary-line summary-total"><span>Total TTC</span><strong>${fmt(total)}</strong></div>
        ${ship === 0 ? `<p class="free-ship-msg">✓ Livraison offerte appliquée !</p>` : `<p style="font-size:.8125rem;color:var(--text-muted);margin:10px 0">Plus que <strong>${fmt(50 - subtotal)}</strong> pour la livraison offerte.</p>`}
        ${!promoApplied ? `
          <div class="promo-form">
            <input id="promo-input" class="promo-input" placeholder="Code promo (ex: SAVE10)">
            <button class="btn btn-outline btn-sm" onclick="applyPromo()">Appliquer</button>
          </div>` : `<p style="font-size:.8125rem;color:var(--mint);margin-bottom:16px">✓ Code SAVE10 appliqué</p>`}
        <a href="checkout.html" class="btn btn-primary btn-block btn-lg" style="margin-top:8px">Passer commande →</a>
        <div style="display:flex;justify-content:center;gap:14px;margin-top:16px;font-size:1.375rem">
          <span title="Paiement sécurisé">🔒</span>
          <span title="Livraison suivie">📦</span>
          <span title="Retours 14 jours">🔄</span>
        </div>
      </div>`;
  }

  window.applyPromo = () => {
    const v = document.getElementById('promo-input')?.value?.trim().toUpperCase();
    if (v === 'SAVE10') { promoApplied = true; showToast('Code promo SAVE10 appliqué ! -10% 🎉', 'success'); renderCart(); }
    else showToast('Code promo invalide.', 'error');
  };

  renderCart();
}

// ══════════════════════════════════════════════════════════════════════════════
// CHECKOUT PAGE
// ══════════════════════════════════════════════════════════════════════════════
function initCheckout() {
  const sumEl = document.getElementById('checkout-summary');
  if (sumEl) {
    const items = Cart.items();
    const total = Cart.total();
    const ship  = total >= 50 ? 0 : 5.99;
    sumEl.innerHTML = `
      <div class="order-summary-card">
        <h3 class="summary-title">Votre commande (${items.reduce((s,i)=>s+i.qty,0)} article${items.reduce((s,i)=>s+i.qty,0)>1?'s':''})</h3>
        ${items.slice(0,5).map(p => `
          <div style="display:flex;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid var(--border)">
            <span style="background:${p.bg};width:44px;height:44px;border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden">${p.img ? `<img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover">` : `<span style="font-size:1.75rem">${p.emoji}</span>`}</span>
            <div style="flex:1;min-width:0"><p style="font-size:.875rem;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.name}</p><p style="font-size:.75rem;color:var(--text-muted)">×${p.qty}</p></div>
            <strong style="font-size:.875rem;flex-shrink:0">${fmt(p.price * p.qty)}</strong>
          </div>`).join('')}
        ${items.length > 5 ? `<p style="font-size:.8125rem;color:var(--text-muted);text-align:center;padding:8px 0">+${items.length-5} autre(s)</p>` : ''}
        <div class="summary-line" style="margin-top:12px"><span>Sous-total</span><strong>${fmt(total)}</strong></div>
        <div class="summary-line"><span>Livraison</span><strong>${ship === 0 ? '<span style="color:var(--mint)">Offerte</span>' : fmt(ship)}</strong></div>
        <hr class="summary-divider">
        <div class="summary-line summary-total"><span>Total TTC</span><strong>${fmt(total + ship)}</strong></div>
      </div>`;
  }

  document.querySelectorAll('.payment-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  document.getElementById('checkout-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const num     = 'LDA-' + Date.now().toString(36).toUpperCase();
    const content = document.getElementById('checkout-content');
    if (content) content.innerHTML = `
      <div style="max-width:560px;margin:80px auto;text-align:center;padding:0 20px">
        <div style="font-size:5rem;margin-bottom:20px">🎉</div>
        <h1 style="font-size:2rem;font-weight:900;margin-bottom:8px">Commande confirmée !</h1>
        <p style="font-size:1.0625rem;color:var(--text-muted);margin-bottom:4px">Merci pour votre commande ✨</p>
        <p style="font-size:1.0625rem;color:var(--text-muted);margin-bottom:28px">N° de commande : <strong style="color:var(--text)">${num}</strong></p>
        <p style="font-size:.9375rem;color:var(--text-muted);margin-bottom:36px;line-height:1.7">Un e-mail de confirmation va vous être envoyé. Vos créations Le Labo d'Andrea arriveront dans <strong>3 à 5 jours ouvrés</strong> 📦</p>
        <a href="shop.html" class="btn btn-primary btn-lg">Continuer les achats</a>
      </div>`;
    Cart.clear();
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// ACCOUNT PAGE
// ══════════════════════════════════════════════════════════════════════════════
function initAccount() {
  document.querySelectorAll('.account-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.account-nav-item').forEach(i => i.classList.remove('active'));
      document.querySelectorAll('.account-panel').forEach(p => p.classList.remove('active'));
      item.classList.add('active');
      document.getElementById(`panel-${item.dataset.panel}`)?.classList.add('active');
    });
  });

  const wPanel = document.getElementById('panel-wishlist');
  if (wPanel) {
    const wItems = Wish.items();
    const grid   = wPanel.querySelector('.products-grid');
    if (grid) {
      grid.innerHTML = wItems.length
        ? wItems.map(p => renderProductCard(p)).join('')
        : `<div style="grid-column:1/-1;text-align:center;padding:48px 20px;color:var(--text-muted)">
             <div style="font-size:3rem;margin-bottom:12px">💕</div>
             <p style="font-size:1rem;font-weight:600">Aucun favori pour l'instant</p>
             <p style="margin-top:6px;font-size:.875rem">Cliquez sur ♥ sur un produit pour le sauvegarder ici.</p>
             <a href="shop.html" class="btn btn-primary btn-sm" style="margin-top:16px;display:inline-flex">Explorer la boutique</a>
           </div>`;
      if (wItems.length) initReveal();
    }
  }

  document.querySelectorAll('.settings-card button.btn').forEach(btn => {
    btn.addEventListener('click', () => showToast('Modifications enregistrées ✓', 'success'));
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// ROUTER
// ══════════════════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  const page = document.body.dataset.page;
  if (page === 'home')     initHome();
  if (page === 'shop')     initShop();
  if (page === 'product')  initProduct();
  if (page === 'cart')     initCart();
  if (page === 'checkout') initCheckout();
  if (page === 'account')  initAccount();
  initReveal();
});