import './App.css';
import { useState } from 'react';

function App() {
  const [city, setCity] = useState("Oakland")
  const [state, setState] = useState("CA") //only for US cities
  const [country, setCountry] = useState("USA")
  const apiKey = "eea9891349d17d031cbf7b10b3d7e189"
  const [temperature, setTemperature] = useState("")

  const handleClick = (city) => {
    
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=${apiKey}`)
      .then(res => res.json())
      .then(data => setTemperature((((data.main.temp -273.15)*1.8)+32).toFixed(1)))
      .catch((err) => console.log(err))

  }

  return (
    <div className = "App">
        <input
          type="text"
          required
          value={city}
          onChange ={(e) => setCity(e.target.value)} 
          /> 
        <input
          type="text"
          required
          value={state}
          onChange ={(e) => setState(e.target.value)} 
          />
        <input
          type="text"
          required
          value={country}
          onChange ={(e) => setCountry(e.target.value)} 
          />
        <button 
          onClick= {() => handleClick(city)}>
            Submit
        </button>
      <h3> {temperature} Degrees Fahrenheit in {city}</h3>
    </div>
  )
}

export default App;

