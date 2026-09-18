// د محصولاتو لیست
const products = [
  { id: 1, name: "د Android سمارټ فون", price: 15000, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300" },
  { id: 2, name: "د لپ ټاپ کمپیوټر", price: 45000, img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300" },
  { id: 3, name: "وایرلیس هډفون", price: 2500, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300" },
  { id: 4, name: "د لاس ساعت", price: 3000, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300" },
  { id: 5, name: "سپورټي بوټان", price: 1800, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300" },
  { id: 6, name: "د لمر عینکې", price: 900, img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300" },
  { id: 7, name: "کتاب او قلم", price: 500, img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300" },
  { id: 8, name: "د کافي ماشین", price: 4200, img: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300" },
  { id: 9, name: "بیک پیک", price: 1500, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300" },
  { id: 10, name: "د موبایل پاور بانک", price: 800, img: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300" },
  { id: 11, name: "د کمپیوټر ماؤس", price: 600, img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300" },
  { id: 12, name: "د کیمرې", price: 22000, img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300" },
];

let cart = [];

// د محصولاتو ښودل
function displayProducts(list = products) {
  const grid = document.getElementById('productsGrid');
  if (list.length === 0) {
    grid.innerHTML = '<p class="empty-cart">هیڅ محصول ونه موندل شو</p>';
    return;
  }
  grid.innerHTML = list.map(p => `
    <div class="product-card">
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="product-price">${p.price.toLocaleString()} افغانۍ</p>
        <button class="add-btn" onclick="addToCart(${p.id})">کارټ ته اضافه کړه</button>
      </div>
    </div>
  `).join('');
}

// کارټ ته اضافه کول
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
}

// له کارټ څخه لرې کول
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// کارټ تازه کول
function updateCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartTotal').textContent = total.toLocaleString();

  const itemsDiv = document.getElementById('cartItems');
  if (cart.length === 0) {
    itemsDiv.innerHTML = '<p class="empty-cart">🛒 ستاسو کارټ خالي دی</p>';
    return;
  }

  itemsDiv.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${item.price.toLocaleString()} × ${item.qty} = ${(item.price * item.qty).toLocaleString()} افغانۍ</p>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${item.id})">🗑️</button>
    </div>
  `).join('');
}

// د کارټ خلاصول/بندول
function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
}

// لټون
function searchProducts() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  displayProducts(filtered);
}

// د پیرودلو تایید
function checkout() {
  if (cart.length === 0) {
    alert('🛒 ستاسو کارټ خالي دی!');
    return;
  }
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  alert(`✅ ستاسو فرمایش ومنل شو!\n\nټولټال: ${total.toLocaleString()} افغانۍ\n\nمننه چې زموږ سره مو خریدارۍ وکړه! 🛒`);
  cart = [];
  updateCart();
  toggleCart();
}

// پیل
displayProducts();
