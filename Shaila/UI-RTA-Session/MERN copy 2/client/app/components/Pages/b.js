import React, { Component } from "react";
import "whatwg-fetch";
import { Redirect } from "react-router-dom";
import { getFromStorage, setInStorage } from "../../utils/storage";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";

//THIS IS THE SIGN UP PAGE. ON SUCCESFUL SIGN UP YOU GET RE DIRECTED BACK TO LOG IN PAGE 
class B extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: "",
      signUpError: "",
      signUpEmail: "",
      signUpPassword: "",
      firstName: "",
      lastName: "",
      redirect: false,
      message:""
    };

    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(
      this
    );
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(
      this
    );
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(
      this
    );
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(
      this
    );
    this.onSignUp = this.onSignUp.bind(this);
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
 
      return <Redirect to={{ pathname: "/a" , state: this.state }} />; //allowing user to sign in
    }
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value
    });
  }

  onTextboxChangeSignUpFirstName(event) {
    this.setState({
      firstName: event.target.value
    });
  }

  onTextboxChangeSignUpLastName(event) {
    this.setState({
      lastName: event.target.value
    });
  }

  onSignUp() {
    //grab state
    //post request to backend
    const { signUpEmail, signUpPassword, firstName, lastName } = this.state;
    this.setState({ isLoading: true });

    //post request to backend , creates API request to out end point
    fetch("/api/account/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
        firstName: firstName,
        lastName: lastName
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: "",
            signUpPassword: "",
            firstName: "",
            lastName: "",
            redirect: true
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false
          });
        }
      });
  }

  render() {
    var positionStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    };
    var inputStyle = { opacity: 0.7 };

    const {
      isLoading,
      token,
      signUpEmail,
      signUpPassword,
      signUpError,
      firstName,
      lastName
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
              {signUpError ? <p>{signUpError}</p> : null}
              <div class="col-sm-12">
                <FormGroup controlId="email" bsSize="large">
                  <FormLabel>Email</FormLabel>
                  <FormControl
                    style={inputStyle}
                    autoFocus
                    type="email"
                    value={signUpEmail}
                    onChange={this.onTextboxChangeSignUpEmail}
                  />
                </FormGroup>
              </div>
              <div class="col-sm-12">
                <FormGroup controlId="password" bsSize="large">
                  <FormLabel>Password</FormLabel>
                  <FormControl
                    style={inputStyle}
                    value={signUpPassword}
                    onChange={this.onTextboxChangeSignUpPassword}
                    type="password"
                  />
                </FormGroup>
                <FormGroup controlId="FirstName" bsSize="large">
                  <FormLabel>First Name</FormLabel>
                  <FormControl
                    style={inputStyle}
                    value={firstName}
                    onChange={this.onTextboxChangeSignUpFirstName}
                    type="text"
                  />
                </FormGroup>
                <FormGroup controlId="lastName" bsSize="large">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl
                    style={inputStyle}
                    value={lastName}
                    onChange={this.onTextboxChangeSignUpLastName}
                    type="text"
                  />
                </FormGroup>
                <button
                   class="btn pl-5 pr-5"
                  style={{backgroundColor:"#fe3c52", color:"white"}}
                  block
                  onClick={this.onSignUp}
                  type="button"
                >
                  {" "}
                  Submit Account Information
                </button>
                {this.renderRedirect()}
              </div>
            </div>
            <p />
          </div>
        </div>
      </div>
    );
  }
}

export default B;
