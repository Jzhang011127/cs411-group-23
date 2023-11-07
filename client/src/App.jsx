import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <>
    <body>
    <main>  
    <div>
        <Header />
      </div>
      <script src="index.js"></script>
    </main>
    </body>
    </>
  )
}
function Header() {
  return (
    <><div className="header">
      <div className="logo">
        <img src="your-logo.png" alt="Logo" width="50" height="50" />
      </div>
      <div className="login">
        <a href="#">Login</a>
      </div>
    </div>
    <div class="holder">
    <div class="col1">
    <div class="forecast-container">
    <div class="forecast">
      <p>forecast</p>
    </div>
    </div>
    <div class="recs-and-weekly">
      <div class="rec-container">
      <div class="recs">
        <p>recs</p>
      </div>
      </div>
      <div class="weekly-container">
      <div class="weekly-forecast">
        <p>week</p>
      </div>
      </div>
    </div>
    </div>
    <div class="alert-container">
    <div class="alerts">
      <p>alerts</p>
    </div>
    </div>
    </div>
    </>
  );
}

export default App
