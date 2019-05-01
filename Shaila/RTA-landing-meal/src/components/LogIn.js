import React, { Component } from "react";
import {  FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class LogIn extends Component {
  

        state = {
          email: "",
          password: "",
          redirectLogin:false,
          redirectSignUp:false,
          
        };
      
        disableButton=()=> {
         
          if(this.state.email.length> 0 && this.state.password.length>0){
            return false;
          }else{
            return true;
          }
              
      }
      validateLogInInfo=()=> {
          console.log("validate form method")
          this.setState({redirectLogin:true});       
      }

      goTosignUpPage=()=>{
        console.log("signup page method")
        this.setState({redirectSignUp:true}); 
      }

      renderRedirectToLogin() {
          if(this.state.redirectLogin){
            return <Redirect to={{ pathname: "/StartTripping"}} />;
          }
      }

      renderRedirectToSignUp() {
        if(this.state.redirectSignUp){
          return <Redirect to={{ pathname: "/signUp"}} />;
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
              Share Road Trip Advisor with your friends!
            </p>
            </div>
        </div>

    <div style={positionStyle} class="text-center">
   <div class="col-sm-offset-12">
        <div class="col-sm-12">
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
          {this.renderRedirectToLogin()}
          {this.renderRedirectToSignUp()}
          <button class="btn btn-warning pl-5 pr-5"
            block
            disabled={this.disableButton()}
            onClick={this.validateLogInInfo}
            type="button"
          > Login
          </button>
          </div>
         
          </div>
          <p></p>
          <div> <button  class="btn btn-warning pl-5 pr-5"
            block
            onClick={this.goTosignUpPage}
            type="button"
          > Sign Up
          </button></div>
      </div>
      </div>
    );
  }
}

export default LogIn;
