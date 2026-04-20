# Assignment 3: Dynamic E-Commerce Product Page

This is the implementation of Assignment 3, where the objective was to design a dynamic web app like an E-commerce fashion store. It utilizes HTML, CSS, and vanilla JavaScript, along with the Bootstrap CDN.

## Features Added
- **Product Rendering:** Created an array of JS objects representing clothing items. The products are injected dynamically into the HTML grid using JavaScript.
- **Dynamic Filtering:** Added radio buttons on the left sidebar. JavaScript listens for changes and filters the product array by category (Shirts, Jeans, Shoes) without reloading the page.
- **Shopping Cart:** 
  - Attached to an Offcanvas element in Bootstrap.
  - Users can click "Add to Cart" on any product, which pushes it to a cart array in memory.
  - Calculates total cost automatically.
  - Allows removing items via the cart sidebar.
  - Updates the badge number on the Cart icon dynamically.
- **Styling:** Used standard Bootstrap cards alongside custom CSS (`style.css`) for smooth hover effects.

## Running the Project
Since the project relies solely on frontend technologies, just open `index.html` in your favorite web browser. Clicking the cart icon will pop open the cart pane, and clicking "Add to Cart" will demonstrate the JS functionality correctly handling the state.
