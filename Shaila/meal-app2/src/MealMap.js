/*global google*/
import React from "react"
import { compose, withProps, withHandlers, withState,withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker , InfoWindow } from "react-google-maps"

const MyMapComponent = compose(

    withProps(
        {
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD8kEdQYnlfJaGYD70GNqtxzf7oet_3wwY&libraries=places,geometry",
        loadingElement: <div style={{ height: '100vh' }} />,
        containerElement: <div style={{height: '100vh' }} />,
        mapElement: <div style={{ position:"relative",
        width: "50%",
        height: 382,
        WebkitFilter: "drop-shadow(0px 0px 5px #666)",
        marginLeft:491,
        marginTop:-411.9 }} />,
    }),
    withScriptjs,
    withGoogleMap,
    withState('places', 'updatePlaces','','searchCriteria','radius','currLat','currLng'),
    withStateHandlers(()=>({
        isOpen:false,
        markerIndex:0,
        currentLatLng:{
            lat:47.6769683,lng:-90.6769683
        }
    }),{
        onToggleOpen:({isOpen})=>(index)=>({
            isOpen:!isOpen,
            markerIndex:index
        })
    },
    ),
    withHandlers(() => {
        const refs = {
            map: undefined,
        }
        return {
            onMapMounted: () => ref => {
                refs.map = ref
            },
            fetchPlaces: ({ updatePlaces, searchCriteria, radius ,price , review ,defaultCenter }) => {
                const bounds = refs.map.getBounds();
                var typeSearchCriteria=searchCriteria;
                var maxPrice=price
                var searchRating=review
                const service = new google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
                const request = {
                    location:defaultCenter,//location:(new google.maps.LatLng(47.6769683,-122.0284808)),or {lat:47.6769683,lng:-122.0284808}
                    bounds:bounds,
                    radius: radius,
                    type:typeSearchCriteria,
                    openNow:true,
                    maxPriceLevel:maxPrice,
                    fields:['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry']
                };
               
                service.nearbySearch(request, (results, status) => {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        //console.log(results);
                        console.log(radius);
                        console.log(review);
                        updatePlaces(results);
                
                    }
                })
            },
            currentLoc: ({currLat,currLng})=>{
                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(
                        position=>{
                               currLat=position.coords.latitude
                               currLng=position.coords.longitude
                            })
                         console.log()
                        }
                        console.log('here')
            }
        }
    }),
)((props) => {
  console.log(props.radius)

    var target=new google.maps.LatLng(47.6769683,-122.0284808);
    if(props.defaultCenter !== undefined){
        console.log("here")
        target=props.defaultCenter
    }
    var option=[]; //new array to store results based on search criteria
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

    // if(navigator.geolocation){
    //     navigator.geolocation.getCurrentPosition(
    //         position=>{
    //                 props.currentLatLng.lat=position.coords.latitude
    //                 props.currentLatLng.lng=position.coords.longitude
    //             })
             
    //         }
        console.log(props.currLat);
    return (
      
        <GoogleMap
            onTilesLoaded={props.fetchPlaces}
            ref={props.onMapMounted}
            onClick={props.fetchPlaces}
            defaultZoom={10}
                    defaultCenter={{lat:47.6769683,lng:-122.0284808}}
        >
            {option && option.map((place, i) =>                
                <Marker key={i} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} 
                onClick ={()=> {props.onToggleOpen(i)}} >
                {props.isOpen && props.markerIndex=== i &&
                <InfoWindow onCloseClick={props.onToggleOpen}>
                    <div>{place.name}</div>
                </InfoWindow>
                }
                </Marker>
                
            )}

        </GoogleMap>
     
    )
   
})

export default class MealMap extends React.Component {

    
    render() {

        var searchCriteria=this.props.search;
        var radius=this.props.radius;
        var price=this.props.price;
        var ratings=this.props.reviews;
    
     
        if(searchCriteria.length !== 0 || radius!== 'any' || price !=='any'){
        searchCriteria.map(select=> {
            console.log(searchCriteria)
            return(
              searchCriteria=select.label
            )
          })
          return (
            <MyMapComponent searchCriteria={searchCriteria} 
                price={price}
                review={ratings}
                radius={radius*1609} //converting into meters
            />
        )
        }

        return (
            <MyMapComponent searchCriteria='' 
                price="any"
                review="any"
                radius='0'
            />
        )
    }
}