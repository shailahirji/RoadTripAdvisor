import React, { Component, } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Map, GoogleApiWrapper } from 'google-maps-react';

import { Provider } from 'react-redux';

import Home from './components/Home.js';
import Header from './components/Header.js';
import Profile from './components/Profile.js';
import Card from './components/Card.js';
import MapContainer from './components/MapContainer';
import MyMapComponent from './components/MyMapComponent'
import MealPref from './components/MealPreferences'
import LocationSearchInput from './components/LocationSearchInput'


const mapStyles = {
  width: '100%',
  height: '100%'
};

const store = require('./reducers').init();

class App extends Component {
  render() {

    return <Provider store={store}>
      <BrowserRouter>
        <div>
          <Header />
          <div className="bg-main">

            <Switch>

              <Route exact path="/" component={Home} />
              <Route exact path="/Profile" component={Card} />
              <Route exact path="/Map" component={MapContainer} />
              <Route exact path="/mealpref" component={MealPref} />
              <Route exact path="/test" component={LocationSearchInput} />


            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </Provider>;



  }
}

export default App;
