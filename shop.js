/* ===================================
   URL PARAMETERS
=================================== */

const params = new URLSearchParams(window.location.search);

const category = params.get("category");
const brandSlug = params.get("brand");
const collectionSlug = params.get("collection");

const categoryTitles = {
    new: "NEW",
    women: "WOMEN",
    men: "MEN",
    unisex: "UNISEX",
    accessories: "ACCESSORIES",
    outerwear: "OUTERWEAR",
    tops: "TOPS",
    shirts: "SHIRTS",
    hoodies: "HOODIES",
    pants: "PANTS",
    dresses: "DRESSES",
    bags: "BAGS"
};

const brandNames = {
    cos: "COS",
    arket: "ARKET",
    acne: "ACNE STUDIOS",
    ami: "AMI PARIS",
    ganni: "GANNI",
    weekday: "WEEKDAY",
    mm6: "MM6 MAISON MARGIELA",
    salomon: "SALOMON"
};

const collectionTitles = {
    monochrome: "MONOCHROME",
    "urban-form": "URBAN FORM",
    "after-dark": "AFTER DARK"
};


/* ===================================
   ELEMENTS
=================================== */

const shopTitle = document.getElementById("shop-title");
const shopCount = document.getElementById("shop-count");
const shopProductsContainer = document.getElementById("shop-products");
const filterButton = document.getElementById("filter-btn");
const filterPanel = document.getElementById("filter-panel");
const priceButtons = document.querySelectorAll(".price-filter");
const applyFilters = document.getElementById("apply-filters");
const clearFilters = document.getElementById("clear-filters");
const sortSelect = document.getElementById("sort-select");


/* ===================================
   BASE PRODUCTS
=================================== */

let baseProducts = [...PRODUCTS];

if (brandSlug && brandNames[brandSlug]) {
    shopTitle.textContent = brandNames[brandSlug];

    baseProducts = PRODUCTS.filter(
        product => product.brandKey === brandSlug
    );
} else if (
    collectionSlug &&
    collectionTitles[collectionSlug]
) {
    shopTitle.textContent =
        collectionTitles[collectionSlug];

    baseProducts = PRODUCTS.filter(
        product =>
            product.collections &&
            product.collections.includes(collectionSlug)
    );
} else {
    const activeCategory = category || "new";

    shopTitle.textContent =
        categoryTitles[activeCategory] || "SHOP";

    baseProducts = PRODUCTS.filter(
        product =>
            product.categories &&
            product.categories.includes(activeCategory)
    );
}


/* ===================================
   FILTER / SORT STATE
=================================== */

let selectedPrice = null;

function getSelectedBrands() {
    return [
        ...document.querySelectorAll(
            ".brand-filter:checked"
        )
    ].map(input => input.value);
}

function sortProducts(products) {
    const sorted = [...products];
    const sortValue = sortSelect
        ? sortSelect.value
        : "featured";

    if (sortValue === "price-asc") {
        sorted.sort((a, b) => a.price - b.price);
    }

    if (sortValue === "price-desc") {
        sorted.sort((a, b) => b.price - a.price);
    }

    if (sortValue === "name-asc") {
        sorted.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    return sorted;
}

function getVisibleProducts() {
    const selectedBrands = getSelectedBrands();

    let products = [...baseProducts];

    if (selectedBrands.length > 0) {
        products = products.filter(product =>
            selectedBrands.includes(product.brand)
        );
    }

    if (selectedPrice !== null) {
        products = products.filter(
            product => product.price < selectedPrice
        );
    }

    return sortProducts(products);
}


/* ===================================
   RENDER PRODUCTS
=================================== */

function renderProducts(products) {
    if (!shopProductsContainer || !shopCount) {
        return;
    }

    shopProductsContainer.innerHTML = "";

    shopCount.textContent =
        `${products.length} ${
            products.length === 1
                ? "PRODUCT"
                : "PRODUCTS"
        }`;

    if (products.length === 0) {
        shopProductsContainer.innerHTML = `
            <div class="shop-empty">
                <p>NO PRODUCTS FOUND.</p>
                <span>TRY CLEARING OR CHANGING YOUR FILTERS.</span>
            </div>
        `;

        return;
    }

    products.forEach(product => {
        const productCard =
            document.createElement("a");

        productCard.className =
            "shop-product-card";

        productCard.href =
            `product.html?id=${product.id}`;

        productCard.innerHTML = `
            <div class="shop-product-image">
                <img
                    src="${product.image}"
                    alt="${product.brand} ${product.name}"
                    loading="lazy"
                    decoding="async"
                >
            </div>

            <div class="shop-product-info">
                <div>
                    <p class="shop-product-brand">
                        ${product.brand}
                    </p>

                    <h2>
                        ${product.name}
                    </h2>
                </div>

                <span>
                    $${product.price}
                </span>
            </div>
        `;

        shopProductsContainer.appendChild(
            productCard
        );
    });
}


/* ===================================
   FILTER PANEL
=================================== */

if (filterButton && filterPanel) {
    filterButton.addEventListener(
        "click",
        () => {
            filterPanel.classList.toggle("active");

            filterButton.textContent =
                filterPanel.classList.contains("active")
                    ? "FILTER −"
                    : "FILTER +";
        }
    );
}


/* ===================================
   PRICE FILTER
=================================== */

priceButtons.forEach(button => {
    button.addEventListener(
        "click",
        () => {
            const price = Number(
                button.dataset.price
            );

            if (
                button.classList.contains("active")
            ) {
                button.classList.remove("active");
                selectedPrice = null;
                return;
            }

            priceButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");
            selectedPrice = price;
        }
    );
});


/* ===================================
   APPLY / CLEAR / SORT
=================================== */

if (applyFilters) {
    applyFilters.addEventListener(
        "click",
        () => {
            renderProducts(
                getVisibleProducts()
            );
        }
    );
}

if (clearFilters) {
    clearFilters.addEventListener(
        "click",
        () => {
            document
                .querySelectorAll(".brand-filter")
                .forEach(input => {
                    input.checked = false;
                });

            priceButtons.forEach(button =>
                button.classList.remove("active")
            );

            selectedPrice = null;

            if (sortSelect) {
                sortSelect.value = "featured";
            }

            renderProducts(
                sortProducts(baseProducts)
            );
        }
    );
}

if (sortSelect) {
    sortSelect.addEventListener(
        "change",
        () => {
            renderProducts(
                getVisibleProducts()
            );
        }
    );
}


/* INITIAL RENDER */

renderProducts(
    sortProducts(baseProducts)
);
