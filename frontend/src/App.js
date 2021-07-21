import React, { useState } from 'react';
import './App.css';

// Helper Functions

function weatherApiBuilder(location){
  let type = "forecast"
  let key = "ba47e033e3c54cd5b8720248211507"
  let days = 3
  let aqi = "yes"
  return `http://api.weatherapi.com/v1/"${type}.json?key=${key}&q=${location}&days=${days}&aqi=${aqi}}&alerts=no`;
}

// Components
  
function Location (props){
  return <div className="location"> {props.data.weather.location.name}, {props.data.weather.location.region}, {props.data.weather.location.country} </div>
}

function Current (props){
  return <div className="current"> {props.data.weather.current.temp_f}&deg; F and {props.data.weather.current.condition.text} </div>
}

function Forecast (props){
  const {forecastday} = props.data.weather.forecast;
  return (<div className="forecast">
    <div className="forecast_1"> 
    {forecastday[0].date} <br/>
    <img src={forecastday[0].day.condition.icon} alt=""/> <br/>
    {forecastday[0].day.maxtemp_f}&deg; F /&nbsp;
    {forecastday[0].day.mintemp_f}&deg; F <br/>
    {forecastday[0].day.avghumidity}% Humidity <br/>
  </div>
  <div className="forecast_2">
    {forecastday[1].date} <br/>
    <img src={forecastday[1].day.condition.icon} alt=""/> <br/>
    {forecastday[1].day.maxtemp_f}&deg; F /&nbsp;
    {forecastday[1].day.mintemp_f}&deg; F <br/>
    {forecastday[1].day.avghumidity}% Humidity 
  </div>
  <div className="forecast_3">
    {forecastday[2].date} <br/>
    <img src={forecastday[2].day.condition.icon} alt=""/> <br/>
    {forecastday[2].day.maxtemp_f}&deg; F /&nbsp;
    {forecastday[2].day.mintemp_f}&deg; F <br/>
    {forecastday[2].day.avghumidity}% Humidity <br/>
    </div>
    </div>)}

function Search(props){
  return (
  <div className="search">
  <input
    type="text"
    required
    placeholder="City, Coordinates, or US/UK Zipcode..."
    value={props.value}
    onChange ={props.onChangeValue} 
    /> 
  <button 
    onClick= {props.onClick}>
      Submit
  </button>
  </div>);

}
// App

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      location: "",
      token: false,
      weather: "",
    };
  }

  handleClick = async () => { 
    try {
        const resp = await fetch(weatherApiBuilder(this.state.location, 3)) //if this fails -> catch
        if (!resp.ok) {throw new Error(`An error has occurred: ${resp.status}`)} //if this fails -> error
        const data = await resp.json() //if this fails -> catch
        this.setState({token: true, weather: data})
    }
    catch(error){
        console.log(error)
    }
  }

  handleChangeValue = (e) => this.setState({location: e.target.value})

  renderResults(){
    if (!this.state.token){
      return (
        <div className="Home">
         <Search value={this.state.location} onChangeValue={this.handleChangeValue} onClick={this.handleClick}/> 
        </div>
      ) 
    }
    else {
      return (
        <div className="Results">
          <Location data={this.state}/>
          <Search value={this.state.location} onChangeValue={this.handleChangeValue} onClick={this.handleClick}/>
          <Current data={this.state}/> 
          <Forecast data={this.state}/>
        </div>
      )
    }
  }

  render(){
    return this.renderResults();
  }
}

export default App;


