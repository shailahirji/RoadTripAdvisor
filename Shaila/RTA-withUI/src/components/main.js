import React from 'react';
import { Switch, Route } from 'react-router-dom';
import  MapContainer  from './MapContainer';
import Landing from './landingpage';



const Main = () => (
    <Switch>
           <Route exact path="/" component={Landing}/>
           <Route exact path="/home" component={Landing}/>
            <Route path="/currentlocation" component={MapContainer}/>
 
    </Switch>
)

export default Main;