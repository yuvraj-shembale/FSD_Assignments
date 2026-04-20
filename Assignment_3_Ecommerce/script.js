// Product Data
const products = [
    { id: 1, name: "Classic White T-Shirt", category: "shirts", price: 19.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { id: 2, name: "Graphic Black Tee", category: "shirts", price: 24.99, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { id: 3, name: "Slim Fit Blue Jeans", category: "jeans", price: 49.99, image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { id: 4, name: "Distressed Denim", category: "jeans", price: 54.99, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { id: 5, name: "Running Sneakers", category: "shoes", price: 89.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { id: 6, name: "Casual Canvas Shoes", category: "shoes", price: 39.99, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" }
];

let cart = [];

// DOM Elements
const productContainer = document.getElementById('product-container');
const cartCount = document.getElementById('cart-count');
const cartList = document.getElementById('cart-list');
const cartTotal = document.getElementById('cart-total');
const emptyCartMsg = document.getElementById('empty-cart-msg');
const filterRadios = document.querySelectorAll('.filter-radio');

// Initialize
function init() {
    renderProducts(products);
    
    // Add event listeners for filters
    filterRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const category = e.target.value;
            if (category === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === category);
                renderProducts(filtered);
            }
        });
    });
}

// Render Products
function renderProducts(items) {
    productContainer.innerHTML = '';
    
    if (items.length === 0) {
        productContainer.innerHTML = '<p class="text-center w-100">No products found.</p>';
        return;
    }

    items.forEach(product => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 mb-4';
        
        col.innerHTML = `
            <div class="card product-card h-100 border-0 bg-white">
                <div class="product-img-wrapper">
                    <img src="${product.image}" class="product-img" alt="${product.name}">
                </div>
                <div class="card-body d-flex flex-column">
                    <span class="badge bg-light text-dark mb-2 align-self-start text-uppercase">${product.category}</span>
                    <h5 class="card-title">${product.name}</h5>
                    <p class="price mt-auto mb-3">$${product.price.toFixed(2)}</p>
                    <button class="btn btn-outline-primary w-100 mt-auto" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        productContainer.appendChild(col);
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Check Cart State and Update UI
function updateCartUI() {
    // Update Badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;

    // Update Cart List
    cartList.innerHTML = '';
    
    if (cart.length === 0) {
        emptyCartMsg.style.display = 'block';
    } else {
        emptyCartMsg.style.display = 'none';
        
        cart.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center px-0 py-3';
            
            li.innerHTML = `
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img me-3">
                    <div>
                        <h6 class="mb-0 text-truncate" style="max-width: 150px;">${item.name}</h6>
                        <small class="text-muted">${item.quantity} x $${item.price.toFixed(2)}</small>
                    </div>
                </div>
                <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartList.appendChild(li);
        });
    }

    // Update Total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerText = `$${total.toFixed(2)}`;
}

// Run init when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
