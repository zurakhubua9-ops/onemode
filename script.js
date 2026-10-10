/* ===================================
   ACTIVE NAVIGATION
=================================== */

const currentPage =
    window.location.pathname
        .split("/")
        .pop() || "index.html";

const currentParams =
    new URLSearchParams(
        window.location.search
    );

document
    .querySelectorAll("header nav a")
    .forEach(link => {
        const url = new URL(
            link.href,
            window.location.href
        );

        const targetPage =
            url.pathname
                .split("/")
                .pop();

        let isActive =
            targetPage === currentPage;

        if (
            currentPage === "shop.html" &&
            targetPage === "shop.html"
        ) {
            const linkCategory =
                url.searchParams.get(
                    "category"
                );

            const activeCategory =
                currentParams.get(
                    "category"
                );

            isActive =
                Boolean(linkCategory) &&
                linkCategory ===
                    activeCategory;
        }

        if (isActive) {
            link.classList.add(
                "active"
            );

            link.setAttribute(
                "aria-current",
                "page"
            );
        }
    });


/* ===================================
   SEARCH ELEMENTS
=================================== */

const searchButton =
    document.getElementById("search-btn");

let searchPanel =
    document.getElementById("search-panel");


/* CREATE SEARCH PANEL IF NEEDED */

if (searchButton && !searchPanel) {

    searchPanel =
        document.createElement("div");

    searchPanel.className =
        "search-panel";

    searchPanel.id =
        "search-panel";


    searchPanel.innerHTML = `
        <div class="search-panel-inner">

            <input
                type="text"
                id="search-input"
                placeholder="SEARCH PRODUCTS, BRANDS..."
            >

            <button
                id="search-close"
                type="button"
            >
                CLOSE
            </button>

        </div>

        <div
            id="search-results"
            class="search-results"
        ></div>
    `;


    document.body.appendChild(
        searchPanel
    );

}


const searchClose =
    document.getElementById("search-close");

const searchInput =
    document.getElementById("search-input");

const searchResults =
    document.getElementById("search-results");


/* ===================================
   OPEN SEARCH
=================================== */

if (
    searchButton &&
    searchPanel &&
    searchInput
) {

    searchButton.addEventListener(
        "click",
        () => {

            searchPanel.classList.add(
                "active"
            );

            searchInput.focus();

        }
    );

}


/* ===================================
   CLOSE SEARCH
=================================== */

if (
    searchClose &&
    searchPanel
) {

    searchClose.addEventListener(
        "click",
        () => {

            searchPanel.classList.remove(
                "active"
            );


            if (searchInput) {
                searchInput.value = "";
            }


            if (searchResults) {
                searchResults.innerHTML = "";
            }

        }
    );

}


/* ===================================
   SEARCH PRODUCTS
=================================== */

if (
    searchInput &&
    searchResults
) {

    searchInput.addEventListener(
        "input",
        () => {

            const value =
                searchInput.value
                    .toLowerCase()
                    .trim();


            searchResults.innerHTML = "";


            if (value === "") {
                return;
            }


            const availableProducts =
                typeof PRODUCTS !== "undefined"
                    ? PRODUCTS
                    : [];


            const results =
                availableProducts.filter(
                    product => {

                        const nameMatch =
                            product.name
                                .toLowerCase()
                                .includes(value);


                        const brandMatch =
                            product.brand
                                .toLowerCase()
                                .includes(value);


                        const categoryMatch =
                            product.categories
                                ? product.categories.some(
                                    category =>
                                        category
                                            .toLowerCase()
                                            .includes(value)
                                )
                                : false;


                        return (
                            nameMatch ||
                            brandMatch ||
                            categoryMatch
                        );

                    }
                );


            if (results.length === 0) {

                searchResults.innerHTML = `
                    <div class="search-result-item">
                        NO RESULTS FOUND
                    </div>
                `;

                return;
            }


            results.forEach(product => {

                const item =
                    document.createElement("div");


                item.className =
                    "search-result-item";


                item.innerHTML = `
                    <strong>
                        ${product.name}
                    </strong>

                    <span>
                        ${product.brand} — $${product.price}
                    </span>
                `;


                item.addEventListener(
                    "click",
                    () => {

                        window.location.href =
                            `product.html?id=${product.id}`;

                    }
                );


                searchResults.appendChild(
                    item
                );

            });

        }
    );

}


/* ===================================
   MOBILE MENU
=================================== */

const headerActions =
    document.querySelector(
        ".header-actions"
    );

const desktopNav =
    document.querySelector(
        "header nav"
    );

const cartHeaderButton =
    document.getElementById(
        "cart-btn"
    );


if (
    headerActions &&
    desktopNav &&
    !document.getElementById(
        "mobile-menu-btn"
    )
) {

    const mobileMenuButton =
        document.createElement("button");


    mobileMenuButton.id =
        "mobile-menu-btn";

    mobileMenuButton.type =
        "button";

    mobileMenuButton.textContent =
        "MENU";


    if (cartHeaderButton) {

        headerActions.insertBefore(
            mobileMenuButton,
            cartHeaderButton
        );

    } else {

        headerActions.appendChild(
            mobileMenuButton
        );

    }


    const mobileOverlay =
        document.createElement("div");


    mobileOverlay.className =
        "mobile-menu-overlay";

    mobileOverlay.id =
        "mobile-menu-overlay";


    const mobileMenu =
        document.createElement("aside");


    mobileMenu.className =
        "mobile-menu";

    mobileMenu.id =
        "mobile-menu";


    const navLinks =
        desktopNav.innerHTML;


    mobileMenu.innerHTML = `
        <div class="mobile-menu-header">

            <span>
                ONEMODE
            </span>

            <button
                id="mobile-menu-close"
                type="button"
            >
                CLOSE
            </button>

        </div>


        <nav class="mobile-menu-nav">
            ${navLinks}
        </nav>


        <div class="mobile-menu-bottom">

            <div class="mobile-menu-utility">
                <button
                    id="mobile-search-btn"
                    type="button"
                >
                    SEARCH
                </button>

                <a href="favourites.html">
                    FAVOURITES
                </a>
            </div>

            <span>
                FASHION IN MOTION
            </span>

        </div>
    `;


    document.body.appendChild(
        mobileOverlay
    );


    document.body.appendChild(
        mobileMenu
    );


    const mobileMenuClose =
        document.getElementById(
            "mobile-menu-close"
        );

    const mobileSearchButton =
        document.getElementById(
            "mobile-search-btn"
        );


    function openMobileMenu() {

        mobileMenu.classList.add(
            "active"
        );


        mobileOverlay.classList.add(
            "active"
        );


        document.body.classList.add(
            "menu-open"
        );

    }


    function closeMobileMenu() {

        mobileMenu.classList.remove(
            "active"
        );


        mobileOverlay.classList.remove(
            "active"
        );


        document.body.classList.remove(
            "menu-open"
        );

    }


    mobileMenuButton.addEventListener(
        "click",
        openMobileMenu
    );


    if (mobileSearchButton) {

        mobileSearchButton.addEventListener(
            "click",
            () => {

                closeMobileMenu();

                if (searchButton) {
                    searchButton.click();
                }

            }
        );

    }


    if (mobileMenuClose) {

        mobileMenuClose.addEventListener(
            "click",
            closeMobileMenu
        );

    }


    mobileOverlay.addEventListener(
        "click",
        closeMobileMenu
    );


    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });

}


/* ===================================
   NEWSLETTER
=================================== */

const newsletterForm =
    document.querySelector(
        ".newsletter-form"
    );


if (newsletterForm) {

    const newsletterInput =
        newsletterForm.querySelector(
            "input"
        );


    const newsletterButton =
        newsletterForm.querySelector(
            "button"
        );


    newsletterForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const email =
                newsletterInput.value.trim();


            if (!email) {

                newsletterInput.focus();

                return;
            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(email)
            ) {

                newsletterInput.classList.add(
                    "newsletter-error"
                );


                newsletterInput.focus();

                return;
            }


            newsletterInput.classList.remove(
                "newsletter-error"
            );


            newsletterButton.textContent =
                "SUBSCRIBED ✓";


            newsletterInput.value = "";


            setTimeout(
                () => {

                    newsletterButton.textContent =
                        "SUBSCRIBE →";

                },
                2500
            );

        }
    );


    newsletterInput.addEventListener(
        "input",
        () => {

            newsletterInput.classList.remove(
                "newsletter-error"
            );

        }
    );

}

/* ===================================
   GLOBAL ESCAPE
=================================== */

document.addEventListener(
    "keydown",
    event => {
        if (
            event.key === "Escape" &&
            searchPanel &&
            searchPanel.classList.contains(
                "active"
            )
        ) {
            searchPanel.classList.remove(
                "active"
            );

            if (searchInput) {
                searchInput.value = "";
            }

            if (searchResults) {
                searchResults.innerHTML = "";
            }
        }
    }
);

(() => {

    if (
        !window.gsap ||
        !window.ScrollTrigger
    ) {
        return;
    }

    gsap.registerPlugin(
        ScrollTrigger
    );


    const mm =
        gsap.matchMedia();


    /* ===================================
       DESKTOP CINEMATIC MOTION
    =================================== */

    mm.add(
        "(min-width: 901px)",
        () => {

            const hero =
                document.querySelector(
                    ".hero"
                );

            const heroTitle =
                document.querySelector(
                    ".hero-title h1"
                );

            const heroVisual =
                document.querySelector(
                    ".hero-visual"
                );

            const heroImage =
                document.querySelector(
                    ".hero-visual img"
                );

            const heroTop =
                document.querySelector(
                    ".hero-top"
                );


            if (
                hero &&
                heroTitle &&
                heroVisual &&
                heroImage
            ) {

                gsap.set(
                    heroImage,
                    {
                        transformOrigin:
                            "50% 50%"
                    }
                );


                const heroTimeline =
                    gsap.timeline({

                        scrollTrigger: {

                            trigger: hero,

                            start:
                                "top top",

                            end:
                                "+=1100",

                            scrub: 1.15,

                            pin: true,

                            anticipatePin: 1

                        }

                    });


                heroTimeline

                    .to(
                        heroTitle,
                        {
                            yPercent: -28,

                            opacity: 0.12,

                            ease: "none"
                        },
                        0
                    )


                    .to(
                        heroImage,
                        {
                            scale: 0.88,

                            yPercent: 7,

                            clipPath:
                                "inset(7% 9% 9% 9%)",

                            filter:
                                "saturate(0.88) contrast(1.04)",

                            ease: "none"
                        },
                        0
                    )


                    .to(
                        heroVisual,
                        {
                            xPercent: 3,

                            ease: "none"
                        },
                        0
                    );


                if (heroTop) {

                    heroTimeline.to(
                        heroTop,
                        {
                            opacity: 0,

                            y: -18,

                            ease: "none"
                        },
                        0
                    );

                }

            }


            /* ===================================
               NEW ARRIVALS REVEAL
            =================================== */

            const arrivals =
                document.querySelector(
                    ".new-arrivals"
                );

            const cards =
                gsap.utils.toArray(
                    ".new-arrivals .product-card"
                );


            if (
                arrivals &&
                cards.length
            ) {

                gsap.fromTo(
                    cards,

                    {
                        y: 110,

                        opacity: 0,

                        clipPath:
                            "inset(15% 0 0 0)"
                    },

                    {
                        y: 0,

                        opacity: 1,

                        clipPath:
                            "inset(0% 0 0 0)",

                        stagger: 0.12,

                        ease: "none",

                        scrollTrigger: {

                            trigger:
                                arrivals,

                            start:
                                "top 88%",

                            end:
                                "top 35%",

                            scrub: 1.1

                        }

                    }
                );


                /* slight floating movement */

                cards.forEach(
                    (card, index) => {

                        gsap.to(
                            card,
                            {
                                yPercent:
                                    index % 2 === 0
                                        ? -5
                                        : 5,

                                ease: "none",

                                scrollTrigger: {

                                    trigger:
                                        arrivals,

                                    start:
                                        "top bottom",

                                    end:
                                        "bottom top",

                                    scrub: 1.5

                                }

                            }
                        );

                    }
                );

            }

        }
    );


    /* ===================================
       MOBILE — LIGHTER MOTION
    =================================== */

    mm.add(
        "(max-width: 900px)",
        () => {

            const cards =
                gsap.utils.toArray(
                    ".new-arrivals .product-card"
                );


            cards.forEach(
                card => {

                    gsap.from(
                        card,
                        {
                            y: 50,

                            opacity: 0,

                            duration: 0.8,

                            ease:
                                "power3.out",

                            scrollTrigger: {

                                trigger:
                                    card,

                                start:
                                    "top 88%"

                            }

                        }
                    );

                }
            );

        }
    );

})();