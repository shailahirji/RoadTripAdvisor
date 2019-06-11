import React, { Component } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
// import "bootstrap-daterangepicker/daterangepicker.css";
import { Redirect } from "react-router-dom";
import Header from "../Header/Header";
import LocationSearchInput from "../Functionality/LocationSearchInput";
import cx from 'classnames';

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
  
  }

  handleDestination(address) {
    this.setState({ to: address });
  }
  handleOrigin(address) {
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
      <div class="here otherBack" style={{backgroundImage:"url(images/last.jpg", backgroundRepeat:"no-repeat",backgroundPosition:"center", backgroundSize:"cover"}}>
        <Header />
        <div className="text-center" style={{height: "100vh"}}>
          <div className="landingpage-style">
            <p style={{ color:"#F8F8F8",opacity:0.01}} className="roadTripAdvisor">
             
              Share Road Trip Advisor with your friends!
            </p>
          </div>
          <div className="container" style={{marginTop:"270px"} }>
            <div class="row text-center pb-1" />
            <div class="row ">
              <div class="col-md-12">
                <div class="card ">
                  <div class="card-body" style={{backgroundImage:"url(images/find.jpg)", backgroundPosition:"center", backgroundSize:"cover"} }>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group ">
                          {/* <input type="Location" onChange={(event) => this.handleLocations(event)} class="form-control" id="from" placeholder="Starting From" /> */}
                          <LocationSearchInput
                            handleSelect={this.handleSelectOrigin}
                            handleLocation={this.handleOrigin}
                            locations={this.state.from}
                          />
                        </div>
                      </div>

                      <div class="col-md-4">
                        <div class="form-group ">
                          {/*<input type="Destination" onChange={(event) => this.handleLocations(event)} class="form-control" id="to" placeholder="Destination" /> */}
                          <LocationSearchInput
                            handleSelect={this.handleSelectDestination}
                            handleLocation={this.handleDestination}
                            locations={this.state.to}
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
                         class="btn pl-5 pr-5"
                  style={{backgroundColor:"#fe3c52", color:"white"}}
                          onClick={this.handleLocationSubmit}
                          disabled={!isEnabled}
                          type="button"
                        
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
         {/* <!-- Footer --> */}

	<footer class="footer">
		<div class="container">
			<div class="row">

				{/* <!-- Footer Column --> */}
				<div class="col-lg-4 footer_col">
					<div class="footer_about">
						{/* <!-- Logo --> */}
						<div class="logo_container">
							<div class="logo">
								<div>Excursion</div>
								<div>Road Trip Planner</div>
								<div class="logo_image"><img src="images/logo.png" alt=""/></div>
							</div>
						</div>
						<div class="footer_about_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar sed mauris eget tincidunt. Sed lectus nulla, tempor vel eleifend quis, tempus rut rum metus. Pellentesque ultricies enim eu quam fermentum hendrerit.</div>
						<div class="copyright">
                        {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
{/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
</div>
					</div>
				</div>

			

				

			</div>
		</div>
	</footer>

      </div>
    );
  }
}

export default StartTrip;
