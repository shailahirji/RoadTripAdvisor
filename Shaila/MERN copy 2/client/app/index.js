import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import LogIn from './components/Pages/LogIn';
import Account from './components/Pages/Account';
import SignUp from './components/Pages/SignUp';
import StartTrip from './components/Pages/StartTrip';

//import Merge from './components/Home/Merge';

import HelloWorld from './components/HelloWorld/HelloWorld';

import './styles/styles.scss';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={LogIn}/>
        <Route exact path="/Account" component={Account}/>
        <Route path="/SignUp" component={SignUp}/>
        {/* <Route path="/StartTrip" component={StartTrip}/> */}
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
