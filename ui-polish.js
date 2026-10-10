/* =========================================================
   ONEMODE — GLOBAL UI POLISH
========================================================= */

document.documentElement.classList.add("js-ready");

const reduceMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


/* =========================================================
   01 — HEADER SCROLL STATE
========================================================= */

const siteHeader =
    document.querySelector("header");

let lastScrollY =
    window.scrollY;

let ticking =
    false;


function updateHeader() {

    if (!siteHeader) return;

    const current =
        window.scrollY;


    siteHeader.classList.toggle(
        "header-scrolled",
        current > 20
    );


    /*
        Hide header only after
        meaningful downward scroll.
    */

    if (
        current > lastScrollY &&
        current > 180
    ) {

        siteHeader.classList.add(
            "header-hidden"
        );

    }

    else {

        siteHeader.classList.remove(
            "header-hidden"
        );

    }


    lastScrollY =
        Math.max(
            current,
            0
        );

}


window.addEventListener(
    "scroll",
    () => {

        if (ticking) return;

        ticking = true;

        requestAnimationFrame(
            () => {

                updateHeader();

                ticking = false;

            }
        );

    },
    {
        passive: true
    }
);


updateHeader();


/* =========================================================
   02 — INTERNAL PAGE REVEALS
========================================================= */

const revealTargets =
    document.querySelectorAll(`
        .shop-heading,
        .shop-product-card,
        .product-gallery,
        .product-page-info,
        .related-products-header,
        .related-product-card,
        .brands-hero,
        .all-brand-row,
        .collections-hero,
        .collection-card,
        .favourites-heading,
        .favourite-product-card,
        .checkout-heading,
        .checkout-block,
        .checkout-summary-item
    `);


if (
    revealTargets.length &&
    !reduceMotion
) {

    revealTargets.forEach(
        element => {

            element.classList.add(
                "ui-reveal"
            );

        }
    );


    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target
                            .classList
                            .add(
                                "ui-visible"
                            );


                        revealObserver
                            .unobserve(
                                entry.target
                            );

                    }
                );

            },

            {
                threshold: 0.08,
                rootMargin:
                    "0px 0px -40px 0px"
            }

        );


    revealTargets.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

}


/* =========================================================
   03 — STAGGER PRODUCT CARDS
========================================================= */

const cardGroups = [
    ".shop-products-grid",
    ".related-products-grid",
    ".favourites-grid",
    ".all-brands-list"
];


cardGroups.forEach(
    selector => {

        const group =
            document.querySelector(
                selector
            );

        if (!group) return;


        const items =
            group.children;


        Array
            .from(items)
            .forEach(
                (
                    item,
                    index
                ) => {

                    item.style
                        .setProperty(
                            "--ui-delay",
                            `${
                                Math.min(
                                    index,
                                    8
                                ) * 55
                            }ms`
                        );

                }
            );

    }
);


/* =========================================================
   04 — IMAGE LOAD POLISH
========================================================= */

const images =
    document.querySelectorAll(
        `
        .shop-product-image img,
        .related-product-image img,
        .favourite-product-image img,
        .all-brand-image img,
        .collection-card img,
        .product-main-image img
        `
    );


images.forEach(
    image => {

        image.classList.add(
            "ui-image"
        );


        const markLoaded =
            () => {

                image.classList.add(
                    "ui-image-loaded"
                );

            };


        if (image.complete) {

            markLoaded();

        }

        else {

            image.addEventListener(
                "load",
                markLoaded,
                {
                    once: true
                }
            );

        }

    }
);


/* =========================================================
   05 — PRODUCT MAIN IMAGE CHANGE
========================================================= */

const productMainImage =
    document.querySelector(
        ".product-main-image img"
    );


if (
    productMainImage &&
    !reduceMotion
) {

    const productImageObserver =
        new MutationObserver(
            mutations => {

                const changed =
                    mutations.some(
                        mutation =>
                            mutation.attributeName ===
                            "src"
                    );


                if (!changed) return;


                productMainImage
                    .classList
                    .remove(
                        "product-image-change"
                    );


                requestAnimationFrame(
                    () => {

                        productMainImage
                            .classList
                            .add(
                                "product-image-change"
                            );

                    }
                );

            }
        );


    productImageObserver.observe(
        productMainImage,
        {
            attributes: true,
            attributeFilter: [
                "src"
            ]
        }
    );

}


/* =========================================================
   06 — BUTTON PRESS FEEDBACK
========================================================= */

const pressButtons =
    document.querySelectorAll(`
        .add-to-cart,
        .favourite-btn,
        .place-order-btn,
        .checkout-btn,
        #apply-filters,
        .product-sizes button
    `);


pressButtons.forEach(
    button => {

        button.addEventListener(
            "pointerdown",
            () => {

                button.classList.add(
                    "ui-pressed"
                );

            }
        );


        const release =
            () => {

                button.classList.remove(
                    "ui-pressed"
                );

            };


        button.addEventListener(
            "pointerup",
            release
        );

        button.addEventListener(
            "pointercancel",
            release
        );

        button.addEventListener(
            "pointerleave",
            release
        );

    }
);


/* =========================================================
   07 — ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !==
            "Escape"
        ) {
            return;
        }


        /*
            Close search
        */

        const searchPanel =
            document.querySelector(
                "#search-panel.active"
            );

        const searchClose =
            document.querySelector(
                "#search-close"
            );


        if (
            searchPanel &&
            searchClose
        ) {

            searchClose.click();

        }


        /*
            Close cart
        */

        const cartPanel =
            document.querySelector(
                ".cart-panel.active"
            );

        const cartClose =
            document.querySelector(
                "#cart-close"
            );


        if (
            cartPanel &&
            cartClose
        ) {

            cartClose.click();

        }


        /*
            Close size guide
        */

        const sizeModal =
            document.querySelector(
                ".size-guide-modal.active"
            );

        const sizeClose =
            document.querySelector(
                ".size-guide-header button"
            );


        if (
            sizeModal &&
            sizeClose
        ) {

            sizeClose.click();

        }

    }
);


/* =========================================================
   08 — EXTERNAL PAGE LINK FEEDBACK
========================================================= */

document
    .querySelectorAll(
        'a[href]'
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    link.classList.add(
                        "ui-link-clicked"
                    );

                }
            );

        }
    );


/* =========================================================
   09 — PRODUCT STICKY CHECK
========================================================= */

const productInfo =
    document.querySelector(
        ".product-page-info"
    );


function updateProductSticky() {

    if (!productInfo) return;


    const desktop =
        window.innerWidth > 1000;


    productInfo.classList.toggle(
        "product-info-sticky",
        desktop
    );

}


updateProductSticky();


window.addEventListener(
    "resize",
    updateProductSticky
);

/* =========================================================
   ONEMODE — FINAL INTERACTION PACK
========================================================= */


/* =========================================================
   10 — TOAST SYSTEM
========================================================= */

const toastRegion =
    document.createElement("div");

toastRegion.className =
    "om-toast-region";

toastRegion.setAttribute(
    "aria-live",
    "polite"
);

toastRegion.setAttribute(
    "aria-atomic",
    "true"
);

document.body.appendChild(
    toastRegion
);


function showOmToast(
    message,
    type = "default"
) {

    const toast =
        document.createElement("div");

    toast.className =
        `om-toast om-toast-${type}`;

    toast.innerHTML = `
        <span class="om-toast-dot"></span>

        <span class="om-toast-text">
            ${message}
        </span>

        <button
            class="om-toast-close"
            type="button"
            aria-label="Close notification"
        >
            ×
        </button>
    `;


    toastRegion.appendChild(
        toast
    );


    requestAnimationFrame(
        () => {

            toast.classList.add(
                "om-toast-visible"
            );

        }
    );


    const removeToast =
        () => {

            toast.classList.remove(
                "om-toast-visible"
            );


            setTimeout(
                () => {

                    toast.remove();

                },
                400
            );

        };


    toast
        .querySelector(
            ".om-toast-close"
        )
        ?.addEventListener(
            "click",
            removeToast
        );


    setTimeout(
        removeToast,
        3200
    );

}


/* =========================================================
   11 — CART COUNT FEEDBACK
========================================================= */

const cartCount =
    document.querySelector(
        "#cart-count"
    );


if (cartCount) {

    let previousCartCount =
        Number(
            cartCount.textContent
        ) || 0;


    const cartObserver =
        new MutationObserver(
            () => {

                const current =
                    Number(
                        cartCount
                            .textContent
                    ) || 0;


                if (
                    current >
                    previousCartCount
                ) {

                    showOmToast(
                        "ADDED TO CART",
                        "success"
                    );

                }


                previousCartCount =
                    current;

            }
        );


    cartObserver.observe(
        cartCount,
        {
            childList: true,
            subtree: true,
            characterData: true
        }
    );

}


/* =========================================================
   12 — FAVOURITES FEEDBACK
========================================================= */

const favouriteCount =
    document.querySelector(
        "#favourite-count"
    );


if (favouriteCount) {

    let previousFavouriteCount =
        Number(
            favouriteCount
                .textContent
        ) || 0;


    const favouriteObserver =
        new MutationObserver(
            () => {

                const current =
                    Number(
                        favouriteCount
                            .textContent
                    ) || 0;


                if (
                    current >
                    previousFavouriteCount
                ) {

                    showOmToast(
                        "SAVED TO FAVOURITES",
                        "favourite"
                    );

                }


                if (
                    current <
                    previousFavouriteCount
                ) {

                    showOmToast(
                        "REMOVED FROM FAVOURITES"
                    );

                }


                previousFavouriteCount =
                    current;

            }
        );


    favouriteObserver.observe(
        favouriteCount,
        {
            childList: true,
            subtree: true,
            characterData: true
        }
    );

}


/* =========================================================
   13 — NEWSLETTER DEMO
========================================================= */

const newsletterForms =
    document.querySelectorAll(
        ".newsletter-form"
    );


newsletterForms.forEach(
    form => {

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const input =
                    form.querySelector(
                        'input[type="email"]'
                    );


                const button =
                    form.querySelector(
                        "button"
                    );


                if (!input) return;


                if (
                    !input.checkValidity()
                ) {

                    input.reportValidity();

                    return;

                }


                const email =
                    input.value.trim();


                /*
                    Portfolio demo only.
                    Saved locally in browser.
                */

                localStorage.setItem(
                    "onemodeNewsletterEmail",
                    email
                );


                if (button) {

                    const original =
                        button.innerHTML;


                    button.innerHTML =
                        "JOINED ✓";


                    button.disabled =
                        true;


                    setTimeout(
                        () => {

                            button.innerHTML =
                                original;

                            button.disabled =
                                false;

                        },
                        2600
                    );

                }


                input.value =
                    "";


                showOmToast(
                    "YOU’RE ON THE LIST",
                    "success"
                );

            }
        );

    }
);


/* =========================================================
   14 — OVERLAY SCROLL LOCK
========================================================= */

const overlayTargets = [
    document.querySelector(
        "#search-panel"
    ),

    document.querySelector(
        "#cart-panel"
    ),

    document.querySelector(
        ".size-guide-modal"
    )
].filter(Boolean);


function updateBodyScrollLock() {

    const open =
        overlayTargets.some(
            element =>
                element.classList
                    .contains(
                        "active"
                    )
        );


    document.body.classList.toggle(
        "om-overlay-open",
        open
    );

}


if (
    overlayTargets.length
) {

    const overlayObserver =
        new MutationObserver(
            updateBodyScrollLock
        );


    overlayTargets.forEach(
        element => {

            overlayObserver.observe(
                element,
                {
                    attributes: true,
                    attributeFilter: [
                        "class"
                    ]
                }
            );

        }
    );


    updateBodyScrollLock();

}


/* =========================================================
   15 — BACK TO TOP
========================================================= */

const backToTop =
    document.createElement(
        "button"
    );


backToTop.type =
    "button";

backToTop.className =
    "om-back-top";

backToTop.setAttribute(
    "aria-label",
    "Back to top"
);

backToTop.innerHTML =
    "↑";


document.body.appendChild(
    backToTop
);


function updateBackTop() {

    backToTop.classList.toggle(
        "visible",
        window.scrollY > 700
    );

}


window.addEventListener(
    "scroll",
    updateBackTop,
    {
        passive: true
    }
);


updateBackTop();


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,

            behavior:
                reduceMotion
                    ? "auto"
                    : "smooth"
        });

    }
);


/* =========================================================
   16 — SEARCH INPUT AUTO FOCUS
========================================================= */

const searchPanel =
    document.querySelector(
        "#search-panel"
    );

const searchInput =
    document.querySelector(
        "#search-input"
    );


if (
    searchPanel &&
    searchInput
) {

    const searchObserver =
        new MutationObserver(
            () => {

                if (
                    searchPanel
                        .classList
                        .contains(
                            "active"
                        )
                ) {

                    setTimeout(
                        () => {

                            searchInput
                                .focus();

                        },
                        180
                    );

                }

            }
        );


    searchObserver.observe(
        searchPanel,
        {
            attributes: true,
            attributeFilter: [
                "class"
            ]
        }
    );

}


/* =========================================================
   17 — BUTTON LOADING FEEDBACK
========================================================= */

const mainActionButtons =
    document.querySelectorAll(
        `
        .add-to-cart,
        .place-order-btn
        `
    );


mainActionButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                if (
                    button.classList
                        .contains(
                            "om-action-loading"
                        )
                ) {
                    return;
                }


                button.classList.add(
                    "om-action-loading"
                );


                setTimeout(
                    () => {

                        button.classList
                            .remove(
                                "om-action-loading"
                            );

                    },
                    500
                );

            }
        );

    }
);


/* =========================================================
   18 — CURRENT YEAR
========================================================= */

document
    .querySelectorAll(
        ".footer-bottom p"
    )
    .forEach(
        element => {

            if (
                element.textContent
                    .includes(
                        "© 2026"
                    )
            ) {

                element.textContent =
                    element
                        .textContent
                        .replace(
                            "2026",
                            new Date()
                                .getFullYear()
                        );

            }

        }
    );