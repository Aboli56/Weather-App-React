import React, { useState } from "react";
import "./App.css";
import { fetchWeather } from "./FetchWeather";
const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const search = async (e) => {
    if (e.key === "Enter") {
      if (city.length > 0) {
        try {
          const data = await fetchWeather(city);
          setWeather(data);
          setCity("");
        } catch (err) {
          alert("City not found...");
          setCity("");
        }
      } else {
        alert("Enter City name...");
      }
    }
  };
  return (
    <div className="main-container">
     <h1>Weather Report</h1>
      <input
        type="text"
        className="search"
        placeholder="Enter city name...."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={search}
      />
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
