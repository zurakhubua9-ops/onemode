/* ===================================
   PRODUCT LOAD
=================================== */

const params = new URLSearchParams(
    window.location.search
);

const productId = params.get("id");

const product = PRODUCTS.find(
    item => item.id === productId
);


/* ===================================
   PRODUCT RENDER
=================================== */

if (product) {
    document.title =
        `${product.name} - ONEMODE`;

    const productImage =
        document.getElementById("product-image");

    const thumbnails =
        document.getElementById("product-thumbnails");

    const imageCounter =
        document.querySelector(
            ".image-counter span:first-child"
        );

    const productImages =
        product.images &&
        product.images.length > 0
            ? product.images
            : [product.image];


    /* PRODUCT GALLERY */

    if (productImage) {
        productImage.src = productImages[0];
        productImage.alt =
            `${product.brand} ${product.name}`;
    }

    if (thumbnails) {
        thumbnails.innerHTML = "";

        thumbnails.classList.toggle(
            "single-image",
            productImages.length === 1
        );

        productImages.forEach(
            (image, index) => {
                const thumbnail =
                    document.createElement("img");

                thumbnail.src = image;
                thumbnail.alt =
                    `${product.name} view ${index + 1}`;

                thumbnail.loading = "lazy";
                thumbnail.decoding = "async";

                if (index === 0) {
                    thumbnail.classList.add(
                        "active"
                    );
                }

                thumbnail.addEventListener(
                    "click",
                    () => {
                        if (productImage) {
                            productImage.src = image;
                        }

                        thumbnails
                            .querySelectorAll("img")
                            .forEach(img => {
                                img.classList.remove(
                                    "active"
                                );
                            });

                        thumbnail.classList.add(
                            "active"
                        );

                        if (imageCounter) {
                            imageCounter.textContent =
                                `${String(index + 1).padStart(2, "0")} / ${String(productImages.length).padStart(2, "0")}`;
                        }
                    }
                );

                thumbnails.appendChild(
                    thumbnail
                );
            }
        );
    }

    if (imageCounter) {
        imageCounter.textContent =
            `01 / ${String(productImages.length).padStart(2, "0")}`;
    }


    /* PRODUCT INFORMATION */

    const brandElement =
        document.getElementById("product-brand");

    const nameElement =
        document.getElementById("product-name");

    const priceElement =
        document.getElementById("product-price");

    const descriptionElement =
        document.getElementById(
            "product-description"
        );

    if (brandElement) {
        brandElement.textContent =
            product.brand;
    }

    if (nameElement) {
        nameElement.textContent =
            product.name;
    }

    if (priceElement) {
        priceElement.textContent =
            `$${product.price}`;
    }

    if (descriptionElement) {
        descriptionElement.textContent =
            product.description;
    }


    /* FAVOURITE */

    if (
        typeof setupProductFavourite ===
        "function"
    ) {
        setupProductFavourite(product);
    }

} else {
    const productPage =
        document.querySelector(
            ".product-page"
        );

    const relatedSection =
        document.getElementById(
            "related-products-section"
        );

    if (productPage) {
        productPage.innerHTML = `
            <div class="product-not-found">
                <p>404 / PRODUCT</p>
                <h1>PRODUCT NOT FOUND</h1>
                <a href="shop.html?category=new">
                    ← BACK TO SHOP
                </a>
            </div>
        `;
    }

    if (relatedSection) {
        relatedSection.remove();
    }
}


/* ===================================
   SIZE SELECTION
=================================== */

const sizeButtons =
    document.querySelectorAll(
        ".product-sizes button"
    );

const addToCartButton =
    document.getElementById(
        "add-to-cart"
    );

let selectedSize = null;

sizeButtons.forEach(button => {
    button.addEventListener(
        "click",
        () => {
            sizeButtons.forEach(btn =>
                btn.classList.remove(
                    "selected"
                )
            );

            button.classList.add(
                "selected"
            );

            selectedSize =
                button.dataset.size;
        }
    );
});


/* ===================================
   ADD TO CART
=================================== */

if (addToCartButton && product) {
    addToCartButton.addEventListener(
        "click",
        () => {
            if (!selectedSize) {
                alert(
                    "Please select a size."
                );
                return;
            }

            const cart = getCart();

            const existingItem =
                cart.find(item =>
                    item.id === product.id &&
                    item.size === selectedSize
                );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    brand: product.brand,
                    price: product.price,
                    image: product.image,
                    size: selectedSize,
                    quantity: 1
                });
            }

            saveCart(cart);
            updateCart();

            const buttonText =
                addToCartButton.querySelector(
                    "span:first-child"
                );

            if (buttonText) {
                buttonText.textContent =
                    "ADDED TO CART";

                setTimeout(
                    () => {
                        buttonText.textContent =
                            "ADD TO CART";
                    },
                    1500
                );
            }
        }
    );
}


/* ===================================
   RELATED PRODUCTS
=================================== */

function getRelatedProducts(
    activeProduct,
    limit = 4
) {
    if (!activeProduct) {
        return [];
    }

    return PRODUCTS
        .filter(item =>
            item.id !== activeProduct.id
        )
        .map(item => {
            let score = 0;

            if (
                item.brandKey ===
                activeProduct.brandKey
            ) {
                score += 5;
            }

            const sharedCollections =
                item.collections.filter(
                    collection =>
                        activeProduct.collections.includes(
                            collection
                        )
                ).length;

            const sharedCategories =
                item.categories.filter(
                    category =>
                        activeProduct.categories.includes(
                            category
                        )
                ).length;

            score +=
                sharedCollections * 3 +
                sharedCategories;

            return {
                item,
                score
            };
        })
        .sort((a, b) =>
            b.score - a.score
        )
        .slice(0, limit)
        .map(entry => entry.item);
}

function renderRelatedProducts() {
    const container =
        document.getElementById(
            "related-products-grid"
        );

    if (!container || !product) {
        return;
    }

    container.innerHTML = "";

    getRelatedProducts(product)
        .forEach(item => {
            const card =
                document.createElement("a");

            card.className =
                "related-product-card";

            card.href =
                `product.html?id=${item.id}`;

            card.innerHTML = `
                <div class="related-product-image">
                    <img
                        src="${item.image}"
                        alt="${item.brand} ${item.name}"
                        loading="lazy"
                        decoding="async"
                    >
                </div>

                <div class="related-product-info">
                    <div>
                        <p>${item.brand}</p>
                        <h3>${item.name}</h3>
                    </div>

                    <span>$${item.price}</span>
                </div>
            `;

            container.appendChild(card);
        });
}

renderRelatedProducts();


/* ===================================
   PRODUCT DETAILS ACCORDION
=================================== */

const detailRows =
    document.querySelectorAll(
        ".detail-row"
    );

detailRows.forEach(row => {
    row.addEventListener(
        "click",
        () => {
            const item =
                row.closest(
                    ".detail-item"
                );

            if (!item) {
                return;
            }

            const content =
                item.querySelector(
                    ".detail-content"
                );

            const icon =
                row.querySelector(
                    ".detail-icon"
                );

            const isOpen =
                item.classList.contains(
                    "open"
                );

            document
                .querySelectorAll(
                    ".detail-item"
                )
                .forEach(detailItem => {
                    detailItem.classList.remove(
                        "open"
                    );

                    const detailContent =
                        detailItem.querySelector(
                            ".detail-content"
                        );

                    const detailIcon =
                        detailItem.querySelector(
                            ".detail-icon"
                        );

                    if (detailContent) {
                        detailContent.style.maxHeight =
                            null;
                    }

                    if (detailIcon) {
                        detailIcon.textContent =
                            "+";
                    }
                });

            if (
                !isOpen &&
                content &&
                icon
            ) {
                item.classList.add(
                    "open"
                );

                content.style.maxHeight =
                    content.scrollHeight +
                    "px";

                icon.textContent = "−";
            }
        }
    );
});


/* ===================================
   SIZE GUIDE
=================================== */

const sizeGuideButton =
    document.getElementById(
        "size-guide-btn"
    );

const sizeGuideModal =
    document.getElementById(
        "size-guide-modal"
    );

const sizeGuideOverlay =
    document.getElementById(
        "size-guide-overlay"
    );

const sizeGuideClose =
    document.getElementById(
        "size-guide-close"
    );

function openSizeGuide() {
    if (
        !sizeGuideModal ||
        !sizeGuideOverlay
    ) {
        return;
    }

    sizeGuideModal.classList.add(
        "active"
    );

    sizeGuideOverlay.classList.add(
        "active"
    );
}

function closeSizeGuide() {
    if (
        !sizeGuideModal ||
        !sizeGuideOverlay
    ) {
        return;
    }

    sizeGuideModal.classList.remove(
        "active"
    );

    sizeGuideOverlay.classList.remove(
        "active"
    );
}

if (sizeGuideButton) {
    sizeGuideButton.addEventListener(
        "click",
        openSizeGuide
    );
}

if (sizeGuideClose) {
    sizeGuideClose.addEventListener(
        "click",
        closeSizeGuide
    );
}

if (sizeGuideOverlay) {
    sizeGuideOverlay.addEventListener(
        "click",
        closeSizeGuide
    );
}

document.addEventListener(
    "keydown",
    event => {
        if (event.key === "Escape") {
            closeSizeGuide();
        }
    }
);
