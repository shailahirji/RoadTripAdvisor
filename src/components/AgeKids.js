import React, { Component } from 'react';

class Preferences extends Component {
    render() {

        return (
            <div >
                <div className="form-group">
                <select  className="form-control" >
                    <option> Kids Accompanying</option>
                    <option>newborn (0-4 weeks)</option>
                    <option>infants (4 weeks-1 year)</option> 
                    <option>toddlers (1-3 years)</option> 
                    <option>preschoolers (4-6 years)</option> 
                    <option>school-aged (6-11 years)</option>
                    <option>adolescents (12-19 years)</option> 
                   
                </select>
                
                </div>
            </div>
        );
    }
}

export default Preferences;