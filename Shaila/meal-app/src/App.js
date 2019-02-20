import React, { Component } from 'react';
import {Container, Col, Row} from 'reactstrap'
import './App.css';
import MealMap from './MealMap.js';
import MealCard from './MealCard.js';


class App extends React.Component{
  constructor(props){
      super(props);

      this.state={
        selected:[],
        count:0,
        price_range:'any',//any price range
        distance:'any',
        ratings:'any',
        search_result:[],
        
      };
   
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
     
  return(
        <Container>
       
         
           <MealCard color="#FF6663" getKeywordList={this.selectedKeywords} getPrice={this.selectPrice} getRadius={this.selectedDistance} 
           getRatings={this.selectedRatings} 
            ></MealCard>
      

           <MealMap search={this.state.selected} price={this.state.price_range} 
            reviews={this.state.ratings} radius={this.state.distance}
          />
      

          </Container>
  
         
          
        );
    }
}

export default App;

// function mapStateToProps(state){ //map redux to component props 
//   return{
//     selected:state.selected,
//     price:state.price,
//     radius:state.radius,
//     reviews:state.reviews,
//     results:state.results
//   };
// }

// //action, to give our component access to the action creators and action 
// var updateSelectionAction= {type:"UpdateSelection"};
// var updatePriceAction= {type:"UpdatePrice"};
// var updateRadiusAction= {type:"UpdateRadius"};
// var updateReviewsAction= {type:"UpdateReviews"};
// var updateResultAction= {type:"UpdateResults"};

// //Map redux actions to component props
// //we return an object containing the name of the two funcions our component can call 
// //to dispatch a change to our store
// function mapDispatchToProps(dispatch){
//   return{
//     update_selection:function(){ //this function fires a dispatch with an action type of update selection
//       return dispatch(updateSelectionAction);
//     },
//     update_price:function(){
//       return dispatch(updatePriceAction);
//     },
//     update_radius:function(){
//       return dispatch(updateRadiusAction);
//     },
//     update_reviews:function(){
//       return dispatch(updateReviewsAction);
//     },
//     update_results:function(){
//       return dispatch(updateResultAction);
//     }
//   };
// }

// //The HIGH ORDER COMPONENT , ensures that whatever component that owns these has a way of recieving them 
// //takes mapStateToProps and mapDispatchToProps as args and passes them to our component  
// var connectedComponent=connect(
// mapStateToProps,
// mapDispatchToProps
// )(MealPref);

// export default connectedComponent;