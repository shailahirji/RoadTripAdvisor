import React, {Component} from 'react';
import {withGoogleMap, GoogleMap,Marker} from 'react-google-maps';

class Map extends Component{
    render(){
    var mapStyle = {
    position: "absolute",
    width: "50%",
    height: "50%",
    marginLeft:600,
    marginTop:-410};

    

    const GoogleMapExample=withGoogleMap(props=>(
            <GoogleMap
            defaultCenter={{lat:40.756795,lng:-73.954298}}
            defaultZoom={8}
            >
            {props.isMarkerShown && <Marker position={{lat:40.756795,lng:-73.954298}}/>}

            </GoogleMap>
        ));

        return(
            <div >
                <GoogleMapExample
                containerElement={
                    <div className="map" style={{height:'100%',width:'100%'}}/>}
                    mapElement={<div style={mapStyle}/>}
                    isMarkerShown>
                         
                    </GoogleMapExample>/>
                    
            </div>
        );
    }
};
export default Map;