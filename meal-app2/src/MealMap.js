/*global google*/
import React from "react"
import { compose, withProps, withHandlers, withState } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


const MyMapComponent = compose(

    withProps(
        {
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD8kEdQYnlfJaGYD70GNqtxzf7oet_3wwY&libraries=places,geometry",
        loadingElement: <div style={{ height: '100vh' }} />,
        containerElement: <div style={{height: '100vh' }} />,
        mapElement: <div style={{ position:"relative",
        width: "50%",
        height: "50.4%",
        WebkitFilter: "drop-shadow(0px 0px 5px #666)",
        marginLeft:491,
        marginTop:-411.9 }} />,
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
                var loc= new google.maps.LatLng(47.6769683,-122.0284808)
                const service = new google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
                const request = {
                    location:{lat:47.6769683,lng:-122.0284808},//location:(new google.maps.LatLng(47.6769683,-122.0284808)),
                    bounds:bounds,
                    radius: radius,
                    type:keywords,
                    openNow:true,
                    fields:['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry']
                };
               
                service.nearbySearch(request, (results, status) => {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        console.log(results);
                        console.log(bounds);
                        console.log(radius);
                        updatePlaces(results);
                    }
                })
            }
        }
    }),
)((props) => {
  console.log(props.radius)
    var target=new google.maps.LatLng(47.6769683,-122.0284808);
    var option=[]; //new array to print
    if(props.places){
        props.places.map((place,i)=>
            //console.log({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})
            {if(google.maps.geometry.spherical.computeDistanceBetween(target,new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng()))<props.radius){
                option.push(place);
            }
        }
        )
    }
    console.log(option);
    
    return (
    
        <GoogleMap
            onTilesLoaded={props.fetchPlaces}
            ref={props.onMapMounted}
            onBoundsChanged={props.fetchPlaces}
            defaultZoom={10}
            defaultCenter={{lat:47.6769683,lng:-122.0284808}}
        >
            {option && option.map((place, i) =>                
                
                <Marker key={i} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} >
                </Marker>
                
            )}
        </GoogleMap>
        
    )
   
})

export default class MealMap extends React.Component {

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
                radius={radius*1609} //converting into meters
            />
        )
        }

        return (
            <MyMapComponent words='' 
                price="any"
                review="any"
                radius='0'
            />
        )
    }
}