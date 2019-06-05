import React, { Component } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
// import "bootstrap-daterangepicker/daterangepicker.css";
import { Redirect } from "react-router-dom";
import Header from "../Header/Header";
import LocationSearchInput from "../Functionality/LocationSearchInput";

class StartTrip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      from: "",
      to: "",
      redirect: false,
      validOrigin: false,
      validDestination: false
    };

    this.handleLocations = this.handleLocations.bind(this);
    this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
    this.handleDestination = this.handleDestination.bind(this);
    this.handleOrigin = this.handleOrigin.bind(this);
    this.handleSelectOrigin = this.handleSelectOrigin.bind(this);
    this.handleSelectDestination = this.handleSelectDestination.bind(this);
    this.handleSelectOrigin = this.handleSelectOrigin.bind(this);
    this.validateAddress = this.validateAddress.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  handleLocations(location) {
    if (location.target.id == "from") {
      this.setState({ from: location.target.value });
    } else {
      this.setState({ to: location.target.value });
    }
    // console.log('HEYY ',location.target.id)
  }

  handleLocationSubmit() {
    //this.props.dispatch(sendLocation(this.state));
    this.setState({ redirect: true });
    console.log("The Locations are ", this.state);
  }

  handleDestination(address) {
    this.setState({ to: address });
  }
  handleOrigin(address) {
    console.log(address)
    this.setState({ from: address });
  }

  handleSelectOrigin(address) {
    if (this.validateAddress(address)) {
      this.handleOrigin(address);
      this.setState({ validOrigin: true });
    } else {
      console.log("HELAS ORIGIN");
      this.setState({ validOrigin: false });
    }
  }
  handleSelectDestination(address) {
    if (this.validateAddress(address)) {
      this.handleDestination(address);
      this.setState({ validDestination: true });
    } else {
      console.log("HELAS");
      this.setState({ validDestination: false });
    }
  }

  validateAddress(address) {
    const addressCopy = address.split(",");
    if (addressCopy[addressCopy.length - 1].trim() !== "USA") {
      return false;
    } else {
      return true;
    }
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: "/mealpref", state: this.state }} />;
    }
  }

  render() {
    const isEnabled = this.state.validOrigin && this.state.validDestination;
    // console.log("HEHEH ", isEnabled);
    return (
      <div class="here otherBack">
        <Header />
        <div className="text-center">
          <div className="landingpage-style">
            <h1 className="roadTripAdvisor">Road Trip Advisor</h1>
            <p className="roadTripAdvisor">
              {" "}
              Share Road Trip Advisor with your friends!
            </p>
          </div>
          <div class="container my-1">
            <div class="row text-center pb-1" />
            <div class="row">
              <div class="col-md-12">
                <div class="card ">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-3">
                        <div class="form-group ">
                          {/* <input type="Location" onChange={(event) => this.handleLocations(event)} class="form-control" id="from" placeholder="Starting From" /> */}
                          <LocationSearchInput
                            handleSelect={this.handleSelectOrigin}
                            handleLocation={this.handleOrigin}
                            locations={this.state.from}
                          />
                        </div>
                      </div>

                      <div class="col-md-3">
                        <div class="form-group ">
                          {/*<input type="Destination" onChange={(event) => this.handleLocations(event)} class="form-control" id="to" placeholder="Destination" /> */}
                          <LocationSearchInput
                            handleSelect={this.handleSelectDestination}
                            handleLocation={this.handleDestination}
                            locations={this.state.to}
                          />
                        </div>
                      </div>
                      {/* <div class="col-md-3 ">
                        <div class="form-group ">
                          <DateRangePicker
                            onApply={this.handleApply}
                            isInvalidDate={this.checkInvalidDates}
                            opens="left"
                            containerStyles={{ display: "block" }}
                          >
                            <input
                              ref={this.dateRef}
                              id="dates"
                              type="text"
                              className="form-control"
                            />
                          </DateRangePicker>
                        </div>
                      </div> */}

                      <div class="col-md-3 ">
                        <div class="form-group ">
                          <input
                            type="time"
                            placeholder="Return"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-9">
                        <div class="form-group " />
                      </div>

                      <div class="col-md-3">
                        {this.renderRedirect()}
                        <button
                          onClick={this.handleLocationSubmit}
                          disabled={!isEnabled}
                          type="button"
                          class="btn btn-warning  pl-5 pr-5"
                        >
                          {" "}
                          Search{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StartTrip;
