import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';

class Landing extends Component {
    render() {
        return (
            <div style={{width: '100%', margin: 'auto'}}>
        <Grid className="landing-grid">
          <Cell col={12}>
            <img
              src="https://quirkcars.com/wp-content/uploads/2016/03/road-trip.jpg"
              alt="avatar"
              className="avatar-img"
              />

            <div className="banner-text">
              <h1>RTA</h1>
              <hr/>

              <p>Plan your next trip with us!</p>



        
        
            </div>
          </Cell>
        </Grid>
      </div>
        )
    }
}

export default Landing;