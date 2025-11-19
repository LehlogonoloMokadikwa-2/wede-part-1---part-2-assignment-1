// script.js

// Hamburger Menu Toggle
document.getElementById('hamburger').addEventListener('click', function() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
    // Optional: Animate hamburger bars
    this.classList.toggle('active');
});

// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCount = document.getElementById('cart-count');
const cartModal = document.createElement('div');
cartModal.className = 'cart-modal';
cartModal.innerHTML = `
    <span class="close-cart" onclick="hideCart()">&times;</span>
    <h2>Your Cart</h2>
    <div id="cart-items"></div>
    <div class="cart-total">Total: $<span id="cart-total">0</span></div>
`;
document.body.appendChild(cartModal);

// Update Cart Count
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Show Cart Modal
function showCart() {
    updateCartDisplay();
    cartModal.classList.add('active');
}

// Hide Cart Modal
function hideCart() {
    cartModal.classList.remove('active');
}

// Update Cart Display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div class="cart-item">
                <span>R{item.name} - RR{item.price}</span>
                <button onclick="removeFromCart(R{index})">Remove</button>
            </div>
        `;
    });
    cartTotal.textContent = total;
    updateCartCount();
}

// Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Initialize Cart Count on Page Load
updateCartCount();

// Optional: Close cart when clicking outside (for better UX)
document.addEventListener('click', function(event) {
    if (!cartModal.contains(event.target) && !document.querySelector('.cart-icon').contains(event.target)) {
        hideCart();
    }
});