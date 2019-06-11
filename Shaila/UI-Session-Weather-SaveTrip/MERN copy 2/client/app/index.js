import React from "react";
import { render } from "react-dom";
import "@babel/polyfill";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import App from "./components/App/App";
import NotFound from "./components/App/NotFound";

import Landing from "./components/Pages/Landing";
import Account from "./components/Pages/Account";

import StartTrip from "./components/Pages/StartTrip";
import MealPref from "./components/Pages/MealPreferences";
import Profile from "./components/Pages/Profile";

import SignIn from "./components/Pages/SignIn";
import SignUp from "./components/Pages/SignUp";


//import Merge from './components/Home/Merge';

import "./styles/styles.scss";
import ContactUs from "./components/Pages/ContactUs";
import Accomodations from "./components/Pages/Accomodations";
import AboutUs from "./components/Pages/AboutUs";

render(
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/landing" component={Landing} />
        <Route exact path="/SignIn" component={SignIn} />
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/aboutus" component={AboutUs} />

        {/* <Route exact path="/Account" component={Account} /> */}
        {/* <Route path="/SignUp" component={SignUp} /> */}
        <Route path="/Starttrip" component={StartTrip} />
        <Route path="/mealpref" component={MealPref} />
        <Route path="/Profile" component={Profile} />
        <Route path="/contactus" component={ContactUs} />
        {/* <Route path="/signin" component ={signInButton}/> */}
        <Route path="/accomodations" component ={Accomodations}/>


        <Route component={NotFound} />
      </Switch>
    </App>
  </Router>,
  document.getElementById("app")
);
