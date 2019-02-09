import React, { Component } from "react";

class Time extends Component {
  render() {
    var time = {
      padding: "10px",
      margin: "5px",
      width: "75px",
      fontSize: 15,
      fontFamily: "monospace",
      backgroundColor: this.props.color,
      textAlign: "center",
      display: "inline-block"
    };

    return <p style={time}>{this.props.time}</p>;
  }
}

export default Time;
