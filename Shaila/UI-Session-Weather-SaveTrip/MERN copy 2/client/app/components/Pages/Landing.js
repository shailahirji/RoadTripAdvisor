import React, { Component } from "react";
import "whatwg-fetch";
import { Redirect, Link } from "react-router-dom";
import { getFromStorage, setInStorage } from "../../utils/storage";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";


// THIS IS THE LANDING PAGE!


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      redirect: false,
      loginRedirect: false
    };

    this.onClickRedirectLogin = this.onClickRedirectLogin.bind(this);
    this.loginRedirect = this.loginRedirect.bind(this);

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



  loginRedirect() {
    if (this.state.loginRedirect) {
      return <Redirect to={{ pathname: "/signin" }} />;
    }
  }

  onClickRedirectLogin() {
    this.setState({ loginRedirect: true });
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
      
  
    } = this.state;

    if (isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    return (
      


      <div className="super_container">

        {/* <!-- Home --> */}

        <div className="home">
          <div className="home_background" style={{ "backgroundImage": "url(images/home.jpg)" }}>
            <div className="p-3">
              {this.loginRedirect()}

            </div>

          </div>
          <div className="home_content">
            <div className="home_content_inner">
              <div className="home_text_large">discover</div>
              <div className="home_text_small">Discover new worlds</div>
              <div className="text-center">
              <button
                class="btn mt-4"
                style={{backgroundColor:"#fe3c52"}}
                block
                onClick={this.onClickRedirectLogin}
                type="button"
              >
                {" "}
               <span  style={{fontWeight:"bold",fontWeight:"40px", color:"white"}}>Get Started</span> 
              </button></div>

            </div>
          </div>
        </div>




       
      </div>
    );
  }
}

export default Login;
