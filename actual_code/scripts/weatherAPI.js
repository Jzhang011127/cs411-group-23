
// weatherAPI.js

function getWeatherData(cityName) {
    const apiKey = '48e3aaf913c90b624d8126f2fe8f994f';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            // Process and return weather data
            return data;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
}
