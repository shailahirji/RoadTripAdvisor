import React, { Component } from 'react';
import 'whatwg-fetch';
import { Redirect } from "react-router-dom";
import {getFromStorage,setInStorage} from '../../utils/storage';

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      startDestError: '',
      endDestError: '',
      tripError:'',
      startDest:'',
      endDest:''  ,
     tripOwnerID:'',
     someDetails:'',
     redirect:false };
 
    this.onTextboxChangeStartDest = this.onTextboxChangeStartDest.bind(this);
    this.onTextboxChangeEndDest = this.onTextboxChangeEndDest.bind(this);
     this.onEnterTrip = this.onEnterTrip.bind(this);
     this.onTextboxChangeSomeDetails=this.onTextboxChangeSomeDetails.bind(this);
     this.logout = this.logout.bind(this);

  }

  renderRedirect() {

    if (this.state.redirect) {
      return <Redirect to={{ pathname: "/" }} />;
    }
  };

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

  onTextboxChangeSomeDetails(event) {
    this.setState({
      someDetails: event.target.value,
    });

  }

  onEnterTrip(){
    //grab state 
    //post request to backend  
    const{startDest,endDest,someDetails}=this.state;
    this.setState({isLoading:true,});

     //add them to array 
     let detailsArray=someDetails.split(",");
     //console.log(detailsArray)
    
     //from storage get the token 
    const obj=getFromStorage('the_main_app');
    //console.log(obj.token)
    
    if(obj && obj.token){
        const {token}=obj;
        // console.log("inside obj and token condition")
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
        //setInStorage('the_main_app',{token:json.token});
        this.setState({
          tripError:json.message,
          isLoading:false,
          startDest:'',
          endDest:'',
          someDetails:'',
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
              token:'',isLoading:false,redirect:true
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
      tripError, 
    startDest,
    endDest,
    someDetails
    }= this.state;

    if(isLoading){
     
      return (<div><p>Loading...</p></div>);
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
      <button onClick={this.onEnterTrip}>Save trip</button>
      {this.renderRedirect()}
  </div>
    );
  }
}

export default Account;
