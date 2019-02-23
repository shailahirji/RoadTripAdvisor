/*global google*/
import React from 'react'
import  { compose, withProps, lifecycle } from 'recompose'
import {withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer} from 'react-google-maps'


class MyMapComponent extends React.Component {
constructor(props){
    super(props)
}

componentWillMount(){
    console.log("The nex props ",this.props)
}
render() {
    
    const DirectionsComponent = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC64eUv-Iw47Q9MqhsnpgzpvCUm-SM1qi4",
        loadingElement: <div style={{ height: `400px` }} />,
        containerElement: <div style={{ width: `100%` }} />,
        mapElement: <div style={{height: `600px`, width: `600px` }}  />,
        locations:this.props.locations
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentDidMount() { 
            const {locations} = this.props;
           
          const DirectionsService = new google.maps.DirectionsService();
          //console.log("We the loca ", this.props)
          //if(locations){
            // 
            // locations[0].lat, locations[0].lng
            //locations[1].lat, locations[1].lng
           
         // }//
          DirectionsService.route({
            origin: new google.maps.LatLng(locations[0].lat, locations[0].lng),
            destination: new google.maps.LatLng(locations[1].lat, locations[1].lng),
            travelMode: google.maps.TravelMode.DRIVING,
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
this.setState({
                directions: {...result},
                markers: true
              })
            } else {
              console.error(`error fetching directions ${result}`);
            }
          });
        }
      })
    )(props =>
      <GoogleMap
        defaultZoom={3}
      >
        {props.directions && <DirectionsRenderer directions={props.directions} suppressMarkers={props.markers}/>}
      </GoogleMap>
    );
return (
        <DirectionsComponent
        />
    )
  }
}
export default MyMapComponent