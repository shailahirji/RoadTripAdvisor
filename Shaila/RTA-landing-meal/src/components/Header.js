import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="headerSpec">
        <nav className="navbar navbar-expand-lg ">
          {" "}
          {/* Nav has a set of proprieties that need to be set.*/}
          <Link className="navbar-brand " to="/StartTripping">
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
              <Link className="nav-item nav-link active" to="/StartTripping">
                Home <span className="sr-only">(current)</span>
              </Link>
              <Link className="nav-item nav-link" to="/Profile">
                Profile
              </Link>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
