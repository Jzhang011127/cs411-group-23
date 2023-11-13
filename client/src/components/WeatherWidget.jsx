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
          const mapboxAccessToken = "pk.eyJ1IjoiZ3Nld2VsbDcxMSIsImEiOiJjbG9ydHFxMHYwcnBrMmpsbmJ4czI5bXhxIn0.BBOD7cs2UXRLgyyerJKNFw"; // Replace with your Mapbox access token
          const mapboxGeocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxAccessToken}`;

          try {
            const response = await axios.get(mapboxGeocodingUrl);
            if (response.data.features.length > 0) {
              const placeName = response.data.features[0].place_name;
              const city = placeName.split(", ")[1];
              const state = placeName.split(", ")[2];
              if (city.includes("ave") || city.includes("Ave") || city.includes("st") || city.includes("St") || city.includes("rd") || city.includes("Rd") || city.includes("Ctr")) {
                const city = placeName.split(", ")[2];
                const state = placeName.split(", ")[3];
              };
              setLocation(`${city}, ${state}`);
            } else {
              console.error("City not found in the Mapbox response.");
            }
          } catch (error) {
            console.error("Error fetching location", error);
          }

          // Fetch weather data using the OpenWeatherMap API
          const openWeatherMapApiKey = "263c364c0c876d4542c6dc220af45a4a"; // Replace with your OpenWeatherMap API key
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
        <div className="Test">
          <div className="location">
              <img className="images" src="../64113.png" width="15px"></img>
              {location}
          </div>
          <div className="desc">
              {weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}
              <br></br>
              <br></br>
          </div>
        </div>
        <div className="temp-and-icon">
        <div className="temperature">
          {Math.round(32 + 1.8 * (weather.main.temp))}°F
        </div>
        <div className="weather-icon">
        <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt="Weather Icon"
                width="90px"
              />
        </div>
        </div>
        <div className="weather-info">
            <div className="column">
              <p>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}</p>
            </div>
            <div className="column">
              <p>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}</p>
            </div>
            {weather.uvi && (
              <div className="column">
                <p>UV Index: {weather.uvi}</p>
              </div>
            )}
            {/* <div className="column">
              <p>UV Index: {weather.uvi}</p>
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherWidget;