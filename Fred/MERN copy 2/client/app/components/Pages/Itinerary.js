import React, { Component } from "react";
import Waypoint from "./Waypoint.js";

class Itinerary extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var waypoints = this.props.waypoints;
    var itinerary = [];
    var from = this.props.from;
    var to = this.props.to;

    var itineraryStyle = {
      overflow: "scroll",
      backgroundColor: "rgba(225, 225, 225, 0.43)",
      WebkitFilter: "drop-shadow(0px 0px 5px #666)",
      filter: "drop-shadow(0px 0px 5px #666)",
      width: 420,
      height: 480,
      marginLeft: 760,
      marginTop: -670,
      position: "relative"
    };

    //add locations to the waypoints array before printing it out
    itinerary.push(
      <div>
        <Waypoint
          key={0}
          waypoint={"Start Destination: " + from}
          color="#ffc107"
          showButton={false}
        />
        <br />
      </div>
    );
    for (var i = 0; i < waypoints.length; i++) {
      itinerary.push(
        <div>
          <Waypoint
            key={i + 1}
            waypoint={waypoints[i].waypoint}
            lat={waypoints[i].lat}
            long={waypoints[i].long}
            color="#ffc107"
            showButton={true}
            handleClick={this.props.handleClick}
          />
          <br />
        </div>
      );
    }

    itinerary.push(
      <div>
        <Waypoint
          key={waypoints.length + 1}
          waypoint={"End Destination: " + to}
          color="#ffc107"
          showButton={false}
        />
        <br />
      </div>
    );

    return <div style={itineraryStyle}>{itinerary}</div>;
  }
}

export default Itinerary;
