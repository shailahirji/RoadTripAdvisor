import React, { Component } from 'react';

class AgeLabel extends Component {
    render() {

        return (

            <div >

                <div className="form-group">

                    <select id="Age Range" className="form-control" >
                        <option> Age</option>
                        <option>Adults </option>
                        <option>Seniors (65+) </option>
                        <option>Youth (12-17) </option>
                        <option>Child (2-11) </option>
                        <option>Infant (under 2) </option>
                    </select>

                </div>
            </div>
            
        );
    }
}

export default AgeLabel;