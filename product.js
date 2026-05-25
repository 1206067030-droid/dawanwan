// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

// Find the product
const product = products.find(p => p.id === productId);

// If product not found, redirect to homepage
if (!product) {
    window.location.href = 'index.html';
}

// Set up image gallery
function setupImageGallery() {
    const mainImage = document.getElementById('mainProductImage');
    const thumbnailImages = document.getElementById('thumbnailImages');
    
    if (mainImage && thumbnailImages) {
        // Set main image
        mainImage.src = `images/${product.folder}/${product.images[0]}`;
        mainImage.alt = product.name;
        
        // Create thumbnails
        thumbnailImages.innerHTML = product.images.map((image, index) => `
            <img src="images/${product.folder}/${image}" alt="${product.name} thumbnail ${index + 1}" 
                 class="thumbnail ${index === 0 ? 'active' : ''}" 
                 onclick="changeMainImage('${image}', this)">
        `).join('');
    }
}

// Change main image when thumbnail is clicked
function changeMainImage(imageName, thumbnailElement) {
    const mainImage = document.getElementById('mainProductImage');
    if (mainImage) {
        mainImage.src = `images/${product.folder}/${imageName}`;
        
        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
        });
        thumbnailElement.classList.add('active');
    }
}

// Quantity control functions
function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    }
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput && parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}

// Set up product info
function setupProductInfo() {
    const productTitle = document.getElementById('productTitle');
    const productPrice = document.getElementById('productPrice');
    const addToCartBtn = document.getElementById('addToCartBtn');
    
    if (productTitle) {
        productTitle.textContent = product.name;
    }
    
    if (productPrice) {
        productPrice.textContent = formatPrice(product.price);
    }
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(document.getElementById('quantity').value);
            addToCart(product.id, quantity);
        });
    }
}

// Initialize product detail page
function initProductPage() {
    setupImageGallery();
    setupProductInfo();
    updateCartCount();
}

// Run init when DOM is loaded
document.addEventListener('DOMContentLoaded', initProductPage);
