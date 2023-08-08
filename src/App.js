import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
{/* ref to key and base for openweathermap api*/}

const api = {
  key: "879931a95a7ec92365bde4d22e7d3ca7",
  base: "https://api.openweathermap.org/data/2.5/"
}

{/* create function */}

function App() {
  {/* weather stores info fetched from api, query stores data entered into search bar*/}

  
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

{/* search func updates query and weather*/}

  const search = evt => {
    
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
        console.log(weather);
      }
        );
    }
  }

  {/* function creates the date*/}

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  {/* func below creates time */}

  const realtime = () => {
    console.log(weather);
    var pretime = new Date( (weather.dt)*1000);
    var hours1 = pretime.toTimeString();


    return hours1
  }

  {/* func below decides on the background */}

  const weatherfunc = () => {
    const timeactual = new Date((weather.main.sunrise + weather.timezone) * 1000);
    if (weather.weather[0].id===800){
      if(timeactual.getHours()>19){
        return "clearnight"
      }
      else if (weather.main.temp<16){
        return "clearcold";
      }
      else{
        return "clearwarm";
      }
    }
    else if (weather.weather[0].id>800){
      if(timeactual.getHours()>19){
        return "cloudynight";
      }else{
        return "cloudyday";
      }
      
    }else if (weather.weather[0].id<532){
      return "rain";
    }else if (weather.weather[0].id<623){
      return "snow";
    }else{
      if(timeactual.getHours()>20){
        return "clearnight"
      }
      else if (weather.main.temp<16){
        return "clearcold";
      }
      else{
        return "clearwarm";
      }
    }
  }

  {/* below formtas html page, search box for search bar, location, date, time*/}

  

  return (
    <div className = {(typeof weather.main != "undefined") ? (weatherfunc()) : 'clearcold'}>

      <main>

      <div className = "search-box">

        <input 
        type = "text" 
        className="search-bar" 
        placeholder = "search..."
        onChange={e => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}
        />

      </div>

      {(typeof weather.main != "undefined") ? (

        <div>

          <div className="location-box">

            <div className="location">{weather.name}, {weather.sys.country}</div>

            <div className="date">{dateBuilder(new Date())}</div>

            <div className="time1">{realtime()}</div>

          </div>

          <div className="weather-box">

            <div className="temp">

              {Math.round(weather.main.temp)}°c

            </div>

            <div className="weather">{weather.weather[0].main}</div>

          </div>

        </div>

        ) : ('')}



      </main>
    </div>
  );
}

export default App;
