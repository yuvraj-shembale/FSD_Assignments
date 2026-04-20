# Assignment 4: Weather Dashboard Visualization

For this assignment, the objective was to create an interactive data visualization dashboard. I decided to stick with a generic Weather Dashboard using the powerful `Chart.js` library as suggested.

## Features Let's look at what's included:

1.  **Summary Cards:** Some standard metrics at the top like Current Temperature, Humidity, and Wind speed.
2.  **Interactive Line Chart:** Displays a 7-Day Temperature curve. You can hover over the points to see the exact value.
3.  **Doughnut Chart:** Displays the proportion of weather conditions across the week (Sunny, Cloudy, Rainy).
4.  **Bar Chart:** Compares the average rainfall data across major global cities.

## How It's Built
-   **Frontend:** Standard HTML structure with the Bootstrap 5 CDN used for a responsive grid system and aesthetic `card` styles.
-   **JS Logic:** `script.js` handles initializing drawing contexts and rendering the charts onto HTML Canvas elements. 

To view it, just open up `index.html` in your web browser. No need to install `npm` packages for this— Chart.js is loaded dynamically via a CDN link.
