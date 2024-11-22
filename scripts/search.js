import { products } from './products.js';

document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.querySelector(".searchIcon");
  const displaySearch = document.querySelector(".displaySearch");
  const searchInput = document.querySelector(".searchInput");
  const searchResults = document.querySelector(".searchResults");

  if (searchIcon && displaySearch && searchInput && searchResults) {
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
  }

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
});
