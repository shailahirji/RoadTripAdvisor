import React, { Component } from 'react';



class IncrementComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
          clicks: 0,
          show: true
        };
      }

    render() {
      let name = this.props.name;
        return (
            <div class="outer ml-4">
            <button onClick={() => this.props.decrement(name)} name={this.props.name}> - </button>
            { this.state.show ? <h8 className="mx-2">{ this.props.value }</h8> : '' }
            <button onClick={() => this.props.increment(name)}> + </button>
           
            
           
          </div>  
    
        );
    }
}

export default IncrementComponent;