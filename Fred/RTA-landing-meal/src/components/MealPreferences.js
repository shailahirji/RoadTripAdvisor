import React, { Component } from "react";
import Select from "react-select";
// import {Container, Col, Row,Button} from 'reactstrap'
import { Container } from "reactstrap";
import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient
} from "mongodb-stitch-browser-sdk";
import "./App.css";
import MealMap from "./MealMap.js";
import MealCard from "./MealCard.js";
import Card from "./Card.js";
import Itinerary from "./Itinerary";

class MealPreferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      count: 0,
      price_range: "any", //any price range
      distance: "any",
      ratings: "any",
      search_result: [],
      itinerary: [],
      userID: "",
      addToDB: false,
      savedTrips: [],
      selectedTrip: "",
      location: this.props.location.state
    };
    this.card = null;
    this.onMouseClickAdd = this.onMouseClickAdd.bind(this);
    this.addTrip = this.addTrip.bind(this);
    this.loadTrip = this.loadTrip.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
    this.loadSavedTrips = this.loadSavedTrips.bind(this);
    this.handleLoadChange = this.handleLoadChange.bind(this);
  }

  componentDidMount() {
    //intilize the app client
    this.client = Stitch.initializeDefaultAppClient("rta-rgwjk");
    //get a mongodb service client
    //this is used for logging in and communitction with stitch
    const mongodb = this.client.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );

    //get reference to the todos database
    this.db = mongodb.db("RTA");
    this.displayOnLoad();

    //Load saved trips into savedTrips array
    this.loadSavedTrips();
  }

  displayOnLoad() {
    //Anonymously log in and display cmments on load
    this.client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(console.log("success!"))
      .catch(console.error);
  }

  addTrip() {
    const locations = this.state.location;
    //insert the todo into the remote stitch db
    //then re query the db and display the new todos
    // this.db.collection("trip").insertOne({"ownder_id":this.client.auth.user.id,"tripname":locations.from+"-"+locations.to,
    //                                                   "trip":[{"start":locations.from},{"end":locations.to}],"waypoints":this.state.itinerary})
    //                                                   .then(console.log("success")).catch(console.error);
    try {
      this.db.collection("trip").updateOne(
        { tripname: locations.from + "-" + locations.to },
        {
          $set: {
            waypoints: this.state.itinerary,
            from: locations.from,
            to: locations.to
          }
        },
        { upsert: true }
      );
    } catch (e) {
      console.log(e);
    }

    // Load saved trips into savedTrips array
    this.loadSavedTrips();
  }

  // Load saved trips into savedTrips array and trip names into tripNames array
  loadSavedTrips() {
    this.db
      .collection("trip")
      .find({}, { tripname: 1, _id: 0 })
      .toArray()
      .then(savedTrips => {
        this.setState({ savedTrips });
      });
  }

  onMouseClickAdd(lat, lng, name) {
    this.addToDB = true;
    var newItinerary = this.state.itinerary;
    newItinerary.push({ event: name, pos: { lat: lat, lng: lng } });
    this.setState({
      itinerary: newItinerary
    });
    for (var i = 0; i < this.state.itinerary.length; i++) {
      console.log(this.state.itinerary[i].pos.lat);
      console.log(this.state.itinerary[i].pos.lng);
      console.log(this.state.itinerary[i].event);
    }
  }

  removeEvent(name) {
    var newItinerary = this.state.itinerary;
    console.log(name);
    for (var k = 0; k < newItinerary.length; k++) {
      console.log(newItinerary[k].event);
      if (newItinerary[k].event === name) {
        console.log("grapes");
        newItinerary.splice(newItinerary.indexOf(name), 1);
      }
    }
    this.setState({
      itinerary: newItinerary
    });
    for (var i = 0; i < this.state.itinerary.length; i++) {
      console.log(this.state.itinerary[i].pos.lat);
      console.log(this.state.itinerary[i].pos.lng);
      console.log(this.state.itinerary[i].event);
    }
    //array.splice(array.indexOf(key),1);
    // console.log("hi")
  }

  //get data back from child
  selectedKeywords = selection => {
    this.setState({
      selected: selection
    });
  };

  selectPrice = price => {
    this.setState({
      price_range: price
    });
  };

  selectedDistance = distance => {
    this.setState({
      distance: distance
    });
  };

  selectedRatings = rate => {
    this.setState({
      ratings: rate
    });
  };

  displayedResults = results => {
    this.setState({
      search_results: results
    });
  };

  handleLoadChange = event => {
    this.setState({ selectedTrip: event.target.value });
  };

  loadTrip() {
    console.log("Load the Damn Trip!");

    console.log(this.state.selectedTrip);

    var i;
    for (i = 0; i < this.state.savedTrips.length; i++) {
      console.log(this.state.savedTrips[i].tripname);
      if (this.state.selectedTrip == this.state.savedTrips[i].tripname) {
        var newLocation = this.state.location;
        newLocation.from = this.state.savedTrips[i].from;
        newLocation.to = this.state.savedTrips[i].to;

        this.setState({
          itinerary: this.state.savedTrips[i].waypoints,
          location: newLocation
        });
        break;
      }
    }
  }

  render() {
    var selectStyle = { position: "fixed", top: 600, left: 400 };
    var buttonStyle = { position: "fixed", top: 600, left: 200 };
    return (
      <Container>
        {/* <div>
          <Button style={buttonStyle} >Meal</Button>
          <Button style={buttonStyle} onClick={this.displayCard('travelers') } >Travelers</Button>
         </div> */}
        <MealCard
          color="#ffc107"
          getKeywordList={this.selectedKeywords}
          getPrice={this.selectPrice}
          getRadius={this.selectedDistance}
          getRatings={this.selectedRatings}
        />
        <MealMap
          search={this.state.selected}
          price={this.state.price_range}
          reviews={this.state.ratings}
          radius={this.state.distance}
          locations={this.state.location}
          handleClick={this.onMouseClickAdd}
        />
        <Itinerary
          events={this.state.itinerary}
          locations={this.state.location}
          handleClick={this.removeEvent}
        />
        <button
          type="button"
          style={buttonStyle}
          class="btn btn-warning pl-5 pr-5"
          disabled={!this.addToDB}
          onClick={this.addTrip}
        >
          Save Trip
        </button>
        <form style={selectStyle}>
          <select name="trip" onChange={this.handleLoadChange}>
            {this.state.savedTrips.map(trip => {
              return <option value={trip.tripname}>{trip.tripname}</option>;
            })}
          </select>
          <button
            type="button"
            class="btn btn-warning pl-5 pr-5"
            onClick={this.loadTrip}
          >
            Load
          </button>
        </form>
      </Container>
    );
  }
}

export default MealPreferences;
