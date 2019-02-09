import React, { Component } from "react";
import TimeEvent from "./TimeEvent.js";

class Itinerary extends Component {
  constructor(props) {
    super(props);

    this.onMouseClick = this.onMouseClick.bind(this);
  }

  onMouseClick() {
    this.props.onMouseClick(this.props.number);
  }

  render() {
    var timeEvents = this.props.timeEvents;

    var itinerary = [];

    for (var i = 0; i < timeEvents.length; i++) {
      itinerary.push(
        <TimeEvent
          key={i}
          time={timeEvents[i].time}
          event={timeEvents[i].event}
        />
      );
    }

    return <div onClick={this.onMouseClick}>{itinerary}</div>;
  }
}

export default Itinerary;
