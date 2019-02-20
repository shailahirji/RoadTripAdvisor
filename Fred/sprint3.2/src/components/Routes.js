import React, { Component } from "react";
import Route from "./Route.js";

// Displays all routes passed to it in routes prop.
// Allows you to select one route and passes the selected route number back up to the parent component

class Routes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var routes = this.props.routes;

    var routesJSX = [];

    for (var i = 0; i < routes.length; i++) {
      routesJSX.push(
        <div key={i}>
          <Route
            key={i}
            routeNumber={i}
            onMouseClick={this.props.onMouseClick}
            locations={routes[i].route}
          />
          <br />
        </div>
      );
    }

    return <div>{routesJSX}</div>;
  }
}

export default Routes;
