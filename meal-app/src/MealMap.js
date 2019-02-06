/*global google*/
import React from "react"
import { compose, withProps, withHandlers, withState } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


const MyMapComponent = compose(

    withProps(
        {
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD8kEdQYnlfJaGYD70GNqtxzf7oet_3wwY&libraries=places",
        loadingElement: <div style={{ height: '100vh' }} />,
        containerElement: <div style={{height: '100vh' }} />,
        mapElement: <div style={{ position:"fixed",
        width: "50%",
        height: "85%",
        marginLeft:400,
        marginTop:-330 }} />,
    }),
    withScriptjs,
    withGoogleMap,
    withState('places', 'updatePlaces','','words','radius'),
    
    withHandlers(() => {
        const refs = {
            map: undefined,
    
        }
        return {
            onMapMounted: () => ref => {
                refs.map = ref
            },
            fetchPlaces: ({ updatePlaces, words, radius }) => {
                const bounds = refs.map.getBounds();
                var keywords=words;
                var distance=radius;
                
                const service = new google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
                const request = {
                    location:{lat:47.6769683,lng:-122.0284808},
                    bounds:bounds,
                    radius: distance,
                    type:keywords,
                    fields:['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry']
                };
               
                service.nearbySearch(request, (results, status) => {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        console.log(results);
                        console.log(bounds);
                        console.log(distance);
                        updatePlaces(results);
                    }
                })
            }
        }
    }),
)((props) => {
    //console.log(props.words)
    return (
        <GoogleMap
            onTilesLoaded={props.fetchPlaces}
            ref={props.onMapMounted}
            onBoundsChanged={props.fetchPlaces}
            defaultZoom={8}
            defaultCenter={{lat:47.6769683,lng:-122.0284808}}
        >
            {props.places && props.places.map((place, i) =>
                <Marker key={i} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} />
            )}
        </GoogleMap>
    )
})

export default class MealMap extends React.PureComponent {
    render() {

        var words=this.props.search;
        var radius=this.props.radius;
     
        if(words.length !== 0 || radius!== 'any'){
        words.map(select=> {
            return(
              words=select.label
            )
          })
          return (
            <MyMapComponent words={words} 
                price={this.props.price}
                review={this.props.review}
                radius={radius}
            />
        )
        }

        return (
            <MyMapComponent words='bar' 
                price="any"
                review="any"
                radius='5'
            />
        )
    }
}