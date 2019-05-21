import React, { Component } from "react";
import Event from "./Event.js";

class Itinerary extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var events = this.props.events;
    var itinerary = [];
    var from = this.props.from;
    var to = this.props.to;

    var itineraryStyle = {
      overflow: "scroll",
      backgroundColor: "rgba(225, 225, 225, 0.43)",
      WebkitFilter: "drop-shadow(0px 0px 5px #666)",
      filter: "drop-shadow(0px 0px 5px #666)",
      width: 420,
      height: 480,
      marginLeft: 760,
      marginTop: -670,
      position: "relative"
    };

    //add locations to the events array before printing it out
    itinerary.push(
      <div>
        <Event
          key={0}
          event={"Start Destination: " + from}
          color="#ffc107"
          showButton={false}
        />
        <br />
      </div>
    );
    for (var i = 0; i < events.length; i++) {
      itinerary.push(
        <div>
          <Event
            key={i + 1}
            event={events[i].event}
            lat={events[i].lat}
            long={events[i].long}
            color="#ffc107"
            showButton={true}
            handleClick={this.props.handleClick}
          />
          <br />
        </div>
      );
    }

    itinerary.push(
      <div>
        <Event
          key={events.length + 1}
          event={"End Destination: " + to}
          color="#ffc107"
          showButton={false}
        />
        <br />
      </div>
    );

    return <div style={itineraryStyle}>{itinerary}</div>;
  }
}

export default Itinerary;
