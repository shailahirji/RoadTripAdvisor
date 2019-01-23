import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Child extends React.Component{
    
    render(){
        const x=['1','2']
        return <button onClick={() => this.props.action(x)}>Update parent</button>
    }
}

export default Child;