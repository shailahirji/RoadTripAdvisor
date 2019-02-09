import React, { Component } from 'react';

import App from './App.js';
import Filter from "./filter.js";
import StarRating from "./starRatings.js";
import RangeSlider from './rangeSlider.js';
import MF from './MealMap.js';

class Content extends React.Component {

    constructor(props){
        super(props);
  
        this.state={
          selected:[],
          count:0,
          price_range:'any',//any price range
          distance:'any',
          ratings:'any'
        };
        //this.childHandler=this.childHandler.bind(this)
        this.selection_Handler=this.selection_Handler.bind(this)
        this.price_Handler=this.price_Handler.bind(this)
        this.distance_Handler=this.distance_Handler.bind(this)
        this.ratings_Handler=this.ratings_Handler.bind(this)
      }
   
      //to get data back from Child 
      selection_Handler(selection){
        this.setState({
          selected:selection
        })
      }
  
      price_Handler(price){
        this.setState({
          price_range:price
        })
      }
  
      distance_Handler(dist){
        this.setState({
          distance:dist
        })
      }
  
      ratings_Handler(ratings){
        this.setState({
          ratings:ratings
        })
      }

    render() {

        var contentStyle={
            margin:30,
            marginLeft:30
        }

      const dinning_options=[ 
        {value: '1',label:'All Food & Drinks'},{value:'2',label:'Bars & Drinks'},
        {value:'3',label:'Burgers & BBQ'},{value: '4',label:'bakery'},
        {value:'5',label:'Coffee & Tea'}, {value:'6',label:'Diners & Breakfast'},
        {value: '7',label:'Ice cream & Desserts'},{value:'8',label:'Vegeterian & Healthy Food'},
        {value:'9',label:'Kosher'},{value: '10',label:'Halal'},{value:'11',label:'Wineries & Distelliers'},{value:'12',label:'Resturants'},  
        ]
      const money_label={0:'$',50:'$$',100:'$$$'}
      const distance_label={0:'Near',50:'Far',100:'Furthest'}

      return (
        <p style={contentStyle}>
        <div className="filter">
            <Filter name='meal_type' placeholder= 'Meal Type' action={this.selection_Handler} choices= {dinning_options}></Filter>   
              {
              this.state.selected.map(select=> {
                return(
                  <div key={select.value}>
                  <p>{select.label}</p>
                  </div>
                )
              })
            }
            </div>
              <br/>
        <div className="money">
          <p>Price range: {this.state.price_range}</p>
          <RangeSlider name='money_range' action={this.price_Handler} label={money_label}/>
            </div>
       
        <div className="distance">
          <p>Distance to travel from Location: {this.state.distance} miles</p>
          <RangeSlider name='distance_range' action={this.distance_Handler} label={distance_label}/>
            </div>


        <div className="ratings">
          <p>Reviews: {this.state.ratings}</p>
          <StarRating action={this.ratings_Handler}/>
          </div>
          <div className="map">
          {/* <MF search={this.state.selected} price={this.state.price_range} 
            reviews={this.state.ratings} radius={this.state.distance}
          /> */}
          </div>
        </p>
      );
    }
  }
  export default Content;