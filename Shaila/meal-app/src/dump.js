// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import Select from 'react-select';
// import Filter from "./filter.js";


// class App extends React.Component{
  
//     constructor(props){
//       super(props);

//       // this.handleChange=this.handleChange.bind(this);
//       // this.handleSubmit=this.handleSubmit.bind(this);
//       this.handleOnSelect=this.handleOnSelect.bind(this);
//       this.state={
//         // view: false,
//         // value:'',
//         selected:[],
//         count:0
//       };
//     }

//     handleOnSelect(selection){
//       console.log(this.state.selected)
//       console.log(this.state.count)
//       // if(!selection){
//       //   alert('enter valild input')
//       // }else if(this.state.selected.indexOf(selection)>-1){
//       //   alert('removing')

//       // }
//       this.setState((prevState)=>{
    
//         return{
//           selected:selection,
//           count:prevState.count+1    
//         };
//       })
    
//     }

//     // handleChange(e){
//     //   this.setState({value: e.target.value});
//     // }

//     // handleSubmit(e){
//     //   alert(this.state.value);
//     //   e.preventDefault();
//     // }
//     render(){
//         const options=[
//           {value: 'chocolate',label:'Chocolate'},
//           {value:'vanilla',label:'Vanilla'},
//           {value:'banana',label:'Banana'}

//         ]
//         return(
//             <div>
//                 <h1>Meal Preferences Application</h1>
//                 <h1>Count={this.state.selected.length}</h1>
//                 {/* <button onClick={this.viewOption}>Select Options</button>
//             <form onSubmit={this.handleSubmit}>
//               <label>
//                 Meal Pref:
//                 <input type="text" value={this.state.value} onChange={this.handleChange}/>
//               </label> */}
//               {/* <input type="submit" value="Submit" /> */}
//             {/* </form> */}
//             <Select options={options} defaultValue={""}isMulti onChange={this.handleOnSelect}/>
//             {
//               this.state.selected.map(select=> {
//                 return(
//                   <div key={select.value}>
//                   <h3>{select.label}</h3>
//                   <br/>
//                   </div>
//                 )
//               })
//             }

//             <Filter name='cusine' ></Filter>
//             </div>
//         );
//     }
// }

// export default App;

// class App extends React.Component{

//   constructor(props){
//     super(props);

//     this.state={
//       selected:[],
//       count:0,
//       price_range:'any',//any price range
//       distance:'any',
//       ratings:'any'
//     };
//     //this.childHandler=this.childHandler.bind(this)
//     this.selection_Handler=this.selection_Handler.bind(this)
//     this.PriceRange_Handler=this.PriceRange_Handler.bind(this)
//     this.distance_Handler=this.distance_Handler.bind(this)
//     this.ratings_Handler=this.ratings_Handler.bind(this)
//   }

//   // childHandler(datafromchild){
//   //   this.setState({
//   //     data:datafromchild
//   //   })
//   // }
  
//   //to get data back from Child 
//   selection_Handler(selection){
//     this.setState({
//       selected:selection
//     })
//   }

//   PriceRange_Handler(price){
//     this.setState({
//       price_range:price
//     })
//   }

//   distance_Handler(dist){
//     this.setState({
//       distance:dist
//     })
//   }

//   ratings_Handler(ratings){
//     this.setState({
//       ratings:ratings
//     })
//   }

//   render(){
//     const money_label={0:'$',50:'$$',100:'$$$'}
//     const distance_label={0:'Near',50:'Far',100:'Furthest'}
//     const dinning_options=[ 
//       {value: '1',label:'All Food & Drinks'},{value:'2',label:'Bars & Drinks'},
//       {value:'3',label:'Burgers & BBQ'},{value: '4',label:'Delis & Bakeries'},
//       {value:'5',label:'Coffee & Tea'}, {value:'6',label:'Diners & Breakfast'},
//       {value: '7',label:'Ice cream & Desserts'},{value:'8',label:'Vegeterian & Healthy Food'},
//       {value:'9',label:'Kosher'},{value: '10',label:'Halal'},{value:'11',label:'Wineries & Distelliers'},{value:'12',label:'Resturants'},  
//       ]
//       return(
//           <div>
//           {/* <Child action={this.childHandler}/>
//           <p>{this.state.data}</p> */}

//           <h1>Meal Preferences Application</h1>

//           <div className="filter">
//           <Filter name='meal_type' placeholder= 'Meal Type' action={this.selection_Handler} choices= {dinning_options}></Filter>   
              
//             {
//             this.state.selected.map(select=> {
//               return(
//                 <div key={select.value}>
//                 <p>{select.label}</p>
//                 </div>
//               )
//             })
//           }
//           </div>
//           <div className="money">
//         <p>Price range: {this.state.price_range}</p>
//         <RangeSlider name='money_range' action={this.PriceRange_Handler} label={money_label}/>
//         <br/>
//           </div>
//        <div className="distance">
//         <p>Distance to travel from Location: {this.state.distance} miles</p>
//         <RangeSlider name='distance_range' action={this.distance_Handler} label={distance_label}/>
//         <br/>
//           </div>
//         <div className="ratings">
//         <p>Reviews: {this.state.ratings}</p>
//         <StarRating action={this.ratings_Handler}/>
//         </div>

//         </div>

       
        
//       );
//   }
// }

//more dump from App.js

//<div>
{/* <div className="filter">
<Filter name='meal_type' placeholder= 'Meal Type' action={this.selection_Handler} choices= {dinning_options}></Filter>   
  
  {
  this.state.selected.map(select=> {
    return(
      <div key={select.value}>
      <p>{select.label}</p>
      </div>
    )
  })
}
</div>

<div className="money">
<p>Price range: {this.state.price_range}</p>
<RangeSlider name='money_range' action={this.PriceRange_Handler} label={money_label}/>
<br/>
</div>

<div className="distance">
<p>Distance to travel from Location: {this.state.distance} miles</p>
<RangeSlider name='distance_range' action={this.distance_Handler} label={distance_label}/>
<br/>
</div>

<div className="ratings">
<p>Reviews: {this.state.ratings}</p>
<StarRating action={this.ratings_Handler}/>
</div>
<div>
<Card color="#FF6663"></Card>
</div> */}


//with promise 

/*global google*/
// import React from "react"
// import { compose, withProps, withHandlers, withState,withStateHandlers } from "recompose"
// import { withScriptjs, withGoogleMap, GoogleMap, Marker , InfoWindow } from "react-google-maps"

// var h=[];


// const MyMapComponent = compose(

//     withProps(
//         {
//         googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD8kEdQYnlfJaGYD70GNqtxzf7oet_3wwY&libraries=places,geometry",
//         loadingElement: <div style={{ height: '100vh' }} />,
//         containerElement: <div style={{height: '100vh' }} />,
//         mapElement: <div style={{ position:"relative",
//         width: "50%",
//         height: 382,
//         WebkitFilter: "drop-shadow(0px 0px 5px #666)",
//         marginLeft:491,
//         marginTop:-411.9 }} />,
//     }),
//     withScriptjs,
//     withGoogleMap,
//     withState('places', 'updatePlaces','','searchCriteria','radius','currLat','currLng'),
//     withStateHandlers(()=>({
//         isOpen:false,
//         markerIndex:0,
//         currentLatLng:{
//             lat:47.6769683,lng:-90.6769683
//         }
//     }),{
//         onToggleOpen:({isOpen})=>(index)=>({
//             isOpen:!isOpen,
//             markerIndex:index
//         })
//     },
//     ),
//     withHandlers(() => {
//         const refs = {
//             map: undefined,
//             array:[]
//         }
//         return {
//             onMapMounted: () => ref => {
//                 refs.map = ref
//             },
//             fetchPlaces: async ({ updatePlaces, searchCriteria, radius ,price , review ,defaultCenter }) => {
//                 const bounds = refs.map.getBounds();
//                 refs.array=searchCriteria
//                 console.log(refs.array.length)
//                 //var typeSearchCriteria=searchCriteria;
//                 var maxPrice=price
//                 var searchRating=review
//                 const service = new google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
//                 var x;
//                 var output=[];
//                 for(x=0;x<refs.array.length;x++){
//                     //console.log(refs.array[x])
//                 var request = {
//                     location:defaultCenter,//location:(new google.maps.LatLng(47.6769683,-122.0284808)),or {lat:47.6769683,lng:-122.0284808}
//                     bounds:bounds,
//                     radius: radius,
//                     type:refs.array[x],
//                     openNow:true,
//                     maxPriceLevel:maxPrice,
//                     fields:['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry']
//                 };
//                 let shal="@ @ # $ ";
                
//                 console.log("we are printing this "+this);
//                 await service.nearbySearch(request, (results, status) => {
                
//                     return new Promise((reject, resolve)=>{
//                         if (status === google.maps.places.PlacesServiceStatus.OK) {
//                             var x;
//                             for(x=0;x<results.length;x++)
//                            output.push(results[x]);
//                            resolve(output);
//                             //that.setState({output})
//                             console.log(output);
//                             // console.log("Radius inside withhandlers "+radius);
//                             // console.log("Reviews inside withhandlers "+review);
//                             //updatePlaces(results);    
//                         }else{
//                             reject();
//                         }
//                     })
                   
//                 })
//             console.log(output)
//             }
        
//             if(h.length>0){
                
//                 //console.log("HERE!!!!!!"+ output.length);
//                 var j;
//                 for(j=0;j<h.length;j++)
//                 console.log(h[j])
//                 // updatePlaces(output);
//             }
//             updatePlaces(h);
//            // console.log(output);
            
//             }
//             ,
            
//             currentLoc: ({currLat,currLng})=>{
//                 if(navigator.geolocation){
//                     navigator.geolocation.getCurrentPosition(
//                         position=>{
//                                currLat=position.coords.latitude
//                                currLng=position.coords.longitude
//                             })
//                          console.log()
//                         }
                     
//             }
//         }
//     }),
// )((props) => {
// //console.log("Radius "+ props.radius)

// if(props.places != null)
// //console.log("helloo"+props.places)

//     var target=new google.maps.LatLng(47.6769683,-122.0284808);
//     if(props.defaultCenter !== undefined){
//         target=props.defaultCenter
//     }
//     var option=[]; //new array to store results based on search criteria
//     if(props.places){
//      console.log("here####")
//         // props.places.map((place,i)=>
//         //     {
//         //     console.log({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})
            
            
//         //     if(google.maps.geometry.spherical.computeDistanceBetween(target,new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng()))<props.radius){
                
//         //         option.push(place);
//         //     }
//         //     if(place.price_level<=props.price){
//         //         option.push(place)

//         //     }
//         //     console.log('stuck here')
//         //     if(place.types.length !== 0 && place.types.includes(props.searchCriteria)){
//         //         console.log("here "+props.searchCriteria)
//         //         option.push(place)

//         //     }


//         // }
//         // )
//     }
    
//     // var places_index;
//     // for(places_index=0;places_index<props.places.length;places_index++){
//     //     var results=props.places[places_index]
//     //     console.log(results)
//     // }




//     console.log(option);

//     // if(navigator.geolocation){
//     //     navigator.geolocation.getCurrentPosition(
//     //         position=>{
//     //                 props.currentLatLng.lat=position.coords.latitude
//     //                 props.currentLatLng.lng=position.coords.longitude
//     //             })
             
//     //         }
//         //console.log(props.currLat);
//     return (
      
//         <GoogleMap
//             onTilesLoaded={props.fetchPlaces}
//             ref={props.onMapMounted}
//             onClick={props.fetchPlaces}
//             defaultZoom={10}
//             defaultCenter={{lat:47.6769683,lng:-122.0284808}}
//         >
//             {option && option.map((place, i) =>                
//                 <Marker key={i} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} 
//                 onClick ={()=> {props.onToggleOpen(i)}} >
//                 {props.isOpen && props.markerIndex=== i &&
//                 <InfoWindow onCloseClick={props.onToggleOpen}>
//                     <div>{place.name}</div>
//                 </InfoWindow>
//                 }
//                 </Marker>
                
//             )}

//         </GoogleMap>
     
//     )
   
// })

// export default class MealMap extends React.Component {

    
//     render() {

//         var searchCriteria=this.props.search;
//         var radius=this.props.radius;
//         var price=this.props.price;
//         var ratings=this.props.reviews;
//         var types=[]
  
//         if(searchCriteria.length !== 0 || radius!== 0 || price !==0){
//             console.log(searchCriteria+" "+ radius +" " +price+" "+ratings)
//         // searchCriteria.map(select=> {
//         //     console.log(searchCriteria+" "+ radius +" " +price+" "+ratings)
//         //     return(
//         //       searchCriteria=select.label
//         //     )
//         //   })

//         searchCriteria.map(select=>{
//             types.push(select.label)
//         })

//       return (
//             <MyMapComponent searchCriteria={types}
//                 price={price*1}
//                 review={ratings}
//                 radius={radius*1609} //converting into meters
//             />
//         )
//           }
//         // }else{
//         //     console.log(searchCriteria+" "+ radius +" " +price+" "+ratings)
//         return ( //to prevent from crashing
//             <MyMapComponent searchCriteria='' 
//                 price="any"
//                 review="any"
//                 radius='0'
//             />
//         )
//         // }
       
//     }

// }

/*

MealMap for 1 type with route 

*/

 /*global google*/
//  import React from "react"
//  import { compose, withProps, withHandlers, withState,withStateHandlers,lifecycle } from "recompose"
//  import { withScriptjs, withGoogleMap, GoogleMap,Polyline, Marker , InfoWindow,DirectionsRenderer } from "react-google-maps"
 
//  const MyMapComponent = compose(
 
//      withProps(
//          {
//          googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD8kEdQYnlfJaGYD70GNqtxzf7oet_3wwY&libraries=places,geometry",
//          loadingElement: <div style={{ height: '100vh' }} />,
//          containerElement: <div style={{height: '100vh' }} />,
//          mapElement: <div style={{ position:"relative",
//          width: "50%",
//          height: 382,
//          WebkitFilter: "drop-shadow(0px 0px 5px #666)",
//          marginLeft:491,
//          marginTop:-511.9 }} />,
//      }),
//      withScriptjs,
//      withGoogleMap,
//      lifecycle({
//          componentDidMount() { 
//            const DirectionsService = new google.maps.DirectionsService();
//            DirectionsService.route({
//              origin: new google.maps.LatLng(47.6769683,-122.0284808),
//              destination: new google.maps.LatLng( 49.2827, -123.1207 ),
//              travelMode: google.maps.TravelMode.DRIVING,
//            }, (result, status) => {
//              if (status === google.maps.DirectionsStatus.OK) {
//                  console.log(result)
//  this.setState({
//                  directions: {...result},
//                  markers: true
//                })
//              } else {
//                console.error(`error fetching directions ${result}`);
//              }
//            });
//          }
//        }),
//      withState('places', 'updatePlaces','','searchCriteria','radius','currLat','currLng'),
//      withStateHandlers(()=>({
//          isOpen:false,
//          markerIndex:0,
//          currentLatLng:{
//              lat:47.6769683,lng:-90.6769683
//          }
//      }),{
//          onToggleOpen:({isOpen})=>(index)=>({
//              isOpen:!isOpen,
//              markerIndex:index
//          })
//      },
//      ),
//      withHandlers(() => {//props =>
//          const refs = {
//              map: undefined,
//              array:[]
//          }
//          return {
//              onMapMounted: () => ref => {
//                  refs.map = ref
//              },
//              fetchPlaces: ({ updatePlaces, searchCriteria, radius ,price , review ,defaultCenter }) => {
//                  const bounds = refs.map.getBounds();
//                  var maxPrice=price
//                  var searchRating=review
//                  const service = new google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
//                  var request = {
//                      location:defaultCenter,//location:(new google.maps.LatLng(47.6769683,-122.0284808)),or {lat:47.6769683,lng:-122.0284808}
//                      bounds:bounds,
//                      radius: radius,
//                      type:searchCriteria,
//                      openNow:true,
//                      maxPriceLevel:maxPrice,
//                      fields:['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry']
//                  };
                
//                  service.nearbySearch(request, (results, status) => {
//                      if (status === google.maps.places.PlacesServiceStatus.OK) {
//                          //console.log(results);
//                          console.log("Radius inside withhandlers "+radius);
//                          console.log("Reviews inside withhandlers "+review);
//                          updatePlaces(results);
                 
//                      }
//                  })
//              },
//              currentLoc: ({currLat,currLng})=>{
//                  if(navigator.geolocation){
//                      navigator.geolocation.getCurrentPosition(
//                          position=>{
//                                 currLat=position.coords.latitude
//                                 currLng=position.coords.longitude
//                              })
//                           console.log()
//                          }
                      
//              }
//          }
//      }),
//  )((props) => {
//    console.log("Radius "+props.radius)
 
//      var target=new google.maps.LatLng(47.6769683,-122.0284808);
//      if(props.defaultCenter !== undefined){
     
//          target=props.defaultCenter
//      }
//      var option=[]; //new array to store results based on search criteria
//      if(props.places){
//          props.places.map((place,i)=>
//              {if(google.maps.geometry.spherical.computeDistanceBetween(target,new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng()))<props.radius){
//                  option.push(place);
//              }
//              if(place.price_level<=props.price){
//                  console.log("price match")
//                  option.push(place)
 
//              }
 
//              if(place.types.length !== 0 && place.types.includes(props.searchCriteria)){
//                  console.log("type match "+props.searchCriteria)
//                  option.push(place)
 
//              }
             
//              if((place.rating)<=props.review){
//                  console.log('rating match '+place.rating+" : "+props.review)
//                  option.push(place)
//              }
 
 
//          }
//          )
//      }
//      console.log(option);
 
//      // if(navigator.geolocation){
//      //     navigator.geolocation.getCurrentPosition(
//      //         position=>{
//      //                 props.currentLatLng.lat=position.coords.latitude
//      //                 props.currentLatLng.lng=position.coords.longitude
//      //             })
              
//      //         }
//          //console.log(props.currLat);
 
//          const pathCoordinates = [
//              {lat:47.6769683,lng:-122.0284808},
//              { lat: 49.2827, lng: -123.1207 }
//          ];
//      return (
       
//          <GoogleMap
//              onTilesLoaded={props.fetchPlaces}
//              ref={props.onMapMounted}
//              onClick={props.fetchPlaces}
//              defaultZoom={10}
//                      defaultCenter={{lat:47.6769683,lng:-122.0284808}}
//          >
//              {option && option.map((place, i) =>                
//                  <Marker key={i} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} 
//                  onClick ={()=> {props.onToggleOpen(i)}} >
//                  {props.isOpen && props.markerIndex=== i &&
//                  <InfoWindow onCloseClick={props.onToggleOpen}>
//                      <div>{place.name}</div>
//                  </InfoWindow>
//                  }
//                  </Marker>
                 
//              )}
//                    {/*for creating path with the updated coordinates*/}
//              {/* <Polyline
//                  path={pathCoordinates}
//                  geodesic={true}
//                  options={{
//                      strokeColor: "#ff2527",
//                      strokeOpacity: 0.75,
//                      strokeWeight: 2,
//                      icons: [
//                          {
//                              offset: "0",
//                              repeat: "20px"
//                          }
//                      ]
//                  }}
//              />
//               {props.directions && <DirectionsRenderer directions={props.directions} suppressMarkers={props.markers}/>} */}
 
//          </GoogleMap>
      
//      )
    
//  })
 
//  export default class MealMap extends React.Component {
 
     
//      render() {
 
//          var searchCriteria=this.props.search;
//          var radius=this.props.radius;
//          var price=this.props.price;
//          var ratings=this.props.reviews;
 
//          if(searchCriteria.length !== 0 || radius!== 0 || price !==0 || ratings!==0){
//              console.log(searchCriteria+" "+ radius +" " +price+" "+ratings)
//          searchCriteria.map(select=> {
//              console.log(searchCriteria+" "+ radius +" " +price+" "+ratings)
//              return(
//                searchCriteria=select.label
//              )
//            })
//            return (
//              <MyMapComponent searchCriteria={searchCriteria} 
//                  price={price*1}
//                  review={ratings}
//                  radius={radius*1609} //converting into meters
//              />
//          )
//            }
//          // }else{
//          //     console.log(searchCriteria+" "+ radius +" " +price+" "+ratings)
//          return (
//              <MyMapComponent searchCriteria='' 
//                  price="any"
//                  review="any"
//                  radius='0'
//              />
//          )
//          // }
 
       
        
//      }
 
//  }
 
 