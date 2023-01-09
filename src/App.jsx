import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'
import arrays from './assets/Javascript/arrays'

function App() {

  const [wheather, setWheater] = useState({})
  const [isCentigrades, setIsCentigrades] = useState(true)
  const icon = wheather.weather?.[0].icon
    if (icon?.includes("d")){
      if(((icon?.includes("1"))|| (icon.includes("2")))){
      document.body.style= `background: url(${sunny})no-repeat; background-size:cover;`
       }else{ document.body.style= `background: url(${rain})no-repeat; background-size:cover;`}
 
     
    }else{
      document.body.style =`background: url(src/assets/images/night.gif)no-repeat; background-size:cover;`
    }
  const [status, setStatus] = useState(true)
  
  useEffect (() => {
    const timer = setTimeout(() => setStatus(false), 3000);
     
         
       
    
    function success(pos) {
      const crd = pos.coords;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=8ef379082f402ff2779d7198ac915ea7 `)
     .then (res => (setWheater(res.data)) )
      
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error,)
  },[])

  const centrigrades = ((wheather.main?.temp) - 273.15).toFixed(2)
  
  const fahrenheit = (centrigrades * 1.8 +32).toFixed(2)
 const changeUnits = () =>{
  setIsCentigrades(!isCentigrades)
 }
 
 

 

  return (
    <div className="App">
      
      <img className={status?'load':'hide'}  src="/src/assets/Images/sun.png" alt="" />
      <>
              
       <h1>Weather App</h1>
      <h2>{wheather.name}, {wheather.sys?.country} </h2>
      
      <div className='description'>
        <div>
          <img src={`http://openweathermap.org/img/wn/${wheather.weather?.[0].icon}@2x.png`} alt="" />
        </div>
        <div>
         <h3 className='time'>"{wheather.weather?.[0].description}"</h3>
          <h3><i className="fa-solid fa-wind"></i>Wind Speed: <span className='text'> {wheather.wind?.speed}  m/s </span>  </h3>
          
          <h3> <i className="fa-solid fa-cloud"></i> Clouds: <span className='text'> {wheather.clouds?.all}% </span></h3>
          <h3><i className="fa-solid fa-temperature-half"></i>Pressure: <span className='text'>{wheather.main?.pressure} mb </span></h3>
          
        </div>
        
      </div>
      <h2 className='temp'>{isCentigrades ? centrigrades  : fahrenheit} {isCentigrades ? '°C' : '°F'}</h2>
        <button onClick={changeUnits} >Degress °F/°C</button>

      </>
     
    </div>
  )
}

export default App
