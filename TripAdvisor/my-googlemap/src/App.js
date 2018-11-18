import React, { Component } from 'react';
//import { Map, GoogleApiWrapper } from 'google-maps-react';
import {Map,GoogleApiWrapper, InfoWindow ,Marker} from 'google-maps-react';


import CurrentLocation from './Map';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  state={
    showingInfoWindow:false, //hids or shows the info window
    activeMarker:{},//show active marker upon click
    selectedPlace:{} //show the infowindow to the selected place upon a marker
  };
  //used to show info window which is a component of google maps react library. Give us the ability for pop up window showing details of 
  //clicked place or marker 
  //prop is a boolean that contrls the infowindow, show -> true, hide->false
  onMarkerClick=(props,marker,e)=>
    this.setState({
      showingInfoWindow:true,
      activeMarker: marker,
      selectedPlace:props
    });

    //closes the infoWindow once a user clicks the button
    onClose=props =>{
      if(this.state.showingInfoWindow){
        this.setState({
          showingInfoWindow:false,
          activeMarker: null,
        });
      }
    };

  render() {
    //console.log(this.props.state);
  console.log('showing window '+this.state.showingInfoWindow);
  console.log('on marker click '+ this.state.onMarkerClick);
  console.log("visible "+this.state.visible);
  if(this.state.selectedPlace.mapCenter!==undefined){
  console.log('selected place '+this.state.selectedPlace.mapCenter.name_loc);
  }
return(
  <CurrentLocation
  centerAroundCurrentLocation
  google={this.props.google}
  >
  <Marker
  onClick={this.onMarkerClick}  
  name={this.state.selectedPlace.mapCenter!==undefined ? this.state.selectedPlace.mapCenter.name_loc:undefined}
  /> 
  <InfoWindow
    marker={this.state.activeMarker}
    visible={this.state.showingInfoWindow}
    onClose={this.onClose}
    >
    <div>
      <h4>{this.state.selectedPlace.name}</h4>
    </div>

    </InfoWindow>

  </CurrentLocation>

);
}
}

export default GoogleApiWrapper(
(props)=>({
  apiKey:'AIzaSyD-a_aMfM44H43DL1gkBccsYjcYgZTZWQk'
}
))(MapContainer)