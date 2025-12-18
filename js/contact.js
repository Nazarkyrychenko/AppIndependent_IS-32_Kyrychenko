const form = document.getElementById("contactForm");
const fillDemoBtn = document.getElementById("fillDemoBtn");

function setError(name, message) {
	const el = document.querySelector(`[data-error="${name}"]`);
	if (el) el.textContent = message || "";
}

function isEmail(value) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

if (fillDemoBtn && form) {
	fillDemoBtn.addEventListener("click", () => {
		form.elements.name.value = "Nazar";
		form.elements.email.value = "nazar@example.com";
		form.elements.message.value = "Hello! This is a demo message for the report.";
	});
}

if (form) {
	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const name = form.elements.name.value.trim();
		const email = form.elements.email.value.trim();
		const message = form.elements.message.value.trim();

		setError("name", "");
		setError("email", "");
		setError("message", "");

		let ok = true;

		if (name.length < 2) { setError("name", "Name must be at least 2 characters"); ok = false; }
		if (!isEmail(email)) { setError("email", "Enter a valid email"); ok = false; }
		if (message.length < 10) { setError("message", "Message must be at least 10 characters"); ok = false; }

		if (!ok) return;

		localStorage.setItem("bookshop_last_contact", JSON.stringify({ name, email, message, at: Date.now() }));
		alert("Message sent! (saved to localStorage for demo)");
		form.reset();
	});
}
