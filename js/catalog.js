const BOOKS = [
	{ id: "b1", title: "The Midnight Library", author: "Matt Haig", price: 320, image: "./assets/images/Book2.jfif" },
	{ id: "b2", title: "It Ends With Us", author: "Colleen Hoover", price: 290, image: "./assets/images/book3.jfif" },
	{ id: "b3", title: "New Book News", author: "Bookshop", price: 199, image: "./assets/images/Book1.avif" },
	{ id: "b4", title: "Fourth Wing", author: "Rebecca Yarros", price: 390, image: "./assets/images/book3.jfif" },
	{ id: "b5", title: "Clean Code", author: "Robert C. Martin", price: 520, image: "./assets/images/Book1.avif" },
	{ id: "b6", title: "JavaScript Basics", author: "Frontend Lab", price: 210, image: "./assets/images/Book2.jfif" },
];

const grid = document.getElementById("catalogGrid");
const search = document.getElementById("catalogSearch");
const clearBtn = document.getElementById("clearCatalogSearchBtn");

function renderCatalog(items) {
	if (!grid) return;
	grid.innerHTML = items.map(b => `
    <article class="book-card" data-id="${b.id}">
      <img src="${b.image}" alt="${b.title}">
      <div class="book-body">
        <h3 class="book-title">${b.title}</h3>
        <p class="book-meta">${b.author}</p>
        <div class="book-row">
          <span class="price">${formatUAH(b.price)}</span>
          <button class="btn btn--green" type="button" data-add="${b.id}">Add to cart</button>
        </div>
      </div>
    </article>
  `).join("");
}

function filterBooks(query) {
	const q = (query || "").trim().toLowerCase();
	return BOOKS.filter(b =>
		b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
	);
}

renderCatalog(BOOKS);

if (grid) {
	grid.addEventListener("click", (e) => {
		const id = e.target?.dataset?.add;
		if (!id) return;

		const book = BOOKS.find(b => b.id === id);
		if (!book) return;

		addToCart({ id: book.id, title: book.title, price: book.price, image: book.image }, 1);

		window.dispatchEvent(new Event("cart:changed"));

		e.target.textContent = "Added!";
		setTimeout(() => (e.target.textContent = "Add to cart"), 700);
	});
}

if (search) {
	const key = "bookshop_catalog_search";
	const saved = localStorage.getItem(key) || "";
	search.value = saved;
	renderCatalog(filterBooks(saved));

	search.addEventListener("input", (e) => {
		localStorage.setItem(key, e.target.value);
		renderCatalog(filterBooks(e.target.value));
	});

	if (clearBtn) {
		clearBtn.addEventListener("click", () => {
			search.value = "";
			localStorage.setItem(key, "");
			renderCatalog(BOOKS);
			search.focus();
		});
	}
}
