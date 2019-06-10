import React, { Component } from "react";
import "whatwg-fetch";
import { Redirect } from "react-router-dom";
import { getFromStorage, setInStorage } from "../../utils/storage";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";

//THIS IS THE SIGN - IN PAGE!!! ON CLICKING SIGN UP, YOU GET RE DIRECTED TO SIGN UP PAGE. PAGE B
class A extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: "",
      signInError: "",
      signInEmail: "",
      signInPassword: "",
      redirect: false,
      signUpRedirect: false,
      successfulSignUp:""
    };
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(
      this
    );
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(
      this
    );
    this.onClickSignUp = this.onClickSignUp.bind(this);
    this.onSignin = this.onSignin.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");

    if (obj && obj.token) {
      const { token } = obj;
      //verify the token
      fetch("/api/account/verify?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      //no token, not logged in
      this.setState({ isLoading: false });
    }
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: "/StartTrip" }} />;
    }
  }

  signUpRedirect() {
    if (this.state.signUpRedirect) {
      return <Redirect to={{ pathname: "/b" }} />;
    }
  }

  onClickSignUp() {
    this.setState({ signUpRedirect: true });
  }
  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value
    });
  }

  onSignin() {
    //grab state
    //post request to backend
    const { signInEmail, signInPassword } = this.state;
    this.setState({ isLoading: true });

    //post request to backend , creates API request to out end point
    fetch("/api/account/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setInStorage("the_main_app", { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInEmail: "",
            signInPassword: "",
            token: json.token,
            redirect: true
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false
          });
        }
      });
  }

  render() {

    let message=""
    if(this.props.location.state){
        message="You've been successfully Registered."
    }
    var positionStyle = {
              display: "flex",
              flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "200px"
              // justifyContent: "center"
            };
            var positionStyle = {
              display: "flex",
              flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "200px"
              // justifyContent: "center"
            };
            var inputStyle = { opacity: 0.7 };

    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
    
    } = this.state;

    if (isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <div>
        <div class="here otherBack">
          {/* <div className="text-center">
            <div className="landingpage-style">
              <h1 className="roadTripAdvisor">Road Trip Advisor</h1>
              <p className="roadTripAdvisor">
                {" "}
                Share Road Trip Advisor with your friends!
              </p>
            </div>
          </div> */}


   	{/* <!-- Home --> */}

 	<div class="home_about_us">
 		{/* <!-- Image by https://unsplash.com/@peecho --> */}
 		<img src='images/about_background.jpg' />
     {/* <div class="home_background parallax-window" data-parallax="scroll" data-image-src="images/about_background.jpg" data-speed="0.8"></div> */}
 		<div class="container">
 			<div class="row">
 				<div class="col">
 					<div class="home_content">
 						<div class="home_content_inner">
 							<div class="home_title">About us</div>
 							<div class="home_breadcrumbs">
 								<ul class="home_breadcrumbs_list">
									<li class="home_breadcrumb"><a href="index.html">Home</a></li>
									<li class="home_breadcrumb">About us</li>
								</ul>
						</div>
					</div>
					</div>
 				</div>
 			</div>
 		</div>		
	</div>


          <div style={positionStyle} class="text-center">
            <div class="col-sm-offset-12">
              <div class="col-sm-12">
                {signInError ? <p>{signInError}</p> : null}
                {message ? <p>{message}</p> : null}
               <p>{this.state.successfulSignUp}</p>
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
                  <FormControl
                    style={inputStyle}
                    value={signInPassword}
                    onChange={this.onTextboxChangeSignInPassword}
                    type="password"
                  />
                </FormGroup>

                <button
                    class="btn pl-5 pr-5"
                  style={{backgroundColor:"#fe3c52", color:"white"}}
                  block
                  onClick={this.onSignin}
                  type="button"
                >
                  {" "}
                  Login
                </button>
              </div>
            </div>
            <p />
            <div>
              {" "}
              <button
                  class="btn pl-5 pr-5"
                  style={{backgroundColor:"#fe3c52", color:"white"}}
                block
                onClick={this.onClickSignUp}
                type="button"
              >
                {" "}
                Sign Up
              </button>
            </div>
            {this.renderRedirect()}
            {this.signUpRedirect()}
          </div>
        </div>
      </div>
    );
  }
}

export default A;
