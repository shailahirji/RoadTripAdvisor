import React, {Component} from "react";
import MF from './MealMap.js';
import MealCard from './MealCard.js';

class MealPref extends React.Component{
    render(){
    return(
        <div>
           <MealCard color="#FF6663"  ></MealCard>
            
           <MF search={this.state.selected} price={this.state.price_range} 
            reviews={this.state.ratings} radius={this.state.distance}
          />
          </div>
    );
}
}

export default MealPref;