// Test script to add product to cart
console.log('Testing cart functionality...');

// Add sample product to cart
const sampleProduct = {
    id: 1,
    name: "Vintage Pearl Choker Necklace Set – Gold Filigree Crystal Fringe Statement Necklace with Matching Earrings",
    price: 129.99,
    quantity: 1,
    image: "images/Vintage Pearl Choker Necklace Set – Gold Filigree Crystal Fringe Statement Necklace with Matching Earrings/_DSC1949.jpg"
};

// Save to localStorage
localStorage.setItem('cart', JSON.stringify([sampleProduct]));
console.log('Added sample product to cart.');
console.log('Cart contents:', JSON.parse(localStorage.getItem('cart')));

// Redirect to cart page
window.location.href = 'cart.html';