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
              const city = placeName.split(", ")[2];
              const state = placeName.split(", ")[3];
              setLocation(`${city}, ${state}`);
              //setLocation(placeName);
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
    console.log("Weather Data:", weather.weather[0].description);
  }, []);
  const source = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  
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
              
              <p><img src={source}></img></p>
          </div>
        </div>
        <div>
        <div className="temperature">
          <p></p>    
          <br></br>  
          <br></br>    
          <p>{Math.round(32 + 1.8 * (weather.main.temp))}°F</p>
        </div>
        <div className="weathericon">
          
        </div>
        </div>
        </>
      )}
    </div>
  );
};

export default WeatherWidget;