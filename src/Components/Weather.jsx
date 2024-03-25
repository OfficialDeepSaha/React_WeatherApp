import React, { useState } from "react";
import { FaSearch, FaWind } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");

  const [weather, setWeather] = useState("");

  const [error, setError] = useState("");

  const API_KEY = "46219568431107d6e5b3d8d5800029ff";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  function handleOnChange(e) {
    setCity(e.target.value);
  }

  const fetchData = async () => {
    let response = await fetch(url);
    let result = await response.json();

    if (response.ok) {
      setWeather(result);
      console.log(result);
      setError("");
    } else {
      setError("No Data Found!");
    }
  };

  return (
    <div className="container">
      <div className="city">
        <input
          type="text"
          value={city}
          onChange={handleOnChange}
          placeholder="Enter any city name"
        ></input>
        <button onClick={() => fetchData()}>
          <FaSearch></FaSearch>
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}

      {weather && (
        <div className="content">
          <div className="weather-image">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            ></img>
            <h3 className="desc">{weather.weather[0].description}</h3>
          </div>

          <div className="weather-temp">
            <h2>
              {weather.main.temp}
              <span>&deg;C</span>
            </h2>
          </div>

          <div className="weather-city">
            <div className="location">
              <MdLocationOn></MdLocationOn>
            </div>
            <p>
              {weather.name},<span>{weather.sys.country}</span>
            </p>
          </div>

          <div className="weather-stats">
            <div className="wind">
              <div className="wind-icon">
                <FaWind></FaWind>
              </div>
              <h3 className="wind-speed">
                {weather.wind.speed}
                <span>Km/h</span>
              </h3>
              <h3 className="wind-heading">Wind Speed</h3>
            </div>
            <div className="humidity">
              <div className="humidity-icon">
                <WiHumidity></WiHumidity>
              </div>
              <h3 className="humidity-percent">
                {weather.main.humidity}
                <span>%</span>
              </h3>
              <h3 className="humidity-heading">Humidity</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
