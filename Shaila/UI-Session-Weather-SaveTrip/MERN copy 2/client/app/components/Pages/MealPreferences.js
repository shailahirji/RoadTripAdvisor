import React, { Component } from "react";
import "whatwg-fetch";
import { getFromStorage, setInStorage } from "../../utils/storage";
import Header from "../Header/Header";
import MealMap from "./MealMap.js";
import MealCard from "./MealCard.js";
import Route from "./Route";
import { Container } from "reactstrap";


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
    this.removeWaypoint = this.removeWaypoint.bind(this);
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
    //grab state
    //post request to backend
    const locations = this.props.location.state;
    const from = locations.from;
    const to = locations.to;
    this.setState({ isLoading: true });

    //add them to array
    let waypoints = this.state.route;
    console.log("LES WP ", waypoints);
    //from storage get the token
    const obj = getFromStorage("the_main_app");

    if (obj && obj.token) {
      const { token } = obj;
      //post request to backend , creates API request to out end point
      fetch("/api/account/savetrip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: token,
          tripName: from + "-" + to,
          from: from,
          to: to,
          waypoints: waypoints
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
    console.log("WE JUST CLICKED ", name);
    this.addToDB = true;
    var newRoute = this.state.route;
    newRoute.push({ waypointName: name, lat: lat, lng: lng });
    this.setState({
      route: newRoute
    });
  }

  removeWaypoint(name) {
    var newRoute = this.state.route;
    for (var k = 0; k < newRoute.length; k++) {
      if (newRoute[k].waypointName === name) {
        newRoute.splice(newRoute.indexOf(name), 1);
      }
    }
    this.setState({
      route: newRoute
    });
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
      position: "relative",
      width: "100%"
    };

    return (
      <div
        className="row p-4"
        style={{ backgroundImage: "url(images/home.jpg)" }}
      >
        {/* <!-- Header --> */}

        <header class="header">
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="header_container d-flex flex-row align-items-center justify-content-start">
                  {/* <!-- Logo --> */}
                  <div class="logo_container">
                    <div class="logo">
                      <div>Excursion</div>
                      <div>Road Trip Planner</div>
                      <div class="logo_image">
                        <img src="images/logo.png" alt="" />
                      </div>
                    </div>
                  </div>

                  {/* <!-- Main Navigation --> */}
                  <nav class="main_nav ml-auto">
                    <ul class="main_nav_list">
                      <li class="main_nav_item">
                        <a href="/starttrip">Home</a>
                      </li>
                      <li className="main_nav_item">
                        <a href="profile">Dashboard</a>
                      </li>
                      <li class="main_nav_item">
                        <a href="accomodations">Accomodations</a>
                      </li>
                      <li class="main_nav_item ">
                        <a href="contactus">Contact</a>
                      </li>
                      <li className="main_nav_item active">
                        <a href="#">About us</a>
                      </li>
                    </ul>
                  </nav>

                  {/* <!-- Hamburger --> */}
                  <div class="hamburger ml-auto">
                    <i class="fa fa-bars" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div
          className="col-md-4 "
          style={{ paddingTop: "150px", alignItems: "center" }}
        >
          <div className="row">
            <MealCard
              // style={mealCard}
              color="#ffc107"
              getKeywordList={this.selectedKeywords}
              getPrice={this.selectPrice}
              getRadius={this.selectedDistance}
              getRatings={this.selectedRatings}
              locations={this.props.location.state}
              location={this.props.location.state.from}
            />
          </div>
          <div className="row">
            <Route
              waypoints={this.state.route}
              from={this.props.location.state.from}
              to={this.props.location.state.to}
              handleClick={this.removeWaypoint}
            />
            <div
              style={{
                backgroundColor: "rgba(225, 225, 225, 0.43)",
                paddingLeft: "3px"
              }}
            >
              <button
                type="button"
                class="btn pl-5 pr-5"
                  style={{backgroundColor:"#fe3c52", color:"white"}}
                
                disabled={false}
                onClick={this.onEnterTrip}
              >
                Save Trip Changes
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-8 p-1">
          <MealMap
            search={this.state.selected}
            price={this.state.price_range}
            reviews={this.state.ratings}
            radius={this.state.distance}
            locations={this.props.location.state}
            handleClick={this.onMouseClickAdd}
            route={this.state.route}
          />
        </div>
      </div>

    
    );
  }
}

export default MealPreferences;
