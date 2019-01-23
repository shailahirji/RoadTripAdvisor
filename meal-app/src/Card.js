import React, { Component } from 'react';

import Content from './Content.js';
import Filter from "./filter.js";
import StarRating from "./starRatings.js";
import RangeSlider from './rangeSlider.js';

class Square extends React.Component {
    render() {
      var squareStyle = {
        height: 50,
        backgroundColor: this.props.color
      }
      var labelStyle = {
        fontFamily: "sans-serif",
        fontWeight: "bold",
        padding: 13,
        margin: 10
      };
   
      return (
        <div style={squareStyle}><p style={labelStyle}>Meal Preferences</p>
        </div>
      );
    }
  }

   
  class Card extends React.Component {
    render() {
      var cardStyle = {
        height: "relative",
        width: 400,
        padding: 0,
        backgroundColor: "#FFF",
        WebkitFilter: "drop-shadow(0px 0px 5px #666)",
        filter: "drop-shadow(0px 0px 5px #666)",
        margin:30,
        marginLeft:100
 
      };
    
   
      return (
        <div style={cardStyle}>
          <Square color={this.props.color} />
          <Content/>
        </div>
      );
    }
  }

  export default Card;