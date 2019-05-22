import React, { Component } from "react";
import Select from "react-select";
import Header from "../Header/Header";
import { Redirect } from "react-router-dom";
import {
  ButtonDropdown,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      redirectNewTrip: false,
      redirectMealPref: false,
      tripName: "",
      from: "",
      to: "",
      trips: [],
      userId: "5ce42aa88a6b70154383bbe9"
    };
    this.handleCreateNewTrip = this.handleCreateNewTrip.bind(this);
    this.renderRedirectToCreateNewTrip = this.renderRedirectToCreateNewTrip.bind(
      this
    );
    this.renderRedirectLoadTrip = this.renderRedirectLoadTrip.bind(this);
  }

  componentDidMount() {
    if (this.state.userId) {
      fetch("/api/account/getuserstrips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: this.state.userId
        })
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              trips: json.trips,
              tripsLoaded: true
            });
          } else {
            this.setState({
              tripsLoaded: false
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
                this.state.trips.map(trip => {
                  if (trip.tripName == value.currentTarget.textContent) {
                    to = trip.to;
                    from = trip.from;
                  }
                });
                this.setState({
                  tripName: value.currentTarget.textContent,
                  redirectMealPref: true,
                  to: to,
                  from: from
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
