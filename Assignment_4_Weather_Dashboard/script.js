// script.js

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Line Chart: 7-Day Temperature Forecast
    const ctxTemp = document.getElementById('tempChart').getContext('2d');
    new Chart(ctxTemp, {
        type: 'line',
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: 'Temperature (°C)',
                data: [22, 24, 21, 23, 26, 28, 25],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                tension: 0.4, // smooth curve
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    suggestedMin: 15,
                    suggestedMax: 35
                }
            }
        }
    });

    // 2. Doughnut Chart: Weather Condition Proportions
    const ctxCondition = document.getElementById('conditionChart').getContext('2d');
    new Chart(ctxCondition, {
        type: 'doughnut',
        data: {
            labels: ['Sunny', 'Cloudy', 'Rainy'],
            datasets: [{
                data: [4, 2, 1], // days out of 7
                backgroundColor: [
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(201, 203, 207, 0.8)',
                    'rgba(54, 162, 235, 0.8)'
                ],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // 3. Bar Chart: Monthly Rainfall Comparison
    const ctxRain = document.getElementById('rainChart').getContext('2d');
    new Chart(ctxRain, {
        type: 'bar',
        data: {
            labels: ['New York', 'London', 'Tokyo', 'Mumbai', 'Sydney'],
            datasets: [{
                label: 'Rainfall (mm)',
                data: [80, 55, 120, 300, 95],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

});
