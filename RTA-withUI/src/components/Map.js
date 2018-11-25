//create component called CurrentLocation where all functionality to pick browsers location lies
import React from "react";
import ReactDOM from "react-dom";
import Geocode from "react-geocode";


const mapStyles = {
  map: {
    position: "absolute",
    width: "100%",
    height: "100%",
  }
};

Geocode.setApiKey("AIzaSyD8kEdQYnlfJaGYD70GNqtxzf7oet_3wwY");

//When GoogleAPIwrapper ** loads on the page, it will create a google maps component and pass into our map/current location(not sure which one)
//we are wrapping our main component and passing it into our map component as a prop.
//we need to check for eith a new prop or the mounting of the component

export class CurrentLocation extends React.Component {
  constructor(props) {
    super(props); //make it stateful
    const { lat, lng, name} = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng,
        name: name
      },
      showingInfoWindow: false
    };
  }
  //handles the case when the map is available when the component mounts
  //happens when the map has already been loaded previously
  //
  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        //Navigator uses browsers technology to determine the current location
        //use navigation from native browser implementation
        navigator.geolocation.getCurrentPosition(pos => {
          //when component itself mounts, add a call back to run to fetch the current position
          //when map is mounted, center is updated
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude,
              name_loc: Geocode.fromLatLng(
                coords.latitude,
                coords.longitude
              ).then(
                response => {
                  this.state.currentLocation.name_loc =
                    response.results[0].formatted_address;
                },
                error => {
                  console.log(error);
                }
              )
            }
          });
        });
      }
    }
    this.loadMap();
  }
  //handles the case when the map is first loaded. When map is first loaded, we cant depend on google API beign available.
  //therefor, first check if its loaded
  //if our component is rendered without it, the google prop will be undefined. If loaded, itll be defined
  //componentDidUpdate will run after the react component has updated
  //componentDidUpdate is used to asure that the component has changed and that the map should update
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    //The map will not be repositioned to the new location, whehn the center is updated
    //state will update but the center wont change
    if (prevState.currentLocation !== this.state.currentLocation) {
      //we check for an update to current location
      this.recenterMap(); //will only be called when the currentLocation in the component state has been updated
    }
  }
  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng, current.name_loc);
      map.panTo(center); //method on google.maps.Map instance to change center of map
    }
  }

  //only called after the component has been rendered and grabs a reference to the DOM component
  //gets any of the map on the page
  //use GAPI funcitions to create map
  loadMap() {
    if (this.props && this.props.google) {
      //make sure GAPI is available
      //check if google is available
      const { google } = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;

      //reference to the actual DOM element on the page not the Virtual DOM.
      //we can set the google map to work directly
      const node = ReactDOM.findDOMNode(mapRef); //grab ref to the dom where we want the map to be placed

      //instantiate google map, not hard coded values
      let { zoom } = this.props;
      const { lat, lng, name } = this.state.currentLocation; //pulling info from the state rther than props
      const center = new maps.LatLng(lat, lng, name);
      const mapConfig = Object.assign(
        {},
        {
          //we need atleast 2 config options,
          center: center, //combination of lat and ong
          zoom: zoom
        }
      );
      this.map = new maps.Map(node, mapConfig); //constructor is accepting a DOM node and configuration object to create a map
    }
  }

  //React gives a convininent method for handing the updating of the props of children object of a component
  //responsible for calling methods on children
  renderChildren() {
    const { children } = this.props;
    //usage of childre inside CurrentLocation component is optional ,return null if no children
    if (!children) return;
    //React.Children.map alllows us to run over each children passed by component and run a function on
    return React.Children.map(children, c => {
      //enables each of CurrentLocation's chidlren to recieve their orignal props and also receice the map instance, google API instace and map cent from <CurrentLocation/> component
      if (!c) return;
      return React.cloneElement(c, {
        //Reac.cloneElements is used to add props to a child inside component
        //use R.cloneElem to append props and children to child
        map: this.map, //append map instance
        google: this.props.google, //append google prop
        mapCenter: this.state.currentLocation //set map center as default of the marker
      });
    });
  }

  render() {
    const style = Object.assign({}, mapStyles.map);
    //the div below ref=map we are grabbing a reference to this component using reactDOM lib
    //by adding the renderChild() below, when </CurrentLocation> is rendered it will place the map on the page
    //and call lifecycle methods for the children
    return (
      <div>
        <div style={style} ref="map">
          Loading map . . .
        </div>
        {this.renderChildren()}
      </div>
    );
  }
}

export default CurrentLocation;

//inoder to make center dynamic, we need to pass it in through props, allows us not to hard code this.props in loadMap()
CurrentLocation.defaultProps = {
  zoom: 13,
  initialCenter: {
    lat: 40.723839,
    lng: -104.105515,
    name: ""
  },
  centerAroundCurrentLocation: false, //map should only use current location if boolean prop is true
  visible: false
};
