// ! Variables
const cartToggle = document.querySelector("#cart-toggle");
const cartCount = document.querySelector("#cart-count");
const shoppingCart = document.querySelector("#shopping-cart");
const cartContent = document.querySelector("#cart-content tbody");
const clearCartBtn = document.querySelector("#clear-cart");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

// ! Counter for number of items in cart
let cardItemCount = 0;

// ==============================
// ! Toggle Shopping Cart
// ==============================
cartToggle.addEventListener("click", () => {
  const isHidden = shoppingCart.hasAttribute("hidden");

  if (isHidden) {
    shoppingCart.removeAttribute("hidden");
    cartToggle.setAttribute("aria-expanded", "true");
  } else {
    shoppingCart.setAttribute("hidden", "");
    cartToggle.setAttribute("aria-expanded", "false");
  }
});

// ==============================
// ! Create cart row function
// ==============================
function createCartRow(item) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><img src="${item.imgSrc}" alt="${item.title}"></td>
    <td>${item.title}</td>
    <td>${item.price}</td>
    <td><button class="remove" type="button">X</button></td>
  `;

  // Add remove functionality
  row.querySelector(".remove").addEventListener("click", () => {
    row.remove();
    removeFromCart(item.title); // Remove from localStorage
    cardItemCount--;
    cartCount.textContent = cardItemCount;
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

  const game = { imgSrc, title, price };

  // Append row to cart table
  cartContent.appendChild(createCartRow(game));

  // Save to localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(game);
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update counter
  cardItemCount++;
  cartCount.textContent = cardItemCount;
}

// ==============================
// ! Remove item from localStorage
// ==============================
function removeFromCart(title) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.title !== title);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ==============================
// ! Clear entire cart
// ==============================
clearCartBtn.addEventListener("click", () => {
  cartContent.innerHTML = "";
  localStorage.removeItem("cart");
  cardItemCount = 0;
  cartCount.textContent = cardItemCount;
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
function onLoadPage() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.forEach((item) => {
    cartContent.appendChild(createCartRow(item));
  });

  cardItemCount = cart.length;
  cartCount.textContent = cardItemCount;
}

document.addEventListener("DOMContentLoaded", onLoadPage);
