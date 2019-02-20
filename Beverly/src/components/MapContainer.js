import React, { Component } from 'react';
import { compose, withProps } from "recompose";
import { Map, GoogleApiWrapper, InfoWindow, Marker, google, Polyline  } from 'google-maps-react';
import {connect} from 'react-redux'
import MyMapComponent from './MyMapComponent'
const mapStyles = {
  width: '60%',
  height: '60%'
};

 class MapContainer extends Component {
    state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {} ,         //Shows the infoWindow to the selected place upon a marker
      
      };
      onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };


  componentWillMount(){
    console.log("ON RECOIT LE PROP ",this.props.locations[0])
  }

  // renderMarkers(){
  //   this.props.locations.map(location => {
  //     console.log("FOR LOCATION ",location)
  //     return ( <Marker
  //       onClick={this.onMarkerClick}
  //       name={'Kenyatta International Convention Centre'}
  //       position={location}
  //     />)
  //   }
     
  //    )
  // }
 
    render() {
       
          const locations = this.props.locations;
          return (
        //     <Map
        //       google={this.props.google}
        //       zoom={7}
        //       style={mapStyles}
        //       initialCenter={locations[0]}
        //     >
            
            
        //     <Polyline path={[locations[0], locations[1]]}/>

        //     <Marker
        //     onClick={this.onMarkerClick}
        //     name={'Kenyatta International Convention Centre'}
        //     position={locations[0]}
        //   />
        //   <Marker
        //   onClick={this.onMarkerClick}
        //   name={'Kenyatta International Convention Centre'}
        //   position={locations[1]}
        // />
            
           
        //   </Map>
        <MyMapComponent locations={this.props.locations}/>
            
          )

      }
   

  }

  function Geocode(WrappedComponent){

    return class extends React.Component{

      constructor(){
        super()
        this.state= {markers:[]}
      }

      componentWillMount(){
        this.getGeoLocation();
      }

      async getGeoLocation(){
        if(this.props.markerLocations ){
          const locations = this.props.markerLocations;
          const markers = [];
        const from = await this.getLocationCoordinates(locations.from);
        const to = await this.getLocationCoordinates(locations.to);
        markers.push(from);
        markers.push(to);
         this.setState({markers:markers})
        }
      }

      getLocationCoordinates(location){
        return new Promise((resolve, reject)=>{
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({address:location}, (result, status)=>{
            if(status=='OK'){
              const geometry = result[0].geometry.location
              const coordinates = {
                lat: geometry.lat(),
                lng:geometry.lng()
              }
              resolve(coordinates);
             
            }
            else{
              reject('ERROR')
            }
          })
          
        });
      
      }


   renderMarkers(){
    console.log(" THE STATE ",this.state.markers);
     this.state.markers.map(location =>{
       console.log(" A LOCATION ", location)
     })
   }

   render(){
     if(this.state.markers.length>0){
       console.log("ON Y ARRIVE")
       return (<WrappedComponent locations={this.state.markers} {...this.props}/>);
     }
     else{
       return (null)
     }
    
   }

    }

  }

  function mapStateToProps(state){
    
    return {
      markerLocations: state.mapReducer.data
    }
  }

  export const mapped = connect(mapStateToProps)(Geocode(MapContainer))

  export default GoogleApiWrapper({
    apiKey: 'AIzaSyC64eUv-Iw47Q9MqhsnpgzpvCUm-SM1qi4'
  })(mapped);
  