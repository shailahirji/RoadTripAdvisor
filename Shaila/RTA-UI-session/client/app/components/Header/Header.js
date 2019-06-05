import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import "whatwg-fetch";
import { getFromStorage, setInStorage } from "../../utils/storage";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: "",
      redirect: false
    };

    this.logout = this.logout.bind(this);
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

  logout() {
    this.setState({
      isLoading: true
    });

    const obj = getFromStorage("the_main_app");

    if (obj && obj.token) {
      const { token } = obj;
      //verify the token
      fetch("/api/account/logout?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: "",
              isLoading: false,
              redirect: true
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
      return <Redirect to={{ pathname: "/" }} />;
    }
  }

  render() {
    return (
      <div className="headerSpec">
        <nav className="navbar navbar-expand-lg ">
          {" "}
          {/* Nav has a set of proprieties that need to be set.*/}
          <Link className="navbar-brand " to="/StartTrip">
            RTA
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
            <div className="navbar-nav ">
              <Link className="nav-item nav-link active" to="/StartTrip">
                Home <span className="sr-only">(current)</span>
              </Link>
              <Link className="nav-item nav-link" to="/Profile">
                Profile
              </Link>
              <button
                class="btn btn-warning pl-5 pr-5"
                block
                onClick={this.logout}
              >
                Logout
              </button>
              {this.renderRedirect()}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
