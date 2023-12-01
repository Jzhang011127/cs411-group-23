import React, { useEffect, useState } from "react";
import request from '../utils/request';

const FiveDaysForecast = (props) => {
  const [fiveDays, setFiveDays] = useState({});
  useEffect( async () => {
    async function fetchData(){
    if(props.location.latitude && props.location.longitude){
      const fiveDaysKey = "263c364c0c876d4542c6dc220af45a4a";
      const fiveDaysUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${props.geolocation.location.latitude}&lon=${props.geolocation.location.longitude}&appid=${fiveDaysKey}`;
      const requestMethod = 'get';
      const requestParams = {
        appid : fiveDaysKeys,
      }
      const response = await request(fiveDaysUrl, requestMethod, requestParams);
      setFiveDays(response.data);
    }
  }
  fetchData();
  }, []);
      
      return (
        <div className="">
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
    
export default FiveDaysForecast;