import React, { Component } from "react";
import Select from "react-select";
import Header from "../Header/Header";
import { Redirect } from "react-router-dom";
import { getFromStorage, setInStorage } from "../../utils/storage";
import {
  ButtonDropdown,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";
import { FusionTablesLayer } from "react-google-maps";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      selectedOption: null,
      redirectNewTrip: false,
      redirectMealPref: false,
      tripName: "",
      from: "",
      to: "",
      trips: [],
      userId: "",
      waypoints: []
    };
    this.handleCreateNewTrip = this.handleCreateNewTrip.bind(this);
    this.renderRedirectToCreateNewTrip = this.renderRedirectToCreateNewTrip.bind(
      this
    );
    this.renderRedirectLoadTrip = this.renderRedirectLoadTrip.bind(this);
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
            console.log("SUCCES");
            this.setState({
              userId: token,
              isLoading: false
            });
          }
        });

      fetch("/api/account/getuserstrips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: token
        })
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              trips: json.trips,
              tripsLoaded: true
            });
          }
        });
    }
  }

  // componentDidUpdate() {
  //   if (this.state.redirectMealPref) {
  //     this.renderRedirectLoadTrip();
  //   }
  // }

  renderRedirectLoadTrip() {
    if (this.state.redirectMealPref) {
      console.log("Redirect");
      console.log(this.state.to);
      console.log(this.state.from);
      return <Redirect to={{ pathname: "/mealpref", state: this.state }} />;
    }
  }

  handleCreateNewTrip() {
    console.log("user wants to create new trip");
    this.setState({ redirectNewTrip: true });
  }

  renderRedirectToCreateNewTrip() {
    if (this.state.redirectNewTrip) {
      return <Redirect to={{ pathname: "/StartTrip" }} />;
    }
  }

  render() {
    var positionStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    };
    var mainDiv = {
      marginTop: 150,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    };
    var dropDownItemStyle = {
      opacity: 0.6
    };
    return (
      <div class="here otherBack">
        <div className="text-center">
          <Header />
          <div style={mainDiv} className="landingpage-style">
            <h1 className="roadTripAdvisor">Welcome to Your Profile</h1>
            <p className="roadTripAdvisor"> What Would You Like to do Today?</p>
          </div>
        </div>
        <div class="row text-center pb-1" style={positionStyle}>
          {" "}
          <button
            class="btn btn-warning pl-5 pr-5"
            block
            type="button"
            onClick={this.handleCreateNewTrip}
          >
            {" "}
            Create A New Trip
          </button>
        </div>
        <p />
        <div style={positionStyle} class="text-center">
          <ButtonDropdown
            direction="right"
            isOpen={this.state.btnDropright}
            toggle={value => {
              this.setState({ btnDropright: !this.state.btnDropright });
              if (
                value.currentTarget.textContent != null &&
                value.currentTarget.textContent != "Open Existing Trip"
              ) {
                var to = "";
                var from = "";
                var waypoints = [];
                this.state.trips.map(trip => {
                  if (trip.tripName == value.currentTarget.textContent) {
                    to = trip.to;
                    from = trip.from;
                    waypoints = trip.waypoints;
                  }
                });
                this.setState({
                  tripName: value.currentTarget.textContent,
                  redirectMealPref: true,
                  to: to,
                  from: from,
                  waypoints: waypoints
                });
              }
            }}
          >
            <DropdownToggle caret color="warning">
              Open Existing Trip
            </DropdownToggle>
            <DropdownMenu style={dropDownItemStyle}>
              {this.state.trips.map(trip => {
                return <DropdownItem>{trip.tripName}</DropdownItem>;
              })}
            </DropdownMenu>
          </ButtonDropdown>
        </div>
        {this.renderRedirectToCreateNewTrip()}
        {this.renderRedirectLoadTrip()}
      </div>
    );
  }
}

export default Profile;
