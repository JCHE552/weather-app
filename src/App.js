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

  {/* func below calc if AM or PM */}

  const noontime = () => {
    
    var hours2a = Math.floor( ( (weather.dt+weather.timezone) % 86400 ) / 3600 );

    if (hours2a>19){
      var noon1 = "PM"
    }else{
      var noon1 = "AM"
    }


    return noon1
  }

  {/* func below calc minutes part */}

  const realtime1 = () => {
    
    var mins2 = Math.floor( ( (weather.dt+weather.timezone) % 3600 ) / 60 );


    return mins2
  }

  {/* func below properly formats minutes */}

  const realtime1a = () => {
    
    var mins2a = realtime1();

    if (mins2a<10){
      var mins2b = "0" + mins2a;
    }else{
      var mins2b = mins2a + "";
    }

    return mins2b
    
  }

  {/* func below calc hours */}

  const realtime2 = () => {
    console.log(weather);
    var hours2 = Math.floor( ( (weather.dt+weather.timezone) % 86400 ) / 3600 );


    return hours2%12
  }

  {/* func below decides on the background */}

  const weatherfunc = () => {
    const timeactual = new Date((weather.main.sunrise + weather.timezone) * 1000);
    if (weather.weather[0].id===800){
      if(realtime2()>19){
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
      if(realtime2()>8){
        return "cloudynight";
      }else{
        return "cloudyday";
      }
      
    }else if (weather.weather[0].id<532){
      return "rain";
    }else if (weather.weather[0].id<623){
      return "snow";
    }else{
      if(realtime2()>8){
        return "clearnight"
      }
      else if (weather.main.temp<19){
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

            <div className="time1">{realtime2()}:{realtime1a()} {noontime()}</div>

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
