import React, { Component } from "react";
import {  FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class SignUp extends Component {
  
    
        state = {
          email: "",
          password: "",
          username:"",
          redirectLogin:false,
          redirectSignUp:false,
          
        };
      
        disableButton=()=> {
          console.log("has input data")
          if(this.state.email.length> 0 && this.state.password.length>0 && this.state.username.length>0){
            return false;
          }else{
            return true;
          }
              
      }
      validateForm=()=> {
          console.log("validate form method")
          this.setState({redirectLogin:true});       
      }

      renderRedirectLogin() {
          if(this.state.redirectLogin){
            return <Redirect to={{ pathname: "/"}} />;
          }
      }
      
      handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }
    
      handleSubmit = event => {
        event.preventDefault();
      }
 render(){
    var positionStyle={
        display: "flex",
        flexDirection: "column",
       alignItems:"center",
        justifyContent:"center",
  }
  var inputStyle={ opacity:0.7}

    return (
      <div class="here otherBack">
        <div className="text-center">
          <div className="landingpage-style">
            <h1 className="roadTripAdvisor">Road Trip Advisor</h1>
            <p className="roadTripAdvisor">
              {" "}
              Sign Up for Road Trip Advisor. Your Adventure Awaits!
            </p>
            </div>
        </div>

    <div style={positionStyle} class="text-center">
   <div class="col-sm-offset-12">
       
        <div class="col-sm-12">
        <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
            style={inputStyle} 
              autoFocus
              type="username"
              value={this.state.username}
             onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
            style={inputStyle} 
              autoFocus
              type="email"
              value={this.state.email}
             onChange={this.handleChange}
            />
          </FormGroup>
          </div>
          <div class="col-sm-12">
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl style={inputStyle} 
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          {this.renderRedirectLogin()}
          <button class="btn btn-warning pl-5 pr-5"
            block
            disabled={this.disableButton()}
            onClick={this.validateForm}
            type="button"
          > Submit Account Information 
          </button>
          </div>
         
          </div>
          <p></p>
      </div>
      </div>

    );
  }
}

export default SignUp;
