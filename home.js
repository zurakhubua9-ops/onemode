/* ===================================
   HOME PRODUCT FEEDS
=================================== */

const HOME_NEW_IDS = [
    "nrove-coat",
    "varel-column-dress",
    "origin-utility-shirt",
    "kinetiq-tech-shell"
];

const HOME_TRENDING_IDS = [
    "noctra-asymmetric-layer",
    "forme-pleated-trouser",
    "varel-column-dress"
];

function getProductById(id) {
    return PRODUCTS.find(product => product.id === id);
}

function renderHomeNewArrivals() {
    const container = document.getElementById("home-new-arrivals");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    HOME_NEW_IDS
        .map(getProductById)
        .filter(Boolean)
        .forEach(product => {
            const card = document.createElement("a");

            card.className = "product-card";
            card.href = `product.html?id=${product.id}`;

            card.innerHTML = `
                <img
                    src="${product.image}"
                    alt="${product.brand} ${product.name}"
                    loading="lazy"
                    decoding="async"
                >

                <h3>${product.name}</h3>
                <p>${product.brand}</p>
                <span>$${product.price}</span>
            `;

            container.appendChild(card);
        });
}

function renderHomeTrending() {
    const container = document.getElementById("home-trending");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    HOME_TRENDING_IDS
        .map(getProductById)
        .filter(Boolean)
        .forEach((product, index) => {
            const card = document.createElement("a");

            card.className =
                index === 0
                    ? "trend-card trend-large"
                    : "trend-card";

            card.href = `product.html?id=${product.id}`;

            card.innerHTML = `
                <img
                    src="${product.image}"
                    alt="${product.brand} ${product.name}"
                    loading="lazy"
                    decoding="async"
                >

                <div class="trend-info">
                    <p>${product.brand}</p>
                    <h3>${product.name}</h3>
                    <span>$${product.price}</span>
                </div>
            `;

            container.appendChild(card);
        });
}

renderHomeNewArrivals();
renderHomeTrending();
