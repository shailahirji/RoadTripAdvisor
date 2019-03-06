import React, { Component } from "react";
import Event from "./Event.js";

class Itinerary extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var events = this.props.events;
    var itinerary = [];

    var itineraryStyle = {
      width: "335px",
      backgroundColor: "#48BDAC",
      padding: "1px"
    };

    for (var i = 0; i < events.length; i++) {
      itinerary.push(
        <div>
          <Event
            key={i}
            event={events[i].event}
            lat={events[i].pos.lat}
            long={events[i].pos.long}
            color="#FC4A1A"
          />
          <br />
        </div>
      );
    }

    return <div style={itineraryStyle}>{itinerary}</div>;
  }
}

export default Itinerary;
