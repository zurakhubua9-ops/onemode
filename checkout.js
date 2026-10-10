const checkoutItems =
    document.getElementById(
        "checkout-summary-items"
    );

const checkoutSubtotal =
    document.getElementById(
        "checkout-subtotal"
    );

const checkoutTotal =
    document.getElementById(
        "checkout-total"
    );

const checkoutForm =
    document.getElementById(
        "checkout-form"
    );

const orderConfirmation =
    document.getElementById(
        "order-confirmation"
    );

const orderNumber =
    document.getElementById(
        "order-number"
    );


/* FEATURED PRODUCT */

const checkoutVisual =
    document.getElementById(
        "checkout-visual"
    );

const checkoutVisualImage =
    document.getElementById(
        "checkout-visual-image"
    );

const checkoutVisualBrand =
    document.getElementById(
        "checkout-visual-brand"
    );

const checkoutVisualName =
    document.getElementById(
        "checkout-visual-name"
    );


/* ===================================
   GET CART
=================================== */

function getCheckoutCart() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "onemodeCart"
            )
        ) || [];

    } catch {

        return [];

    }

}


/* ===================================
   RENDER CHECKOUT
=================================== */

function renderCheckout() {

    const cart =
        getCheckoutCart();


    checkoutItems.innerHTML = "";


    /* EMPTY CART */

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <div class="checkout-empty">
                YOUR CART IS EMPTY.
            </div>
        `;


        checkoutSubtotal.textContent =
            "$0";

        checkoutTotal.textContent =
            "$0";


        if (checkoutVisual) {

            checkoutVisual.style.display =
                "none";

        }

        return;
    }


    /* ===================================
       LARGE PRODUCT VISUAL
    =================================== */

    const featuredProduct =
        cart[0];


    if (
        checkoutVisual &&
        checkoutVisualImage
    ) {

        checkoutVisual.style.display =
            "block";


        checkoutVisualImage.src =
            featuredProduct.image;


        checkoutVisualImage.alt =
            featuredProduct.name;


        checkoutVisualBrand.textContent =
            featuredProduct.brand;


        checkoutVisualName.textContent =
            featuredProduct.name;

    }


    /* ===================================
       ORDER ITEMS
    =================================== */

    let total = 0;


    cart.forEach(item => {

        const quantity =
            item.quantity || 1;


        const itemTotal =
            item.price * quantity;


        total += itemTotal;


        const checkoutItem =
            document.createElement(
                "div"
            );


        checkoutItem.className =
            "checkout-summary-item";


        checkoutItem.innerHTML = `
            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="checkout-summary-info">

                <p class="checkout-item-brand">
                    ${item.brand}
                </p>

                <h3>
                    ${item.name}
                </h3>

                <p>
                    SIZE: ${item.size}
                </p>

                <p>
                    QTY: ${quantity}
                </p>

            </div>

            <span class="checkout-item-price">
                $${itemTotal}
            </span>
        `;


        checkoutItems.appendChild(
            checkoutItem
        );

    });


    checkoutSubtotal.textContent =
        `$${total}`;


    checkoutTotal.textContent =
        `$${total}`;

}


/* ===================================
   PLACE ORDER
=================================== */

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const cart =
                getCheckoutCart();


            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            const generatedOrderNumber =
                "OM-" +
                Math.floor(
                    100000 +
                    Math.random() *
                    900000
                );


            orderNumber.textContent =
                generatedOrderNumber;


            localStorage.removeItem(
                "onemodeCart"
            );


            if (
                typeof updateCart ===
                "function"
            ) {

                updateCart();

            }


            orderConfirmation.classList.add(
                "active"
            );

        }
    );

}


renderCheckout();