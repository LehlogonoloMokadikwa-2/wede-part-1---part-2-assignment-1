// script.js - Main JavaScript file for Veyra Clothing website

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
});

// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = document.getElementById('cart-count');

function updateCartCount() {
    if (cartCount) {
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length > 0 ? 'inline' : 'none';
    }
}

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${productName} added to cart!`);
}

function showCart() {
    // Redirect to cart page or show modal - assuming redirect for simplicity
    window.location.href = 'Cart.html';
}

function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const totalAmount = document.getElementById('totalAmount');
    
    if (cartItems && totalAmount) {
        cartItems.innerHTML = '';
        let total = 0;
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p>No items in cart, <a href="Products.html">Shop Now</a>.</p>';
        } else {
            cart.forEach((item, index) => {
                total += item.price;
                cartItems.innerHTML += `
                    <div class="cart-item">
                        <p>${item.name} - R${item.price.toFixed(2)}</p>
                        <button onclick="removeFromCart(${index})">Remove</button>
                    </div>
                `;
            });
        }
        
        totalAmount.textContent = `R${total.toFixed(2)}`;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

function checkout() {
    // Simple checkout - in real app, integrate with payment gateway
    alert('Checkout functionality not implemented yet. Total: ' + document.getElementById('totalAmount').textContent);
}

// Lightbox for Gallery
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (lightbox && lightboxImg) {
        lightboxImg.src = src;
        lightbox.style.display = 'flex';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
    }
}

// Contact Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                e.preventDefault();
                alert('Please fill in all required fields.');
                return false;
            }
            
            // For demo, alert success; in production, handle submission
            alert('Thank you! Your message has been sent. We\'ll get back to you soon.');
        });
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    displayCart(); // Only on cart page
});
