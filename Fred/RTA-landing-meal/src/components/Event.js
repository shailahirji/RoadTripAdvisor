import React, { Component } from "react";
import "./App.css";
class Event extends Component {
  
  render() {
    var time = {
      padding: "10px",
      margin: "5px",
      width: "200px",
      wordWrap: "break-word",
      fontSize: 15,
      // fontFamily: "monospace",
      backgroundColor: this.props.color,
      textAlign: "left",
      display: "inline-block"
    };
    var buttonStyle={position:"fixed",
    top:600,
    left:200
  }
  
    return (
      <div>
        {/* <p style={time}>{this.props.event}{this.props.butt}</p> */}
        <p style={time}>{this.props.event}</p>
        <button class="btn btn-warning pl-5 pr-5" disabled={false} onClick={()=>this.props.handleClick(this.props.event)}>x</button>
      </div>
    );
  }
}

export default Event;
