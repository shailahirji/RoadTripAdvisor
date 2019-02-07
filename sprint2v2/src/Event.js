import React, { Component } from "react";

class Event extends Component {
  render() {
    var time = {
      padding: "10px",
      margin: "5px",
      width: "200px",
      wordWrap: "break-word",
      fontSize: 15,
      fontFamily: "monospace",
      backgroundColor: this.props.color,
      textAlign: "right",
      display: "inline-block"
    };

    return <p style={time}>{this.props.event}</p>;
  }
}

export default Event;
