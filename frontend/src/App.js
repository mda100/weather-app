import React from 'react';
import './App.css';

// Helper Functions

function weatherApiBuilder(location){
  let type = "forecast"
  let key = "ba47e033e3c54cd5b8720248211507"
  let days = 3
  let aqi = "yes"
  return `http://api.weatherapi.com/v1/"${type}.json?key=${key}&q=${location}&days=${days}&aqi=${aqi}}&alerts=no`;
}

async function getWeather(apiUrl){
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
    else {
      const data = await response.json();
      return data
    }
  }
  catch(error){console.log(error)}
}

// Components
  
function Location (props){
  return <div className="location"> {props.data.weather.location.name}, {props.data.weather.location.region}, {props.data.weather.location.country} </div>
}

function Current (props){
  return <div className="current"> {props.data.weather.current.temp_f}&deg; F and {props.data.weather.current.condition.text} </div>
}

function Forecast (props){
  return (<div className="forecast">
    <div className="forecast_1"> 
    {props.data.weather.forecast.forecastday[0].date} <br/>
    <img src={props.data.weather.forecast.forecastday[0].day.condition.icon} alt=""/> <br/>
    {props.data.weather.forecast.forecastday[0].day.maxtemp_f}&deg; F /&nbsp;
    {props.data.weather.forecast.forecastday[0].day.mintemp_f}&deg; F <br/>
    {props.data.weather.forecast.forecastday[0].day.avghumidity}% Humidity <br/>
  </div>
  <div className="forecast_2">
    {props.data.weather.forecast.forecastday[1].date} <br/>
    <img src={props.data.weather.forecast.forecastday[1].day.condition.icon} alt=""/> <br/>
    {props.data.weather.forecast.forecastday[1].day.maxtemp_f}&deg; F /&nbsp;
    {props.data.weather.forecast.forecastday[1].day.mintemp_f}&deg; F <br/>
    {props.data.weather.forecast.forecastday[1].day.avghumidity}% Humidity 
  </div>
  <div className="forecast_3">
    {props.data.weather.forecast.forecastday[2].date} <br/>
    <img src={props.data.weather.forecast.forecastday[2].day.condition.icon} alt=""/> <br/>
    {props.data.weather.forecast.forecastday[2].day.maxtemp_f}&deg; F /&nbsp;
    {props.data.weather.forecast.forecastday[2].day.mintemp_f}&deg; F <br/>
    {props.data.weather.forecast.forecastday[2].day.avghumidity}% Humidity <br/>
    </div>
    </div>)}

// App

class App extends React.Component {

  constructor(props){

    super(props);

    this.state = {
      location: "Oakland",
      weather: "",
    };

    this.handleClick = async () => {
      const data = await getWeather(weatherApiBuilder(this.state.location, 3));
      this.setState({weather:data})
    }

  }

  render(){

    return <div className="App">
            {(typeof this.state.weather.location != "undefined") ?
            (<div>
            <Location data={this.state}/>
            </div>)
            : ("")}

            <div className="search">
            <input
              type="text"
              required
              placeholder="City, Coordinates, or US/UK Zipcode..."
              value={this.state.location}
              onChange ={(e) => this.setState({location: e.target.value})} 
              /> 
            <button 
              onClick= {() => this.handleClick()}>
                Submit
            </button>
            </div>

            {(typeof this.state.weather.location != "undefined") ?
            (<div>
            <Current data={this.state}/> 
            </div>)
            : ("")}

            {(typeof this.state.weather.location != "undefined") ?
            (<div>
            <Forecast data={this.state}/>
            </div>)
            : ("")}
            
      </div>

  }
}


export default App;


