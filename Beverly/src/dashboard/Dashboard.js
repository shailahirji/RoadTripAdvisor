import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from '../actions/authActions';
import axios from 'axios'
class Dashboard extends Component {

  state = {
    trips:[]
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentWillMount(){
    const token = localStorage.getItem("jwtToken");
    axios.get("/trip", { headers: { Authorization: `Bearer ${token}` } })
    .then(res => {
      console.log("WE GT THE TRIPS ",res)
      this.setState({trips:res.data.trips})
    })
    .catch(err =>
      console.log("THIS IS IT ERRO ",err)
    );

  }

  renderTrips = ()=>
  this.state.trips.map((trip,key) => <h5>From {trip.location} to {trip.destination}</h5>)

render() {
    const { user } = this.props.auth;
return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              {/* <b>Hey there,</b> {user.name.split(" ")[0]} */}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
            </h4>
            <h2>Test</h2>
            {this.renderTrips()}
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);