import React, { Component } from "react";
import Filter from "./filter.js";
import StarRating from "./starRatings.js";
import RangeSlider from "./rangeSlider.js";
import WeekContainer from "../Functionality/WeekContainer";


class Square extends React.Component {
  render() {
    var squareStyle = {
      height: 50,
      backgroundColor: this.props.color
    };
    var labelStyle = {
      fontFamily: "sans-serif",
      fontWeight: "bold",
      padding: 13,
      margin: 10,
      color: "white"
    };

    return (
      <div style={squareStyle}>
        <p style={labelStyle}>Meal Preferences</p>
      </div>
    );
  }
}

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      count: 0,
      price_range: "any", //any price range
      distance: "any",
      ratings: "any",
      search_result: []
    };
    //this.childHandler=this.childHandler.bind(this)
    this.selection_Handler = this.selection_Handler.bind(this);

    this.price_Handler = this.price_Handler.bind(this);
    this.distance_Handler = this.distance_Handler.bind(this);
    this.ratings_Handler = this.ratings_Handler.bind(this);
  }

  //to get data back from Child
  selection_Handler(selection) {
    this.props.getKeywordList(selection);

    this.setState({
      selected: selection
    });
  }

  price_Handler(price) {
    this.props.getPrice(price);
    this.setState({
      price_range: price
    });
  }

  distance_Handler(dist) {
    this.props.getRadius(dist);
    this.setState({
      distance: dist
    });
  }

  ratings_Handler(ratings) {
    this.props.getRatings(ratings);
    this.setState({
      ratings: ratings
    });
  }

  render() {
    var contentStyle = {
      margin: 30,
      marginLeft: 30,
      height: 400,
      
    };

    const dinning_options = [
      { value: "1", label: "bakery" },
      { value: "2", label: "bar" },
      { value: "3", label: "cafe" },
      { value: "4", label: "liquor_store" },
      { value: "5", label: "meal_delivery" },
      { value: "6", label: "meal_takeaway" },
      { value: "7", label: "restaurant" },
      { value: "8", label: "supermarket" }
    ];
    const money_label = { 0: "$", 2: "$$", 4: "$$$" };
    const distance_label = { 0: "Near", 100: "Far" };
    // style={contentStyle}
    return (
      <div className="ml-4 mt-4">
        {/* <div className="filter"> */}
        <div className="weatherForecast" >

<WeekContainer origin={this.props.location}/>

</div>  
          <Filter
            name="meal_type"
            placeholder="Meal Type"
            onChange={this.selection_Handler}
            choices={dinning_options}
          />

          {/* {
            this.state.selected.map(select=> {
              return(
                <div key={select.value}>
                <p>{select.label}</p>
                </div>
              )
            })
          } */}
        {/* </div> */}
        <br />
        {/* className="money" */}
        <div >
          <p style={{color:"white"}} >Price range: {this.state.price_range}</p>
          <RangeSlider
            name="money_range"
            action={this.price_Handler}
            label={money_label}
            max={4}
          />
        </div>
        {/* className="distance" */}
        <div >
          <p style={{color:"white"}} >Distance to travel from Location: {this.state.distance} miles</p>
          <RangeSlider
            name="distance_range"
            action={this.distance_Handler}
            label={distance_label}
            max={100}
          />
        </div>

        <div className="ratings">
          <p style={{color:"white"}}>Reviews: {this.state.ratings}</p>
          <StarRating action={this.ratings_Handler} name="rate" />
        </div>

        <div className="weatherForecast">
          
          {/* <WeekContainer origin={this.props.location}/> */}
     
          </div>   

 
      </div>
    );
  }
}

class Card extends React.Component {
  render() {
    var cardStyle = {
      // height: "relative",
      // maxWidth: 390,
      // width: 390,
      padding: 0,
      backgroundColor: "rgba(225, 225, 225, 0.43)",
      // WebkitFilter: "drop-shadow(0px 0px 5px #666)",
      // filter: "drop-shadow(0px 0px 5px #666)",
      // margin: -3,
      // marginLeft: -59
      height:"540px",
      width:"100%"
    };
    return (
      <div className="card div" style={cardStyle}>
        <Square color="#fe3c52" />
        <Content {...this.props} />
      </div>
      // passing the list of props from App into content via <Content {...this.props}/>
    );
  }
}
export default Card;
