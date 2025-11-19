// main.js - JavaScript for Veyra Clothing Homepage

// Global variables for cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize Typed.js for hero text animation
document.addEventListener('DOMContentLoaded', function() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        new Typed('#typed-text', {
            strings: ['Veyra Clothing', 'Modern Streetwear', 'Minimal Luxury'],
            typeSpeed: 100,
            backSpeed: 50,
            loop: true,
            showCursor: false
        });
    }
});

// Initialize Splitting.js for text animations
document.addEventListener('DOMContentLoaded', function() {
    Splitting();
});

// Initialize p5.js for particle animation in hero
function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('particles-canvas');
    canvas.style('position', 'absolute');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '1');
}

function draw() {
    clear();
    for (let i = 0; i < 50; i++) {
        let x = random(width);
        let y = random(height);
        fill(255, 255, 255, 100);
        noStroke();
        ellipse(x, y, 2, 2);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Initialize Splide carousel
document.addEventListener('DOMContentLoaded', function() {
    const splide = new Splide('#featured-carousel', {
        type: 'loop',
        perPage: 3,
        breakpoints: {
            768: {
                perPage: 1,
            },
        },
        autoplay: true,
        interval: 3000,
    });
    splide.mount();
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
});

// Cart panel toggle and overlay
document.addEventListener('DOMContentLoaded', function() {
    const cartToggle = document.getElementById('cart-toggle');
    const cartPanel = document.getElementById('cart-panel');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartClose = document.getElementById('cart-close');

    function toggleCart() {
        cartPanel.classList.toggle('open');
        cartOverlay.classList.toggle('hidden');
    }

    if (cartToggle) {
        cartToggle.addEventListener('click', toggleCart);
    }
    if (cartClose) {
        cartClose.addEventListener('click', toggleCart);
    }
    if (cartOverlay) {
        cartOverlay.addEventListener('click', toggleCart);
    }
});

// Add to cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = parseFloat(this.getAttribute('data-price'));
            const item = { product, price, quantity: 1 };

            // Check if item already in cart
            const existingItem = cart.find(item => item.product === product);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push(item);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
            updateCartCount();
            alert(`${product} added to cart!`);
        });
    });
});

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.classList.toggle('hidden', totalItems === 0);
    }
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (cartItems) {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            cartItems.innerHTML += `
                <div class="flex justify-between items-center py-2">
                    <span>${item.product} (x${item.quantity}) - $${itemTotal.toFixed(2)}</span>
                    <button onclick="removeFromCart(${index})" class="text-red-500">Remove</button>
                </div>
            `;
        });
        if (cartTotal) {
            cartTotal.textContent = `$${total.toFixed(2)}`;
        }
    }
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
}

// Checkout button (simulated)
document.addEventListener('DOMContentLoaded', function() {
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
            } else {
                alert('Checkout functionality would redirect to payment here. Total: $' + cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
                // In a real app, integrate with payment gateway like Stripe or PayPal
            }
        });
    }
});

// Newsletter form submission
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            if (email) {
                // Simulate form submission
                newsletterMessage.textContent = 'Thank you for subscribing!';
                newsletterMessage.classList.remove('hidden');
                newsletterMessage.style.color = 'green';
                document.getElementById('email').value = '';
                setTimeout(() => {
                    newsletterMessage.classList.add('hidden');
                }, 3000);
            } else {
                newsletterMessage.textContent = 'Please enter a valid email.';
                newsletterMessage.classList.remove('hidden');
                newsletterMessage.style.color = 'red';
            }
        });
    }
});

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    updateCartCount();
});
