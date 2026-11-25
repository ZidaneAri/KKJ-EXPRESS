// =========================================================
// STATE & DATA: RIDER POS WORKSPACE
// =========================================================
const initialRiderProducts = [
  { id: 1, name: "Kopi Susu Gula Aren", category: "KOPI", stock: 24, price: 18000 },
  { id: 2, name: "Caffè Latte", category: "KOPI", stock: 18, price: 20000 },
  { id: 3, name: "Americano", category: "KOPI", stock: 20, price: 15000 },
  { id: 4, name: "Cappuccino", category: "KOPI", stock: 16, price: 20000 },
  { id: 5, name: "Chocolate", category: "NON-KOPI", stock: 12, price: 18000 },
  { id: 6, name: "Matcha Latte", category: "NON-KOPI", stock: 8, price: 22000 }
];

const initialRiderTransactions = [
  { id: "#KKJ-0318", time: "10.18 WIB", cups: 3, method: "Tunai", total: 56000, status: "Berhasil", items: "2x Kopi Susu Gula Aren, 1x Caffè Latte" },
  { id: "#KKJ-0317", time: "10.02 WIB", cups: 2, method: "QRIS", total: 40000, status: "Berhasil", items: "2x Cappuccino" },
  { id: "#KKJ-0316", time: "09.45 WIB", cups: 2, method: "Tunai", total: 36000, status: "Berhasil", items: "2x Kopi Susu Gula Aren" },
  { id: "#KKJ-0315", time: "09.22 WIB", cups: 1, method: "Tunai", total: 18000, status: "Berhasil", items: "1x Chocolate" },
  { id: "#KKJ-0314", time: "08.56 WIB", cups: 2, method: "QRIS", total: 44000, status: "Berhasil", items: "2x Matcha Latte" },
  { id: "#KKJ-0313", time: "08.31 WIB", cups: 1, method: "Tunai", total: 20000, status: "Berhasil", items: "1x Caffè Latte" },
  { id: "#KKJ-0312", time: "07.48 WIB", cups: 3, method: "QRIS", total: 54000, status: "Berhasil", items: "3x Kopi Susu Gula Aren" },
  { id: "#KKJ-0311", time: "07.12 WIB", cups: 2, method: "QRIS", total: 30000, status: "Berhasil", items: "2x Americano" }
];

const stockMovements = [
  { time: "10.24", material: "Biji kopi", type: "Penjualan", detail: "Penjualan • -0,6 kg", balance: "1,8 kg" },
  { time: "10.24", material: "Susu segar", type: "Penjualan", detail: "Penjualan • -2,8 liter", balance: "1,2 liter" },
  { time: "10.24", material: "Gula aren", type: "Penjualan", detail: "Penjualan • -0,9 liter", balance: "1,5 liter" },
  { time: "07.00", material: "Biji kopi", type: "Alokasi awal", detail: "Alokasi awal • +2,4 kg", balance: "2,4 kg" },
  { time: "07.00", material: "Susu segar", type: "Alokasi awal", detail: "Alokasi awal • +4 liter", balance: "4 liter" },
  { time: "07.00", material: "Gula aren", type: "Alokasi awal", detail: "Alokasi awal • +2,4 liter", balance: "2,4 liter" }
];

let riderProducts = JSON.parse(localStorage.getItem("kkj_products")) || initialRiderProducts;
let riderTransactions = JSON.parse(localStorage.getItem("kkj_transactions")) || initialRiderTransactions;
let orderCounter = Number(localStorage.getItem("kkj_order_counter")) || 319;

let cart = [
  { id: 1, name: "Kopi Susu Gula Aren", price: 18000, qty: 2 },
  { id: 2, name: "Caffè Latte", price: 20000, qty: 1 }
];

let selectedCategory = "all";
let searchQuery = "";
let paymentMethod = "Tunai";
let txFilterMethod = "all";
let txSearchQuery = "";

// =========================================================
// STATE & DATA: OWNER BACKOFFICE WORKSPACE
// =========================================================
const ownerState = {
  currentPage: 'dashboard',
  selectedProductCode: 'KKJ-001',
  produkList: [
    { code: 'KKJ-001', name: 'Kopi susu gula aren', category: 'Kopi', price: 22000, status: 'Aktif', desc: 'Espresso, susu segar, dan gula aren.' },
    { code: 'KKJ-002', name: 'Americano', category: 'Kopi', price: 18000, status: 'Aktif', desc: 'Espresso klasik dengan air mineral dingin.' },
    { code: 'KKJ-003', name: 'Café latte', category: 'Kopi', price: 22000, status: 'Aktif', desc: 'Espresso lembut berpadu susu segar.' },
    { code: 'KKJ-004', name: 'Cappuccino', category: 'Kopi', price: 22000, status: 'Aktif', desc: 'Espresso dengan komposisi susu dan foam seimbang.' },
    { code: 'KKJ-005', name: 'Kopi susu pandan', category: 'Kopi', price: 24000, status: 'Aktif', desc: 'Kopi susu dengan aroma sirup pandan alami.' },
    { code: 'KKJ-006', name: 'Matcha latte', category: 'Non-kopi', price: 25000, status: 'Aktif', desc: 'Bubuk matcha premium dengan susu segar.' },
    { code: 'KKJ-007', name: 'Chocolate', category: 'Non-kopi', price: 23000, status: 'Aktif', desc: 'Cokelat pekat creamy dengan susu segar.' },
    { code: 'KKJ-008', name: 'Lemon tea', category: 'Teh', price: 15000, status: 'Nonaktif', desc: 'Teh hitam segar dengan perasan lemon.' }
  ],
  pengeluaranList: [
    { date: '24 Nov 2026', cat: 'Bahan baku', name: 'Biji kopi sangrai 10 kg', by: 'Owner', amount: 850000 },
    { date: '23 Nov 2026', cat: 'Bahan baku', name: 'Susu segar & gula aren', by: 'Owner', amount: 600000 },
    { date: '22 Nov 2026', cat: 'Operasional', name: 'Kemasan cup & sedotan', by: 'Owner', amount: 450000 },
    { date: '21 Nov 2026', cat: 'Transportasi', name: 'BBM & distribusi gerobak', by: 'Owner', amount: 300000 },
    { date: '20 Nov 2026', cat: 'Transportasi', name: 'Distribusi stok pagi', by: 'Owner', amount: 240000 },
    { date: '19 Nov 2026', cat: 'Bahan baku', name: 'Bubuk matcha & cokelat', by: 'Owner', amount: 400000 },
    { date: '18 Nov 2026', cat: 'Operasional', name: 'Listrik dan air operasional', by: 'Owner', amount: 320000 },
    { date: '18 Nov 2026', cat: 'Perawatan', name: 'Servis alat seduh gerobak', by: 'Owner', amount: 200000 }
  ],
  transaksiList: [
    { id: '#TRX-2411-0162', date: '24 Nov 2026', time: '14.32 WIB', rider: 'Adi Pratama', cart: 'G-01', method: 'QRIS', total: 'Rp35.000', status: 'Berhasil', items: [{ name: 'Kopi susu gula aren', qty: 1, price: 'Rp22.000', sub: 'Rp22.000' }, { name: 'Americano', qty: 1, price: 'Rp18.000', sub: 'Rp18.000' }], subtotal: 'Rp40.000', discount: '−Rp5.000' },
    { id: '#TRX-2411-0161', date: '24 Nov 2026', time: '14.29 WIB', rider: 'Raka Saputra', cart: 'G-02', method: 'Tunai', total: 'Rp25.000', status: 'Berhasil', items: [{ name: 'Matcha latte', qty: 1, price: 'Rp25.000', sub: 'Rp25.000' }], subtotal: 'Rp25.000', discount: 'Rp0' },
    { id: '#TRX-2411-0160', date: '24 Nov 2026', time: '14.27 WIB', rider: 'Bima Putra', cart: 'G-03', method: 'QRIS', total: 'Rp30.000', status: 'Berhasil', items: [{ name: 'Lemon tea', qty: 2, price: 'Rp15.000', sub: 'Rp30.000' }], subtotal: 'Rp30.000', discount: 'Rp0' },
    { id: '#TRX-2411-0159', date: '24 Nov 2026', time: '14.22 WIB', rider: 'Dimas Prakoso', cart: 'G-04', method: 'QRIS', total: 'Rp40.000', status: 'Gagal', items: [{ name: 'Kopi susu gula aren', qty: 2, price: 'Rp22.000', sub: 'Rp44.000' }], subtotal: 'Rp44.000', discount: '−Rp4.000' },
    { id: '#TRX-2411-0158', date: '24 Nov 2026', time: '14.18 WIB', rider: 'Nanda Saputra', cart: 'G-05', method: 'Tunai', total: 'Rp20.000', status: 'Berhasil', items: [{ name: 'Americano', qty: 1, price: 'Rp18.000', sub: 'Rp18.000' }], subtotal: 'Rp20.000', discount: 'Rp0' },
    { id: '#TRX-2411-0157', date: '24 Nov 2026', time: '14.15 WIB', rider: 'Fajar Maulana', cart: 'G-06', method: 'QRIS', total: 'Rp45.000', status: 'Berhasil', items: [{ name: 'Café latte', qty: 2, price: 'Rp22.000', sub: 'Rp44.000' }], subtotal: 'Rp45.000', discount: 'Rp0' },
    { id: '#TRX-2411-0156', date: '24 Nov 2026', time: '14.10 WIB', rider: 'Reza Firmansyah', cart: 'G-07', method: 'Tunai', total: 'Rp35.000', status: 'Berhasil', items: [{ name: 'Kopi susu pandan', qty: 1, price: 'Rp24.000', sub: 'Rp24.000' }], subtotal: 'Rp35.000', discount: 'Rp0' },
    { id: '#TRX-2411-0155', date: '24 Nov 2026', time: '14.05 WIB', rider: 'Yoga Pratama', cart: 'G-08', method: 'QRIS', total: 'Rp25.000', status: 'Gagal', items: [{ name: 'Matcha latte', qty: 1, price: 'Rp25.000', sub: 'Rp25.000' }], subtotal: 'Rp25.000', discount: 'Rp0' }
  ]
};

// =========================================================
// UTILITIES
// =========================================================
function formatRupiah(num) {
  return "Rp" + num.toLocaleString("id-ID");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}

// =========================================================
// AUTHENTICATION & DEMO ACCOUNT SWITCHER
// =========================================================
function fillDemoCredentials(role) {
  const userInput = document.getElementById("username");
  const passInput = document.getElementById("password");
  if (role === "owner") {
    userInput.value = "owner.kkj";
    passInput.value = "owner2026";
    showToast("Kredensial Akun Owner diisi ke form.");
  } else {
    userInput.value = "budi.santoso";
    passInput.value = "rider2026";
    showToast("Kredensial Akun Rider diisi ke form.");
  }
}

function loginAsRole(role) {
  localStorage.setItem("kkj_active_role", role);
  document.getElementById("login-view").classList.add("hidden");

  if (role === "owner") {
    document.getElementById("rider-app-view").classList.add("hidden");
    document.getElementById("owner-app-view").classList.remove("hidden");
    renderOwnerPage();
    showToast("Masuk sebagai Akun Owner (Akses Penuh)");
  } else {
    document.getElementById("owner-app-view").classList.add("hidden");
    document.getElementById("rider-app-view").classList.remove("hidden");
    document.title = "KKJ Express — Rider POS Workspace";
    renderRiderProducts();
    renderRiderCart();
    renderRiderTransactions();
    renderStockMovements("all");
    showToast("Selamat datang kembali, Budi Santoso (Gerobak 03)!");
  }
  lucide.createIcons();
}

function logoutApp() {
  localStorage.removeItem("kkj_active_role");
  document.getElementById("rider-app-view").classList.add("hidden");
  document.getElementById("owner-app-view").classList.add("hidden");
  document.getElementById("login-view").classList.remove("hidden");
  document.title = "KKJ Express — Coffee Point of Sale";
  lucide.createIcons();
  showToast("Anda telah keluar dari akun.");
}

function akhiriOperasional() {
  if (confirm("Apakah Anda yakin ingin mengakhiri operasional hari ini dan menutup shift?")) {
    logoutApp();
  }
}

// =========================================================
// INITIALIZATION & EVENT LISTENERS
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  // Cek sesi aktif
  const activeRole = localStorage.getItem("kkj_active_role");
  if (activeRole === "owner" || activeRole === "rider") {
    loginAsRole(activeRole);
  }

  // Toggle password visibility
  document.getElementById("toggle-pass").addEventListener("click", () => {
    const passInput = document.getElementById("password");
    passInput.type = passInput.type === "password" ? "text" : "password";
  });

  // Submit Login Form (deteksi otomatis role berdasarkan username)
  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const uname = document.getElementById("username").value.trim().toLowerCase();
    const detectedRole = uname.includes("owner") || uname.includes("admin") ? "owner" : "rider";
    loginAsRole(detectedRole);
  });

  // --- RIDER EVENT LISTENERS ---
  document.querySelectorAll(".r-nav-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".r-nav-tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const targetId = tab.getAttribute("data-target");
      document.querySelectorAll(".r-tab-content").forEach((sec) => sec.classList.add("hidden"));
      document.getElementById(targetId).classList.remove("hidden");
    });
  });

  const userMenuBtn = document.getElementById("r-user-menu-btn");
  const userDropdown = document.getElementById("r-user-dropdown");
  userMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle("hidden");
  });
  document.addEventListener("click", () => userDropdown.classList.add("hidden"));

  document.querySelectorAll(".r-category-pills .r-pill-btn[data-category]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".r-category-pills .r-pill-btn[data-category]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectedCategory = btn.getAttribute("data-category");
      renderRiderProducts();
    });
  });

  document.getElementById("product-search").addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderRiderProducts();
  });

  document.querySelectorAll(".r-pay-opt").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".r-pay-opt").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      paymentMethod = btn.getAttribute("data-method");
      document.getElementById("cash-payment-box").classList.toggle("hidden", paymentMethod !== "Tunai");
      document.getElementById("qris-payment-box").classList.toggle("hidden", paymentMethod === "Tunai");
    });
  });

  const cashInput = document.getElementById("cash-received");
  cashInput.addEventListener("input", () => {
    const rawDigits = cashInput.value.replace(/\D/g, "");
    const numericVal = parseInt(rawDigits || "0", 10);
    cashInput.value = numericVal > 0 ? numericVal.toLocaleString("id-ID") : "";
    updateChangeDisplay();
  });

  document.getElementById("reset-cart-btn").addEventListener("click", () => {
    cart = [];
    renderRiderProducts();
    renderRiderCart();
    showToast("Keranjang pesanan dikosongkan.");
  });

  document.getElementById("complete-order-btn").addEventListener("click", completeRiderPayment);

  document.querySelectorAll(".r-pill-btn[data-tx-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".r-pill-btn[data-tx-filter]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      txFilterMethod = btn.getAttribute("data-tx-filter");
      renderRiderTransactions();
    });
  });

  document.getElementById("tx-search").addEventListener("input", (e) => {
    txSearchQuery = e.target.value.toLowerCase();
    renderRiderTransactions();
  });

  document.getElementById("stock-movement-filter").addEventListener("change", (e) => {
    renderStockMovements(e.target.value);
  });

  // --- OWNER SIDEBAR NAVIGATION ---
  document.querySelectorAll('.o-nav-item[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.o-nav-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      ownerState.currentPage = btn.dataset.page;
      renderOwnerPage();
    });
  });
});

// =========================================================
// RIDER POS FUNCTIONS
// =========================================================
function renderRiderProducts() {
  const grid = document.getElementById("product-grid");
  const filtered = riderProducts.filter((p) => {
    const matchCat = selectedCategory === "all" || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery);
    return matchCat && matchSearch;
  });

  document.getElementById("product-count-label").textContent = `${filtered.length} produk tersedia`;

  grid.innerHTML = filtered.map((product) => {
    const inCart = cart.find((item) => item.id === product.id);
    const qty = inCart ? inCart.qty : 0;

    return `
      <div class="r-product-card ${qty > 0 ? "selected" : ""}">
        <div>
          <div class="r-product-cat">${product.category}</div>
          <div class="r-product-name">${product.name}</div>
          <div class="r-product-stock">Stok ${product.stock} cup</div>
        </div>
        <div class="r-product-bottom">
          <div class="r-product-price">${formatRupiah(product.price)}</div>
          ${qty > 0
            ? `<div class="r-qty-stepper">
                <button type="button" onclick="updateRiderQty(${product.id}, -1)">−</button>
                <span>${qty}</span>
                <button type="button" onclick="updateRiderQty(${product.id}, 1)">+</button>
              </div>`
            : `<button type="button" class="r-btn-add-circle" onclick="updateRiderQty(${product.id}, 1)">+</button>`
          }
        </div>
      </div>
    `;
  }).join("");
}

function updateRiderQty(productId, delta) {
  const product = riderProducts.find((p) => p.id === productId);
  if (!product) return;

  const existingIndex = cart.findIndex((item) => item.id === productId);
  if (existingIndex > -1) {
    const newQty = cart[existingIndex].qty + delta;
    if (newQty <= 0) cart.splice(existingIndex, 1);
    else if (newQty <= product.stock) cart[existingIndex].qty = newQty;
    else showToast(`Stok ${product.name} hanya tersisa ${product.stock} cup.`);
  } else if (delta > 0 && product.stock > 0) {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }

  renderRiderProducts();
  renderRiderCart();
}

function getCartTotals() {
  const totalCups = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  return { totalCups, totalPrice };
}

function renderRiderCart() {
  const listEl = document.getElementById("cart-items-list");
  const { totalCups, totalPrice } = getCartTotals();

  document.getElementById("current-order-meta").textContent = `#KKJ-0${orderCounter} • ${totalCups} cup`;
  document.getElementById("subtotal-label").textContent = `Subtotal (${totalCups} cup)`;
  document.getElementById("subtotal-value").textContent = formatRupiah(totalPrice);
  document.getElementById("total-value").textContent = formatRupiah(totalPrice);

  if (cart.length === 0) {
    listEl.innerHTML = `<div class="r-empty-cart-msg">Belum ada produk dipilih.</div>`;
  } else {
    listEl.innerHTML = cart.map((item) => `
      <div class="r-cart-item-row">
        <div>
          <div class="r-cart-item-name">${item.name}</div>
          <div class="r-cart-item-calc">${item.qty} × ${formatRupiah(item.price)}</div>
        </div>
        <div class="r-cart-item-total">${formatRupiah(item.price * item.qty)}</div>
      </div>
    `).join("");
  }

  updateChangeDisplay();
}

function updateChangeDisplay() {
  const { totalPrice } = getCartTotals();
  const rawDigits = document.getElementById("cash-received").value.replace(/\D/g, "");
  const received = parseInt(rawDigits || "0", 10);
  const change = received - totalPrice;

  const changeEl = document.getElementById("change-value");
  if (totalPrice === 0) {
    changeEl.textContent = "Rp0";
  } else if (change >= 0) {
    changeEl.textContent = formatRupiah(change);
    changeEl.style.color = "#FFFFFF";
  } else {
    changeEl.textContent = `Kurang ${formatRupiah(Math.abs(change))}`;
    changeEl.style.color = "#DFB784";
  }
}

function completeRiderPayment() {
  const { totalCups, totalPrice } = getCartTotals();
  if (cart.length === 0) return showToast("Pilih minimal 1 produk terlebih dahulu.");

  if (paymentMethod === "Tunai") {
    const rawDigits = document.getElementById("cash-received").value.replace(/\D/g, "");
    const received = parseInt(rawDigits || "0", 10);
    if (received < totalPrice) return showToast("Nominal uang diterima masih kurang dari total pembayaran.");
  }

  cart.forEach((cartItem) => {
    const prod = riderProducts.find((p) => p.id === cartItem.id);
    if (prod) prod.stock = Math.max(0, prod.stock - cartItem.qty);
  });

  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");

  const newTx = {
    id: `#KKJ-0${orderCounter}`,
    time: `${hh}.${mm} WIB`,
    cups: totalCups,
    method: paymentMethod,
    total: totalPrice,
    status: "Berhasil",
    items: cart.map((i) => `${i.qty}x ${i.name}`).join(", ")
  };

  riderTransactions.unshift(newTx);
  orderCounter++;

  localStorage.setItem("kkj_products", JSON.stringify(riderProducts));
  localStorage.setItem("kkj_transactions", JSON.stringify(riderTransactions));
  localStorage.setItem("kkj_order_counter", String(orderCounter));

  cart = [];
  document.getElementById("cash-received").value = "";
  renderRiderProducts();
  renderRiderCart();
  renderRiderTransactions();
  showToast(`Pembayaran ${newTx.id} (${formatRupiah(newTx.total)}) berhasil dicatat!`);
}

function renderRiderTransactions() {
  const tbody = document.getElementById("tx-table-body");
  const totalSales = riderTransactions.reduce((s, t) => s + t.total, 0);
  const totalCups = riderTransactions.reduce((s, t) => s + t.cups, 0);
  const tunaiTx = riderTransactions.filter((t) => t.method === "Tunai");
  const qrisTx = riderTransactions.filter((t) => t.method === "QRIS");

  document.getElementById("kpi-total-sales").textContent = formatRupiah(totalSales);
  document.getElementById("kpi-total-tx").textContent = riderTransactions.length;
  document.getElementById("kpi-total-cups").textContent = `${totalCups} cup`;
  document.getElementById("split-tunai-amount").textContent = formatRupiah(tunaiTx.reduce((s, t) => s + t.total, 0));
  document.getElementById("split-tunai-count").textContent = `${tunaiTx.length} transaksi`;
  document.getElementById("split-qris-amount").textContent = formatRupiah(qrisTx.reduce((s, t) => s + t.total, 0));
  document.getElementById("split-qris-count").textContent = `${qrisTx.length} transaksi`;

  const filtered = riderTransactions.filter((tx) => {
    const matchMethod = txFilterMethod === "all" || tx.method === txFilterMethod;
    const matchId = tx.id.toLowerCase().includes(txSearchQuery);
    return matchMethod && matchId;
  });

  document.getElementById("tx-subtitle-count").textContent = `${filtered.length} transaksi selesai • urutan terbaru`;
  document.getElementById("tx-right-badge").textContent = `${filtered.length} transaksi`;
  document.getElementById("tx-footer-showing").textContent = `Menampilkan ${filtered.length} dari ${riderTransactions.length} transaksi`;

  tbody.innerHTML = filtered.map((tx) => `
    <tr>
      <td>
        <div class="r-tx-id-main">${tx.id}</div>
        <div class="r-tx-id-sub">${tx.time} • ${tx.cups} cup</div>
      </td>
      <td>${tx.method}</td>
      <td><strong>${formatRupiah(tx.total)}</strong></td>
      <td><span class="r-badge-status safe">${tx.status}</span></td>
      <td class="text-right">
        <button type="button" class="r-btn-link-detail" onclick="openRiderTxModal('${tx.id}')">Lihat →</button>
      </td>
    </tr>
  `).join("");
}

function renderStockMovements(filterType) {
  const tbody = document.getElementById("stock-movement-body");
  const filtered = stockMovements.filter((item) => filterType === "all" || item.type === filterType);
  tbody.innerHTML = filtered.map((m) => `
    <tr>
      <td class="mono r-text-muted">${m.time}</td>
      <td><strong>${m.material}</strong></td>
      <td class="${m.type === "Alokasi awal" ? "r-text-green-move" : "r-text-muted"}">${m.detail}</td>
      <td><strong>${m.balance}</strong></td>
    </tr>
  `).join("");
}

// =========================================================
// OWNER BACKOFFICE RENDER ENGINE (9 HALAMAN)
// =========================================================
function navigateOwnerTo(pageId) {
  const btn = document.querySelector(`.o-nav-item[data-page="${pageId}"]`);
  if (btn) btn.click();
}

function renderOwnerPage() {
  const container = document.getElementById('ownerAppContent');
  const notifBadge = document.getElementById('oNotifBadge');
  notifBadge.classList.toggle('hidden', ownerState.currentPage !== 'alokasi-stok');

  const titles = {
    'dashboard': 'Dashboard penjualan · KKJ Express',
    'laporan-penjualan': 'Laporan penjualan · KKJ Express',
    'pengeluaran': 'Pencatatan pengeluaran · KKJ Express',
    'transaksi': 'Manajemen Transaksi · KKJ Express',
    'keuangan': 'Ringkasan keuangan · KKJ Express',
    'produk': 'Manajemen data produk · KKJ Express',
    'alokasi-stok': 'Manajemen alokasi stok · KKJ Express',
    'proyeksi-stok': 'Forecasting kebutuhan stok · KKJ Express',
    'absensi': 'Laporan absensi riders · KKJ Express'
  };
  document.title = titles[ownerState.currentPage] || 'KKJ Express';

  switch (ownerState.currentPage) {
    case 'dashboard': container.innerHTML = renderOwnerDashboard(); break;
    case 'laporan-penjualan': container.innerHTML = renderOwnerLaporanPenjualan(); break;
    case 'pengeluaran': container.innerHTML = renderOwnerPengeluaran(); break;
    case 'transaksi': container.innerHTML = renderOwnerTransaksi(); break;
    case 'keuangan': container.innerHTML = renderOwnerKeuangan(); break;
    case 'produk': container.innerHTML = renderOwnerProduk(); break;
    case 'alokasi-stok': container.innerHTML = renderOwnerAlokasiStok(); break;
    case 'proyeksi-stok': container.innerHTML = renderOwnerProyeksiStok(); break;
    case 'absensi': container.innerHTML = renderOwnerAbsensi(); break;
  }

  lucide.createIcons();
}

function renderOwnerDashboard() {
  const bars = [
    { hour: '08.00', h: 24, val: 'Rp240.000', dark: false },
    { hour: '09.00', h: 42, val: 'Rp420.000', dark: false },
    { hour: '10.00', h: 68, val: 'Rp680.000', dark: false },
    { hour: '11.00', h: 55, val: 'Rp540.000', dark: false },
    { hour: '12.00', h: 90, val: 'Rp920.000', dark: false },
    { hour: '13.00', h: 124, val: 'Rp1.260.000', dark: true },
    { hour: '14.00', h: 78, val: 'Rp800.000', dark: false }
  ];

  return `
    <div class="o-page-header">
      <div>
        <h1 class="o-page-title">Dashboard penjualan</h1>
        <p class="o-page-subtitle">Pantau penjualan, keuangan, dan operasional dalam satu tempat.</p>
      </div>
      <button class="o-btn-outline"><i data-lucide="download"></i> Unduh laporan</button>
    </div>

    <div class="o-filter-inline-row">
      <div class="o-filter-pills-left">
        <div class="o-pill-control" style="width:auto;"><span>Hari ini</span><i data-lucide="chevron-down"></i></div>
        <div class="o-pill-control" style="width:auto;"><div class="o-pill-control-inner"><i data-lucide="calendar"></i><span>24 November 2026</span></div></div>
        <div class="o-pill-control" style="width:auto;"><span>Semua gerobak</span><i data-lucide="chevron-down"></i></div>
      </div>
      <button class="o-btn-dark" onclick="openExpenseModal()"><i data-lucide="plus-circle"></i> Catat pengeluaran</button>
    </div>

    <div class="o-kpi-grid-4">
      <div class="o-kpi-card">
        <div class="o-kpi-top"><span>Total penjualan</span><i data-lucide="wallet"></i></div>
        <div class="o-kpi-value">Rp4.860.000</div>
        <div class="o-kpi-foot"><span class="o-trend-up">↑ 18,5%</span><span>dibanding kemarin</span></div>
      </div>
      <div class="o-kpi-card">
        <div class="o-kpi-top"><span>Total transaksi</span><i data-lucide="receipt"></i></div>
        <div class="o-kpi-value">162</div>
        <div class="o-kpi-foot"><span class="o-trend-up">↑ 12,5%</span><span>dibanding kemarin</span></div>
      </div>
      <div class="o-kpi-card">
        <div class="o-kpi-top"><span>Pengeluaran</span><i data-lucide="download"></i></div>
        <div class="o-kpi-value">Rp1.240.000</div>
        <div class="o-kpi-foot"><strong style="color:var(--text-gold)">Hari ini</strong><span>Biaya operasional tercatat</span></div>
      </div>
      <div class="o-kpi-card dark">
        <div class="o-kpi-top"><span>Saldo bersih</span><i data-lucide="trending-up"></i></div>
        <div class="o-kpi-value">Rp3.620.000</div>
        <div class="o-kpi-foot">Pemasukan – pengeluaran</div>
      </div>
    </div>

    <div class="o-grid-2-main">
      <div class="o-panel-card">
        <div class="o-panel-header">
          <div>
            <div class="o-panel-title">Tren penjualan</div>
            <div class="o-panel-subtitle">Nilai penjualan per jam · hari ini</div>
          </div>
          <div class="o-seg-tabs">
            <button class="o-seg-tab active">Penjualan</button>
            <button class="o-seg-tab">Transaksi</button>
          </div>
        </div>

        <div class="o-chart-area">
          <div class="o-chart-grid-lines">
            <div class="o-chart-grid-row"><span class="o-y-label">1,5 jt</span></div>
            <div class="o-chart-grid-row"><span class="o-y-label">1 jt</span></div>
            <div class="o-chart-grid-row"><span class="o-y-label">500 rb</span></div>
          </div>
          <div style="margin-top:-12px;"><span class="o-y-label">0</span></div>

          <div class="o-bars-overlay">
            ${bars.map(b => `
              <div class="o-bar-col">
                ${b.dark ? `<div class="o-bar-tooltip-dark">${b.val}</div>` : ''}
                <div class="o-bar-rect ${b.dark ? 'dark' : ''}" style="height:${b.h}px;"></div>
              </div>
            `).join('')}
          </div>
          <div class="o-x-labels-row">
            ${bars.map(b => `<div class="o-x-label">${b.hour}</div>`).join('')}
          </div>
        </div>

        <div class="o-chart-footer-legend">
          <span>Metode pembayaran</span>
          <div style="display:flex; gap:24px;">
            <span class="o-legend-item"><span class="o-dot-sand"></span> Tunai <strong>Rp2.916.000 (60%)</strong></span>
            <span class="o-legend-item"><span class="o-dot-dark"></span> QRIS <strong>Rp1.944.000 (40%)</strong></span>
          </div>
        </div>
      </div>

      <div class="o-panel-card" style="display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div class="o-panel-header">
            <div>
              <div class="o-panel-title">Operasional rider</div>
              <div class="o-panel-subtitle">8 berjualan · 2 belum mulai operasional</div>
            </div>
            <span class="o-panel-meta-green">8 aktif</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:10.5px; font-weight:700; color:var(--text-gold); padding-bottom:6px; border-bottom:1px solid #EFEAE0;">
            <span>RIDER / GEROBAK</span><span>PENJUALAN</span>
          </div>
          <div class="o-rider-rank-item">
            <div class="o-rank-left"><div class="o-rank-badge">01</div><div><div style="font-weight:600;">Adi Pratama</div><div class="o-sub-cell">G-01 · Mulai 08.00</div></div></div>
            <div style="font-weight:600;">Rp1.080.000</div>
          </div>
          <div class="o-rider-rank-item">
            <div class="o-rank-left"><div class="o-rank-badge">02</div><div><div style="font-weight:600;">Raka Saputra</div><div class="o-sub-cell">G-02 · Mulai 08.05</div></div></div>
            <div style="font-weight:600;">Rp960.000</div>
          </div>
          <div class="o-rider-rank-item">
            <div class="o-rank-left"><div class="o-rank-badge">03</div><div><div style="font-weight:600;">Bima Putra</div><div class="o-sub-cell">G-03 · Mulai 08.00</div></div></div>
            <div style="font-weight:600;">Rp840.000</div>
          </div>
        </div>
        <a class="o-link-row-bottom" onclick="navigateOwnerTo('absensi')"><span>Lihat laporan absensi</span><i data-lucide="arrow-right"></i></a>
      </div>
    </div>

    <div class="o-grid-2-main">
      <div class="o-panel-card">
        <div class="o-panel-header">
          <div>
            <div class="o-panel-title">Transaksi terbaru</div>
            <div class="o-panel-subtitle">Aktivitas penjualan dari seluruh gerobak</div>
          </div>
          <a class="o-panel-meta-gold" style="cursor:pointer; display:inline-flex; align-items:center; gap:4px;" onclick="navigateOwnerTo('transaksi')">
            Lihat semua <i data-lucide="arrow-right" style="width:14px;height:14px;"></i>
          </a>
        </div>
        <div class="o-table-wrap">
          <table class="o-table">
            <thead>
              <tr><th>ID / WAKTU</th><th>RIDER</th><th>METODE</th><th>TOTAL</th><th>STATUS</th></tr>
            </thead>
            <tbody>
              ${ownerState.transaksiList.slice(0, 3).map(t => `
                <tr style="cursor:pointer;" onclick="openOwnerTxDetailModal('${t.id}')">
                  <td><div style="font-weight:600;">${t.id}</div><div class="o-sub-cell">${t.time}</div></td>
                  <td><div style="font-weight:600;">${t.rider}</div><div class="o-sub-cell">${t.cart}</div></td>
                  <td><span class="${t.method === 'QRIS' ? 'o-badge-pay-qris' : 'o-badge-pay-tunai'}">${t.method}</span></td>
                  <td style="font-weight:600;">${t.total}</td>
                  <td><span class="o-badge-status o-badge-success">✓ ${t.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div style="font-size:11.5px; color:var(--text-muted); margin-top:12px;">Menampilkan 3 dari 162 transaksi</div>
      </div>

      <div class="o-panel-card">
        <div class="o-panel-header">
          <div>
            <div class="o-panel-title">Persediaan stok</div>
            <div class="o-panel-subtitle">Segera cek ketersediaan bahan baku.</div>
          </div>
          <span class="o-badge-status o-badge-warning">2 menipis</span>
        </div>
        <div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #EFEAE0; font-size:13px;">
          <span style="display:flex; align-items:center; gap:8px;"><span class="o-dot-sand"></span> Kemasan</span>
          <span style="color:var(--text-gold); font-weight:600;">Pusat · sisa 40 pcs</span>
        </div>
        <div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #EFEAE0; font-size:13px;">
          <span style="display:flex; align-items:center; gap:8px;"><span class="o-dot-sand"></span> Bahan baku utama</span>
          <span style="color:var(--text-gold); font-weight:600;">G-03 · sisa 12 porsi</span>
        </div>
        <a class="o-link-row-bottom" style="border-top:none; padding-top:10px;" onclick="navigateOwnerTo('alokasi-stok')"><span>Atur alokasi stok</span><i data-lucide="arrow-right"></i></a>
        <div class="o-proyeksi-mini-box">
          <div style="display:flex; justify-content:space-between; font-size:12px; color:var(--text-secondary);"><span>Proyeksi kebutuhan</span><span style="color:var(--text-gold); font-weight:600;">Besok ⌄</span></div>
          <div style="font-size:26px; font-weight:500; margin:6px 0;">210 porsi</div>
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:11.5px; color:var(--text-muted);">
            <span>Estimasi dari 7 hari terakhir</span>
            <a style="color:var(--text-gold); font-weight:600; cursor:pointer;" onclick="navigateOwnerTo('proyeksi-stok')">Lihat proyeksi →</a>
          </div>
        </div>
      </div>
    </div>

    <div class="o-page-footer">
      <span>Data contoh untuk rancangan antarmuka</span>
      <span>Terakhir diperbarui 24 Nov 2026, 14.32 WIB</span>
    </div>
  `;
}

function renderOwnerLaporanPenjualan() {
  const days = [
    { d: '18 Nov', h: 82, label: '3,24 jt', dark: false },
    { d: '19 Nov', h: 92, label: '3,60 jt', dark: false },
    { d: '20 Nov', h: 106, label: '4,14 jt', dark: false },
    { d: '21 Nov', h: 115, label: '4,50 jt', dark: false },
    { d: '22 Nov', h: 138, label: '5,40 jt', dark: true },
    { d: '23 Nov', h: 108, label: '4,20 jt', dark: false },
    { d: '24 Nov', h: 124, label: '4,86 jt', dark: false }
  ];
  const rows = [
    { date: 'Rab, 18 Nov 2026', tx: 108, tunai: 'Rp1.944.000', qris: 'Rp1.296.000', total: 'Rp3.240.000' },
    { date: 'Kam, 19 Nov 2026', tx: 120, tunai: 'Rp2.160.000', qris: 'Rp1.440.000', total: 'Rp3.600.000' },
    { date: 'Jum, 20 Nov 2026', tx: 138, tunai: 'Rp2.484.000', qris: 'Rp1.656.000', total: 'Rp4.140.000' },
    { date: 'Sab, 21 Nov 2026', tx: 150, tunai: 'Rp2.700.000', qris: 'Rp1.800.000', total: 'Rp4.500.000' },
    { date: 'Min, 22 Nov 2026', tx: 180, tunai: 'Rp3.240.000', qris: 'Rp2.160.000', total: 'Rp5.400.000' },
    { date: 'Sen, 23 Nov 2026', tx: 140, tunai: 'Rp2.520.000', qris: 'Rp1.680.000', total: 'Rp4.200.000' },
    { date: 'Sel, 24 Nov 2026', today: true, tx: 162, tunai: 'Rp2.916.000', qris: 'Rp1.944.000', total: 'Rp4.860.000' }
  ];

  return `
    <div class="o-page-header">
      <div><h1 class="o-page-title">Laporan penjualan</h1><p class="o-page-subtitle">Evaluasi perkembangan penjualan usaha berdasarkan periode yang Anda pilih.</p></div>
      <button class="o-btn-outline"><i data-lucide="download"></i> Unduh laporan</button>
    </div>
    <div class="o-filter-box">
      <div class="o-filter-group"><label class="o-filter-label">Periode</label><div class="o-pill-control"><span>7 hari terakhir</span><i data-lucide="chevron-down"></i></div></div>
      <div class="o-filter-group"><label class="o-filter-label">Tanggal mulai</label><div class="o-pill-control"><div class="o-pill-control-inner"><i data-lucide="calendar"></i><span>18 Nov 2026</span></div></div></div>
      <div class="o-filter-group"><label class="o-filter-label">Tanggal selesai</label><div class="o-pill-control"><div class="o-pill-control-inner"><i data-lucide="calendar"></i><span>24 Nov 2026</span></div></div></div>
      <div class="o-filter-group"><label class="o-filter-label">Gerobak</label><div class="o-pill-control"><span>Semua gerobak</span><i data-lucide="chevron-down"></i></div></div>
      <div class="o-filter-actions"><button class="o-btn-dark">Tampilkan</button><button class="o-btn-reset">Reset</button></div>
    </div>
    <div class="o-kpi-grid-3">
      <div class="o-kpi-card dark"><div class="o-kpi-top"><span>Total penjualan</span><i data-lucide="wallet"></i></div><div class="o-kpi-value">Rp29.940.000</div><div class="o-kpi-foot"><span class="o-trend-up">↑ 18,8%</span><span style="color:#CFC8BC;">dibanding 11–17 Nov 2026</span></div></div>
      <div class="o-kpi-card"><div class="o-kpi-top"><span>Jumlah transaksi</span><i data-lucide="receipt"></i></div><div class="o-kpi-value">998</div><div class="o-kpi-foot"><span class="o-trend-up">↑ 18,8%</span><span>dibanding 11–17 Nov 2026</span></div></div>
      <div class="o-kpi-card"><div class="o-kpi-top"><span>Rata-rata transaksi</span><i data-lucide="trending-up"></i></div><div class="o-kpi-value">Rp30.000</div><div class="o-kpi-foot"><strong style="color:var(--text-gold)">18–24 Nov 2026</strong><span>Periode laporan · 7 hari</span></div></div>
    </div>
    <div class="o-grid-2-main">
      <div class="o-panel-card">
        <div class="o-panel-header"><div><div class="o-panel-title">Tren penjualan harian</div><div class="o-panel-subtitle">18–24 November 2026 · semua gerobak</div></div><span class="o-panel-meta-gold">Penjualan tertinggi: 22 Nov</span></div>
        <div class="o-chart-area">
          <div class="o-chart-grid-lines"><div class="o-chart-grid-row"><span class="o-y-label">6 jt</span></div><div class="o-chart-grid-row"><span class="o-y-label">3 jt</span></div><div class="o-chart-grid-row" style="border-top:none;"><span class="o-y-label" style="align-self:flex-end;">0</span></div></div>
          <div class="o-bars-overlay">${days.map(b => `<div class="o-bar-col"><div class="o-bar-val-label" style="${b.dark ? 'font-weight:700;' : ''}">${b.label}</div><div class="o-bar-rect ${b.dark ? 'dark' : ''}" style="height:${b.h}px;"></div></div>`).join('')}</div>
          <div class="o-x-labels-row">${days.map(b => `<div class="o-x-label">${b.d}</div>`).join('')}</div>
        </div>
      </div>
      <div class="o-panel-card" style="display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div class="o-panel-header"><div><div class="o-panel-title">Metode pembayaran</div><div class="o-panel-subtitle">Kontribusi terhadap total penjualan</div></div></div>
          <div style="display:flex; height:10px; border-radius:999px; overflow:hidden; margin:12px 0 22px 0;"><div style="width:60%; background:var(--bg-sand-dark);"></div><div style="width:40%; background:var(--bg-dark);"></div></div>
          <div style="display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid #EFEAE0;"><div style="display:flex; align-items:center; gap:12px;"><span class="o-badge-pay-tunai">Tunai</span><span style="color:var(--text-gold); font-weight:600;">60%</span></div><strong style="font-size:15px;">Rp17.964.000</strong></div>
          <div style="display:flex; justify-content:space-between; align-items:center; padding:14px 0;"><div style="display:flex; align-items:center; gap:12px;"><span class="o-badge-pay-qris">QRIS</span><span style="color:var(--text-gold); font-weight:600;">40%</span></div><strong style="font-size:15px;">Rp11.976.000</strong></div>
        </div>
        <div style="font-size:11.5px; color:var(--text-muted); border-top:1px solid #EFEAE0; padding-top:12px;">Hanya transaksi berhasil pada periode terpilih.</div>
      </div>
    </div>
    <div class="o-panel-card">
      <div class="o-panel-header"><div class="o-panel-title">Rincian penjualan harian</div><span class="o-panel-meta-gold">18–24 Nov 2026 · 7 hari</span></div>
      <div class="o-table-wrap"><table class="o-table"><thead><tr><th>TANGGAL</th><th class="text-right">TRANSAKSI</th><th class="text-right">TUNAI</th><th class="text-right">QRIS</th><th class="text-right">TOTAL PENJUALAN</th></tr></thead><tbody>
        ${rows.map(r => `<tr class="${r.today ? 'highlight-row' : ''}"><td>${r.date}${r.today ? '<span style="margin-left:18px; font-size:11.5px; color:var(--text-gold); font-weight:600;">Hari ini</span>' : ''}</td><td class="text-right">${r.tx}</td><td class="text-right" style="color:var(--text-secondary);">${r.tunai}</td><td class="text-right" style="color:var(--text-secondary);">${r.qris}</td><td class="text-right" style="font-weight:700;">${r.total}</td></tr>`).join('')}
        <tr class="total-row"><td>Total periode</td><td class="text-right">998</td><td class="text-right">Rp17.964.000</td><td class="text-right">Rp11.976.000</td><td class="text-right">Rp29.940.000</td></tr>
      </tbody></table></div>
    </div>
    <div class="o-page-footer"><span>Data contoh untuk rancangan antarmuka · transaksi berhasil saja</span><span>Data 24 Nov 2026 sampai pukul 14.32 WIB</span></div>
  `;
}

function renderOwnerPengeluaran() {
  const totalExp = ownerState.pengeluaranList.reduce((acc, item) => acc + item.amount, 0);
  return `
    <div class="o-page-header">
      <div><h1 class="o-page-title">Pencatatan pengeluaran</h1><p class="o-page-subtitle">Pantau biaya operasional usaha berdasarkan periode yang Anda pilih.</p></div>
      <button class="o-btn-dark" onclick="openExpenseModal()"><i data-lucide="plus-circle"></i> Tambah pengeluaran</button>
    </div>
    <div class="o-filter-box">
      <div class="o-filter-group"><label class="o-filter-label">Periode</label><div class="o-pill-control"><span>7 hari terakhir</span><i data-lucide="chevron-down"></i></div></div>
      <div class="o-filter-group"><label class="o-filter-label">Tanggal mulai</label><div class="o-pill-control"><div class="o-pill-control-inner"><i data-lucide="calendar"></i><span>18 Nov 2026</span></div></div></div>
      <div class="o-filter-group"><label class="o-filter-label">Tanggal selesai</label><div class="o-pill-control"><div class="o-pill-control-inner"><i data-lucide="calendar"></i><span>24 Nov 2026</span></div></div></div>
      <div class="o-filter-group"><label class="o-filter-label">Kategori</label><div class="o-pill-control"><span>Semua kategori</span><i data-lucide="chevron-down"></i></div></div>
      <div class="o-filter-actions"><button class="o-btn-dark">Tampilkan</button><button class="o-btn-reset">Reset</button></div>
    </div>
    <div class="o-kpi-grid-3">
      <div class="o-kpi-card dark"><div class="o-kpi-top"><span>Total pengeluaran</span><i data-lucide="wallet"></i></div><div class="o-kpi-value">${formatRupiah(totalExp)}</div><div class="o-kpi-foot"><span>18–24 Nov 2026</span><span style="color:#CFC8BC;">Periode terpilih</span></div></div>
      <div class="o-kpi-card"><div class="o-kpi-top"><span>Jumlah transaksi</span><i data-lucide="receipt"></i></div><div class="o-kpi-value">${ownerState.pengeluaranList.length}</div><div class="o-kpi-foot"><strong style="color:var(--text-green)">Catatan biaya</strong><span>Semua kategori aktif</span></div></div>
      <div class="o-kpi-card"><div class="o-kpi-top"><span>Rata-rata transaksi</span><i data-lucide="trending-up"></i></div><div class="o-kpi-value">${formatRupiah(Math.round(totalExp / ownerState.pengeluaranList.length))}</div><div class="o-kpi-foot"><strong style="color:var(--text-gold)">Total ÷ transaksi</strong><span>${totalExp.toLocaleString('id-ID')} ÷ ${ownerState.pengeluaranList.length}</span></div></div>
    </div>
    <div class="o-panel-card">
      <div class="o-panel-header"><div><div class="o-panel-title">Rincian pengeluaran</div><div class="o-panel-subtitle">18–24 November 2026 · semua kategori</div></div><button class="o-btn-outline"><i data-lucide="download"></i> Unduh laporan</button></div>
      <div class="o-table-wrap"><table class="o-table"><thead><tr><th>TANGGAL</th><th>KATEGORI</th><th>NAMA PENGELUARAN</th><th>DICATAT OLEH</th><th class="text-right">NOMINAL</th></tr></thead><tbody>
        ${ownerState.pengeluaranList.map(item => `<tr><td>${item.date}</td><td><span class="o-badge-status o-badge-neutral">${item.cat}</span></td><td style="font-weight:500;">${item.name}</td><td style="color:var(--text-secondary);">${item.by}</td><td class="text-right" style="font-weight:600;">${formatRupiah(item.amount)}</td></tr>`).join('')}
        <tr class="total-row"><td>Total pengeluaran</td><td></td><td></td><td style="font-weight:400; color:var(--text-secondary);">${ownerState.pengeluaranList.length} transaksi</td><td class="text-right">${formatRupiah(totalExp)}</td></tr>
      </tbody></table></div>
      <div class="o-pagination-bar"><span>Menampilkan ${ownerState.pengeluaranList.length} dari ${ownerState.pengeluaranList.length} pengeluaran</span><span style="color:var(--text-gold); font-weight:600;">Terbaru dicatat ditampilkan di atas</span></div>
    </div>
    <div class="o-page-footer"><span>Data pengeluaran mengikuti rentang tanggal dan kategori yang dipilih.</span><span></span></div>
  `;
}

function renderOwnerTransaksi() {
  return `
    <div class="o-page-header">
      <div><h1 class="o-page-title">Manajemen Transaksi</h1><p class="o-page-subtitle">Pantau riwayat penjualan seluruh gerobak dan evaluasi setiap transaksi.</p></div>
      <button class="o-btn-outline"><i data-lucide="download"></i> Unduh Laporan</button>
    </div>
    <div class="o-filter-box">
      <div class="o-filter-group"><label class="o-filter-label">Periode</label><div class="o-pill-control"><div class="o-pill-control-inner"><i data-lucide="calendar"></i><span>18–24 Nov 2026</span></div><i data-lucide="chevron-down"></i></div></div>
      <div class="o-filter-group"><label class="o-filter-label">Metode pembayaran</label><div class="o-pill-control"><span>Semua metode</span><i data-lucide="chevron-down"></i></div></div>
      <div class="o-filter-group"><label class="o-filter-label">Status transaksi</label><div class="o-pill-control"><span>Semua status</span><i data-lucide="chevron-down"></i></div></div>
      <div class="o-filter-group"><label class="o-filter-label">Cakupan transaksi</label><div style="font-weight:600; font-size:13.5px;">Seluruh gerobak</div><div style="font-size:11px; color:var(--text-muted);">Tunai & QRIS · Berhasil & Gagal</div></div>
    </div>
    <div class="o-kpi-grid-4">
      <div class="o-kpi-card"><div class="o-kpi-top"><span>Total transaksi</span><i data-lucide="receipt"></i></div><div class="o-kpi-value">1.012</div><div class="o-kpi-foot">Seluruh gerobak · 18–24 Nov 2026</div></div>
      <div class="o-kpi-card dark"><div class="o-kpi-top"><span>Total nilai penjualan</span><i data-lucide="wallet"></i></div><div class="o-kpi-value">Rp29.940.000</div><div class="o-kpi-foot">Hanya transaksi berhasil</div></div>
      <div class="o-kpi-card"><div class="o-kpi-top"><span>Transaksi berhasil</span><i data-lucide="check-circle-2"></i></div><div class="o-kpi-value">998</div><div class="o-kpi-foot">98,6% dari total transaksi</div></div>
      <div class="o-kpi-card"><div class="o-kpi-top"><span>Transaksi gagal</span><i data-lucide="x-circle"></i></div><div class="o-kpi-value">14</div><div class="o-kpi-foot">1,4% dari total transaksi</div></div>
    </div>
    <div class="o-panel-card">
      <div class="o-panel-header">
        <div><div class="o-panel-title">Riwayat transaksi</div><div class="o-panel-subtitle">Seluruh gerobak · 1.012 transaksi pada periode terpilih</div></div>
        <div class="o-search-input-wrap"><i data-lucide="search"></i><input type="text" placeholder="Cari ID transaksi atau nama rider" /></div>
      </div>
      <div class="o-table-wrap"><table class="o-table"><thead><tr><th>ID TRANSAKSI</th><th>TANGGAL & WAKTU</th><th>NAMA RIDER</th><th>GEROBAK</th><th>PEMBAYARAN</th><th>TOTAL PEMBAYARAN</th><th>STATUS</th><th>AKSI</th></tr></thead><tbody>
        ${ownerState.transaksiList.map(t => `<tr>
          <td style="font-weight:600;">${t.id}</td>
          <td><div>${t.date}</div><div class="o-sub-cell">${t.time}</div></td>
          <td style="font-weight:600;">${t.rider}</td>
          <td style="color:var(--text-secondary);">${t.cart}</td>
          <td><span class="${t.method === 'QRIS' ? 'o-badge-pay-qris' : 'o-badge-pay-tunai'}">${t.method}</span></td>
          <td style="font-weight:600;">${t.total}</td>
          <td><span class="o-badge-status ${t.status === 'Berhasil' ? 'o-badge-success' : 'o-badge-danger'}">${t.status === 'Berhasil' ? '✓ Berhasil' : '× Gagal'}</span></td>
          <td><a style="color:var(--text-gold); font-weight:600; cursor:pointer; font-size:12.5px;" onclick="openOwnerTxDetailModal('${t.id}')">Lihat Detail  ›</a></td>
        </tr>`).join('')}
      </tbody></table></div>
      <div class="o-pagination-bar"><span>Menampilkan 1–8 dari 1.012 transaksi</span><div class="o-page-buttons"><button class="o-page-btn">‹</button><button class="o-page-btn active">1</button><button class="o-page-btn">2</button><button class="o-page-btn">3</button><span style="padding:0 4px;">...</span><button class="o-page-btn">127</button><button class="o-page-btn">›</button></div></div>
    </div>
    <div class="o-page-footer"><span>Data contoh untuk rancangan antarmuka · seluruh gerobak</span><span>Periode 18–24 Nov 2026 · Diperbarui 14.32 WIB</span></div>
  `;
}

function renderOwnerKeuangan() {
  const cashflow = [
    { d: '18 Nov', inc: 82, exp: 14, label: '3,24 jt' },
    { d: '19 Nov', inc: 92, exp: 11, label: '3,60 jt' },
    { d: '20 Nov', inc: 106, exp: 7, label: '4,14 jt' },
    { d: '21 Nov', inc: 115, exp: 9, label: '4,50 jt' },
    { d: '22 Nov', inc: 138, exp: 12, label: '5,40 jt' },
    { d: '23 Nov', inc: 108, exp: 16, label: '4,20 jt' },
    { d: '24 Nov', inc: 124, exp: 22, label: '4,86 jt' }
  ];
  const categories = [
    { name: 'Bahan baku', val: 'Rp1.850.000', pct: '55%', dark: true },
    { name: 'Operasional', val: 'Rp770.000', pct: '23%', dark: false },
    { name: 'Transportasi', val: 'Rp540.000', pct: '16%', dark: false },
    { name: 'Perawatan', val: 'Rp200.000', pct: '6%', dark: false }
  ];
  const rows = [
    { date: 'Rab, 18 Nov 2026', inc: 'Rp3.240.000', exp: 'Rp520.000', net: 'Rp2.720.000' },
    { date: 'Kam, 19 Nov 2026', inc: 'Rp3.600.000', exp: 'Rp400.000', net: 'Rp3.200.000' },
    { date: 'Jum, 20 Nov 2026', inc: 'Rp4.140.000', exp: 'Rp240.000', net: 'Rp3.900.000' },
    { date: 'Sab, 21 Nov 2026', inc: 'Rp4.500.000', exp: 'Rp300.000', net: 'Rp4.200.000' },
    { date: 'Min, 22 Nov 2026', inc: 'Rp5.400.000', exp: 'Rp450.000', net: 'Rp4.950.000' },
    { date: 'Sen, 23 Nov 2026', inc: 'Rp4.200.000', exp: 'Rp600.000', net: 'Rp3.600.000' },
    { date: 'Sel, 24 Nov 2026', inc: 'Rp4.860.000', exp: 'Rp850.000', net: 'Rp4.010.000' }
  ];

  return `
    <div class="o-page-header">
      <div><h1 class="o-page-title">Ringkasan keuangan</h1><p class="o-page-subtitle">Evaluasi pemasukan, pengeluaran, dan saldo bersih usaha dalam satu ringkasan.</p></div>
      <button class="o-btn-outline"><i data-lucide="download"></i> Unduh laporan</button>
    </div>
    <div class="o-filter-box">
      <div class="o-filter-group"><label class="o-filter-label">Periode</label><div class="o-pill-control"><span>7 hari terakhir</span><i data-lucide="chevron-down"></i></div></div>
      <div class="o-filter-group"><label class="o-filter-label">Tanggal mulai</label><div class="o-pill-control"><div class="o-pill-control-inner"><i data-lucide="calendar"></i><span>18 Nov 2026</span></div></div></div>
      <div class="o-filter-group"><label class="o-filter-label">Tanggal selesai</label><div class="o-pill-control"><div class="o-pill-control-inner"><i data-lucide="calendar"></i><span>24 Nov 2026</span></div></div></div>
      <div class="o-filter-group"><label class="o-filter-label">Cakupan</label><div class="o-pill-control"><span>Seluruh usaha</span><i data-lucide="chevron-down"></i></div></div>
      <div class="o-filter-actions"><button class="o-btn-dark">Tampilkan</button><button class="o-btn-reset">Reset</button></div>
    </div>
    <div class="o-kpi-grid-3">
      <div class="o-kpi-card"><div class="o-kpi-top"><span>Total pemasukan</span><i data-lucide="wallet"></i></div><div class="o-kpi-value">Rp29.940.000</div><div class="o-kpi-foot"><strong>998 transaksi</strong><span>penjualan berhasil</span></div></div>
      <div class="o-kpi-card"><div class="o-kpi-top"><span>Total pengeluaran</span><i data-lucide="receipt"></i></div><div class="o-kpi-value">Rp3.360.000</div><div class="o-kpi-foot"><strong style="color:var(--text-green)">8 catatan</strong><span>pengeluaran usaha</span></div></div>
      <div class="o-kpi-card dark"><div class="o-kpi-top"><span>Saldo bersih</span><i data-lucide="trending-up"></i></div><div class="o-kpi-value">Rp26.580.000</div><div class="o-kpi-foot">Pemasukan – pengeluaran</div></div>
    </div>
    <div class="o-grid-2-main">
      <div class="o-panel-card">
        <div class="o-panel-header"><div><div class="o-panel-title">Arus keuangan harian</div><div class="o-panel-subtitle">Pemasukan dan pengeluaran · 18–24 Nov 2026</div></div><div style="display:flex; gap:18px; font-size:12px;"><span class="o-legend-item"><span style="width:8px;height:8px;border-radius:2px;background:var(--bg-dark);"></span> Pemasukan</span><span class="o-legend-item"><span style="width:8px;height:8px;border-radius:2px;background:var(--bg-sand-dark);"></span> Pengeluaran</span></div></div>
        <div class="o-chart-area">
          <div class="o-chart-grid-lines"><div class="o-chart-grid-row"><span class="o-y-label">6 jt</span></div><div class="o-chart-grid-row"><span class="o-y-label">3 jt</span></div><div class="o-chart-grid-row" style="border-top:none;"><span class="o-y-label" style="align-self:flex-end;">0</span></div></div>
          <div class="o-bars-overlay">${cashflow.map(c => `<div class="o-bar-col"><div class="o-bar-val-label">${c.label}</div><div class="o-bar-pair"><div class="o-bar-rect dark" style="height:${c.inc}px;"></div><div class="o-bar-rect exp" style="height:${c.exp}px;"></div></div></div>`).join('')}</div>
          <div class="o-x-labels-row">${cashflow.map(c => `<div class="o-x-label">${c.d}</div>`).join('')}</div>
        </div>
      </div>
      <div class="o-panel-card">
        <div class="o-panel-header"><div><div class="o-panel-title">Pengeluaran per kategori</div><div class="o-panel-subtitle">4 kategori · 8 catatan pengeluaran</div></div></div>
        ${categories.map(cat => `<div style="margin-bottom:14px;"><div style="display:flex; justify-content:space-between; font-size:12.5px; margin-bottom:5px;"><span style="font-weight:500;">${cat.name}</span><span style="font-weight:600;">${cat.val}</span></div><div style="height:5px; background:#EFEAE0; border-radius:999px; overflow:hidden;"><div style="width:${cat.pct}; height:100%; background:${cat.dark ? 'var(--bg-dark)' : 'var(--bg-sand-dark)'}; border-radius:999px;"></div></div></div>`).join('')}
      </div>
    </div>
    <div class="o-panel-card">
      <div class="o-panel-header"><div class="o-panel-title">Rincian keuangan harian</div><span class="o-panel-meta-gold">18–24 Nov 2026 · 7 hari</span></div>
      <div class="o-table-wrap"><table class="o-table"><thead><tr><th>TANGGAL</th><th class="text-right">PEMASUKAN</th><th class="text-right">PENGELUARAN</th><th class="text-right">SALDO BERSIH</th></tr></thead><tbody>
        ${rows.map(r => `<tr><td>${r.date}</td><td class="text-right" style="color:var(--text-secondary);">${r.inc}</td><td class="text-right" style="color:var(--text-secondary);">${r.exp}</td><td class="text-right" style="font-weight:700;">${r.net}</td></tr>`).join('')}
        <tr class="total-row"><td>Total periode</td><td class="text-right">Rp29.940.000</td><td class="text-right">Rp3.360.000</td><td class="text-right">Rp26.580.000</td></tr>
      </tbody></table></div>
    </div>
    <div class="o-page-footer"><span>Data contoh · saldo bersih = pemasukan − pengeluaran pada periode terpilih</span><span>Data 24 Nov 2026 sampai pukul 14.32 WIB</span></div>
  `;
}

function renderOwnerProduk() {
  const activeCount = ownerState.produkList.filter(p => p.status === 'Aktif').length;
  const inactiveCount = ownerState.produkList.filter(p => p.status === 'Nonaktif').length;
  const selected = ownerState.produkList.find(p => p.code === ownerState.selectedProductCode) || ownerState.produkList[0];

  return `
    <div class="o-page-header">
      <div><h1 class="o-page-title">Manajemen data produk</h1><p class="o-page-subtitle">Kelola informasi dan harga produk.</p></div>
      <button class="o-btn-dark" onclick="openAddProductModal()"><i data-lucide="plus-circle"></i> Tambah produk</button>
    </div>
    <div class="o-kpi-grid-3">
      <div class="o-kpi-card dark"><div class="o-kpi-top"><span>Total produk</span><i data-lucide="package"></i></div><div class="o-kpi-value">${ownerState.produkList.length}</div><div class="o-kpi-foot">Katalog produk terdaftar</div></div>
      <div class="o-kpi-card"><div class="o-kpi-top"><span>Produk aktif</span><i data-lucide="check-circle-2"></i></div><div class="o-kpi-value">${activeCount}</div><div class="o-kpi-foot"><strong style="color:var(--text-green)">Siap dijual</strong><span>Tampil di Website Riders</span></div></div>
      <div class="o-kpi-card"><div class="o-kpi-top"><span>Produk nonaktif</span><i data-lucide="x-circle"></i></div><div class="o-kpi-value">${inactiveCount}</div><div class="o-kpi-foot">Tidak ditampilkan di kasir</div></div>
    </div>
    <div class="o-filter-box">
      <div class="o-filter-group" style="flex:2;"><div class="o-search-input-wrap" style="width:100%;"><i data-lucide="search"></i><input type="text" placeholder="Cari nama atau kode produk" /></div></div>
      <div class="o-filter-group"><div class="o-pill-control"><span>Semua kategori</span><i data-lucide="chevron-down"></i></div></div>
      <div class="o-filter-group"><div class="o-pill-control"><span>Semua status</span><i data-lucide="chevron-down"></i></div></div>
      <button class="o-btn-reset">Reset</button>
    </div>
    <div class="o-grid-2-main">
      <div class="o-panel-card">
        <div class="o-panel-header"><div><div class="o-panel-title">Daftar produk</div><div class="o-panel-subtitle">Pilih Edit untuk mengubah harga atau detail produk.</div></div><span class="o-panel-meta-gold">${ownerState.produkList.length} produk</span></div>
        <div class="o-table-wrap"><table class="o-table"><thead><tr><th>PRODUK</th><th>KATEGORI</th><th class="text-right">HARGA</th><th class="text-center">STATUS</th><th class="text-right">AKSI</th></tr></thead><tbody>
          ${ownerState.produkList.map(p => `<tr class="${p.code === selected.code ? 'highlight-row' : ''}" style="cursor:pointer;" onclick="selectOwnerProduct('${p.code}')">
            <td><div style="font-weight:600;">${p.name}</div><div class="o-sub-cell">${p.code}</div></td>
            <td><span class="o-badge-status o-badge-neutral">${p.category}</span></td>
            <td class="text-right" style="font-weight:600;">Rp${p.price.toLocaleString('id-ID')}</td>
            <td class="text-center"><span class="o-badge-status ${p.status === 'Aktif' ? 'o-badge-success' : 'o-badge-neutral'}">${p.status}</span></td>
            <td class="text-right"><button class="o-btn-outline" style="padding:5px 14px; font-size:12px;">Edit</button></td>
          </tr>`).join('')}
        </tbody></table></div>
        <div class="o-pagination-bar"><span>Menampilkan ${ownerState.produkList.length} dari ${ownerState.produkList.length} produk</span><span style="color:var(--text-gold); font-weight:600;">Harga dalam Rupiah</span></div>
      </div>
      <div class="o-panel-card">
        <div class="o-panel-header"><div><div class="o-panel-title">Detail produk</div><div class="o-panel-subtitle">Ringkasan produk terpilih. Edit melalui modal.</div></div></div>
        <div class="o-seg-tabs" style="width:100%; margin-bottom:16px;"><button class="o-seg-tab" style="flex:1;" onclick="openAddProductModal()">Tambah baru</button><button class="o-seg-tab active" style="flex:1;">Ubah produk</button></div>
        <div class="o-form-group"><label class="o-form-label">Nama produk *</label><input type="text" class="o-form-control" value="${selected.name}" readonly /></div>
        <div class="o-form-grid-2"><div><label class="o-form-label">Kode produk *</label><input type="text" class="o-form-control" value="${selected.code}" readonly /></div><div><label class="o-form-label">Kategori *</label><input type="text" class="o-form-control" value="${selected.category}" readonly /></div></div>
        <div class="o-form-group"><label class="o-form-label">Harga jual *</label><input type="text" class="o-form-control" value="Rp   ${selected.price.toLocaleString('id-ID')}" readonly /><div style="font-size:11.5px; color:var(--text-gold); margin-top:4px; font-weight:600;">Harga di kasir: Rp${selected.price.toLocaleString('id-ID')} / porsi</div></div>
        <div class="o-form-group"><label class="o-form-label">Deskripsi</label><textarea class="o-form-control" rows="2" readonly>${selected.desc}</textarea></div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;"><label class="o-form-label" style="margin:0;">Status produk</label><span class="o-pill-control" style="width:auto; padding:6px 14px;">${selected.status} ⌄</span></div>
        <div style="font-size:11.5px; color:var(--text-secondary); margin-bottom:18px;">Perubahan berlaku untuk transaksi berikutnya. Riwayat transaksi tetap menggunakan harga sebelumnya.</div>
        <div style="display:flex; gap:10px;"><button class="o-btn-outline" style="flex:1; justify-content:center;">Batal</button><button class="o-btn-dark" style="flex:1.4;">Edit produk</button></div>
      </div>
    </div>
    <div class="o-page-footer"><span>Data contoh untuk rancangan antarmuka · harga per porsi</span><span>Terakhir diperbarui 24 Nov 2026, 14.32 WIB</span></div>
  `;
}

function selectOwnerProduct(code) {
  ownerState.selectedProductCode = code;
  renderOwnerPage();
}

function renderOwnerAlokasiStok() {
  return `
    <div class="o-page-header"><div><h1 class="o-page-title">Manajemen alokasi stok</h1><p class="o-page-subtitle">Tinjau permintaan dari Website Riders. Stok dialokasikan otomatis setelah disetujui.</p></div></div>
    <div class="o-kpi-grid-4">
      <div class="o-kpi-card dark"><div class="o-kpi-top"><span>Permintaan menunggu</span></div><div class="o-kpi-value">2</div><div class="o-kpi-foot">Perlu ditinjau owner</div></div>
      <div class="o-kpi-card"><div class="o-kpi-top"><span>Disetujui hari ini</span></div><div class="o-kpi-value">2</div><div class="o-kpi-foot">Stok diperbarui otomatis</div></div>
      <div class="o-kpi-card"><div class="o-kpi-top"><span>Ditolak hari ini</span></div><div class="o-kpi-value">1</div><div class="o-kpi-foot">Keterangan tersimpan</div></div>
      <div class="o-kpi-card"><div class="o-kpi-top"><span>Titik stok menipis</span></div><div class="o-kpi-value">2</div><div class="o-kpi-foot">1 pusat · 1 gerobak</div></div>
    </div>
    <div class="o-alert-banner">
      <div class="o-alert-left"><i data-lucide="bell" style="width:20px; height:20px; color:var(--text-gold);"></i><div><div style="font-weight:600; font-size:13.5px;">2 permintaan stok menunggu tindakan Anda</div><div style="font-size:12px; color:var(--text-secondary);">Permintaan Bima Putra dan Adi Pratama diterima dari Website Riders.</div></div></div>
      <span class="o-panel-meta-gold" style="cursor:pointer;">Lihat permintaan</span>
    </div>
    <div class="o-grid-2-main">
      <div class="o-panel-card">
        <div class="o-panel-header"><div class="o-panel-title">Permintaan stok rider</div><span class="o-panel-meta-gold">24 Nov 2026</span></div>
        <div style="display:flex; gap:8px; margin-bottom:16px; flex-wrap:wrap;">
          <button class="o-btn-dark" style="padding:6px 16px; font-size:12px;">Semua 5</button>
          <button class="o-btn-outline" style="padding:6px 16px; font-size:12px; background:var(--bg-sand);">Menunggu  <strong style="color:var(--text-gold);">2</strong></button>
          <button class="o-btn-outline" style="padding:6px 16px; font-size:12px; background:var(--bg-sand);">Disetujui  2</button>
          <button class="o-btn-outline" style="padding:6px 16px; font-size:12px; background:var(--bg-sand);">Ditolak  1</button>
        </div>
        <div class="o-table-wrap"><table class="o-table"><thead><tr><th>RIDER / GEROBAK</th><th>BAHAN BAKU</th><th>JUMLAH</th><th>PENGAJUAN</th><th>STATUS</th><th class="text-center">AKSI</th></tr></thead><tbody>
          <tr class="highlight-row"><td><div style="font-weight:600;">Bima Putra</div><div class="o-sub-cell">G-03 · #REQ-024</div></td><td>Bahan baku utama</td><td><strong>40</strong><div class="o-sub-cell">porsi</div></td><td><div>24 Nov 2026</div><div class="o-sub-cell">14.20 WIB</div></td><td><span class="o-badge-status o-badge-warning">Menunggu</span></td><td class="text-center"><button class="o-btn-dark" style="padding:6px 18px; font-size:12px;">Tinjau</button></td></tr>
          <tr><td><div style="font-weight:600;">Adi Pratama</div><div class="o-sub-cell">G-01 · #REQ-023</div></td><td>Susu segar</td><td><strong>5</strong><div class="o-sub-cell">L</div></td><td><div>24 Nov 2026</div><div class="o-sub-cell">14.10 WIB</div></td><td><span class="o-badge-status o-badge-warning">Menunggu</span></td><td class="text-center"><button class="o-btn-outline" style="padding:6px 18px; font-size:12px;">Tinjau</button></td></tr>
          <tr><td><div style="font-weight:600;">Raka Saputra</div><div class="o-sub-cell">G-02 · #REQ-022</div></td><td>Bahan baku utama</td><td><strong>60</strong><div class="o-sub-cell">porsi</div></td><td><div>24 Nov 2026</div><div class="o-sub-cell">13.30 WIB</div></td><td><span class="o-badge-status o-badge-success">Disetujui</span></td><td class="text-center"><button class="o-btn-outline" style="padding:6px 18px; font-size:12px;">Detail</button></td></tr>
          <tr><td><div style="font-weight:600;">Dimas Prakoso</div><div class="o-sub-cell">G-04 · #REQ-021</div></td><td>Sirup gula aren</td><td><strong>2</strong><div class="o-sub-cell">L</div></td><td><div>24 Nov 2026</div><div class="o-sub-cell">12.40 WIB</div></td><td><span class="o-badge-status o-badge-success">Disetujui</span></td><td class="text-center"><button class="o-btn-outline" style="padding:6px 18px; font-size:12px;">Detail</button></td></tr>
          <tr><td><div style="font-weight:600;">Fajar Ramadhan</div><div class="o-sub-cell">G-05 · #REQ-020</div></td><td>Kemasan cup</td><td><strong>100</strong><div class="o-sub-cell">pcs</div></td><td><div>24 Nov 2026</div><div class="o-sub-cell">12.10 WIB</div></td><td><span class="o-badge-status o-badge-danger">Ditolak</span></td><td class="text-center"><button class="o-btn-outline" style="padding:6px 18px; font-size:12px;">Detail</button></td></tr>
        </tbody></table></div>
        <div class="o-pagination-bar"><span>5 permintaan · 24 November 2026</span><span style="color:var(--text-gold); font-weight:600;">Terbaru lebih dulu</span></div>
      </div>
      <div class="o-panel-card">
        <div class="o-panel-header" style="margin-bottom:10px;"><div><div class="o-panel-title">Tinjau permintaan</div><div style="font-size:12px; color:var(--text-gold); font-weight:600;">#REQ-024 · Menunggu persetujuan</div></div></div>
        <div style="margin-bottom:16px;"><div style="font-weight:600; font-size:14.5px;">Bima Putra · G-03</div><div style="font-size:12px; color:var(--text-secondary);">Bahan baku utama · diajukan 24 Nov, 14.20 WIB</div></div>
        <div class="o-form-group"><label class="o-form-label">Jumlah diminta Rider</label><div style="background:var(--bg-sand); padding:11px 14px; border-radius:12px; display:flex; justify-content:space-between; font-size:13px;"><strong>40 porsi</strong><span style="color:var(--text-muted);">Sesuai pengajuan</span></div></div>
        <div class="o-form-group"><label class="o-form-label">Pratinjau alokasi otomatis setelah disetujui</label><div class="o-form-grid-2" style="margin-bottom:0;"><div style="background:var(--bg-sand); padding:12px 14px; border-radius:12px;"><div style="font-size:11.5px; color:var(--text-secondary);">Pusat</div><div style="font-weight:700; margin-top:2px;">480 → 440 porsi</div></div><div style="background:var(--bg-sand); padding:12px 14px; border-radius:12px;"><div style="font-size:11.5px; color:var(--text-secondary);">Gerobak G-03</div><div style="font-weight:700; margin-top:2px;">12 → 52 porsi</div></div></div></div>
        <div class="o-form-group"><label class="o-form-label">Alasan penolakan (wajib jika ditolak)</label><input type="text" class="o-form-control" placeholder="Tuliskan alasan penolakan" /></div>
        <div style="display:flex; gap:10px; margin-top:18px;"><button class="o-btn-outline" style="padding:10px 22px;" onclick="showToast('Permintaan #REQ-024 ditolak.')">Tolak</button><button class="o-btn-dark" style="flex:1;" onclick="showToast('Permintaan #REQ-024 disetujui! Stok otomatis diperbarui.')">Setujui permintaan</button></div>
      </div>
    </div>
    <div class="o-grid-2-equal">
      <div class="o-panel-card">
        <div class="o-panel-header"><div><div class="o-panel-title">Persediaan pusat</div><div class="o-panel-subtitle">Stok tersedia sebelum permintaan diproses</div></div></div>
        <div class="o-table-wrap"><table class="o-table"><thead><tr><th>BAHAN BAKU</th><th>TERSEDIA</th><th class="text-center">STATUS</th></tr></thead><tbody>
          <tr><td><strong>Bahan baku utama</strong><div class="o-sub-cell">Min. 200 porsi</div></td><td><strong>480 porsi</strong></td><td class="text-center"><span class="o-badge-status o-badge-success">Aman</span></td></tr>
          <tr><td><strong>Susu segar</strong><div class="o-sub-cell">Min. 20 L</div></td><td><strong>60 L</strong></td><td class="text-center"><span class="o-badge-status o-badge-success">Aman</span></td></tr>
          <tr><td><strong>Sirup gula aren</strong><div class="o-sub-cell">Min. 5 L</div></td><td><strong>18 L</strong></td><td class="text-center"><span class="o-badge-status o-badge-success">Aman</span></td></tr>
          <tr><td><strong>Kemasan cup</strong><div class="o-sub-cell">Min. 100 pcs</div></td><td><strong style="color:var(--text-gold);">40 pcs</strong></td><td class="text-center"><span class="o-badge-status o-badge-warning">Menipis</span></td></tr>
          <tr><td><strong>Air mineral</strong><div class="o-sub-cell">Min. 40 L</div></td><td><strong>120 L</strong></td><td class="text-center"><span class="o-badge-status o-badge-success">Aman</span></td></tr>
        </tbody></table></div>
        <div style="font-size:11.5px; color:var(--text-gold); font-weight:600; margin-top:12px;">1 bahan di bawah batas minimum</div>
      </div>
      <div class="o-panel-card">
        <div class="o-panel-header"><div><div class="o-panel-title">Stok setiap gerobak</div><div class="o-panel-subtitle">10 gerobak · 8 aktif · stok saat ini</div></div></div>
        <div class="o-table-wrap"><table class="o-table"><thead><tr><th>GEROBAK</th><th class="text-center">UTAMA<br>(porsi)</th><th class="text-center">SUSU<br>(L)</th><th class="text-center">SIRUP<br>(L)</th><th class="text-center">KEMASAN<br>(pcs)</th><th class="text-center">AIR<br>(L)</th><th>STATUS</th></tr></thead><tbody>
          ${[['G-01',48,'2,5',2,80,12,'Aman'],['G-02',68,6,'2,4',100,16,'Aman'],['G-03',12,3,'1,5',45,10,'Menipis'],['G-04',50,4,3,70,14,'Aman'],['G-05',42,'3,5','1,8',60,12,'Aman'],['G-06',56,5,2,90,18,'Aman'],['G-07',64,'4,5','2,5',85,16,'Aman'],['G-08',40,3,'1,6',65,12,'Aman'],['G-09',0,0,0,0,0,'Belum aktif'],['G-10',0,0,0,0,0,'Belum aktif']].map(g => `<tr class="${g[6]==='Menipis'?'highlight-row':''}" style="${g[6]==='Belum aktif'?'color:var(--text-muted);':''}"><td style="font-weight:600;">${g[0]}</td><td class="text-center" style="${g[6]==='Menipis'?'color:var(--text-gold);font-weight:700;':''}">${g[1]}</td><td class="text-center">${g[2]}</td><td class="text-center">${g[3]}</td><td class="text-center">${g[4]}</td><td class="text-center">${g[5]}</td><td style="font-size:11.5px; font-weight:600; color:${g[6]==='Aman'?'var(--text-green)':g[6]==='Menipis'?'var(--text-gold)':'var(--text-muted)'};">${g[6]}</td></tr>`).join('')}
        </tbody></table></div>
        <div style="font-size:11.5px; color:var(--text-muted); margin-top:12px;">Utama = bahan baku utama · batas minimum gerobak aktif: 20 porsi</div>
      </div>
    </div>
    <div class="o-panel-card">
      <div class="o-panel-header"><div><div class="o-panel-title">Riwayat alokasi stok</div><div class="o-panel-subtitle">Alokasi otomatis dari permintaan yang disetujui dan riwayat penolakan</div></div><span class="o-panel-meta-gold">24 Nov 2026</span></div>
      <div class="o-table-wrap"><table class="o-table"><thead><tr><th>WAKTU DIPROSES</th><th>RIDER / GEROBAK</th><th>BAHAN / JUMLAH</th><th>STATUS</th><th>STOK PUSAT</th><th>STOK GEROBAK</th><th>KETERANGAN</th></tr></thead><tbody>
        <tr><td><div>24 Nov 2026</div><div class="o-sub-cell">13.40 WIB</div></td><td><strong>Raka Saputra</strong><div class="o-sub-cell">G-02</div></td><td>Bahan baku utama<div class="o-sub-cell">60 porsi</div></td><td><span class="o-badge-status o-badge-success">Disetujui</span></td><td>540 → 480 porsi</td><td>8 → 68 porsi</td><td>Permintaan #REQ-022<div class="o-sub-cell">Disetujui oleh owner</div></td></tr>
        <tr><td><div>24 Nov 2026</div><div class="o-sub-cell">12.50 WIB</div></td><td><strong>Dimas Prakoso</strong><div class="o-sub-cell">G-04</div></td><td>Sirup gula aren<div class="o-sub-cell">2 L</div></td><td><span class="o-badge-status o-badge-success">Disetujui</span></td><td>20 → 18 L</td><td>1 → 3 L</td><td>Permintaan #REQ-021<div class="o-sub-cell">Disetujui oleh owner</div></td></tr>
        <tr><td><div>24 Nov 2026</div><div class="o-sub-cell">12.20 WIB</div></td><td><strong>Fajar Ramadhan</strong><div class="o-sub-cell">G-05</div></td><td>Kemasan cup<div class="o-sub-cell">100 pcs</div></td><td><span class="o-badge-status o-badge-danger">Ditolak</span></td><td>Tetap 40 pcs</td><td>Tetap 60 pcs</td><td><span style="color:var(--text-red); font-weight:600;">Stok pusat hanya 40 pcs.</span><div class="o-sub-cell">Permintaan #REQ-020</div></td></tr>
      </tbody></table></div>
    </div>
    <div class="o-page-footer"><span>Data contoh · Rider mengajukan → Owner meninjau → Sistem mengalokasikan setelah disetujui.</span><span>Terakhir diperbarui 24 Nov 2026, 14.32 WIB</span></div>
  `;
}

function renderOwnerProyeksiStok() {
  const histDates = ['18 Nov', '19 Nov', '20 Nov', '21 Nov', '22 Nov', '23 Nov', '24 Nov'];
  const histHeights = [66, 72, 78, 88, 108, 84, 96];
  const projDates = ['25 Nov', '26 Nov', '27 Nov', '28 Nov', '29 Nov', '30 Nov', '1 Des'];
  const stockTable = [
    { name: 'Biji kopi sangrai', cur: '8,6 kg', est: '18 kg', target: '19,8 kg', rec: '+11,2 kg', recColor: 'var(--text-gold)', status: 'Perlu tambah', badge: 'o-badge-warning' },
    { name: 'Susu segar', cur: '60 L', est: '70 L', target: '77 L', rec: '+17 L', recColor: 'var(--text-gold)', status: 'Perlu tambah', badge: 'o-badge-warning' },
    { name: 'Sirup gula aren', cur: '18 L', est: '18 L', target: '19,8 L', rec: '+1,8 L', recColor: 'var(--text-gold)', status: 'Perlu tambah', badge: 'o-badge-warning' },
    { name: 'Bubuk matcha', cur: '2,5 kg', est: '3,2 kg', target: '3,6 kg', rec: '+1,1 kg', recColor: 'var(--text-gold)', status: 'Perlu tambah', badge: 'o-badge-warning' },
    { name: 'Bubuk cokelat', cur: '4 kg', est: '3,5 kg', target: '3,9 kg', rec: '0 kg', recColor: 'var(--text-green)', status: 'Aman', badge: 'o-badge-success' },
    { name: 'Kemasan cup', cur: '40 pcs', est: '998 pcs', target: '1.098 pcs', rec: '+1.058 pcs', recColor: 'var(--text-red)', status: 'Prioritas', badge: 'o-badge-danger' },
    { name: 'Air mineral', cur: '120 L', est: '100 L', target: '110 L', rec: '0 L', recColor: 'var(--text-green)', status: 'Aman', badge: 'o-badge-success' }
  ];

  return `
    <div class="o-page-header">
      <div><h1 class="o-page-title">Forecasting kebutuhan stok</h1><p class="o-page-subtitle">Rencanakan pengadaan bahan baku berdasarkan penjualan dan penggunaan stok.</p></div>
      <button class="o-btn-outline"><i data-lucide="download"></i> Unduh laporan</button>
    </div>
    <div class="o-filter-box">
      <div class="o-filter-group"><label class="o-filter-label">Periode forecasting</label><div class="o-pill-control"><span>7 hari ke depan</span><i data-lucide="chevron-down"></i></div></div>
      <div class="o-filter-group"><label class="o-filter-label">Tanggal mulai proyeksi</label><div class="o-pill-control"><div class="o-pill-control-inner"><i data-lucide="calendar"></i><span>25 Nov 2026</span></div></div></div>
      <div class="o-filter-group"><label class="o-filter-label">Tanggal akhir proyeksi</label><div class="o-pill-control"><div class="o-pill-control-inner"><i data-lucide="calendar"></i><span>01 Des 2026</span></div></div></div>
      <div class="o-filter-group"><label class="o-filter-label">Cakupan stok</label><div class="o-pill-control"><span>Stok pusat</span><i data-lucide="chevron-down"></i></div></div>
      <div class="o-filter-actions"><button class="o-btn-dark">Tampilkan</button><button class="o-btn-reset">Reset</button></div>
    </div>
    <div class="o-kpi-grid-3">
      <div class="o-kpi-card dark"><div class="o-kpi-top"><span>Bahan perlu ditambah</span></div><div class="o-kpi-value">5 bahan</div><div class="o-kpi-foot">Dari 7 jenis bahan & perlengkapan</div></div>
      <div class="o-kpi-card"><div class="o-kpi-top"><span>Estimasi biji kopi</span></div><div class="o-kpi-value">18 kg</div><div class="o-kpi-foot">Kebutuhan 25 Nov–1 Des 2026</div></div>
      <div class="o-kpi-card"><div class="o-kpi-top"><span>Stok pengaman</span></div><div class="o-kpi-value">10%</div><div class="o-kpi-foot">Cadangan di luar estimasi kebutuhan</div></div>
    </div>
    <div class="o-grid-2-main">
      <div class="o-panel-card">
        <div class="o-panel-header">
          <div><div class="o-panel-title">Tren penggunaan bahan baku</div><div class="o-panel-subtitle">Historis & proyeksi biji kopi · kg / hari</div></div>
          <div style="display:flex; flex-direction:column; align-items:flex-end; gap:8px;">
            <div class="o-pill-control" style="padding:6px 14px; font-size:12px;"><span>Biji kopi sangrai</span><i data-lucide="chevron-down"></i></div>
            <div style="display:flex; gap:18px; font-size:11.5px;"><span class="o-legend-item"><span style="width:8px;height:8px;border-radius:2px;background:var(--bg-sand-dark);"></span> Historis</span><span class="o-legend-item"><span style="width:8px;height:8px;border-radius:2px;background:var(--bg-dark);"></span> Proyeksi</span></div>
          </div>
        </div>
        <div class="o-chart-area">
          <div class="o-chart-grid-lines"><div class="o-chart-grid-row"><span class="o-y-label">4</span></div><div class="o-chart-grid-row"><span class="o-y-label">2</span></div><div class="o-chart-grid-row" style="border-top:none;"><span class="o-y-label" style="align-self:flex-end;">0</span></div></div>
          <div style="position:absolute; right:12px; bottom:0; width:48%; height:150px; background:rgba(213,196,161,0.2); border-left:1px solid #D6CCB6;"></div>
          <div class="o-bars-overlay" style="justify-content:space-between; padding:0 8px;">
            ${histHeights.map(h => `<div class="o-bar-col" style="width:26px;"><div class="o-bar-rect" style="width:22px; height:${h}px;"></div></div>`).join('')}
            ${projDates.map(() => `<div class="o-bar-col" style="width:26px;"><div class="o-bar-rect dark" style="width:22px; height:84px;"></div></div>`).join('')}
          </div>
          <div class="o-x-labels-row" style="justify-content:space-between; padding-left:56px; padding-right:20px;">${[...histDates, ...projDates].map(d => `<div class="o-x-label" style="width:32px; font-size:10px;">${d}</div>`).join('')}</div>
        </div>
      </div>
      <div class="o-panel-card">
        <div class="o-panel-header" style="border-bottom:1px solid #EFEAE0; padding-bottom:14px;"><div><div class="o-panel-title">Dasar proyeksi</div><div class="o-panel-subtitle">Historis penjualan & penggunaan stok</div></div></div>
        <div style="display:flex; justify-content:space-between; padding:8px 0; font-size:13px;"><span style="color:var(--text-secondary);">Metode</span><strong>Rata-rata 7 hari</strong></div>
        <div style="display:flex; justify-content:space-between; padding:8px 0; font-size:13px;"><span style="color:var(--text-secondary);">Data acuan</span><strong>18–24 Nov 2026</strong></div>
        <div style="display:flex; justify-content:space-between; padding:8px 0 14px 0; border-bottom:1px solid #EFEAE0; font-size:13px;"><span style="color:var(--text-secondary);">Stok pengaman</span><strong>10% dari estimasi</strong></div>
        <div style="font-size:12px; color:var(--text-gold); margin-top:14px; line-height:1.5;">Kg/L: pembulatan 0,1; pcs: satuan utuh.<br>Data 24 Nov masih berjalan.</div>
      </div>
    </div>
    <div class="o-panel-card">
      <div class="o-panel-header"><div class="o-panel-title">Estimasi & rekomendasi kebutuhan</div><span class="o-panel-meta-gold">25 Nov–1 Des 2026</span></div>
      <div class="o-table-wrap"><table class="o-table"><thead><tr><th>BAHAN BAKU</th><th>STOK TERSEDIA</th><th>ESTIMASI 7 HARI</th><th>TARGET +10%</th><th>REKOMENDASI TAMBAHAN</th><th class="text-center">STATUS</th></tr></thead><tbody>
        ${stockTable.map(s => `<tr><td style="font-weight:600;">${s.name}</td><td>${s.cur}</td><td>${s.est}</td><td>${s.target}</td><td style="font-weight:700; color:${s.recColor};">${s.rec}</td><td class="text-center"><span class="o-badge-status ${s.badge}" style="min-width:120px;">${s.status}</span></td></tr>`).join('')}
      </tbody></table></div>
      <div style="font-size:11.5px; color:var(--text-muted); margin-top:12px;">Target = estimasi + 10%, dibulatkan ke atas (kg/L: 0,1; pcs: utuh). Tambahan = maks(0, target − stok).</div>
    </div>
    <div class="o-page-footer"><span>Data contoh · proyeksi dapat berubah mengikuti data operasional.</span><span>Stok pusat · 24 Nov 2026, 14.32 WIB</span></div>
  `;
}

function renderOwnerAbsensi() {
  const attendance = [
    { name: 'Adi Pratama', meta: 'G-01 · 7 kehadiran', date: 'Sel, 24 Nov 2026', start: '08.00', end: '–', dur: '6 j 32 m*', status: 'Berlangsung' },
    { name: 'Raka Saputra', meta: 'G-02 · 6 kehadiran', date: 'Sel, 24 Nov 2026', start: '08.05', end: '–', dur: '6 j 27 m*', status: 'Berlangsung' },
    { name: 'Bima Putra', meta: 'G-03 · 7 kehadiran', date: 'Sel, 24 Nov 2026', start: '08.00', end: '–', dur: '6 j 32 m*', status: 'Berlangsung' },
    { name: 'Dimas Prakoso', meta: 'G-04 · 6 kehadiran', date: 'Sel, 24 Nov 2026', start: '08.10', end: '–', dur: '6 j 22 m*', status: 'Berlangsung' },
    { name: 'Fajar Ramadhan', meta: 'G-05 · 5 kehadiran', date: 'Sel, 24 Nov 2026', start: '08.03', end: '–', dur: '6 j 29 m*', status: 'Berlangsung' },
    { name: 'Rizky Maulana', meta: 'G-06 · 7 kehadiran', date: 'Sel, 24 Nov 2026', start: '07.58', end: '–', dur: '6 j 34 m*', status: 'Berlangsung' },
    { name: 'Arif Setiawan', meta: 'G-07 · 6 kehadiran', date: 'Sel, 24 Nov 2026', start: '08.12', end: '–', dur: '6 j 20 m*', status: 'Berlangsung' },
    { name: 'Doni Firmansyah', meta: 'G-08 · 6 kehadiran', date: 'Sel, 24 Nov 2026', start: '08.07', end: '–', dur: '6 j 25 m*', status: 'Berlangsung' },
    { name: 'Adi Pratama', meta: 'G-01 · 7 kehadiran', date: 'Sen, 23 Nov 2026', start: '08.00', end: '16.05', dur: '8 j 05 m', status: 'Selesai' },
    { name: 'Raka Saputra', meta: 'G-02 · 6 kehadiran', date: 'Sen, 23 Nov 2026', start: '08.05', end: '16.05', dur: '8 j 00 m', status: 'Selesai' }
  ];

  return `
    <div class="o-page-header">
      <div><h1 class="o-page-title">Laporan absensi riders</h1><p class="o-page-subtitle">Pantau kehadiran dan waktu operasional rider berdasarkan periode yang Anda pilih.</p></div>
      <button class="o-btn-outline"><i data-lucide="download"></i> Unduh laporan</button>
    </div>
    <div class="o-filter-box">
      <div class="o-filter-group"><label class="o-filter-label">Periode</label><div class="o-pill-control"><span>7 hari terakhir</span><i data-lucide="chevron-down"></i></div></div>
      <div class="o-filter-group"><label class="o-filter-label">Tanggal mulai</label><div class="o-pill-control"><div class="o-pill-control-inner"><i data-lucide="calendar"></i><span>18 Nov 2026</span></div></div></div>
      <div class="o-filter-group"><label class="o-filter-label">Tanggal selesai</label><div class="o-pill-control"><div class="o-pill-control-inner"><i data-lucide="calendar"></i><span>24 Nov 2026</span></div></div></div>
      <div class="o-filter-group"><label class="o-filter-label">Rider</label><div class="o-pill-control"><span>Semua rider</span><i data-lucide="chevron-down"></i></div></div>
      <div class="o-filter-actions"><button class="o-btn-dark">Tampilkan</button><button class="o-btn-reset">Reset</button></div>
    </div>
    <div class="o-kpi-grid-3">
      <div class="o-kpi-card dark"><div class="o-kpi-top"><span>Jumlah kehadiran</span></div><div class="o-kpi-value">50 kehadiran</div><div class="o-kpi-foot">8 rider · 42 selesai · 8 berlangsung</div></div>
      <div class="o-kpi-card"><div class="o-kpi-top"><span>Total durasi kerja</span></div><div class="o-kpi-value">337 j 25 m</div><div class="o-kpi-foot">Dihitung dari 42 sesi selesai</div></div>
      <div class="o-kpi-card"><div class="o-kpi-top"><span>Rata-rata durasi</span></div><div class="o-kpi-value">8 j 02 m</div><div class="o-kpi-foot">Rata-rata per sesi operasional selesai</div></div>
    </div>
    <div class="o-panel-card">
      <div class="o-panel-header"><div><div class="o-panel-title">Riwayat absensi</div><div class="o-panel-subtitle">Semua rider · 18–24 November 2026</div></div><span class="o-panel-meta-gold">50 catatan kehadiran</span></div>
      <div class="o-table-wrap"><table class="o-table"><thead><tr><th>NAMA RIDER</th><th>TANGGAL</th><th>MULAI OPERASIONAL</th><th>SELESAI OPERASIONAL</th><th>DURASI KERJA</th><th class="text-center">STATUS</th></tr></thead><tbody>
        ${attendance.map(a => `<tr class="${a.status==='Berlangsung'?'highlight-row':''}"><td><div style="font-weight:600;">${a.name}</div><div class="o-sub-cell">${a.meta}</div></td><td>${a.date}</td><td>${a.start}</td><td>${a.end}</td><td style="font-weight:600; color:${a.status==='Berlangsung'?'var(--text-gold)':'var(--text-primary)'};">${a.dur}</td><td class="text-center">${a.status==='Berlangsung'?`<span style="color:var(--text-gold); font-weight:600; font-size:12px;">Berlangsung</span>`:`<span class="o-badge-status o-badge-success" style="min-width:120px;">Selesai</span>`}</td></tr>`).join('')}
      </tbody></table></div>
      <div class="o-pagination-bar"><span>Menampilkan 1–10 dari 50 catatan · 8 rider</span><div class="o-page-buttons"><button class="o-page-btn active">1</button><button class="o-page-btn">2</button><button class="o-page-btn">3</button><button class="o-page-btn">4</button><button class="o-page-btn">5</button><button class="o-page-btn" style="padding:0 14px;">Berikutnya</button></div></div>
      <div style="font-size:11px; color:var(--text-muted); margin-top:10px;">* Durasi berjalan dihitung sampai 14.32 WIB. Total dan rata-rata hanya mencakup sesi yang selesai.</div>
    </div>
    <div class="o-page-footer"><span>Data contoh · seluruh waktu menggunakan WIB.</span><span>Diperbarui 24 Nov 2026, 14.32 WIB</span></div>
  `;
}

// =========================================================
// UNIVERSAL MODALS (RIDER & OWNER)
// =========================================================
const uModalBackdrop = document.getElementById('universalModalBackdrop');
const uModalCard = document.getElementById('universalModalCard');

function closeUniversalModal() {
  uModalBackdrop.classList.add('hidden');
}

uModalBackdrop.addEventListener('click', (e) => {
  if (e.target === uModalBackdrop) closeUniversalModal();
});

// Modal Struk Digital Rider
function openRiderTxModal(txId) {
  const tx = riderTransactions.find(t => t.id === txId);
  if (!tx) return;
  uModalCard.style.maxWidth = '430px';
  uModalCard.innerHTML = `
    <div class="u-modal-header">
      <div>
        <div class="r-breadcrumb-tag">DETAIL STRUK DIGITAL</div>
        <div class="u-modal-title">${tx.id}</div>
      </div>
      <button class="u-modal-close" onclick="closeUniversalModal()"><i data-lucide="x" style="width:16px;height:16px;"></i></button>
    </div>
    <div style="display:flex; flex-direction:column; gap:10px; font-size:0.9rem; border-top:1px solid var(--border-color); padding-top:14px;">
      <div style="display:flex; justify-content:space-between;"><span class="r-text-muted">Waktu</span><strong>${tx.time}</strong></div>
      <div style="display:flex; justify-content:space-between;"><span class="r-text-muted">Gerobak</span><strong>Gerobak 03 (Budi Santoso)</strong></div>
      <div style="display:flex; justify-content:space-between;"><span class="r-text-muted">Metode</span><strong>${tx.method}</strong></div>
      <div style="display:flex; justify-content:space-between;"><span class="r-text-muted">Item Pesanan</span><strong>${tx.items}</strong></div>
      <div style="display:flex; justify-content:space-between;"><span class="r-text-muted">Total Bayar</span><strong>${formatRupiah(tx.total)}</strong></div>
    </div>
    <button class="o-btn-dark" style="width:100%; margin-top:20px;" onclick="closeUniversalModal()">Tutup</button>
  `;
  uModalBackdrop.classList.remove('hidden');
  lucide.createIcons();
}

// Modal Tambah Produk Owner
function openAddProductModal() {
  uModalCard.style.maxWidth = '640px';
  uModalCard.innerHTML = `
    <div class="u-modal-header">
      <div><div class="u-modal-title">Tambah Produk</div><div class="o-panel-subtitle">Lengkapi informasi produk untuk katalog penjualan.</div></div>
      <div style="display:flex; flex-direction:column; align-items:flex-end; gap:10px;">
        <button class="u-modal-close" onclick="closeUniversalModal()"><i data-lucide="x" style="width:16px;height:16px;"></i></button>
        <button class="o-btn-outline" style="background:var(--bg-sand); border:none; padding:6px 14px; font-size:12px;" onclick="fillSampleProduct()">Isi data contoh</button>
      </div>
    </div>
    <div class="o-form-group"><label class="o-form-label">Nama Produk *</label><input type="text" id="prodNameInput" class="o-form-control" placeholder="Contoh: Es Kopi Susu Vanilla" /></div>
    <div class="o-form-grid-2">
      <div><label class="o-form-label">Kategori Produk *</label><select id="prodCatInput" class="o-form-control"><option value="">Pilih kategori</option><option value="Kopi">Kopi</option><option value="Non-kopi">Non-kopi</option><option value="Teh">Teh</option></select></div>
      <div><label class="o-form-label">Harga Jual *</label><div style="position:relative;"><span style="position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--text-gold); font-weight:600;">Rp</span><input type="number" id="prodPriceInput" class="o-form-control" style="padding-left:40px;" value="0" /></div></div>
    </div>
    <div class="o-form-group"><label class="o-form-label">Deskripsi Produk (opsional)</label><textarea id="prodDescInput" class="o-form-control" rows="2" placeholder="Tambahkan informasi produk jika diperlukan"></textarea></div>
    <div class="o-form-grid-2" style="align-items:center;">
      <div><label class="o-form-label">Status Produk *</label><select id="prodStatusInput" class="o-form-control"><option value="Aktif">Aktif</option><option value="Nonaktif">Nonaktif</option></select></div>
      <div style="font-size:12px; color:var(--text-secondary); padding-top:18px;">Produk aktif dapat digunakan untuk transaksi berikutnya di Website Riders.</div>
    </div>
    <div class="o-form-group"><label class="o-form-label">Gambar Produk (opsional)</label><div class="o-upload-dropzone"><div style="display:flex; align-items:center; gap:14px;"><i data-lucide="upload" style="width:20px;height:20px;color:var(--text-gold);"></i><div><div style="font-weight:600; font-size:13px;">Klik untuk memilih gambar</div><div style="font-size:11.5px; color:var(--text-muted);">JPG/PNG · maks. 2 MB · simulasi pemilihan gambar</div></div></div><button class="o-btn-outline" style="background:var(--bg-sand); border:none; padding:6px 14px; font-size:12px;">Hapus</button></div></div>
    <div class="u-modal-footer"><span style="font-size:11.5px; color:var(--text-muted);">Gunakan data contoh untuk simulasi.</span><div style="display:flex; gap:10px;"><button class="o-btn-outline" onclick="closeUniversalModal()">Batal</button><button class="o-btn-dark" onclick="saveNewProduct()">Simpan Produk</button></div></div>
  `;
  uModalBackdrop.classList.remove('hidden');
  lucide.createIcons();
}

function fillSampleProduct() {
  document.getElementById('prodNameInput').value = 'Es Kopi Susu Vanilla';
  document.getElementById('prodCatInput').value = 'Kopi';
  document.getElementById('prodPriceInput').value = 23000;
  document.getElementById('prodDescInput').value = 'Espresso signature dengan sirup vanilla dan susu segar.';
}

function saveNewProduct() {
  const name = document.getElementById('prodNameInput').value.trim();
  const cat = document.getElementById('prodCatInput').value || 'Kopi';
  const price = parseInt(document.getElementById('prodPriceInput').value) || 20000;
  const desc = document.getElementById('prodDescInput').value.trim() || 'Menu baru KKJ Express.';
  const status = document.getElementById('prodStatusInput').value;
  if (!name) return alert('Nama produk wajib diisi!');

  const nextCode = 'KKJ-00' + (ownerState.produkList.length + 1);
  ownerState.produkList.push({ code: nextCode, name, category: cat, price, status, desc });
  ownerState.selectedProductCode = nextCode;
  closeUniversalModal();
  if (ownerState.currentPage !== 'produk') navigateOwnerTo('produk');
  else renderOwnerPage();
  showToast(`Produk "${name}" berhasil ditambahkan.`);
}

// Modal Tambah Pengeluaran Owner
function openExpenseModal() {
  uModalCard.style.maxWidth = '640px';
  uModalCard.innerHTML = `
    <div class="u-modal-header">
      <div><div class="u-modal-title">Tambah pengeluaran</div><div class="o-panel-subtitle">Catat biaya operasional usaha Anda.</div></div>
      <div style="display:flex; flex-direction:column; align-items:flex-end; gap:10px;">
        <button class="u-modal-close" onclick="closeUniversalModal()"><i data-lucide="x" style="width:16px;height:16px;"></i></button>
        <button class="o-btn-outline" style="background:var(--bg-sand); border:none; padding:6px 14px; font-size:12px;" onclick="fillSampleExpense()">Isi data contoh</button>
      </div>
    </div>
    <div class="o-form-grid-2">
      <div><label class="o-form-label">Tanggal Pengeluaran *</label><input type="text" id="expDateInput" class="o-form-control" value="24 Nov 2026" /></div>
      <div><label class="o-form-label">Kategori Pengeluaran *</label><select id="expCatInput" class="o-form-control"><option value="">Pilih kategori</option><option value="Bahan baku">Bahan baku</option><option value="Operasional">Operasional</option><option value="Transportasi">Transportasi</option><option value="Perawatan">Perawatan</option></select></div>
    </div>
    <div class="o-form-group"><label class="o-form-label">Nama Pengeluaran *</label><input type="text" id="expNameInput" class="o-form-control" placeholder="Contoh: Pembelian susu segar" /></div>
    <div class="o-form-grid-2">
      <div><label class="o-form-label">Nominal Pengeluaran *</label><div style="position:relative;"><span style="position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--text-gold); font-weight:600;">Rp</span><input type="number" id="expAmountInput" class="o-form-control" style="padding-left:40px;" value="0" /></div></div>
      <div><label class="o-form-label">Metode Pembayaran *</label><select id="expMethodInput" class="o-form-control"><option value="">Pilih metode</option><option value="Transfer Bank">Transfer Bank</option><option value="Tunai">Tunai</option><option value="QRIS">QRIS</option></select></div>
    </div>
    <div class="o-form-group"><label class="o-form-label">Keterangan (opsional)</label><textarea class="o-form-control" rows="2" placeholder="Tambahkan keterangan jika diperlukan"></textarea></div>
    <div class="u-modal-footer"><span style="font-size:11.5px; color:var(--text-muted);">* Wajib diisi</span><div style="display:flex; gap:10px;"><button class="o-btn-outline" onclick="closeUniversalModal()">Batal</button><button class="o-btn-dark" onclick="saveNewExpense()">Simpan Pengeluaran</button></div></div>
  `;
  uModalBackdrop.classList.remove('hidden');
  lucide.createIcons();
}

function fillSampleExpense() {
  document.getElementById('expCatInput').value = 'Bahan baku';
  document.getElementById('expNameInput').value = 'Pembelian susu segar 20 liter';
  document.getElementById('expAmountInput').value = 380000;
  document.getElementById('expMethodInput').value = 'Transfer Bank';
}

function saveNewExpense() {
  const date = document.getElementById('expDateInput').value || '24 Nov 2026';
  const cat = document.getElementById('expCatInput').value || 'Operasional';
  const name = document.getElementById('expNameInput').value.trim();
  const amount = parseInt(document.getElementById('expAmountInput').value) || 0;
  if (!name || amount <= 0) return alert('Nama dan nominal pengeluaran wajib diisi!');

  ownerState.pengeluaranList.unshift({ date, cat, name, by: 'Owner', amount });
  closeUniversalModal();
  if (ownerState.currentPage !== 'pengeluaran') navigateOwnerTo('pengeluaran');
  else renderOwnerPage();
  showToast(`Pengeluaran "${name}" berhasil dicatat.`);
}

// Modal Detail Transaksi Owner
function openOwnerTxDetailModal(txId) {
  const tx = ownerState.transaksiList.find(t => t.id === txId) || ownerState.transaksiList[0];
  const isSuccess = tx.status === 'Berhasil';
  uModalCard.style.maxWidth = '640px';
  uModalCard.innerHTML = `
    <div class="u-modal-header">
      <div><div class="u-modal-title">Detail transaksi</div><div style="font-size:12.5px; color:var(--text-gold); font-weight:600; margin-top:2px;">${tx.id}</div></div>
      <button class="u-modal-close" onclick="closeUniversalModal()"><i data-lucide="x" style="width:16px;height:16px;"></i></button>
    </div>
    <div style="background:var(--bg-sand); border-radius:14px; padding:18px 20px; margin-bottom:20px;">
      <div class="o-form-grid-2" style="margin-bottom:14px;"><div><div style="font-size:11.5px; color:var(--text-secondary);">Nama rider</div><div style="font-weight:600; font-size:14px;">${tx.rider}</div></div><div><div style="font-size:11.5px; color:var(--text-secondary);">Gerobak</div><div style="font-weight:600; font-size:14px;">${tx.cart}</div></div></div>
      <div class="o-form-grid-2" style="margin-bottom:0;"><div><div style="font-size:11.5px; color:var(--text-secondary);">Waktu transaksi</div><div style="font-weight:600; font-size:14px;">${tx.date}, ${tx.time}</div></div><div><div style="font-size:11.5px; color:var(--text-secondary);">Metode pembayaran</div><div style="font-weight:600; font-size:14px;">${tx.method}</div></div></div>
    </div>
    <div style="font-weight:600; font-size:14px; margin-bottom:10px;">Produk yang dibeli</div>
    <table class="o-table" style="margin-bottom:14px;">
      <thead><tr style="background:transparent;"><th style="background:transparent; padding-left:0;">PRODUK</th><th style="background:transparent;" class="text-center">QTY</th><th style="background:transparent;" class="text-right">HARGA SATUAN</th><th style="background:transparent; padding-right:0;" class="text-right">SUBTOTAL</th></tr></thead>
      <tbody>${tx.items.map(it => `<tr><td style="padding-left:0; font-weight:500;">${it.name}</td><td class="text-center">${it.qty}</td><td class="text-right">${it.price}</td><td style="padding-right:0; font-weight:600;" class="text-right">${it.sub}</td></tr>`).join('')}</tbody>
    </table>
    <div style="display:flex; justify-content:space-between; font-size:13px; color:var(--text-secondary); margin-bottom:6px;"><span>Subtotal</span><strong style="color:var(--text-primary);">${tx.subtotal}</strong></div>
    <div style="display:flex; justify-content:space-between; font-size:13px; color:var(--text-secondary); padding-bottom:14px; border-bottom:1px solid #EFEAE0;"><span>Potongan harga</span><strong style="color:var(--text-primary);">${tx.discount}</strong></div>
    <div style="display:flex; justify-content:space-between; align-items:center; margin:16px 0;"><span style="font-size:15px; font-weight:600;">Total pembayaran</span><span style="font-size:26px; font-weight:500;">${tx.total}</span></div>
    <div style="background:${isSuccess ? 'var(--bg-green-pill)' : 'var(--bg-red-pill)'}; border-radius:12px; padding:14px 16px; margin-bottom:18px;">
      <div style="font-weight:600; color:${isSuccess ? 'var(--text-green)' : 'var(--text-red)'}; margin-bottom:2px;">${tx.status}</div>
      <div style="font-size:12px; color:${isSuccess ? 'var(--text-green)' : 'var(--text-red)'};">${isSuccess ? 'Pembayaran berhasil. Transaksi tercatat dalam total penjualan.' : 'Pembayaran gagal atau dibatalkan oleh pelanggan.'}</div>
    </div>
    <div style="display:flex; justify-content:space-between; align-items:center;"><span style="font-size:11.5px; color:var(--text-muted);">Harga dan potongan mengikuti saat transaksi.</span><button class="o-btn-dark" style="padding:10px 28px;" onclick="closeUniversalModal()">Tutup</button></div>
  `;
  uModalBackdrop.classList.remove('hidden');
  lucide.createIcons();
}