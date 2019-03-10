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
      // width: "335px",
      // backgroundColor: "#48BDAC",
      // padding: "1px"
      height: 400,
      width: 390,
      padding: 0,
      backgroundColor: "rgba(225, 225, 225, 0.43)",
      WebkitFilter: "drop-shadow(0px 0px 5px #666)",
      filter: "drop-shadow(0px 0px 5px #666)",
      margin: 30,
      marginLeft: 100,
      overflow: "scroll"
    };

    for (var i = 0; i < events.length; i++) {
      itinerary.push(
        <div>
          <Event
            key={i}
            event={events[i].event}
            lat={events[i].pos.lat}
            long={events[i].pos.long}
            color="#ffc107"
          />
          <br />
        </div>
      );
    }

    return <div style={itineraryStyle}>{itinerary}</div>;
  }
}

export default Itinerary;
