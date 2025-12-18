const CART_KEY = "bookshop_cart_v1";

function getCart() {
	try {
		const raw = localStorage.getItem(CART_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}

function saveCart(cart) {
	localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(item, qty = 1) {
	const cart = getCart();
	const existing = cart.find(x => x.id === item.id);
	if (existing) {
		existing.qty += qty;
	} else {
		cart.push({ ...item, qty });
	}
	saveCart(cart);
	return cart;
}

function removeFromCart(id) {
	const cart = getCart().filter(x => x.id !== id);
	saveCart(cart);
	return cart;
}

function setQty(id, qty) {
	const cart = getCart();
	const item = cart.find(x => x.id === id);
	if (!item) return cart;

	const safeQty = Math.max(1, Number(qty) || 1);
	item.qty = safeQty;

	saveCart(cart);
	return cart;
}

function clearCart() {
	saveCart([]);
	return [];
}

function cartCount(cart = getCart()) {
	return cart.reduce((sum, x) => sum + x.qty, 0);
}

function cartTotal(cart = getCart()) {
	return cart.reduce((sum, x) => sum + x.price * x.qty, 0);
}

function formatUAH(value) {
	return `${Math.round(value)} ₴`;
}
