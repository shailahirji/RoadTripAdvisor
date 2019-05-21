import React, { Component } from "react";
import "whatwg-fetch";
import { getFromStorage, setInStorage } from "../../utils/storage";
import Header from "../Header/Header";
import MealMap from "./MealMap.js";
import MealCard from "./MealCard.js";
import Route from "./Route";

class MealPreferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      price_range: "any", //any price range
      distance: "any",
      ratings: "any",
      search_result: [],
      route: [],
      changesToRoute: false,
      isLoading: true,
      token: "",
      tripError: "",
      startDest: "",
      endDest: "",
      wayPoints: "",
      redirect: false
    };
    this.card = null;
    this.onMouseClickAdd = this.onMouseClickAdd.bind(this);
    // this.addTrip=this.addTrip.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
    this.selectedKeywords = this.selectedKeywords.bind(this);
    this.selectPrice = this.selectPrice.bind(this);
    this.selectedDistance = this.selectedDistance.bind(this);
    this.selectedRatings = this.selectedRatings.bind(this);
    this.displayedResults = this.displayedResults.bind(this);
    this.onEnterTrip = this.onEnterTrip.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");

    if (obj && obj.token) {
      const { token } = obj;
      //verify the token
      fetch("/api/account/verify?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      //no token, not logged in
      this.setState({ isLoading: false });
    }
  }

  onEnterTrip() {
    console.log("Here");
    //grab state
    //post request to backend
    const locations = this.props.location.state;
    const from = locations.from;
    const to = locations.to;
    this.setState({ isLoading: true });

    //add them to array
    let detailsArray = this.state.route;
    console.log(detailsArray);

    //from storage get the token
    const obj = getFromStorage("the_main_app");
    //console.log(obj.token)

    if (obj && obj.token) {
      const { token } = obj;
      // console.log("inside obj and token condition")
      //post request to backend , creates API request to out end point
      fetch("/api/account/addTrip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          startDest: from,
          endDest: to,
          token: token,
          waypoints: detailsArray
        })
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            //setInStorage('the_main_app',{token:json.token});
            this.setState({
              tripError: json.message,
              isLoading: false,
              startDest: "",
              endDest: "",
              someDetails: "",
              waypoints: []
            });
          } else {
            this.setState({
              tripError: json.message,
              isLoading: false
            });
          }
        });
    }
  }

  onMouseClickAdd(lat, lng, name) {
    this.addToDB = true;
    var newRoute = this.state.route;
    newRoute.push({ event: name, lat: lat, lng: lng });
    this.setState({
      route: newRoute
    });
    for (var i = 0; i < this.state.route.length; i++) {
      console.log(this.state.route[i].lat);
      console.log(this.state.route[i].lng);
      console.log(this.state.route[i].event);
    }
  }

  removeEvent(name) {
    var newRoute = this.state.route;
    console.log(name);
    for (var k = 0; k < newRoute.length; k++) {
      console.log(newRoute[k].event);
      if (newRoute[k].event === name) {
        console.log("grapes");
        newRoute.splice(newRoute.indexOf(name), 1);
      }
    }
    this.setState({
      route: newRoute
    });
    for (var i = 0; i < this.state.route.length; i++) {
      console.log(this.state.route[i].lat);
      console.log(this.state.route[i].lng);
      console.log(this.state.route[i].event);
    }
  }

  //get data back from child
  selectedKeywords(selection) {
    this.setState({
      selected: selection
    });
  }

  selectPrice(price) {
    this.setState({
      price_range: price
    });
  }

  selectedDistance(distance) {
    this.setState({
      distance: distance
    });
  }

  selectedRatings(rate) {
    this.setState({
      ratings: rate
    });
  }

  displayedResults(results) {
    this.setState({
      search_results: results
    });
  }

  render() {
    var buttonStyle = { position: "fixed", top: 600, left: 200 };
    var mealCard = {
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      flexDirection: "row",
      position: "relative"
    };

    return (
      <div>
        <Header />

        <p />

        <MealCard
          style={mealCard}
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
          locations={this.props.location.state}
          handleClick={this.onMouseClickAdd}
        />
        <Route
          waypoints={this.state.route}
          from={this.props.location.state.from}
          to={this.props.location.state.to}
          handleClick={this.removeEvent}
        />
        <button
          type="button"
          style={buttonStyle}
          class="btn btn-warning pl-5 pr-5"
          disabled={!this.addToDB}
          onClick={this.onEnterTrip}
        >
          Save Trip Changes
        </button>
      </div>
    );
  }
}

export default MealPreferences;
