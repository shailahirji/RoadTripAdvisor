import React, { Component } from 'react';
import 'whatwg-fetch';
import { Redirect } from "react-router-dom";
import {getFromStorage,setInStorage} from '../../utils/storage';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      firstName:'',
      lastName:'' ,
    redirect:false  };
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
     this.onSignUp = this.onSignUp.bind(this);
     this.onSignin = this.onSignin.bind(this);
     this.logout = this.logout.bind(this);

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

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpFirstName(event) {
    this.setState({
      firstName: event.target.value,
    });
  }

  onTextboxChangeSignUpLastName(event) {
    this.setState({
      lastName: event.target.value,
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

  onSignUp(){

    //grab state 
    //post request to backend  
    const{signUpEmail,signUpPassword,firstName,lastName}=this.state;
    this.setState({isLoading:true,});

    //post request to backend , creates API request to out end point
    fetch('/api/account/signup',{ 
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email:signUpEmail,
        password:signUpPassword,
        firstName:firstName,
        lastName:lastName
      }),
    }).then(res=>res.json())
    .then(json=>{ 

      if(json.success){
        this.setState({
          signUpError:json.message,
          isLoading:false,
          signUpEmail:'',
          signUpPassword:'',
          firstName:'',
          lastName:''
        });
      } else{
        this.setState({
          signUpError:json.message,
          isLoading:false,
        });
      }
    });
  }
 
  logout(){

    this.setState({
      isLoading:true
    }); 

    const obj= getFromStorage('the_main_app');

    if(obj && obj.token){
      const {token}=obj;
      //verify the token 
      fetch('/api/account/logout?token='+token).then(res=>res.json()).then(json=>{
        if(json.success){
            this.setState({
              token:'',isLoading:false
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


  render() {
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
          <div>
            {(signInError) ? (<p>{signInError}</p>):(null)}
            <p>Sign In</p>
            <input
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
            />
            <br />
            <button onClick={this.onSignin}>Sign In</button>
          </div>
          <br />
          <br />
          <div>
            {
              (signUpError) ? (
                <p>{signUpError}</p>
              ) : (null)
            }
            <p>Sign Up</p>
            <input
              type="email"
              placeholder="Email"
              value={signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail}
            /><br />
            <input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}
            /><br />
             <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={this.onTextboxChangeSignUpFirstName}
            /><br />
             <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={this.onTextboxChangeSignUpLastName}
            /><br />
            <button onClick={this.onSignUp}>Sign Up</button>
            {this.renderRedirect()}
          </div>
        </div>
      );
    

  
    
  }
}

export default Home;
