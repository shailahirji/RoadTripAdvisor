import React, { Component, Button } from "react";
import "./App.css";
import "./components/MapContainer";
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import Landing from "./components/landingpage";
import { Layout, Header, Navigation, Drawer, Content } from "react-mdl";
import MapContainer from "./components/MapContainer";

const mapStyles = {
  width: "100%",
  height: "100%"
};

class App extends Component {


  render() {
    return (
      <div className="demo-big-content">
        
      </div>
    );
  }
}
export default App;
// export default GoogleApiWrapper(
// (props)=>({
//   apiKey:'AIzaSyD-a_aMfM44H43DL1gkBccsYjcYgZTZWQk'
// }
// ))(MapContainer)
