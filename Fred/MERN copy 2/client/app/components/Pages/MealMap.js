/*global google*/
import React from "react";

import {
  compose,
  withProps,
  withHandlers,
  withState,
  withStateHandlers,
  lifecycle
} from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer
} from "react-google-maps";
import meal from "./Markers/meal.png";
import bar from "./Markers/bar.png";
import cafe from "./Markers/cafe.png";
import gbuss from "./Markers/genericbusiness.png";
import shopping from "./Markers/shopping.png";
import lodging from "./Markers/lodging.png";
import gas from "./Markers/gasstation.png";

var route_markers = [];
var center;
var center_lat;
var center_lng;
const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyD8kEdQYnlfJaGYD70GNqtxzf7oet_3wwY&libraries=places,geometry",
    loadingElement: <div style={{ height: "100vh" }} />,
    containerElement: <div style={{ height: "100vh" }} />,
    mapElement: (
      <div
        style={{
          position: "relative",
          width: 420,
          height: 480,
          //WebkitFilter: "drop-shadow(0px 0px 30px )",
          marginLeft: 330,
          marginTop: -510
        }}
      />
    )
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentWillMount() {
      this.getGeoLocation();
    },
    componentWillUpdate() {
      this.getGeoLocation();
    },
    async getGeoLocation() {
      //this method gets the geolocation coordinates by calling getLocationCoordinates while passing location names as input from user
      if (this.props.locations) {
        const locations = this.props.locations; //passing array with start and end destination names
        var route_markers = []; //used to store the geolocation
        const from = await this.getLocationCoordinates(locations.from); //returns coordinate of start dest
        const to = await this.getLocationCoordinates(locations.to); //returns coordinates of end dest
        route_markers.push(from); //add to the array
        route_markers.push(to); //add to the array
        this.setState({ markers: route_markers });
        this.componentDidMount(route_markers);
      }
    },

    getLocationCoordinates(location) {
      //computes the geocoordinates of given locations using googles Geocoder
      return new Promise((resolve, reject) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: location }, (result, status) => {
          if (status == "OK") {
            const geometry = result[0].geometry.location;
            const coordinates = {
              lat: geometry.lat(),
              lng: geometry.lng()
            };
            resolve(coordinates);
          } else {
            reject("ERROR");
          }
        });
      });
    },
    componentDidMount(route_markers) {
      var waypointsforroute = [];

      if (this.props.route) {
        this.props.route.map(waypoint => {
          waypointsforroute.push({
            location: new google.maps.LatLng(waypoint.lat, waypoint.lng)
          });
        });
      }

      //this method draws the route between start and end destination
      if (route_markers) {
        const DirectionsService = new google.maps.DirectionsService();
        DirectionsService.route(
          {
            origin: new google.maps.LatLng(
              route_markers[0].lat,
              route_markers[0].lng
            ),
            destination: new google.maps.LatLng(
              route_markers[1].lat,
              route_markers[1].lng
            ),
            waypoints: waypointsforroute,
            travelMode: google.maps.TravelMode.WALKING
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              this.setState({
                directions: { ...result },
                markers: true
              });
            } else {
              console.error(`error fetching directions ${result}`);
            }
          }
        );
      }
    }
  }),
  withState(
    "places",
    "updatePlaces",
    "",
    "searchCriteria",
    "radius",
    "currLat",
    "currLng"
  ),
  withStateHandlers(
    () => ({
      isOpen: false,
      markerIndex: 0,
      currentLatLng: {
        lat: 47.6769683,
        lng: -90.6769683
      }
    }),
    {
      onToggleOpen: ({ isOpen }) => index => ({
        //used to handle info window on markers
        isOpen: !isOpen,
        markerIndex: index
      })
    }
  ),
  withHandlers(() => {
    const refs = {
      map: undefined,
      array: []
    };
    return {
      onMapMounted: () => ref => {
        refs.map = ref;
      },
      fetchPlaces: async ({
        updatePlaces,
        searchCriteria,
        radius,
        price,
        review,
        defaultCenter
      }) => {
        //fetches new places to dispaly on map by making a request to googles PlaceService api
        const bounds = refs.map.getBounds();
        // refs.map.panToBounds(bounds);
        center = refs.map.getCenter();
        center_lat = center.lat();
        center_lng = center.lng();

        refs.array = searchCriteria;
        var maxPrice = price;
        const service = new google.maps.places.PlacesService(
          refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        );
        var x;
        var output = [];

        for (x = 0; x < refs.array.length; x++) {
          var request = {
            location: center, //location:(new google.maps.LatLng(47.6769683,-122.0284808)),or {lat:47.6769683,lng:-122.0284808}
            bounds: bounds,
            radius: radius,
            type: refs.array[x],
            openNow: true,
            maxPriceLevel: maxPrice,
            fields: [
              "photos",
              "formatted_address",
              "name",
              "rating",
              "opening_hours",
              "geometry"
            ]
          };

          await service.nearbySearch(request, (results, status) => {
            return new Promise((reject, resolve) => {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                var x;
                for (x = 0; x < results.length; x++) output.push(results[x]);
                resolve(output);
                updatePlaces(output);
              } else {
                reject();
              }
            })
              .then(response => {
                console.log(response);
              })
              .catch(e => {
                console.log(e);
              });
          });
        } //end of forloop

        console.log(output);
      },
      currentLoc: ({ currLat, currLng }) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            currLat = position.coords.latitude;
            currLng = position.coords.longitude;
          });
        }
      }
    };
  })
)(props => {
  //console.log(route_markers)
  if (props.places != null)
    // if(route_markers[1]!== undefined)
    var target = new google.maps.LatLng(center_lat, center_lng); //this needs to update with the bound and not be fixed like this
  console.log("TARGET:" + target);
  if (props.defaultCenter !== undefined) {
    target = props.defaultCenter;
  }

  console.log(center);
  var option = []; //new array to store results based on search criteria
  if (props.places) {
    //traverse through the place array, if there is a match between radius , price level. Enables makers to show without other information
    props.places.map((place, i) => {
      //console.log(props.radius)
      var x = google.maps.geometry.spherical.computeDistanceBetween(
        target,
        new google.maps.LatLng(
          place.geometry.location.lat(),
          place.geometry.location.lng()
        )
      );
      //console.log(x)
      if (
        google.maps.geometry.spherical.computeDistanceBetween(
          target,
          new google.maps.LatLng(
            place.geometry.location.lat(),
            place.geometry.location.lng()
          )
        ) < props.radius
      ) {
        //console.log("DISTANCE MATCH");
        option.push(place);
      }
      if (place.price_level <= props.price) {
        //console.log("PRICE MATCH");
        option.push(place);
      }

      if (place.rating <= props.ratings) {
        //console.log("RATINGS MATCH");
        option.push(place);
      }

      /*
            cant have any markers appear if user enters only type, we need more information along with type. 
            */
      // if(place.types.length !== 0 && place.types.includes(props.searchCriteria)){
      //     console.log("here "+props.searchCriteria)
      //     option.push(place)

      // }
    });
  }
  var icon_map = {};
  icon_map[
    "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
  ] = meal;
  icon_map[
    "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png"
  ] = cafe;
  icon_map[
    "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png"
  ] = bar;
  icon_map[
    "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png"
  ] = gbuss;
  icon_map[
    "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png"
  ] = shopping;
  icon_map[
    "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png"
  ] = lodging;
  icon_map[
    "https://maps.gstatic.com/mapfiles/place_api/icons/gas_station-71.png"
  ] = gas;

  //console.log(option);
  return (
    //This component uses the fetchplaces function defined above to pick the location of the maps current focus and display the place markers according to user request.
    <GoogleMap
      onTilesLoaded={props.fetchPlaces}
      ref={props.onMapMounted}
      onClick={props.fetchPlaces}
      defaultZoom={13}
      drag={props.fetchPlaces}
      zoom_changed={props.fetchPlaces}
      defaultCenter={{ lat: 47.6769683, lng: -122.0284808 }}
    >
      {option &&
        option.map((place, i) => (
          //using values collected into options array, displace markers onto the map using those place locations
          <Marker
            key={i}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            }}
            onClick={() => {
              props.onToggleOpen(i);
            }}
            icon={{
              url: icon_map[place.icon],
              scaledSize: new google.maps.Size(40, 40)
            }}
          >
            {props.isOpen && props.markerIndex === i && (
              <InfoWindow onCloseClick={props.onToggleOpen}>
                <div>
                  {place.name + " "}
                  <button
                    onClick={() =>
                      props.handleClick(
                        place.geometry.location.lat(),
                        place.geometry.location.lng(),
                        place.name
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      {/*for creating path with the updated coordinates*/}
      {props.directions && (
        <DirectionsRenderer
          directions={props.directions}
          suppressMarkers={props.markers}
        />
      )}
    </GoogleMap>
  );
});

export default class MealMap extends React.Component {
  render() {
    var searchCriteria = this.props.search;
    var radius = this.props.radius;
    var price = this.props.price;
    var ratings = this.props.reviews;
    var types = [];
    var locations = this.props.locations;

    if (searchCriteria.length !== 0 || radius !== 0 || price !== 0) {
      console.log(searchCriteria + " " + radius + " " + price + " " + ratings);

      searchCriteria.map(select => {
        //sending an array of user's meal type selection for processing into our component
        types.push(select.label);
      });
      // calling our MyMapComponent defined above and passing in user requirments
      return (
        <MyMapComponent
          searchCriteria={types}
          price={price}
          review={ratings}
          radius={radius * 1609} //converting into meters
          locations={locations}
          handleClick={this.props.handleClick}
          route={this.props.route}
        />
      );
    }

    return (
      //to prevent from crashing
      <MyMapComponent
        searchCriteria=""
        price="any"
        review="any"
        radius="0"
        handleClick={() => console.log("Banana")}
      />
    );
  }
}
