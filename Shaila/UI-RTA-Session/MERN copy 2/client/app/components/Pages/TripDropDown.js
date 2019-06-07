import React, { Component } from "react";
import Select from "react-select";

class TripDropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trips: [],
      tripsLoaded: false,
      selectedTrip: ""
    };
    //this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    if (this.props.userId) {
      fetch("/api/account/getuserstrips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: this.props.userId
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

  render() {
    // Create an array of all the trip names
    var tripNames = [];
    {
      this.state.trips.map(trip => {
        var newTrip = { label: trip.tripName };
        tripNames.push(newTrip);
        console.log(trip.tripName);
      });
    }

    if (this.state.tripsLoaded) {
      return (
        <div>
          <div className="savedTrips">
            <Select
              options={tripNames}
              placeholder="Saved Trips"
              isClearable
              isSearchable
              onChange={this.handleOnSelect}
            />
          </div>
        </div>
      );
    } else {
      return (
        <>
          <select />
        </>
      );
    }
  }
}

export default TripDropDown;
