let currentSubtotal = 0; // Store the subtotal value globally

// Load the cart from localStorage
function loadCheckoutCart() {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    const cart = JSON.parse(storedCart);
    renderCheckoutCart(cart); // Pass the cart items to render
    updateTotals(cart); // Call function to update totals
  }
}

// Render the cart on the checkout page
function renderCheckoutCart(cart) {
  const summaryOrderContainer = document.querySelector('.summaryOrderContainer');
  let cartHTML = '';
  
  cart.forEach(cartItem => {
    cartHTML += `
      <div class="checkout-product">
        <img src="${cartItem.image}" alt="${cartItem.name}">
        <div class="flex-details">
          <p>${cartItem.name}</p>
          <p>R ${cartItem.price.toFixed(2)}</p>
        </div>
        <p>Quantity: ${cartItem.quantity}</p>
      </div>
    `;
  });
 
  // Injecting the generated HTML into the summaryOrderContainer
  summaryOrderContainer.innerHTML = cartHTML;
}

// Calculate and update the subtotal, VAT, and total
function updateTotals(cart) {
  const subtotalElem = document.querySelector('.subtotal p:nth-child(2)'); // Second <p> inside subtotal div
  const vatElem = document.querySelector('.vat p:nth-child(2)'); // Second <p> inside vat div
  const totalElem = document.querySelector('.total p:nth-child(2)'); // Second <p> inside total div
  const payButton = document.querySelector('button[type="submit"]');

  // Calculate subtotal
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });

  currentSubtotal = subtotal; // Store the subtotal globally

  // Calculate VAT (15%)
  const vat = subtotal * 0.15;

  // Calculate total
  const total = subtotal + vat;

  // Update the DOM elements with calculated values
  subtotalElem.textContent = `R ${subtotal.toFixed(2)}`;
  vatElem.textContent = `R ${vat.toFixed(2)}`;
  totalElem.textContent = `R ${total.toFixed(2)}`;
  
  // Update the button with the total amount
  payButton.textContent = `Pay R ${total.toFixed(2)}`;
}

// Handle the form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const successMessage = document.querySelector('.paymentSuccess');

  // Check if the subtotal is zero
  if (currentSubtotal === 0) {
    successMessage.textContent = 'Cannot process payment, cart is empty!';
    successMessage.style.color = 'red';
  } else {
    // Clear the cart from localStorage
    localStorage.removeItem('cart');

    // Clear the cart display
    document.querySelector('.summaryOrderContainer').innerHTML = '';

    // Reset the totals
    document.querySelector('.subtotal p:nth-child(2)').textContent = 'R 0.00';
    document.querySelector('.vat p:nth-child(2)').textContent = 'R 0.00';
    document.querySelector('.total p:nth-child(2)').textContent = 'R 0.00';

    // Update the button text
    document.querySelector('button[type="submit"]').textContent = 'Pay R0.00';

    // Display a success message
    successMessage.textContent = 'Payment Successful!';
    successMessage.style.color = 'green';
  }
}

// Call the function to load the cart when the page is loaded
document.addEventListener('DOMContentLoaded', loadCheckoutCart);

// Add event listener to the form submit button only if the form exists
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', handleFormSubmit);
}
