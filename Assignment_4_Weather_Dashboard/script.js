/* script.js */
const API_KEY = '88863a71c12e547b3128eb9b76f4b531';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

let forecastChart = null;

async function fetchWeather(city) {
    try {
        // 1. Fetch Current Weather
        const weatherRes = await fetch(`${BASE_URL}weather?q=${city}&units=metric&appid=${API_KEY}`);
        if (!weatherRes.ok) throw new Error('City not found');
        const weatherData = await weatherRes.json();

        // 2. Fetch Forecast (for chart and daily)
        const forecastRes = await fetch(`${BASE_URL}forecast?q=${city}&units=metric&appid=${API_KEY}`);
        const forecastData = await forecastRes.json();

        updateUI(weatherData, forecastData);
    } catch (err) {
        alert(err.message);
    }
}

function updateUI(current, forecast) {
    // Basic Info
    document.getElementById('display-city').innerText = `${current.name}, ${current.sys.country}`;
    document.getElementById('temp-val').innerText = Math.round(current.main.temp);
    document.getElementById('condition-text').innerText = current.weather[0].description;
    document.getElementById('humidity-val').innerText = `${current.main.humidity}%`;
    document.getElementById('wind-val').innerText = `${Math.round(current.wind.speed * 3.6)} km/h`;
    document.getElementById('pressure-val').innerText = `${current.main.pressure} hPa`;
    
    // Icon
    const iconCode = current.weather[0].icon;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    // Dynamic Theme based on weather main condition
    const mainCondition = current.weather[0].main.toLowerCase();
    document.body.className = mainCondition; // clouds, rain, snow, clear, thunderstorm

    // Date
    const now = new Date();
    document.getElementById('display-date').innerText = now.toLocaleDateString('en-US', { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });

    // Forecast History (next 8 timestamps for 24h)
    const hourlyData = forecast.list.slice(0, 8);
    updateChart(hourlyData);

    // 5-Day Forecast (Filtered for approx. same time each day)
    const dailyForecasts = forecast.list.filter(item => item.dt_txt.includes('12:00:00'));
    updateForecastGrid(dailyForecasts);
}

function updateChart(hourlyData) {
    const labels = hourlyData.map(item => {
        const date = new Date(item.dt * 1000);
        return date.getHours() + ':00';
    });
    const temps = hourlyData.map(item => item.main.temp);

    const ctx = document.getElementById('forecastChart').getContext('2d');
    
    // Destroy previous chart if exists
    if (forecastChart) forecastChart.destroy();

    forecastChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temps,
                borderColor: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { display: false },
                x: {
                    grid: { display: false },
                    ticks: { color: 'rgba(255,255,255,0.7)' }
                }
            }
        }
    });
}

function updateForecastGrid(daily) {
    const container = document.getElementById('forecast-container');
    container.innerHTML = '';

    daily.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const icon = day.weather[0].icon;

        const div = document.createElement('div');
        div.className = 'forecast-item';
        div.innerHTML = `
            <span style="font-size: 0.9rem; color: var(--text-muted);">${dayName}</span>
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="icon">
            <span class="forecast-temp">${Math.round(day.main.temp)}°</span>
        `;
        container.appendChild(div);
    });
}

// Search Functionality
document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) fetchWeather(city);
});

document.getElementById('city-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = document.getElementById('city-input').value;
        if (city) fetchWeather(city);
    }
});

// Update Digital Clock
function updateClock() {
    const now = new Date();
    document.getElementById('current-time').innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);

// Initial Load
fetchWeather('Mumbai');
