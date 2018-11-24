import React, { Component } from "react";
//import { Map, GoogleApiWrapper } from 'google-maps-react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

import CurrentLocation from "./Map";

const mapStyles = {
  width: "100%",
  height: "100%"
};

//mapcontainer is responsible for loading google API and demonstare usage
//Map component is placed inside the container, currently the single feature, CurrentLocation
export class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false, //hids or shows the info window
    activeMarker: {}, //show active marker upon click
    selectedPlace: {} //show the infowindow to the selected place upon a marker
  };
  //used to show info window which is a component of google maps react library. Give us the ability for pop up window showing details of
  //clicked place or marker
  //prop is a boolean that contrls the infowindow, show -> true, hide->false
  onMarkerClick = (props, marker, e) =>
    this.setState({
      showingInfoWindow: true,
      activeMarker: marker,
      selectedPlace: props
    });

  //closes the infoWindow once a user clicks the button
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        selectedPlace: null
      });
    }
  };

  // building marker component, we make marker child of map component. We build <Marker/> component as child of the Map so that they are
  // independent of the Map itself but interdependent if map is available
  render() {
    let show_name;
    if (this.state.showingInfoWindow) {
      show_name = (
        <div>
          <h4>{this.state.selectedPlace.mapCenter.name_loc}</h4>
        </div>
      );
    } else {
      show_name = (
        <div>
          <h4>{""}</h4>
        </div>
      );
    }
    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google} //placing the map conponent inside the container
      >
        <Marker onClick={this.onMarkerClick} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>{show_name}</div>
        </InfoWindow>
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper(props => ({
  apiKey: "AIzaSyD-a_aMfM44H43DL1gkBccsYjcYgZTZWQk"
}))(MapContainer);
