import { products } from "./products.js";

// JavaScript for Cart Toggle
const cartClick = document.querySelector('.cart');
const cartContainer = document.querySelector('.cart-container');

// Toggle cart container visibility on cart icon click
cartClick.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent event from bubbling up to document
  cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block"; // Toggle display
});

// Close cart when clicking outside of it
document.addEventListener("click", (event) => {
  if (!cartContainer.contains(event.target) && !cartClick.contains(event.target)) {
    cartContainer.style.display = "none"; // Hide cart if click is outside
  }
});

// Function to render products dynamically in the collection-flex container
function renderProducts(sectionClass, categoryFilter = null, limit = null) {
  const section = document.querySelector(`.${sectionClass}`);
  
  if (!section) return; // If the section is not found, exit the function
  
  section.innerHTML = ''; // Clear previous content
  
  let filteredProducts = products;
  
  // Filter products based on category if provided
  if (categoryFilter) {
    filteredProducts = products.filter(product => product.category === categoryFilter);
  }

  // Limit the number of products if a limit is specified
  if (limit) {
    filteredProducts = filteredProducts.slice(0, limit);
  }

  filteredProducts.forEach(product => {
    section.innerHTML += `
      <div class="product-container" id="product-${product.id}">
        <img src="${product.image}" alt="${product.name}">
        <p>${product.name}</p>
        <p>R ${product.price}</p>
        <button class="addToCart" data-id="${product.id}">Add To Cart</button>
      </div>
    `;
  });
}



// Initialize an empty cart array
let cart = [];

// Load cart from local storage
export function loadCart() {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCart(cart); // Update the cart UI with stored items
  }
}

// Call render functions for specific sections
document.addEventListener('DOMContentLoaded', () => {
  renderProducts("collection-flex", null, 3); // Render only 3 products in the collection
  renderProducts("newArrivals-flex", "New Arrival"); // Render all New Arrivals
  renderProducts("featured-flex", "Featured"); // Render all Featured products
  loadCart(); // Load the cart from local storage

  // Clear Cart button functionality
  const clearCartButton = document.querySelector('.clearCartBtn');

  clearCartButton.addEventListener('click', () => {
    cart = []; // Clear the cart array
    localStorage.removeItem('cart'); // Clear the cart from local storage
    updateCart(cart); // Update the cart UI
  });
});

// Function to update the cart UI (same as your code)
// ...

// Function to update the cart UI
function updateCart(cart) {
  let cartHTML = "";
  let totalPrice = 0; // Initialize total price
  
  cart.forEach(cartItem => {
    // Update the total price for the current item
    totalPrice += cartItem.price * cartItem.quantity;
    
    cartHTML += `
      <div class="product-cart-container">
        <img src="${cartItem.image}" alt="${cartItem.name}">
        <div>
          <p>${cartItem.name}</p>
          <p>R ${cartItem.price}</p>
        </div>
        <div class="count">
          <button class="decreaseCount" data-id="${cartItem.id}">-</button>
          <p>${cartItem.quantity}</p>
          <button class="increaseCount" data-id="${cartItem.id}">+</button>
        </div>
      </div>
    `;
  });

  // Inject cart HTML
  document.querySelector('.cart-items').innerHTML = cartHTML;

  // Update the total price in the UI
  document.querySelector('.cart-price').innerHTML = `Total: R ${totalPrice}`;

  // Update items count in the cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector('.itemsCount').innerHTML = totalItems; // Update this line

  // Reattach event listeners for increasing and decreasing quantity
  document.querySelectorAll('.increaseCount').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent the event from bubbling up
      const id = parseInt(e.target.getAttribute('data-id'));
      updateQuantity(id, 1);
    });
  });

  document.querySelectorAll('.decreaseCount').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent the event from bubbling up
      const id = parseInt(e.target.getAttribute('data-id'));
      updateQuantity(id, -1);
    });
  });

  // Save the updated cart to local storage
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to update the quantity in the cart
function updateQuantity(id, change) {
  const productInCart = cart.find(item => item.id === id);
  
  if (productInCart) {
    productInCart.quantity += change;
    if (productInCart.quantity <= 0) {
      cart = cart.filter(item => item.id !== id); // Remove product if quantity is 0 or less
    }
    updateCart(cart); // Update the cart UI after quantity change
  }
}

// Add event listeners to "Add to Cart" buttons
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('addToCart')) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId); // Use all products

    // Check if the product already exists in the cart
    const existingProduct = cart.find(p => p.id === productId);
    if (existingProduct) {
      existingProduct.quantity += 1; // Increment quantity if already in cart
    } else {
      cart.push({ ...product, quantity: 1 }); // Add to cart with quantity 1
    }

    // Update the cart items count (this is redundant now, but kept for clarity)
    updateCart(cart);
  }
});

// Carousel functionality for featured products
const carouselContainer = document.querySelector('.carousel-container');

// Inject images into the carousel
products.forEach(product => {
  const img = document.createElement('img');
  img.src = product.image;
  img.alt = product.name;
  carouselContainer.appendChild(img);
});

// Carousel functionality
let currentIndex = 0;

function updateCarousel() {
  const angle = (currentIndex * -360) / products.length;
  carouselContainer.style.transform = `rotateY(${angle}deg)`;
}

document.querySelector('.next-btn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % products.length;
  updateCarousel();
});

document.querySelector('.prev-btn').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + products.length) % products.length;
  updateCarousel();
});

// Checkout button functionality
const checkoutButton = document.querySelector('.checkoutBtn');

checkoutButton.addEventListener('click', () => {
  console.log('Checkout button clicked'); // Debugging log
  window.location.href = 'checkout.html'; // Redirect to checkout page
});


const searchIcon = document.querySelector(".searchIcon");
  const displaySearch = document.querySelector(".displaySearch");
  const searchInput = document.querySelector(".searchInput");
  const searchResults = document.querySelector(".searchResults");

  // Toggle search display when the search icon is clicked
  searchIcon.addEventListener("click", () => {
    displaySearch.style.display = displaySearch.style.display === "block" ? "none" : "block";
    searchInput.focus(); // Automatically focus on input
  });

  // Display results as user types
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    displaySearchResults(query);
  });

  // Hide search container when clicking outside of it
  document.addEventListener("click", (event) => {
    if (!displaySearch.contains(event.target) && !searchIcon.contains(event.target)) {
      displaySearch.style.display = "none";
    }
  });

  function displaySearchResults(query) {
    searchResults.innerHTML = ""; // Clear previous results

    if (!query) return;

    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );

    if (filteredProducts.length > 0) {
      filteredProducts.forEach(product => {
        const resultItem = document.createElement("div");
        resultItem.classList.add("result-item");
        resultItem.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="result-image">
          <div class="result-info">
            <p class="result-name">${product.name}</p>
            <p class="result-price">$${product.price}</p>
          </div>
        `;
        resultItem.addEventListener("click", () => {
          window.location.href = `product.html?id=${product.id}`;
        });
        searchResults.appendChild(resultItem);
      });
    } else {
      searchResults.innerHTML = "<p>No products found.</p>";
    }
  }