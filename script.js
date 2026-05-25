// Product data
const products = [
    {
        id: 1,
        name: "Vintage Pearl Choker Necklace Set – Gold Filigree Crystal Fringe Statement Necklace with Matching Earrings",
        price: 155.99,
        folder: "Vintage Pearl Choker Necklace Set – Gold Filigree Crystal Fringe Statement Necklace with Matching Earrings",
        images: ["_DSC1949.jpg", "_DSC1950.jpg", "_DSC1952.jpg", "_DSC1957.jpg", "_DSC1960.jpg"]
    },
    {
        id: 2,
        name: "Vintage Gold Filigree Crystal Fringe Necklace – Pearl Champagne Green Chandelier Statement Necklace",
        price: 179.99,
        folder: "Vintage Gold Filigree Crystal Fringe Necklace – Pearl Champagne Green Chandelier Statement Necklace",
        images: ["_DSC1935.jpg", "_DSC1936.jpg", "_DSC1938.jpg", "_DSC1939.jpg"]
    },
    {
        id: 3,
        name: "Gold Rope Chain Y Lariat Necklace – Crystal Pavé Ring Adjustable Long Necklace",
        price: 119.99,
        folder: "Gold Rope Chain Y Lariat Necklace – Crystal Pavé Ring Adjustable Long Necklace",
        images: ["_DSC1909.jpg", "_DSC1910.jpg", "_DSC1911.jpg", "_DSC1912.jpg", "_DSC1913.jpg", "_DSC1921.jpg"]
    },
    {
        id: 4,
        name: "Vintage Multi-Strand Pearl Necklace – Rhinestone Bow Statement Necklace for Wedding Party",
        price: 143.99,
        folder: "Vintage Multi-Strand Pearl Necklace – Rhinestone Bow Statement Necklace for Wedding Party",
        images: ["_DSC1894.jpg", "_DSC1895.jpg", "_DSC1896.jpg", "_DSC1897.jpg", "_DSC1898.jpg", "_DSC1899.jpg"]
    },
    {
        id: 5,
        name: "Vintage Crystal Brooch Set – Multicolor Peacock Pin & Blue Tassel Bow Brooch",
        price: 107.99,
        folder: "Vintage Crystal Brooch Set – Multicolor Peacock Pin & Blue Tassel Bow Brooch",
        images: ["_DSC1877.jpg", "_DSC1878.jpg", "_DSC1879.jpg", "_DSC1880.jpg", "_DSC1881.jpg", "_DSC1882.jpg"]
    },
    {
        id: 6,
        name: "Vintage Red Enamel Flower Brooch – Gold Tone Crystal Rhinestone Floral Pin",
        price: 83.99,
        folder: "Vintage Red Enamel Flower Brooch – Gold Tone Crystal Rhinestone Floral Pin",
        images: ["_DSC1869.jpg", "_DSC1870.jpg", "_DSC1871.jpg", "_DSC1872.jpg", "_DSC1873.jpg", "_DSC1874.jpg"]
    },
    {
        id: 7,
        name: "Vintage Turquoise Snake Pendant Necklace – Gold Tone Blue Enamel Serpent Statement Necklace",
        price: 131.99,
        folder: "Vintage Turquoise Snake Pendant Necklace – Gold Tone Blue Enamel Serpent Statement Necklace",
        images: ["_DSC1862.jpg", "_DSC1863.jpg", "_DSC1864.jpg", "_DSC1865.jpg", "_DSC1867.jpg", "_DSC1868.jpg"]
    },
    {
        id: 8,
        name: "Green Gemstone Gold Floral Statement Necklace – Vintage Crystal Collar Necklace",
        price: 167.99,
        folder: "Vintage Pearl Floral Statement Necklace – Red Green Crystal Flower Leaf Necklace",
        images: ["_DSC1967.jpg", "_DSC1968.jpg", "_DSC1969.jpg"]
    }
];

// More products images
const moreProductsImages = [
    "_DSC2015.jpg", "_DSC2016.jpg", "_DSC2017.jpg", "_DSC2019.jpg",
    "_DSC2021.jpg", "_DSC2022.jpg", "_DSC2023.jpg", "_DSC2024.jpg", "_DSC2025.jpg", "_DSC2026.jpg"
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Format price function
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Add to cart function
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: `images/${product.folder}/${product.images[0]}`
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Item added to cart!');
}

// Load products on homepage
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        productsGrid.innerHTML = products.map(product => `
            <div class="product-card" onclick="window.location.href='product.html?id=${product.id}'">
                <img src="images/${product.folder}/${product.images[0]}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="price">${formatPrice(product.price)}</div>
                </div>
            </div>
        `).join('');
    }
}

// Load more products images
function loadMoreProducts() {
    const moreProductsGrid = document.getElementById('moreProductsGrid');
    if (moreProductsGrid) {
        moreProductsGrid.innerHTML = moreProductsImages.map(image => `
            <img src="images/关于我们更多产品咨询/${image}" alt="More Product" class="more-product-image">
        `).join('');
    }
}

// Initialize the page
function init() {
    updateCartCount();
    loadProducts();
    loadMoreProducts();
}

// Run init when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
