import React, { Component, Button } from "react";
import "./App.css";
import "./components/MapContainer";
import Landing from "./components/landingpage";
import { Layout, Header, Navigation, Drawer, Content } from "react-mdl";
import MapContainer from "./components/MapContainer";
import CurrentLocation from "./components/Map";

const mapStyles = {
  width: "100%",
  height: "100%"
};

class App extends Component {
  constructor() {
    super();
    this.test = this.test.bind(this);
  }
  state = {
    showMap: false
  };

  test() {
    this.setState({ showMap: true });
  }

  render() {
    return (
      <div className="demo-big-content">
        <Layout>
          <Header className="header-color" title="Road Trip Advisor" scroll>
            {this.state.showMap ? <MapContainer /> : null}
            <Navigation>
              <a href="/">Home</a>
              <a href="/">Plan a trip</a>
              <a href="/">Sign Up</a>
              <a href="/">Sign In</a>
              <a href="/">Current Location</a>
            </Navigation>
          </Header>

          <Drawer title="Menu">
            <Navigation>
              <a href="/">Home</a>
              <a href="/">Plan a trip</a>
              <a href="/">Sign Up</a>
              <a href="/">Sign In</a>

              <a href="/map">
                <span onClick={this.test}>Current Location</span>
              </a>
            </Navigation>
          </Drawer>
          <Content>
            <div className="page-content">
              <Landing />
            </div>
          </Content>
        </Layout>
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
