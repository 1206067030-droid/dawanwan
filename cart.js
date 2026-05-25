// Load cart items
function loadCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
                <a href="index.html#products" class="btn">Continue Shopping</a>
            </div>
        `;
        subtotalElement.textContent = '$0.00';
        shippingElement.textContent = '$0.00';
        totalElement.textContent = '$0.00';
        checkoutBtn.disabled = true;
        return;
    }
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 9.99 : 0;
    const total = subtotal + shipping;
    
    // Update totals in DOM
    subtotalElement.textContent = formatPrice(subtotal);
    shippingElement.textContent = formatPrice(shipping);
    totalElement.textContent = formatPrice(total);
    checkoutBtn.disabled = false;
    
    // Generate cart items HTML
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">&times; Remove</button>
            </div>
        </div>
    `).join('');
}

// Update item quantity
function updateQuantity(productId, change) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex === -1) return;
    
    cart[itemIndex].quantity += change;
    
    // Remove item if quantity is 0
    if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
    }
    
    // Update localStorage and UI
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
}

// Initialize cart page
function initCartPage() {
    loadCartItems();
    updateCartCount();
    
    // Handle checkout button click
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            // In a real application, this would redirect to checkout page
            // For now, we'll just show a message
            alert('Thank you for your purchase! This would redirect to checkout in a real application.');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCartItems();
            updateCartCount();
        });
    }
}

// Run init when DOM is loaded
document.addEventListener('DOMContentLoaded', initCartPage);
