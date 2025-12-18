const cartEmpty = document.getElementById("cartEmpty");
const cartContent = document.getElementById("cartContent");
const cartList = document.getElementById("cartList");
const clearCartBtn = document.getElementById("clearCartBtn");
const itemsCountEl = document.getElementById("cartItemsCount");
const totalEl = document.getElementById("cartTotal");

function renderCart() {
	const cart = getCart();

	if (!cart.length) {
		if (cartEmpty) cartEmpty.hidden = false;
		if (cartContent) cartContent.hidden = true;
		window.dispatchEvent(new Event("cart:changed"));
		return;
	}

	if (cartEmpty) cartEmpty.hidden = true;
	if (cartContent) cartContent.hidden = false;

	if (cartList) {
		cartList.innerHTML = cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-info">
          <h3>${item.title}</h3>
          <div class="muted">Price: ${formatUAH(item.price)}</div>
        </div>

        <div class="cart-controls">
          <div class="qty">
            <button class="icon-btn" type="button" data-action="dec">-</button>
            <input type="number" min="1" value="${item.qty}" data-role="qty">
            <button class="icon-btn" type="button" data-action="inc">+</button>
          </div>
          <button class="btn btn--light" type="button" data-action="remove">Remove</button>
        </div>
      </div>
    `).join("");
	}

	if (itemsCountEl) itemsCountEl.textContent = String(cartCount(cart));
	if (totalEl) totalEl.textContent = formatUAH(cartTotal(cart));

	window.dispatchEvent(new Event("cart:changed"));
}

renderCart();

if (cartList) {
	cartList.addEventListener("click", (e) => {
		const row = e.target.closest(".cart-item");
		if (!row) return;

		const id = row.dataset.id;
		const action = e.target.dataset.action;

		if (!action) return;

		const cart = getCart();
		const item = cart.find(x => x.id === id);
		if (!item) return;

		if (action === "inc") setQty(id, item.qty + 1);
		if (action === "dec") setQty(id, Math.max(1, item.qty - 1));
		if (action === "remove") removeFromCart(id);

		renderCart();
	});

	cartList.addEventListener("change", (e) => {
		const row = e.target.closest(".cart-item");
		if (!row) return;

		if (e.target.dataset.role !== "qty") return;

		const id = row.dataset.id;
		setQty(id, e.target.value);
		renderCart();
	});
}

if (clearCartBtn) {
	clearCartBtn.addEventListener("click", () => {
		clearCart();
		renderCart();
	});
}
