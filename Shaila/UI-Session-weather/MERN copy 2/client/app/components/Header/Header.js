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
     <div>
      {/* <!-- Header --> */}

	<header className="header">
  <div className="container">
    <div className="row">
      <div className="col">
        <div className="header_container d-flex flex-row align-items-center justify-content-start">

          {/* <!-- Logo --> */}
          <div className="logo_container">
            <div className="logo">
              <div>Excursion</div>
              <div>Road  Trip Planner</div>
              <div className="logo_image"><img src="./images/logo.png" alt=""/></div>
            </div>
          </div>

          {/* <!-- Main Navigation --> */}
          <nav className="main_nav ml-auto">
            <ul className="main_nav_list">
              <li className="main_nav_item active"><a href="/starttrip">Home</a></li>
              <li className="main_nav_item"><a href="accomodations">Accomodations</a></li>
              <li className="main_nav_item"><a href="contactus">Contact</a></li>
              <li className="main_nav_item"><a href="aboutus">About us</a></li>
            </ul>
          </nav>

        

          {/* <!-- Hamburger --> */}
          <div className="hamburger ml-auto"><i className="fa fa-bars" aria-hidden="true"></i></div>

        </div>
      </div>
    </div>
  </div>
</header>

{/* <!-- Menu --> */}

<div className="menu_container menu_mm">

  {/* <!-- Menu Close Button --> */}
  <div className="menu_close_container">
    <div className="menu_close"></div>
  </div>

  {/* <!-- Menu Items --> */}
  <div className="menu_inner menu_mm">
    <div className="menu menu_mm">
      <div className="menu_search_form_container">
        <form action="#" id="menu_search_form">
          <input type="search" className="menu_search_input menu_mm"/>
          <button id="menu_search_submit" className="menu_search_submit" type="submit"><img src="images/search_2.png" alt=""/></button>
        </form>
      </div>
      <ul className="menu_list menu_mm">
        <li className="menu_item menu_mm"><a href="#">Home</a></li>
        <li className="menu_item menu_mm"><a href="accomodations">Accomodations</a></li>
        <li className="menu_item menu_mm"><a href="contactus">Contact</a></li>
        <li className="menu_item menu_mm"><a href="aboutus">About us</a></li>

      </ul>

    

      <div className="menu_copyright menu_mm">Colorlib All rights reserved</div>
    </div>

  </div>

</div>
</div>
    );
  }
}

export default Header;
