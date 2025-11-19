// Global Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to Cart
function addToCart(productId, name, price, size) {
  const item = { id: productId, name, price, size };
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to cart!');
}

// Update Cart Display
function updateCart() {
  const cartContainer = document.getElementById('cart-items');
  if (cartContainer) {
    cartContainer.innerHTML = cart.map(item => `
      <div class="cart-item">
        <span>${item.name} (${item.size}) - $${item.price}</span>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `).join('');
  }
}

// Remove from Cart
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

// Gallery Lightbox
function openLightbox(src) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  img.src = src;
  lightbox.style.display = 'flex';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

// Form Validation
function validateForm(formId) {
  const form = document.getElementById(formId);
  const inputs = form.querySelectorAll('input, textarea');
  let valid = true;
  inputs.forEach(input => {
    if (!input.value) {
      input.style.border = '1px solid red';
      valid = false;
    } else {
      input.style.border = '1px solid #333';
    }
  });
  return valid;
}

// AJAX Form Submission (Simulated)
function submitForm(formId, url) {
  if (validateForm(formId)) {
    // Simulate AJAX
    alert('Form submitted successfully!');
    // In real app, use fetch() to send data
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  updateCart();
});