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
      textAlign: "left",
      display: "inline-block"
    };

    return (
      <div>
        <p style={time}>{this.props.event}</p>
        {/* <p style={time}>{this.props.lat}</p> */}
        {/* <p style={time}>{this.props.long}</p> */}
      </div>
    );
  }
}

export default Event;
