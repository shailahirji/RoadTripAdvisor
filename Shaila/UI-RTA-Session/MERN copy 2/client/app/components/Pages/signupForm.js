import React, { Component } from "react";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";


//THIS IS FOR THE LOG IN BUTTON

class SignupForm extends Component{
    constructor(props) {
        super(props)
    this.state = {
        isLoading: true,
        token: "",
        signUpError: "",
        signUpEmail: "",
        signUpPassword: "",
        firstName: "",
        lastName: "",
        redirect: false
			};
			this.onSignUp = this.onSignUp.bind(this);
		}
		onSignUp(userData){
			//grab state
			//post request to backend
			const { signUpEmail, signUpPassword, firstName, lastName } = userData;
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
						console.log("IMI")
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
						console.log("AMA")
						this.setState({
							signUpError: json.message,
							isLoading: false
						});
					}
				});
		}
render(){
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
  
        return(
            <div style={positionStyle} className="text-center auth_form">
								<div class="col-sm-offset-12">
									{/* {signUpError ? <p>{signUpError}</p> : null} */}
									<div class="col-sm-12">
									<h1 style={{color:"white"}}>Sign Up</h1>
										<FormGroup controlId="email" bsSize="large">
											<FormLabel>Email</FormLabel>
											<FormControl
												style={inputStyle}
												autoFocus
												type="email"
												// value={signUpEmail}
												onChange={this.onTextboxChangeSignUpEmail}
											/>
										</FormGroup>
									</div>
									<div class="col-sm-12">
										<FormGroup controlId="password" bsSize="large">
											<FormLabel>Password</FormLabel>
											<FormControl
												style={inputStyle}
												// value={signUpPassword}
												onChange={this.onTextboxChangeSignUpPassword}
												type="password"
											/>
										</FormGroup>
										<FormGroup controlId="FirstName" bsSize="large">
											<FormLabel>First Name</FormLabel>
											<FormControl
												style={inputStyle}
												// value={firstName}
												onChange={this.onTextboxChangeSignUpFirstName}
												type="text"
											/>
										</FormGroup>
										<FormGroup controlId="lastName" bsSize="large">
											<FormLabel>Last Name</FormLabel>
											<FormControl
												style={inputStyle}
												// value={lastName}
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
											Register
										</button>
										{/* {this.renderRedirect()} */}
									</div>
								</div>
							</div>
           );
    }
}

export default SignupForm;