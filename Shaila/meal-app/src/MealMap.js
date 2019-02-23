/*global google*/
import React from "react"
import { compose, withProps, withHandlers, withState,withStateHandlers,lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker , InfoWindow,DirectionsRenderer } from "react-google-maps"

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
                //console.log(result)
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
    withHandlers(() => {
        const refs = {
            map: undefined,
            array:[]
        }
        return {
            onMapMounted: () => ref => {
                refs.map = ref
            },
            fetchPlaces: async ({ updatePlaces, searchCriteria, radius ,price , review ,defaultCenter }) => {
                const bounds = refs.map.getBounds();
                refs.array=searchCriteria
                var maxPrice=price;
                const service = new google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
                var x;
                var output=[];

for(x=0;x<refs.array.length;x++){
var request = {
        location:defaultCenter,//location:(new google.maps.LatLng(47.6769683,-122.0284808)),or {lat:47.6769683,lng:-122.0284808}
        bounds:bounds,
        radius: radius,
        type:refs.array[x],
        openNow:true,
        maxPriceLevel:maxPrice,
        fields:['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry']
        };
               
await service.nearbySearch(request, (results, status) => {
                
return new Promise((reject, resolve)=>{
     if (status === google.maps.places.PlacesServiceStatus.OK) {
    var x;
    for(x=0;x<results.length;x++)
    output.push(results[x]);
    resolve(output);
    updatePlaces(output);    
    }else{
    reject();
    }
})
                   
})
         
} //end of forloop 

        console.log(output);
},
            currentLoc: ({currLat,currLng})=>{
                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(
                        position=>{
                               currLat=position.coords.latitude
                               currLng=position.coords.longitude
                            })
                    
                        }
                     
            }
        }
    }),
)((props) => {
 
if(props.places != null)

    var target=new google.maps.LatLng(47.6769683,-122.0284808); //this needs to update with the bound and not be fixed like this
    if(props.defaultCenter !== undefined){
        target=props.defaultCenter
    }
    var option=[]; //new array to store results based on search criteria
    if(props.places){

        //traverse through the place array, if there is a match between radius , price level. Enables makers to show without other information 

        props.places.map((place,i)=>
            {
            if(google.maps.geometry.spherical.computeDistanceBetween(target,new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng()))<props.radius){
                
                option.push(place);
            }
            if(place.price_level<=props.price){
                option.push(place)

            }
            /*
            cant have any markers appear if user enters only type, we need more information along with type. 
            */
            // if(place.types.length !== 0 && place.types.includes(props.searchCriteria)){ 
            //     console.log("here "+props.searchCriteria)
            //     option.push(place)

            // }


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
            defaultZoom={13}
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
   
             {props.directions && <DirectionsRenderer directions={props.directions} suppressMarkers={props.markers}/>}

        </GoogleMap>
     
    )
   
})

export default class MealMap extends React.Component {

    
    render() {

        var searchCriteria=this.props.search;
        var radius=this.props.radius;
        var price=this.props.price;
        var ratings=this.props.reviews;
        var types=[]

        if(searchCriteria.length !== 0 || radius!== 0 || price !==0){
            console.log(searchCriteria+" "+ radius +" " +price+" "+ratings)
    

        searchCriteria.map(select=>{
            types.push(select.label)
        })

      return (
            <MyMapComponent searchCriteria={types}
                price={price*1}
                review={ratings}
                radius={radius*1609} //converting into meters
            
            />
        )
          }
       
        return ( //to prevent from crashing
            <MyMapComponent searchCriteria='' 
                price="any"
                review="any"
                radius='0'
            />
        )
     
       
    }

}