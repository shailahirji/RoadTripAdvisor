import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router,Switch } from 'react-router-dom'
import './index.css';
import { Layout, Header, Navigation, Drawer, Content } from "react-mdl";
import App from './App';
import MapContainer from './components/MapContainer';
import Landing from "./components/landingpage";


import * as serviceWorker from './serviceWorker';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

const routing=(
<div className="demo-big-content">
        <Layout>
          <Header className="header-color" title="Road Trip Advisor" scroll>
            <Router>
            <Navigation>
              <Link to="/home">Home</Link>
              <Link to="/plan-a-trip">Plan a trip</Link>
              <Link to="/sign-up">Sign Up</Link>
              <Link to="/sign">Sign In</Link>
              <Link to="/cl">Current Location</Link>
              <Switch>
              <Route exact path="/" component={App}/>
              <Route path="/cl" component={MapContainer}/>
            </Switch>
              </Navigation>
              </Router>
            
          </Header>
          <Content>
            <div className="page-content">
              <Landing />
            </div>
          </Content>
        </Layout>
      </div>
    
 )

 ReactDOM.render(routing, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
// import 'react-mdl/extra/material.css';
// import 'react-mdl/extra/material.js';


//  ReactDOM.render(
//  <App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();