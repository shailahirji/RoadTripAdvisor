import React, { Component } from "react";
import "./App.css";
class Event extends Component {
  
  render() {
    var eventStyle = {
      padding: "10px",
      margin: "5px",
      width: "300px",
      wordWrap: "break-word",
      fontSize: 15,
      backgroundColor: this.props.color,
      textAlign: "left",
      display: "inline-block"
    };


  let status=this.props.showButton;

    return (
      <div>
    
      {status? ( 
        <div><p style={eventStyle}>{this.props.event} {<button class="btn btn-warning pl-1 pr-1" onClick={()=>this.props.handleClick(this.props.event)}><i class="fa fa-trash"></i></button>}</p>     
        </div>
        ):(<p style={eventStyle}>{this.props.event}</p>
       )}
    
      </div>
    );
  }
}

export default Event;
