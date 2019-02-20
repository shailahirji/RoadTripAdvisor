import React, { Component } from "react";

//Displays a single location in a route

class Location extends Component {
  render() {
    var locationsStyle = {
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
        <p style={locationsStyle}>{this.props.location}</p>
      </div>
    );
  }
}

export default Location;
