// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Check MetaMask connection
function checkMetaMaskConnection() {
    const isMetaMaskConnected = localStorage.getItem('walletConnected') === 'true';
    const cryptoButton = document.querySelector('.crypto-button');
    
    if (cryptoButton) {
        if (!isMetaMaskConnected) {
            cryptoButton.style.opacity = '0.5';
            cryptoButton.style.cursor = 'not-allowed';
            cryptoButton.title = 'Please connect MetaMask first';
        } else {
            cryptoButton.style.opacity = '1';
            cryptoButton.style.cursor = 'pointer';
            cryptoButton.title = 'Pay with ETH';
        }
    }
}

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
    totalAmount.textContent = `₹${total.toFixed(2)}`;
    
    // Add items to cart display
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
            </div>
            <div class="cart-item-price">₹${item.price}</div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
            </div>
            <i class='bx bx-trash cart-item-remove' onclick="removeItem(${index})"></i>
        `;
        cartItems.appendChild(cartItem);
    });

    // Check MetaMask connection status
    checkMetaMaskConnection();
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

// Initialize cart and check MetaMask connection on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
    checkMetaMaskConnection();
});

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

// Handle crypto payment
async function handleCryptoPayment() {
    try {
        // Check if MetaMask is installed
        if (typeof window.ethereum === 'undefined') {
            alert('Please install MetaMask to make crypto payments');
            window.location.href = 'auth.html';
            return;
        }

        // Check if MetaMask is connected
        const isMetaMaskConnected = localStorage.getItem('walletConnected') === 'true';
        if (!isMetaMaskConnected) {
            alert('Please connect your MetaMask wallet first');
            window.location.href = 'auth.html';
            return;
        }

        // Get cart total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Convert to ETH using the configured rate
        const ethAmount = (total / window.storeConfig.ethToUsdRate).toFixed(6);
        
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const fromAddress = accounts[0];
        
        // Get store wallet address from config
        const storeAddress = window.storeConfig.storeWalletAddress;
        
        // Convert ETH amount to Wei
        const amountInWei = (ethAmount * 1e18).toString(16);
        
        // Send transaction
        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                from: fromAddress,
                to: storeAddress,
                value: '0x' + amountInWei,
                gas: '0x5208' // 21000 gas
            }]
        });
        
        // Show success message
        alert(`Payment successful! Transaction hash: ${txHash}`);
        
        // Clear cart
        cart = [];
        saveCart();
        updateCartDisplay();
        
        // Show thank you message
        showThankYouPopup(txHash);
        
    } catch (error) {
        console.error('Payment error:', error);
        if (error.code === 4001) {
            // User rejected the transaction
            alert('Transaction was rejected. Please try again.');
        } else {
            alert('Payment failed: ' + error.message);
        }
    }
}

// Show thank you popup
function showThankYouPopup(txHash) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    const popup = document.createElement('div');
    popup.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 10px;
        text-align: center;
        max-width: 400px;
        width: 90%;
    `;

    popup.innerHTML = `
        <h2 style="color: #E55947; margin-bottom: 1rem;">Thank You for Your Purchase!</h2>
        <p style="margin-bottom: 1.5rem;">Your order has been successfully placed.</p>
        <p style="color: #606060; margin-bottom: 1.5rem;">Transaction Hash: ${txHash}</p>
        <button class="button" style="background: #E55947; color: white; border: none; padding: 0.5rem 1rem; cursor: pointer;">Continue Shopping</button>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Add click handler to the continue shopping button
    const continueBtn = popup.querySelector('button');
    continueBtn.addEventListener('click', () => {
        overlay.remove();
        window.location.href = "index.html";
    });
}

