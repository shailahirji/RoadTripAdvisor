import React, { Component } from "react";
import Select from "react-select";
import Header from "./Header.js";
import { Redirect } from "react-router-dom";
import { ButtonDropdown,UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';

class Profile extends Component {
  state = {
    selectedOption: null,
    redirectNewTrip:false
  };

  handleCreateNewTrip=()=> {
    console.log("user wants to create new trip")
    this.setState({redirectNewTrip:true});       
}

renderRedirectToCreateNewTrip() {
  if(this.state.redirectNewTrip){
    return <Redirect to={{ pathname: "/StartTripping"}} />;
  }
}

  render() {
   
    var positionStyle={
      
      display: "flex",
      flexDirection: "column",
      alignItems:"center",
      justifyContent:"center"
}
    var mainDiv={
      marginTop:150,
      display: "flex",
      flexDirection: "column",
      alignItems:"center",
      justifyContent:"center"
    }
var dropDownItemStyle={
  opacity:0.6
}
    return (
      <div class="here otherBack">
        <div className="text-center">
        <Header/>
          <div  style={mainDiv} className="landingpage-style">
            <h1 className="roadTripAdvisor">Welcome to Your Profile</h1>
            <p className="roadTripAdvisor">
              {" "}
              What Would You Like to do Today? 
            </p>
            </div>
        </div>
        <div class="row text-center pb-1" style={positionStyle}> <button  class="btn btn-warning pl-5 pr-5"
            block
            type="button"
            onClick={this.handleCreateNewTrip}
          > Create A New Trip
          </button>
          </div>
          <p></p>
          <div style={positionStyle} class="text-center">
          <ButtonDropdown direction="right" isOpen={this.state.btnDropright} toggle={() => { this.setState({ btnDropright: !this.state.btnDropright }); }}>
          <DropdownToggle  caret color="warning">
          Open Existing Trip    
         </DropdownToggle>
          <DropdownMenu style={dropDownItemStyle}>
          <DropdownItem>Seattle,WA,USA-Kirkland,WA,USA</DropdownItem>
          <DropdownItem>Orlando,FL,USA-SanFransisco,CA,USA</DropdownItem>
           </DropdownMenu>
          </ButtonDropdown>
          </div>
          {this.renderRedirectToCreateNewTrip()}
          
        </div>
        

    
    );
  }
}

export default Profile;
