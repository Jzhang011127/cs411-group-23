import { useEffect, useState } from 'react';
import './App.css';
import FiveDaysForecast from './components/FiveDaysForecast';
import WeatherWidget from './components/WeatherWidget';
import request from './utils/request';

function App() {
  return (
    <>
    <body>
    <main>
    <div>
        <Base />
      </div>
      <script src="index.js"></script>
    </main>
    </body>
    </>
  )
}

function Base() {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Fetch the city and state using Mapbox's Geocoding API
          const mapboxAccessToken = "pk.eyJ1IjoiZ3Nld2VsbDcxMSIsImEiOiJjbG9ydHFxMHYwcnBrMmpsbmJ4czI5bXhxIn0.BBOD7cs2UXRLgyyerJKNFw"; // Replace with your Mapbox access token
          const requetParams = {
            access_token : mapboxAccessToken,
          };
          const mapboxGeocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`;
          const requestMethod = 'get';
          const response = await request(mapboxGeocodingUrl, requestMethod, requestParams);
          if (response.data.features.length > 0) {
            const placeName = response.data.features[0].place_name;
            const city = placeName.split(", ")[1];
            const state = placeName.split(", ")[2];
            if (city.includes("ave") || city.includes("Ave") || city.includes("st") || city.includes("St") || city.includes("rd") || city.includes("Rd") || city.includes("Ctr")) {
              const city = placeName.split(", ")[2];
              const state = placeName.split(", ")[3];
            };
            setLocation(`${city}, ${state}`);
            setLoading(false);
          } else {
            console.error("City not found in the Mapbox response.");
          }
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
    <>
      <div className="header">
        <div className="logo">
          {/* <img src="your-logo.png" alt="Logo" width="50" height="50" /> */}
        </div>
        <div className="login">
          <a href="#">Login</a>
        </div>
      </div>
      <div className="holder">
        <div className="col1">
          <div className="forecast-container">
            <div className="forecast">
              <WeatherWidget geolocation={location} loading={loading} />
            </div>
          </div>
          <div className="recs-and-weekly">
            <div className="rec-container">
              <div className="recs">
                <p>recs</p>
              </div>
            </div>
            <div className="weekly-container">
              <div className="weekly-forecast">
                <FiveDaysForecast geolocation={location} loading={loading} />
              </div>
            </div>
          </div>
        </div>
      <div className="alert-container">
        <div className="alerts">
          <p>alerts</p>
        </div>
      </div>
      </div>
    </>
  );
}

export default App
