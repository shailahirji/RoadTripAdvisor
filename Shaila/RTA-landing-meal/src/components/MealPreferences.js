import React, { Component } from 'react';
// import {Container, Col, Row,Button} from 'reactstrap'
import {Container} from 'reactstrap'

import './App.css';
import MealMap from './MealMap.js';
import MealCard from './MealCard.js';
import Card from './Card.js';

class MealPreferences extends React.Component{
  constructor(props){
      super(props);
 this.displayCard=this.displayCard.bind(this);
this.state={
        selected:[],
        count:0,
        price_range:'any',//any price range
        distance:'any',
        ratings:'any',
        search_result:[]
      };
      this.card=null;
   
    }
    
    displayCard(card){
      if(card==='travelers'){
        console.log(card)
        return(
          <Card/>
        )
      }
    }

    //get data back from child 
    selectedKeywords=(selection)=>{
      this.setState({
        selected:selection
      })
    }
  
    selectPrice=(price)=>{
      this.setState({
        price_range:price
      })
    }

    selectedDistance=(distance)=>{
      this.setState({
        distance:distance
      })
    }

    selectedRatings=(rate)=>{
      this.setState({
        ratings:rate
      })
    }
    
    displayedResults=(results)=>{
      this.setState({
        search_results:results
      })
    }
 


render(){
     var buttonStyle={backgroundColor: '#ffc107',
     borderColor: '#ffc107',
     borderWidth: 1,
     borderRadius: 12,
     color: 'black',
     fontSize: 12,
     fontWeight: 'bold',
     overflow: 'hidden',
     padding: 12,
     margin:30,
    marginLeft:100,
     textAlign:'center'};

  return(
        <Container>
          {/* <div>
          <Button style={buttonStyle} >Meal</Button>
          <Button style={buttonStyle} onClick={this.displayCard('travelers') } >Travelers</Button>
         </div> */}
           <MealCard color="#ffc107" getKeywordList={this.selectedKeywords} getPrice={this.selectPrice} getRadius={this.selectedDistance} 
           getRatings={this.selectedRatings} 
            ></MealCard>
      
           <MealMap search={this.state.selected} price={this.state.price_range} 
            reviews={this.state.ratings} radius={this.state.distance} locations={this.props.location.state}
          />
      

          </Container>
  
         
          
        );
    }
}

export default MealPreferences;