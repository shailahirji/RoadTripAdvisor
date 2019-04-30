import React, { Component } from "react";
import Event from "./Event.js";
import "./App.css";

class Itinerary extends Component {
  constructor(props) {
    super(props);
    
  }


  render() {
    var events = this.props.events;
    var itinerary = [];
    var locations=this.props.locations;

    var itineraryStyle = { 
     overflow: "scroll",
      backgroundColor: "rgba(225, 225, 225, 0.43)",
      position: "absolute",
       height:479,
      padding:10,
      width: "35%",
      top:"7%",
      right:"-10%",
    };

    
    //add locations to the events array before printing it out 
    itinerary.push(  <div>
      <Event 
        key={0}
        event={"Start Destination: "+locations.from}
        color="#ffc107"
        showButton={false}
        />
      <br />
    </div>);
    for (var i = 0; i < events.length; i++) {
      itinerary.push(
        <div>
          <Event 
            key={i+1}
            event={events[i].event}
            lat={events[i].pos.lat}
            long={events[i].pos.long}
            color="#ffc107"
            showButton={true}
            handleClick={this.props.handleClick}
          />
          <br />
        </div>
      );
    }

    itinerary.push(<div>
      <Event 
        key={events.length+1}
        event={"End Destination: "+locations.to}
        color="#ffc107"
        showButton={false}
      />
      <br />
    </div>)

    return (
    <div style={itineraryStyle}>{itinerary}</div>
      );
  }
}

export default Itinerary;
