import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WeatherWidget from './components/WeatherWidget'

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
  return (
    <><div className="header">
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
      <WeatherWidget />
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
        <p>week</p>
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
