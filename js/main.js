// ===== Burger menu =====
const burger = document.querySelector(".burger");
const menu = document.querySelector(".nav__list");

function setMenuState(isOpen) {
	if (!burger || !menu) return;
	menu.classList.toggle("is-open", isOpen);
	burger.classList.toggle("is-active", isOpen);
	burger.setAttribute("aria-expanded", String(isOpen));
}

if (burger && menu) {
	burger.addEventListener("click", () => {
		const isOpen = !menu.classList.contains("is-open");
		setMenuState(isOpen);
	});

	menu.addEventListener("click", (e) => {
		if (e.target.classList.contains("nav__link")) setMenuState(false);
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") setMenuState(false);
	});

	document.addEventListener("click", (e) => {
		const insideNav = e.target.closest(".nav");
		if (!insideNav) setMenuState(false);
	});
}

// ===== Cart counter in header =====
function updateCartBadge() {
	document.querySelectorAll("[data-cart-count]").forEach(el => {
		el.textContent = cartCount();
	});
}
updateCartBadge();
window.addEventListener("storage", updateCartBadge);

window.addEventListener("cart:changed", updateCartBadge);

const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const newsCards = Array.from(document.querySelectorAll(".news-item"));

function applyNewsFilter(query) {
	const q = (query || "").trim().toLowerCase();
	newsCards.forEach(card => {
		const title = card.querySelector(".news-title")?.textContent?.toLowerCase() || "";
		card.style.display = title.includes(q) ? "" : "none";
	});
}

if (searchInput && newsCards.length) {
	const key = "bookshop_news_search";
	const saved = localStorage.getItem(key) || "";
	searchInput.value = saved;
	applyNewsFilter(saved);

	searchInput.addEventListener("input", (e) => {
		localStorage.setItem(key, e.target.value);
		applyNewsFilter(e.target.value);
	});

	if (clearSearchBtn) {
		clearSearchBtn.addEventListener("click", () => {
			searchInput.value = "";
			localStorage.setItem(key, "");
			applyNewsFilter("");
			searchInput.focus();
		});
	}
}
