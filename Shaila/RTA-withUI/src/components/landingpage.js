import React, { Component } from "react";
import { Grid, Cell } from "react-mdl";
import pic from "./roadtrip.jpg";

class Landing extends Component {
  render() {
    return (
      <div style={{ width: "100%", margin: "auto" }}>
        <img src={pic} alt="avatar" className="avatar-img" />
      </div>
    );
  }
}

export default Landing;
