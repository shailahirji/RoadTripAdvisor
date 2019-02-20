import React, { Component } from "react";
import Map from "./Map.js";
import Routes from "./Routes.js";

//Shows all routes passed to it in routes props, and allows you to select one to put on map

class RouteSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRoute: 2
    };

    this.onMouseClick = this.onMouseClick.bind(this);
  }

  onMouseClick(selectedRoute) {
    this.setState({
      selectedRoute: selectedRoute
    });
  }

  render() {
    var route = this.props.routes[this.state.selectedRoute].route;

    return (
      <>
        <Routes routes={this.props.routes} onMouseClick={this.onMouseClick} />
        <p>{this.state.selectedRoute}</p>
        <Map position={this.props.position} route={route} />
      </>
    );
  }
}

export default RouteSelector;
