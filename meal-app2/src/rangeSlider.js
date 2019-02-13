import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Slider from 'react-rangeslider'

class RangeSlider extends React.Component{

    constructor(props,context){
        super(props,context)
        this.state={
            value:0
        }
    }

    handleChangeStart(){
        console.log('change event starterd')
    };//why do we need this?

    handleChange=value=>{
        this.setState({
            value:value
        })
        this.props.action(value)
    };

    handleChangeComplete(){
        console.log('change event completed')
    }

    render(){
        const {value}= this.state;
        const labels=this.props.label;
        const max=this.props.max;
        return(
            <div className='rangeSliderStyle'>
            <Slider 
            min={0}
            max={max}
            labels={labels}
            value={value}
            onChangeStart={this.handleChangeStart}
            onChange={this.handleChange}
            onChangeComplete={this.handleChangeComplte}
            />

            <br/>
             {/* <button onClick={()=>this.props.action(this.state.value)}>Submit</button> */}
            </div>
        )
    }
}
export default RangeSlider;