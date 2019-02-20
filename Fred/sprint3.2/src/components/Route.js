import React, { Component } from "react";
import Location from "./Location.js";

//Displays a single route
//If clicked, passes route number up to parent component

class Route extends Component {
  constructor(props) {
    super(props);

    this.onMouseClick = this.onMouseClick.bind(this);
  }

  onMouseClick() {
    this.props.onMouseClick(this.props.routeNumber);
  }

  render() {
    var locations = this.props.locations;

    var routeStyle = {
      width: "335px",
      backgroundColor: "#48BDAC",
      padding: "1px"
    };

    var route = [];

    for (var i = 0; i < locations.length; i++) {
      route.push(
        <div key={i}>
          <Location key={i} location={locations[i].location} color="#FC4A1A" />
          <br />
        </div>
      );
    }

    return (
      <div onClick={this.onMouseClick} style={routeStyle}>
        {route}
      </div>
    );
  }
}

export default Route;
