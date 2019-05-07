import React, { Component } from 'react';
import 'whatwg-fetch';
import {getFromStorage,setInStorage} from '../../utils/storage';

class Merge extends Component {
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
      startDestError: '',
      endDestError: '',
      tripError:'',
      startDest:'',
      endDest:''  ,
     tripOwnerID:'',
    someDetails:'' };
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
     this.onSignUp = this.onSignUp.bind(this);
     this.onSignin = this.onSignin.bind(this);
     this.logout = this.logout.bind(this);
     this.onTextboxChangeStartDest = this.onTextboxChangeStartDest.bind(this);
     this.onTextboxChangeEndDest = this.onTextboxChangeEndDest.bind(this);
      this.onEnterTrip = this.onEnterTrip.bind(this);
      this.onTextboxChangeSomeDetails=this.onTextboxChangeSomeDetails.bind(this);

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

 onTextboxChangeSomeDetails(event) {
    this.setState({
      someDetails: event.target.value,
    });

  }

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

  onTextboxChangeStartDest(event) {
    this.setState({
      startDest: event.target.value,
    });
  }

  onTextboxChangeEndDest(event) {
    this.setState({
      endDest: event.target.value,
    });
  }

  onEnterTrip(){
    //grab state 
    //post request to backend  
    const{startDest,endDest,someDetails}=this.state;
    this.setState({isLoading:true,});

    //add them to array 
    let detailsArray=someDetails.split(",");
    console.log(detailsArray)
    
    //from storage get the token 
    const obj=getFromStorage('the_main_app');

    if(obj && obj.token){
        const {token}=obj;
        
    //post request to backend , creates API request to out end point
    fetch('/api/account/addTrip',{ 
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        startDest:startDest,
        endDest:endDest,
        token:token,
        waypoints:detailsArray
      }),
    }).then(res=>res.json())
    .then(json=>{ 
      if(json.success){
        setInStorage('the_main_app',{token:json.token});
        this.setState({
          tripError:json.message,
          isLoading:false,
          startDest:'',
          endDest:'',
          token:json.token,
          waypoints:[]
        });
      } else{
        this.setState({
        tripError:json.message,
          isLoading:false,
        });
      }
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
      lastName,
      tripError, 
    startDest,
    someDetails,
    endDest,
    
    }= this.state;

    if(isLoading){
      return (<div><p>Loading...</p></div>);
    }

    if(!token){
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
          </div>
        </div>
      );
    }

    return (
      <div>
        
          Account
          <button onClick={this.logout}>Logout</button>
          {(tripError) ? (<p>{tripError}</p>):(null)}
          <p>Start Dest</p>
          <input
            type="text"
            placeholder="start dest"
            value={startDest}
            onChange={this.onTextboxChangeStartDest}
          />
          <br />
          <input
            type="text"
            placeholder="End dest"
            value={endDest}
            onChange={this.onTextboxChangeEndDest}
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="some details"
            value={someDetails}
            onChange={this.onTextboxChangeSomeDetails}
          />
          <br />
          <button onClick={this.onEnterTrip}>Add Trip</button>
            
      </div>
    );
  }
}

export default Merge;
