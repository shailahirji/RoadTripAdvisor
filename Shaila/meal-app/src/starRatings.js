import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StarRatingComponent from 'react-star-rating-component';

class StarRating extends React.Component{

    constructor(props){
        super(props);

        this.state={
            rating:0
        };
    }
        onStarClick(nextValue,preValue,name){
            this.setState({rating:nextValue});
            this.props.action(nextValue)
        }

        render(){
            const {rating}= this.state;
            return(
                <div className='reviewsStyle'>
                <StarRatingComponent
                    starCount={5}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                />
                <br/>
                {/* <button onClick={()=>this.props.action(this.state.rating)}>Submit</button> */}
                </div>
            )
        }

}
export default StarRating;