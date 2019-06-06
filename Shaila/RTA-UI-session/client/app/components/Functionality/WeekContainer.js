import React from 'react';
import Card from './Card';

const zipcodeURL="https://www.zipcodeapi.com/rest/GXwKhmGHgql8nKnDra8fnrP3XyPapwk2j0NF3FaTUcyOLITvBQ4uBshyw1xyZBWM/city-zips.json/";
class WeekContainer extends React.Component {

  constructor(props){
    super(props);
    this. state = {
      days: [],
  
    }
 
    this.getWeather = this.getWeather.bind(this);

  
  }

 componentDidMount(){
   this.getWeather();
 }

  async getWeather () {
  if(this.props.origin){
    await this.getWeatherAtStartDest(this.props.origin);

  }    
  }

  formatCards() {
    return this.state.days.map((day, index) => <Card day={day} key={index}/>)
  }

  getWeatherAtStartDest(origin){

    var today= new Date();
    var time= today.getHours();
    
    if(time%3!=0){
      //compute 
      var remainder=time%3
      var diff=3-remainder
      time=time+diff
      console.log("time was changed ")
      console.log(time)
    }else{
      console.log("time is ok!")
    }

    return new Promise((resolve,reject)=>{
      console.log("here")
      var str=origin
  if(str!=undefined){
      var res=str.split(",")
    
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
  targetUrl = zipcodeURL+res[0]+"/"+res[1].trim()
 
  fetch(proxyUrl + targetUrl)
    .then(blob => blob.json())
    .then(data => {
      console.log(data.zip_codes[0]);
      console.log(data)
     //assign first zipcode to state
      var zipCode=data.zip_codes[0];
      resolve(zipCode)  

      fetch("http://api.openweathermap.org/data/2.5/forecast?zip="+zipCode+",us&units=imperial&APPID=978e00ffc81132b17ad43b1fa8d05446")
      .then(res => res.json())
      .then(data => {
        console.log("Data List Loaded", data.list)
        const dailyData = data.list.filter(reading => reading.dt_txt.includes(time+":00:00"))
        this.setState({days: dailyData})
      
      })
    })

  }else{
    reject("error")
  }})}



  render() {
    return (
      <div className="container">
      {/* <h1 className="display-1 jumbotron">5-Day Forecast.</h1>
      <h5 className="display-5 text-muted">New York, US</h5> */}
        <div className="row justify-content-center">
      
          {this.formatCards()}
     
        </div>
      </div>
    )
  }
}

export default WeekContainer
