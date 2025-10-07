// ! Variables
const cartToggle = document.querySelector("#cart-toggle");
const cartCount = document.querySelector("#cart-count");
const shoppingCart = document.querySelector("#shopping-cart");
const cartContent = document.querySelector("#cart-content tbody");
const totalPriceEl = document.querySelector("#total-price");
const clearCartBtn = document.querySelector("#clear-cart");
const closeCart = document.querySelector("#close-cart");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const searchBtn = document.getElementById("submit-search");
const searchInput = document.getElementById("search-game");

// ==============================
// ! Toast Notification
function showToast(message, duration = 3000) {
  let toast = document.querySelector("#toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--brand);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 1001;
      opacity: 0;
      transition: opacity 0.3s ease;
      font-size: 14px;
      text-align: center;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = "1"; // show

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
// ==============================

// ! Counter for number of items in cart
let cartItemCount = 0;

// ==============================
// ! Toggle Shopping Cart
// ==============================
cartToggle.addEventListener("click", () => {
  const isActive = shoppingCart.classList.toggle("active");
  shoppingCart.setAttribute("aria-expanded", isActive);
  cartToggle.setAttribute("aria-expanded", isActive);
});

closeCart.addEventListener("click", () => {
  shoppingCart.classList.remove("active");
  shoppingCart.setAttribute("aria-expanded", false);
  cartToggle.setAttribute("aria-expanded", false);
});

// ==============================
// ! Update total price function
// ==============================
function updateTotalPrice() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;
  cart.forEach((item) => {
    const cleanedPrice = item.price.replace(/[^\d۰-۹]/g, ""); //
    const priceNum = parseInt(toEnglishDigits(cleanedPrice));
    total += priceNum * (item.quantity || 1);
  });
  totalPriceEl.textContent = `مجموع: ${total.toLocaleString()} تومان`;
}
//
function toEnglishDigits(str) {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const englishDigits = "0123456789";
  return str.replace(/[۰-۹]/g, (d) => persianDigits.indexOf(d));
}

// ==============================
// ! Create cart row function
// ==============================
function createCartRow(item) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><img src="${item.imgSrc}" alt="${item.title}"></td>
    <td>${item.title} (تعداد: ${item.quantity || 1})</td>
    <td>${item.price}</td>
    <td><button class="remove" type="button" data-id="${
      item.id
    }">X</button></td>
  `;

  // Add remove functionality
  row.querySelector(".remove").addEventListener("click", () => {
    row.remove();
    removeFromCart(item.id); // Remove from localStorage
    updateTotalPrice();
    cartItemCount = document.querySelectorAll("#cart-content tbody tr").length;
    cartCount.textContent = cartItemCount;
  });

  return row;
}

// ==============================
// ! Add to Cart
// ==============================
function addToCart(e) {
  const button = e.target;
  const card = button.closest(".card");
  const imgSrc = card.querySelector("img").src;
  const title = card.querySelector(".card-title").textContent;
  const price = card.querySelector(".current-price").textContent;

  const game = {
    id: card.dataset.id,
    imgSrc,
    title,
    price,
    quantity: 1, // Default quantity
  };

  // Check for duplicates and update quantity
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find((item) => item.id === game.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(game);
  }
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update UI: remove old rows for this id and recreate
  document.querySelectorAll(`#cart-content tbody tr`).forEach((row) => {
    if (row.querySelector(".remove").dataset.id === game.id) {
      row.remove();
    }
  });
  const newRow = createCartRow(cart.find((item) => item.id === game.id));
  cartContent.appendChild(newRow);

  // Update counter and total
  cartItemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  cartCount.textContent = cartItemCount;
  updateTotalPrice();
  showToast(`${game.title} به سبد خرید اضافه شد!`);
}

// ==============================
// ! Remove item from localStorage
// ==============================
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ==============================
// ! Clear entire cart
// ==============================
clearCartBtn.addEventListener("click", () => {
  while (cartContent.firstChild) {
    cartContent.removeChild(cartContent.firstChild);
  }
  localStorage.removeItem("cart");
  cartItemCount = 0;
  cartCount.textContent = cartItemCount;
  updateTotalPrice();
});

// ==============================
// ! Search functionality
// ==============================
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const query = searchInput.value.toLowerCase().trim();
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const title = card.querySelector(".card-title").textContent.toLowerCase();
    if (title.includes(query) || query === "") {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});

// ==============================
// ! Attach click events to all "Add to Cart" buttons
// ==============================
addToCartButtons.forEach((btn) => {
  btn.addEventListener("click", addToCart);
});

// ==============================
// ! Load cart from localStorage on page load
// ==============================
function onPageLoad() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.forEach((item) => {
    const row = createCartRow(item);
    cartContent.appendChild(row);
  });

  cartItemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  cartCount.textContent = cartItemCount;
  updateTotalPrice();
}

document.addEventListener("DOMContentLoaded", onPageLoad);
