import React, { Component } from "react";
import Time from "./Time.js";
import Event from "./Event.js";

class TimeEvent extends Component {
  render() {
    var timeEvent = {
      width: "335px",
      backgroundColor: "blue",
      padding: "1px"
    };

    return (
      <div style={timeEvent}>
        <Time time={this.props.time} color="green" />
        <Event event={this.props.event} color="red" />
      </div>
    );
  }
}

export default TimeEvent;
