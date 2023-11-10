import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherWidget = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Fetch the city and state using Mapbox's Geocoding API
          const mapboxAccessToken = "YOUR_MAPBOX_ACCESS_TOKEN"; // Replace with your Mapbox access token
          const mapboxGeocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxAccessToken}`;

          try {
            const response = await axios.get(mapboxGeocodingUrl);
            const features = response.data.features;
            if (features.length > 0) {
              const place = features[0];
              const city = place.text;
              const state = place.context.find((context) => context.id.startsWith("region")).text;

              setLocation(`${city}, ${state}`);
            }
          } catch (error) {
            console.error("Error fetching location", error);
          }

          // Fetch weather data using the OpenWeatherMap API
          const openWeatherMapApiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your OpenWeatherMap API key
          const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherMapApiKey}&units=metric`;

          try {
            const response = await axios.get(weatherUrl);
            setWeather(response.data);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching weather data", error);
          }
        },
        (error) => {
          console.error("Geolocation error", error);
        }
      );
    } else {
      console.error("Geolocation is not supported in this browser.");
    }
  }, []);

  
  return (
    <div className="weather-widget">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p className="city">{location}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}</p>
        </>
      )}
    </div>
  );
};

export default WeatherWidget;