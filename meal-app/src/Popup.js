import {Popup} from '@progress/kendo-react-popup';
import React, { Component} from 'react';
import logo from './logo.svg';
import './App.css';
import StarRating from "./starRatings.js";


class PopupCustom extends React.Component{
    anchor=null;
    constructor(props){
        super(props);
        this.state={show:false};
    }

    componentDidMount(){
        this.setState({show:false});
    }

    render(){
        return(
            <div>
                <button className="k-button" onClick={this.onClick} ref={(button)=>{this.anchor=button;}}>
                    {this.state.show ? 'Hide' :'Show'}
                </button>
                <Popup
                anchor={this.anchor}
                show={this.state.show}
                popupClass={'popup-content'}
                >
        <div className="ratings">
          <p>Reviews: {this.state.ratings}</p>
          <StarRating action={this.ratings_Handler}/>
          </div>
                </Popup>
            </div>
        );
    }

    onClick=()=>{
        this.setState({show:!this.state.show});
    }
}

export default PopupCustom;