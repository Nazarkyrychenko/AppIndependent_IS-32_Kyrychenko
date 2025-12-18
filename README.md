# Bookshop (Frontend)

Demo web-application for the course **“WEB-орієнтовані технології. Frontend розробки”**.

## Features

- Responsive layout (desktop / tablet / mobile)
- Header + navigation + **burger menu**
- Content grid (CSS Grid)
- Hover effects + smooth dropdown animation
- **Catalog page** with add-to-cart
- **Cart page**: quantity control, remove item, clear cart, total price
- Data storage via **localStorage**
- Contacts form with **client-side validation**

## Tech stack

- HTML5
- CSS3 (Grid/Flexbox, media queries)
- JavaScript (DOM, events, localStorage)

## Project structure

bookshop/
index.html
catalog.html
cart.html
contacts.html
pages.html
css/style.css
js/store.js
js/main.js
js/catalog.js
js/cart.js
js/contacts.js
assets/images/

## How to run

### Option 1: open file

Just open `index.html` in a browser.

### Option 2: Live Server (recommended)

If you use VS Code:

1. Install **Live Server** extension
2. Right click on `index.html`
3. Select **Open with Live Server**

## Notes for report

- Burger menu: `js/main.js`
- Catalog logic: `js/catalog.js`
- Cart logic: `js/store.js` + `js/cart.js`
- Validation: `js/contacts.js`
