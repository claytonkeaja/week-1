// LOAD PRODUCTS ON PAGE
document.addEventListener("DOMContentLoaded", () => {
    displayByBrand();
});

function displayByBrand() {
    const appleGrid = document.getElementById("appleGrid");
    const samsungGrid = document.getElementById("samsungGrid");

    if (!appleGrid || !samsungGrid) return;

    appleGrid.innerHTML = "";
    samsungGrid.innerHTML = "";

    products.forEach(product => {
        const card = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.condition}</p>
                <p class="price">P${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;

        if (product.brand === "Apple") {
            appleGrid.innerHTML += card;
        } 
        else if (product.brand === "Samsung") {
            samsungGrid.innerHTML += card;
        }
    });
}
let cart = [];

// ADD TO CART
function addToCart(id) {
    const product = products.find(p => p.id === id);

    // check if already in cart
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCartUI();
    openCart();
}

// UPDATE CART UI
function updateCartUI() {
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;

        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" width="50">
                <div>
                    <p>${item.name}</p>
                    <p>P${item.price} x ${item.qty}</p>
                </div>
                <button onclick="removeFromCart(${item.id})">X</button>
            </div>
        `;
    });

    cartTotal.textContent = total;
}

// REMOVE ITEM
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

// OPEN CART
function openCart() {
    document.getElementById("cartSidebar").style.right = "0";
}

// CLOSE CART
document.getElementById("closeCartSidebar").onclick = () => {
    document.getElementById("cartSidebar").style.right = "-400px";
};

// OPEN CART FROM ICON
document.getElementById("cartIcon").onclick = () => {
    openCart();
};