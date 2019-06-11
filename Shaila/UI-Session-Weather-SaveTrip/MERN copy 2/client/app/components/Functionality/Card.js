import React from 'react';
// import './Card.css';
var moment = require('moment');

class Card extends React.Component {
  // Props: day, key(index)

  render() {
    let newDate = new Date();
    const weekday = this.props.day.dt * 1000
    // console.log(this.props.day)
    // console.log(this.props.day.dt)
    newDate.setTime(weekday)

    const imgURL = "owf owf-"+ this.props.day.weather[0].id +" owf-lg"

    // const farenheit = (parseInt(this.props.day.main.temp) - 273.15) * (9/5) + 32


    return (
    
      <div className="col-auto">
       
          <p style={{color:"white"}} className="card-title">{moment(newDate).format('dddd').substring(0,3)}</p>
          {/* <p className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</p> */}
          <i class="card-img-top" style={{color:"#F4AA33"}} className={imgURL}></i>
          <p style={{color:"white"}}>{Math.round(this.props.day.main.temp)} °F</p>
       
   
      </div>

    )
  }
}

export default Card
