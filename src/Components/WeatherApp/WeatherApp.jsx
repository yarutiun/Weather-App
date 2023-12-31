import React from "react";
import "./WeatherApp.css";
import search_icon from "../Assets/search.png"
import clear_icon from "../Assets/clear.png"
import cloud_icon from "../Assets/cloud.png"
import drizzle_icon from "../Assets/drizzle.png"
import humidity_icon from "../Assets/humidity.png"
import rain_icon from "../Assets/rain.png"
import snow_icon from "../Assets/snow.png"
import wind_icon from "../Assets/wind.png"
import { useState } from "react";

const WeatherApp = () => {
    const [wicon, setWicon] = useState(cloud_icon);
    let apiKey = "b164a749f0e61356a4b1dbc4535d92d7";
    const Search = async () =>
    {
        const element = document.getElementsByClassName("cityInput");
        if(element[0].value === "")
        {
            return(0);
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&id=2172797&appid=${apiKey}`;
        let response = await fetch(url);
        if(response.status === 404)
        return(0);
        let data = await response.json();
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temp = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");
        humidity[0].innerHTML = data.main.humidity+" %";
        wind[0].innerHTML = Math.round(data.wind.speed)+" km/h";
        temp[0].innerHTML = Math.round(data.main.temp)+" °C";
        location[0].innerHTML = data.name;
        if(data.weather[0].icon === "01d" || data.weather[0].icon === '01n')
        {
            setWicon(clear_icon);
        }
        else if(data.weather[0].icon === "02d" || data.weather[0].icon === '02n')
        {
            setWicon(cloud_icon);
        }
        else if(data.weather[0].icon === "03d" || data.weather[0].icon === '03n')
        {
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon === "04d" || data.weather[0].icon === '04n')
        {
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon === "09d" || data.weather[0].icon === '09n')
        {
            setWicon(rain_icon);
        }
        else if(data.weather[0].icon === "10d" || data.weather[0].icon === '10n')
        {
            setWicon(rain_icon);
        }
        else if(data.weather[0].icon === "13d" || data.weather[0].icon === '13n')
        {
            setWicon(snow_icon);
        }
        else
        {
            setWicon(clear_icon);
        }
    }
    const handleKeyDown = (event) => {
        // Check if the "Shift" key is pressed (key code 16)
        if (event.keyCode === 13) {
            // Trigger the search function when "Shift" key is pressed
            Search();
        }
    };
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const formattedMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const formattedTime = `${hours}:${formattedMinutes}`;
    return(
        <div className="container">
            <div className="time">{formattedTime}</div>
            <div className="top-bar">
                <input onKeyDown={handleKeyDown}type="text" className="cityInput" placeholder="search"/>
                <div className="search-icon"  onClick={() => {Search()}}>
                    <img src={search_icon} alt="search-icon" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="cloud-icon" />
            </div>
            <div className="weather-temp">24 °C</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">18 km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;