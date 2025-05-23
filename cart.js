// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const totalItems = document.getElementById('total-items');
    const totalAmount = document.getElementById('total-amount');
    
    // Clear cart items
    cartItems.innerHTML = '';
    
    // Update total items
    totalItems.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Calculate total amount
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmount.textContent = `$${total.toFixed(2)}`;
    
    // Add items to cart display
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
            </div>
            <div class="cart-item-price">$${item.price}</div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
            </div>
            <i class='bx bx-trash cart-item-remove' onclick="removeItem(${index})"></i>
        `;
        cartItems.appendChild(cartItem);
    });
}

// Update item quantity
function updateQuantity(index, change) {
    cart[index].quantity = Math.max(1, cart[index].quantity + change);
    saveCart();
    updateCartDisplay();
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Initialize cart display
updateCartDisplay();

// Add to cart functionality (to be called from product pages)
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartDisplay();
}

