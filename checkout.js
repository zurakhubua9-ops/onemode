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
    return getCart();
}


/* ===================================
   RENDER CHECKOUT
=================================== */

function renderCheckout() {

    const cart =
        getCheckoutCart();


    checkoutItems.innerHTML = "";
    checkoutForm.querySelector('[type="submit"]').disabled = cart.length === 0;


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


            if (!checkoutForm.reportValidity()) return;
            const generatedOrderNumber = "OM-" + crypto.randomUUID();
            const record = {
                id: generatedOrderNumber,
                createdAt: new Date().toISOString(),
                status: "saved-locally",
                items: cart,
                total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
            };
            try {
                // Keep the latest summary without storing contact or address details.
                localStorage.setItem("onemodeLastOrder", JSON.stringify(record));
            } catch {
                document.getElementById("checkout-status").textContent =
                    "Could not save your summary. Your bag has been kept. Please enable browser storage and retry.";
                return;
            }
            orderNumber.textContent = generatedOrderNumber;
            openSavedSummary();
            document.getElementById("checkout-status").textContent =
                "Summary saved on this device. Your bag is kept for further edits.";


        }
    );

}


renderCheckout();
function downloadOrderSummary() {
  try {
    const record = JSON.parse(localStorage.getItem("onemodeLastOrder") || "null");
    if (!record || !Array.isArray(record.items)) return;
    const lines = ["ONEMODE · ORDER SUMMARY", record.id,
      ...record.items.map(item => item.quantity + " × " + item.name + " / " + item.size + " — $" + item.price * item.quantity),
      "Total: $" + record.total, "", "Saved on this device. No order sent, no payment taken."];
    const url = URL.createObjectURL(new Blob([lines.join("\n")], {type:"text/plain;charset=utf-8"}));
    const link = document.createElement("a"); link.href = url; link.download = "onemode-order.txt"; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch { document.getElementById("checkout-status").textContent = "Saved summary is unavailable."; }
}
document.getElementById("download-order").addEventListener("click", downloadOrderSummary);
document.getElementById("close-confirmation").addEventListener("click", () => {
    orderConfirmation.classList.remove("active");
    document.querySelectorAll("[data-summary-inert]").forEach(el => { el.inert = false; el.removeAttribute("data-summary-inert"); });
    checkoutForm.querySelector('[type="submit"]').focus();
});
orderConfirmation.addEventListener("keydown", event => {
    if (event.key === "Escape") document.getElementById("close-confirmation").click();
    if (event.key !== "Tab") return;
    const buttons = [...orderConfirmation.querySelectorAll("button, a")];
    const first = buttons[0], last = buttons.at(-1);
    if (event.shiftKey && (document.activeElement === first || document.activeElement === orderConfirmation)) {
        event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
    }
});

function openSavedSummary() {
    try {
        const record = JSON.parse(localStorage.getItem("onemodeLastOrder") || "null");
        if (!record || typeof record.id !== "string" || !Array.isArray(record.items)) return;
        orderNumber.textContent = record.id;
        orderConfirmation.classList.add("active");
        document.querySelectorAll("body > header, body > main, #cart-panel").forEach(el => {
            if (!el.inert) { el.inert = true; el.setAttribute("data-summary-inert", ""); }
        });
        orderConfirmation.focus();
        document.getElementById("view-saved-order").hidden = false;
    } catch { document.getElementById("checkout-status").textContent = "Saved summary is unavailable."; }
}
document.getElementById("view-saved-order").addEventListener("click", openSavedSummary);
try { document.getElementById("view-saved-order").hidden = !localStorage.getItem("onemodeLastOrder"); } catch {}
