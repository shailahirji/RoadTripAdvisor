import React, { Component } from 'react';

class MealPreferences extends Component {
    render() {
        return (
            <div >
            <div className="form-group">
            <select  className="form-control" >
                <option>Meal Preferences </option>
                <option>Vegetarian</option> 
                <option>Vegan</option> 
                <option>Hallal</option> 
                <option>Kosher</option> 
                 
            </select>
            
            </div>
        </div>
        );
    }
}

export default MealPreferences;