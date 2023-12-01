// app.js

document.addEventListener("DOMContentLoaded", function () {
    // Setup event listeners for user actions
    document.getElementById("weatherBtn").addEventListener("click", () => {
        const cityName = document.getElementById("cityInput").value;
        fetchWeatherData(cityName);
    });
});

function fetchWeatherData(cityName) {
    getWeatherData(cityName)
        .then(data => {
            // Update DOM with weather data
            document.getElementById("weatherDisplay").innerText = JSON.stringify(data, null, 2);
        });
}

function fetchHealthData() {
    // Add similar functionality for health data
}

document.getElementById('googleLogin').addEventListener('click', googleLogin);
document.getElementById('facebookLogin').addEventListener('click', facebookLogin);

// Include the Firebase script and firebaseConfig.js in your HTML
