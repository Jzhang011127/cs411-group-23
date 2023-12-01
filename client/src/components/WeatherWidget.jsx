import React, { useEffect, useState } from "react";
import request from "../utils/request";

const WeatherWidget = (props) => {
  const [weather, setWeather] = useState({});
  useEffect(() => {
    async function fetchData(){
    if (props.geolocation) {
      props.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const openWeatherMapApiKey = "263c364c0c876d4542c6dc220af45a4a";
          const requestParam = {
            appid : openWeatherMapApiKey,
          }
          const requestMethod = 'get';
          const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherMapApiKey}&units=metric`;
          const response = await request(weatherUrl, requestMethod, requestParam);
          setWeather(response.data);
        },
        (error) => {
          console.error("Geolocation error", error);
        }
      );
    } else {
      console.error("Geolocation is not supported in this browser.");
    }
  }
  fetchData();
  }, []);
  
  return (
    <div className="weather-widget">
      {props.loading ? (
        <p>Loading...</p>
      ) : (
        <>
        <div className="Test">
          <div className="location">
              <img className="images" src="../64113.png" width="15px"></img>
              {location}
          </div>
          <div className="desc">
              {weather?.weather[0].description.charAt(0).toUpperCase() + weather?.weather[0].description.slice(1)}
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
                src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`}
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