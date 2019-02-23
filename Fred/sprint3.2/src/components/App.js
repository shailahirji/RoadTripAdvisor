import React, { Component } from "react";
import RouteSelector from "./RouteSelector.js";

//Components created to pass information to lower components. Only created to test lower components.

class App extends Component {
  render() {
    var position = { lat: 47.6062, lng: -122.3321 };
    var routes = [
      {
        route: [
          {
            location: "Seattle",
            pos: { lat: 47.6062, lng: -122.3321 },
            type: 0
          },
          {
            location: "Bainbridge Island",
            pos: { lat: 47.6249, lng: -122.521 },
            type: 0
          },
          {
            location: "Poulsbo",
            pos: { lat: 47.7359, lng: -122.6465 },
            type: 0
          }
        ]
      },
      {
        route: [
          {
            location: "Seattle",
            pos: { lat: 47.6062, lng: -122.3321 },
            type: 0
          },
          {
            location: "Tacoma",
            pos: { lat: 47.2529, lng: -122.4443 },
            type: 0
          },
          {
            location: "Olympia",
            pos: { lat: 47.0379, lng: -122.9007 },
            type: 0
          }
        ]
      },
      {
        route: [
          {
            location: "Seattle",
            pos: { lat: 47.6062, lng: -122.3321 },
            type: 0
          },
          {
            location: "Edmonds",
            pos: { lat: 47.8107, lng: -122.3774 },
            type: 0
          },
          { location: "Everett", pos: { lat: 47.979, lng: -122.2021 }, type: 0 }
        ]
      }
    ];

    // var newRoute = { route: [] };
    // for (var i = 0; i < 100; i++) {
    //   newRoute.route.push({
    //     location: i,
    //     pos: { lat: 47.8107 + i * 0.001, lng: -122.3774 + i * 0.001 },
    //     type: 0
    //   });
    //   console.log(i);
    // }

    // routes.push(newRoute);

    return <RouteSelector position={position} routes={routes} />;
  }
}

export default App;
