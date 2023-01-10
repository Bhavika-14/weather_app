import React,{ useState } from "react"
import logo from './logo.svg';
import './App.css';
import axios from "axios"

function App() {
  let [lat,setlat]=useState(0)
  let [lon,setlon]=useState(0)
  let [city,setcity]=useState('')
  let [temp,settemp]=useState(0)
  let [pressure,setpressure]=useState(0)
  let [weather,setweather]=useState('')
  let [wind,setwind]=useState(0)
  let [conditions,setconditions]=useState(false)
  let [humidity,sethumidity]=useState(0)
  

  const API_KEY="959ed1009f1d31209f8693ab452c96f3"
  function get_coordinates(){
    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`).then(
      (res)=>{
        
        setlat(res.data[0].lat)
        setlon(res.data[0].lon)
        get_weather_details()
        

        
      }
    )
  }


  
  function get_weather_details(){
    console.log("calling")
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(
      (res)=>{
        console.log(res)
        settemp(res.data.main.temp)
        setpressure(res.data.main.pressure)
        setweather(res.data.weather[0].main)
        setwind(res.data.wind.speed)
        sethumidity(res.data.main.humidity)
        
      }
    ).then(()=>{
      setconditions(true)
    })
  }

  return (
    <>
    <h1 className="mt-4 mb-5 text-center">
      Check Your Weather

    </h1>

    <div className='container'>
      <div className="row">
        
    <label for="city" className="form-label">Enter name of city</label>
    <div className="col-8">
                    <input type="text" className="form-control" name="city" id="city" onChange={(e)=>{
                        setcity(e.currentTarget.value)
                    }}
                    />
                    </div>
      <div className="col-4">
      <button className="btn btn-primary" onClick={()=>{
        setconditions(false)
        get_coordinates()}}>
        Search
      </button>
      </div>
      </div>
      {conditions && 
      <div>
       
      <div className="mt-4 text-center">
        <h2 className="mt-4 mb-2">
          Current Weather
        </h2>
        <h3>
          Temperatue: {temp}&#176; C
          
        </h3>
        <h5>
          Pressure: {pressure} hPa
        </h5>
      </div>
      <div>
        <h4 className="text-center">
          {weather}
        </h4>
        <div className="row">
          <div className="col-6 text-end">Humidity: {humidity}%</div>

          <div className="col-6">Wind Speed: {wind} m/s</div>
          </div>

          
      </div>
      </div>
}
    </div>

    </>
  );
}

export default App;
