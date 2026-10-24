function getFavourites() {
    try {
        return (JSON.parse(
            localStorage.getItem("onemodeFavourites")
        ) || []).map(currentProductPresentation);
    } catch {
        return [];
    }
}


function saveFavourites(favourites) {
    localStorage.setItem(
        "onemodeFavourites",
        JSON.stringify(favourites)
    );
}


function updateFavouriteCount() {
    const favourites = getFavourites();

    const favouriteCount =
        document.getElementById("favourite-count");

    if (favouriteCount) {
        favouriteCount.textContent = favourites.length;
    }
}


/* ===================================
   PRODUCT FAVOURITE BUTTON
=================================== */

function setupProductFavourite(product) {

    const favouriteButton =
        document.getElementById("favourite-btn");

    if (!favouriteButton || !product) {
        return;
    }


    const favourites = getFavourites();

    const alreadyFavourite =
        favourites.some(
            item => item.id === product.id
        );


    if (alreadyFavourite) {
        favouriteButton.classList.add("active");

        favouriteButton.textContent =
            "♥ ADDED TO FAVOURITES";
    }


    favouriteButton.addEventListener(
        "click",
        () => {

            let currentFavourites =
                getFavourites();


            const existingIndex =
                currentFavourites.findIndex(
                    item => item.id === product.id
                );


            if (existingIndex >= 0) {

                currentFavourites.splice(
                    existingIndex,
                    1
                );

                favouriteButton.classList.remove(
                    "active"
                );

                favouriteButton.textContent =
                    "♡ ADD TO FAVOURITES";

            } else {

                currentFavourites.push({
                    id: product.id,
                    name: product.name,
                    brand: product.brand,
                    price: product.price,
                    image: product.images
                        ? product.images[0]
                        : product.image
                });


                favouriteButton.classList.add(
                    "active"
                );

                favouriteButton.textContent =
                    "♥ ADDED TO FAVOURITES";
            }


            saveFavourites(currentFavourites);

            updateFavouriteCount();
        }
    );
}


/* ===================================
   HEADER FAVOURITES BUTTON
=================================== */

const favouritesHeaderButton =
    document.getElementById("favourites-btn");


if (favouritesHeaderButton) {

    favouritesHeaderButton.addEventListener(
        "click",
        () => {
            window.location.href =
                "favourites.html";
        }
    );
}


updateFavouriteCount();