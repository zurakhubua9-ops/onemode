const favouritesGrid =
    document.getElementById("favourites-grid");

const favouritesPageCount =
    document.getElementById("favourites-page-count");

function renderFavourites() {
    if (!favouritesGrid || !favouritesPageCount) {
        return;
    }

    const favourites = getFavourites();

    favouritesGrid.innerHTML = "";

    favouritesPageCount.textContent =
        `${favourites.length} ${
            favourites.length === 1
                ? "ITEM"
                : "ITEMS"
        }`;

    if (favourites.length === 0) {
        favouritesGrid.innerHTML = `
            <div class="favourites-empty">
                <p>NO SAVED ITEMS YET.</p>

                <a href="shop.html?category=new">
                    DISCOVER PRODUCTS →
                </a>
            </div>
        `;

        return;
    }

    favourites.forEach(product => {
        const card =
            document.createElement("article");

        card.className =
            "favourite-product-card";

        card.innerHTML = `
            <a
                href="product.html?id=${product.id}"
                class="favourite-product-link"
            >
                <div class="favourite-product-image">
                    <img
                        src="${product.image}"
                        alt="${product.brand} ${product.name}"
                        loading="lazy"
                        decoding="async"
                    >
                </div>

                <div class="favourite-product-info">
                    <div>
                        <p>${product.brand}</p>
                        <h2>${product.name}</h2>
                    </div>

                    <span>$${product.price}</span>
                </div>
            </a>

            <button
                class="remove-favourite"
                data-id="${product.id}"
                type="button"
            >
                REMOVE
            </button>
        `;

        favouritesGrid.appendChild(card);
    });
}

if (favouritesGrid) {
    favouritesGrid.addEventListener(
        "click",
        event => {
            const removeButton =
                event.target.closest(
                    ".remove-favourite"
                );

            if (!removeButton) {
                return;
            }

            const productId =
                removeButton.dataset.id;

            const newFavourites =
                getFavourites().filter(
                    product =>
                        product.id !== productId
                );

            saveFavourites(newFavourites);
            updateFavouriteCount();
            renderFavourites();
        }
    );
}

renderFavourites();
