/*global google*/
import React from "react"
import { compose, withProps, withHandlers, withState,withStateHandlers,lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap,Polyline, Marker , InfoWindow,DirectionsRenderer } from "react-google-maps"

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
    lifecycle({
        componentDidMount() { 
          const DirectionsService = new google.maps.DirectionsService();
          DirectionsService.route({
            origin: new google.maps.LatLng(47.6769683,-122.0284808),
            destination: new google.maps.LatLng( 49.2827, -123.1207 ),
            travelMode: google.maps.TravelMode.DRIVING,
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                console.log(result)
this.setState({
                directions: {...result},
                markers: true
              })
            } else {
              console.error(`error fetching directions ${result}`);
            }
          });
        }
      }),
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
    withHandlers(() => {//props =>
        const refs = {
            map: undefined,
        }
        return {
            onMapMounted: () => ref => {
                refs.map = ref
            },
            fetchPlaces: ({ updatePlaces, searchCriteria, radius ,price , review ,defaultCenter }) => {
                const bounds = refs.map.getBounds();
                //var typeSearchCriteria=searchCriteria;
                var maxPrice=price
                var searchRating=review
                const service = new google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
                var request = {
                    location:defaultCenter,//location:(new google.maps.LatLng(47.6769683,-122.0284808)),or {lat:47.6769683,lng:-122.0284808}
                    bounds:bounds,
                    radius: radius,
                    type:searchCriteria,
                    openNow:true,
                    maxPriceLevel:maxPrice,
                    fields:['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry']
                };
               
                service.nearbySearch(request, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        //console.log(results);
                        console.log("Radius inside withhandlers "+radius);
                        console.log("Reviews inside withhandlers "+review);
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
                     
            }
        }
    }),
)((props) => {
  console.log("Radius "+props.radius)

    var target=new google.maps.LatLng(47.6769683,-122.0284808);
    if(props.defaultCenter !== undefined){
    
        target=props.defaultCenter
    }
    var option=[]; //new array to store results based on search criteria
    if(props.places){
        props.places.map((place,i)=>
            //console.log({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})
            {if(google.maps.geometry.spherical.computeDistanceBetween(target,new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng()))<props.radius){
                option.push(place);
            }
            if(place.price_level<=props.price){
                console.log("price match")
                option.push(place)

            }

            if(place.types.length !== 0 && place.types.includes(props.searchCriteria)){
                console.log("type match "+props.searchCriteria)
                option.push(place)

            }
            
            if((place.rating)<=props.review){
                console.log('rating match '+place.rating+" : "+props.review)
                option.push(place)
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
        //console.log(props.currLat);

        const pathCoordinates = [
            {lat:47.6769683,lng:-122.0284808},
            { lat: 49.2827, lng: -123.1207 }
        ];
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
                  {/*for creating path with the updated coordinates*/}
            {/* <Polyline
                path={pathCoordinates}
                geodesic={true}
                options={{
                    strokeColor: "#ff2527",
                    strokeOpacity: 0.75,
                    strokeWeight: 2,
                    icons: [
                        {
                            offset: "0",
                            repeat: "20px"
                        }
                    ]
                }}
            />
             {props.directions && <DirectionsRenderer directions={props.directions} suppressMarkers={props.markers}/>} */}

        </GoogleMap>
     
    )
   
})

export default class MealMap extends React.Component {

    
    render() {

        var searchCriteria=this.props.search;
        var radius=this.props.radius;
        var price=this.props.price;
        var ratings=this.props.reviews;

        if(searchCriteria.length !== 0 || radius!== 0 || price !==0 || ratings!==0){
            console.log(searchCriteria+" "+ radius +" " +price+" "+ratings)
        searchCriteria.map(select=> {
            console.log(searchCriteria+" "+ radius +" " +price+" "+ratings)
            return(
              searchCriteria=select.label
            )
          })
          return (
            <MyMapComponent searchCriteria={searchCriteria} 
                price={price*1}
                review={ratings}
                radius={radius*1609} //converting into meters
            />
        )
          }
        // }else{
        //     console.log(searchCriteria+" "+ radius +" " +price+" "+ratings)
        return (
            <MyMapComponent searchCriteria='' 
                price="any"
                review="any"
                radius='0'
            />
        )
        // }

      
       
    }

}