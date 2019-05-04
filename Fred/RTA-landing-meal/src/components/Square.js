import React, { Component } from "react";

class Square extends Component {
  render() {
    var squareStyle = {
      height: 30,
      backgroundColor: "#FF6663"
    };

    return <div style={squareStyle} />;
  }
}

export default Square;
