import React, { Component } from "react";
import { compose, withProps, withHandlers, withState } from "recompose";
import {
  withScriptjs,
  Marker,
  withGoogleMap,
  GoogleMap
} from "react-google-maps";

//Google maps component. Shows a single route on the map.

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyD8kEdQYnlfJaGYD70GNqtxzf7oet_3wwY&libraries=places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  return (
    <GoogleMap defaultZoom={8} defaultCenter={props.position}>
      {props.markers}
    </GoogleMap>
  );
});

class Map extends React.PureComponent {
  render() {
    var markers = [];

    var position = this.props.position;
    var route = this.props.route;

    for (var i = 0; i < route.length; i++) {
      markers.push(<Marker position={route[i].pos} key={i} />);
    }

    return <MyMapComponent position={position} markers={markers} />;
  }
}
export default Map;
