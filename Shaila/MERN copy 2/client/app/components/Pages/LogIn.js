import React, { Component } from 'react';
import 'whatwg-fetch';
import { Redirect } from "react-router-dom";
import {getFromStorage,setInStorage} from '../../utils/storage';
import {  FormGroup, FormControl, FormLabel } from "react-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
    redirect:false,
    signUpRedirect:false  };
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onClickSignUp = this.onClickSignUp.bind(this);
    this.onSignin = this.onSignin.bind(this);

  }

  componentDidMount() {
    const obj= getFromStorage('the_main_app');

    if(obj && obj.token){
      const {token}=obj;
      //verify the token 
      fetch('/api/account/verify?token='+token).then(res=>res.json()).then(json=>{
        if(json.success){
            this.setState({
              token:token,isLoading:false
            });
        }else{
          this.setState({
            isLoading:false,
          });
        }
    });
    }else{
      //no token, not logged in
      this.setState({isLoading:false
      });
    }
 }

 renderRedirect() {

  if (this.state.redirect) {
    return <Redirect to={{ pathname: "/Account" }} />;
  }
};

signUpRedirect() {

  if (this.state.signUpRedirect) {
    return <Redirect to={{ pathname: "/SignUp" }} />;
  }
};

onClickSignUp() {
  this.setState({signUpRedirect:true
  });
 
};
  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onSignin(){
    //grab state 
    //post request to backend  
    const{signInEmail,signInPassword}=this.state;
    this.setState({isLoading:true,});

    //post request to backend , creates API request to out end point
    fetch('/api/account/signin',{ 
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email:signInEmail,
        password:signInPassword,
      }),
    }).then(res=>res.json())
    .then(json=>{ 
      if(json.success){
        setInStorage('the_main_app',{token:json.token});
        this.setState({
          signInError:json.message,
          isLoading:false,
          signInEmail:'',
          signInPassword:'',
          token:json.token,
          redirect:true
        });
      } else{
        this.setState({
          signInError:json.message,
          isLoading:false,
        });
      }
    });
    
  }
 
  
  render() {
    var positionStyle={
      display: "flex",
      flexDirection: "column",
     alignItems:"center",
      justifyContent:"center",
}
var inputStyle={ opacity:0.7}

    const{
      isLoading,
      token,
      signInError, 
      signInEmail,
      signInPassword,
      signUpEmail,
      signUpPassword,
      signUpError,
      firstName,
      lastName
    }= this.state;

    if(isLoading){
      return (<div><p>Loading...</p></div>);
    }

    
      return(
        <div>
    
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
        {(signInError) ? (<p>{signInError}</p>):(null)}
          <FormGroup controlId="email" bsSize="large">
            <FormLabel>Email</FormLabel>
            <FormControl
            style={inputStyle} 
              autoFocus
              type="email"
              value={signInEmail}
             onChange={this.onTextboxChangeSignInEmail}
            />
          </FormGroup>
          </div>
          <div class="col-sm-12">
          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Password</FormLabel>
            <FormControl style={inputStyle} 
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
              type="password"
            />
          </FormGroup>
   
          <button class="btn btn-warning pl-5 pr-5"
            block
            onClick={this.onSignin}
            type="button"
          > Login
          </button>
          </div>
         
          </div>
          <p></p>
          <div> <button  class="btn btn-warning pl-5 pr-5"
            block
            onClick={this.onClickSignUp}
            type="button"
          > Sign Up
          </button></div>
          {this.renderRedirect()}
          {this.signUpRedirect()}

      </div>
      </div>
        </div>
      );
    

  
    
  }
}

export default Login;
