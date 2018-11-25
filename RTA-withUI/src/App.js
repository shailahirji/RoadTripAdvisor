import React, { Component } from "react";
import "./App.css";
import "./components/MapContainer";
import { Link, BrowserRouter as Router} from 'react-router-dom'
import { Layout, Header, Navigation, Content } from "react-mdl";
import Main from "./components/main";

const mapStyles = {
  width: "100%",
  height: "100%"
};

class App extends Component {


  render() {
    return (
      <div className="demo-big-content">
      <Layout>
        <Header className="header-color" title="Road Trip Advisor" scroll>
          <Navigation>
            <Link to="/home">Home</Link>
            <Link to="/plan-a-trip">Plan a trip</Link>
            <Link to="/sign-up">Sign Up</Link>
            <Link to="/sign">Sign In</Link>
            <Link to="/currentlocation">Current Location</Link>         
            </Navigation>
             
        </Header>
        <Content>
          <div className="page-content">
          <Main/>
          </div>
        </Content>
      </Layout>
    </div>
    );
  }
}
export default App;
