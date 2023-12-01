import { Timeline } from "antd";
import React, { useEffect, useState } from "react";
import request from '../utils/request';
import "./FiveDaysForecast.css";

const getFiveDayWeather = (wether) => {
  if (!wether.list) {
    return [];
  }
  const list = wether.list;
  const fiveDaysWeather = [];

  for (let i = 0; i < 40; i += 8) {
    const date = list[i]?.dt_txt.split(" ")[0];
    const style = { marginBottom: 0 };
    fiveDaysWeather.push({
      children: (
        <div className="weaklyForecast">
          <p style={style}>date : {date}</p>
          <p style={style}>max temp : {list[i]?.main?.temp_max}</p>
          <p style={style}>min temp : {list[i]?.main?.temp_min}</p>
          <p style={style}>average temp : {list[i]?.main?.temp}</p>
        </div>
      ),
    });
  }
  return fiveDaysWeather;
};

const FiveDaysForecast = (props) => {
  const [fiveDays, setFiveDays] = useState([]);
  useEffect(() => {
    async function fetchData() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const fiveDaysKey = "263c364c0c876d4542c6dc220af45a4a";
            const fiveDaysUrl = `https://api.openweathermap.org/data/2.5/forecast`;
            const requestMethod = "get";
            const requestParams = {
              appid: fiveDaysKey,
              lat: latitude,
              lon: longitude,
              units: "imperial",
            };
            const response = await request({
              url: fiveDaysUrl,
              method: requestMethod,
              params: requestParams,
            });
            console.info(response);
            setFiveDays(getFiveDayWeather(response.data));
          },
          (error) => {
            console.error("Geolocation error", error);
          }
        );
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <p>five days forecast</p>
      <Timeline items={fiveDays} />
    </>
  );
};
    
export default FiveDaysForecast;