function getCart() {
    try {
        return JSON.parse(
            localStorage.getItem("onemodeCart")
        ) || [];
    } catch {
        return [];
    }
}


function saveCart(cart) {
    localStorage.setItem(
        "onemodeCart",
        JSON.stringify(cart)
    );
}


function updateCart() {

    const cart = getCart();

    const cartCount =
        document.getElementById("cart-count");

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");


    const totalQuantity = cart.reduce(
        (sum, item) =>
            sum + (item.quantity || 1),
        0
    );


    if (cartCount) {
        cartCount.textContent =
            totalQuantity;
    }


    if (!cartItems || !cartTotal) {
        return;
    }


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                YOUR CART IS EMPTY.
            </p>
        `;

        cartTotal.textContent = "$0";

        return;
    }


    cartItems.innerHTML = "";

    let totalPrice = 0;


    cart.forEach((item, index) => {

        const quantity =
            item.quantity || 1;

        totalPrice +=
            item.price * quantity;


        const element =
            document.createElement("div");

        element.className =
            "cart-item";


        element.innerHTML = `
            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="cart-item-info">

                <p class="cart-item-brand">
                    ${item.brand}
                </p>

                <p class="cart-item-name">
                    ${item.name}
                </p>

                <p class="cart-item-size">
                    SIZE: ${item.size}
                </p>

                <p class="cart-item-price">
                    $${item.price}
                </p>

                <div class="cart-quantity">

                    <button
                        class="quantity-minus"
                        data-index="${index}"
                    >
                        −
                    </button>

                    <span>
                        ${quantity}
                    </span>

                    <button
                        class="quantity-plus"
                        data-index="${index}"
                    >
                        +
                    </button>

                </div>

                <button
                    class="remove-cart-item"
                    data-index="${index}"
                >
                    REMOVE
                </button>

            </div>
        `;


        cartItems.appendChild(
            element
        );

    });


    cartTotal.textContent =
        `$${totalPrice}`;
}


/* ===================================
   CART PANEL
=================================== */

const cartButton =
    document.getElementById("cart-btn");

const cartPanel =
    document.getElementById("cart-panel");

const cartOverlay =
    document.getElementById("cart-overlay");

const cartClose =
    document.getElementById("cart-close");


if (cartButton && cartPanel) {

    cartButton.addEventListener(
        "click",
        () => {

            updateCart();

            cartPanel.classList.add(
                "active"
            );

            if (cartOverlay) {
                cartOverlay.classList.add(
                    "active"
                );
            }

        }
    );

}


function closeCart() {

    if (cartPanel) {
        cartPanel.classList.remove(
            "active"
        );
    }

    if (cartOverlay) {
        cartOverlay.classList.remove(
            "active"
        );
    }

}


if (cartClose) {

    cartClose.addEventListener(
        "click",
        closeCart
    );

}


if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        closeCart
    );

}


/* ===================================
   CART QUANTITY / REMOVE
=================================== */

const cartItemsContainer =
    document.getElementById("cart-items");


if (cartItemsContainer) {

    cartItemsContainer.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest("button");

            if (!button) {
                return;
            }


            const index =
                Number(button.dataset.index);


            if (Number.isNaN(index)) {
                return;
            }


            const cart =
                getCart();


            if (
                button.classList.contains(
                    "quantity-plus"
                )
            ) {

                cart[index].quantity =
                    (cart[index].quantity || 1) + 1;

            }


            if (
                button.classList.contains(
                    "quantity-minus"
                )
            ) {

                const quantity =
                    cart[index].quantity || 1;


                if (quantity > 1) {

                    cart[index].quantity =
                        quantity - 1;

                } else {

                    cart.splice(
                        index,
                        1
                    );

                }

            }


            if (
                button.classList.contains(
                    "remove-cart-item"
                )
            ) {

                cart.splice(
                    index,
                    1
                );

            }


            saveCart(cart);

            updateCart();

        }
    );

}


/* ===================================
   CHECKOUT
=================================== */

const checkoutButton =
    document.querySelector(".checkout-btn");


if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        () => {

            const cart =
                getCart();


            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;
            }


            const currentPage =
                window.location.pathname
                    .split("/")
                    .pop();

            if (
                currentPage ===
                "checkout.html"
            ) {
                closeCart();
                return;
            }

            window.location.href =
                "checkout.html";

        }
    );

}


/* INITIAL UPDATE */

updateCart();

/* ===================================
   CART ESCAPE
=================================== */

document.addEventListener(
    "keydown",
    event => {
        if (event.key === "Escape") {
            closeCart();
        }
    }
);
