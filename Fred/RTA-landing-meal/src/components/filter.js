import React, { Component } from "react";
import "./App.css";
import Select from "react-select";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.state = {
      selected: []
    };
  }

  handleOnSelect(selection) {
    console.log(selection);
    this.props.onChange(selection);
    // this.setState((prevState)=>{
    //   this.props.action(this.state.selected)
    //   return{
    //     selected:selection,
    //     count:prevState.count+1
    //   };
    // })

    this.setState({
      selected: selection
    });
  }

  render() {
    const options = this.props.choices;
    const placeholder = this.props.placeholder;
    return (
      <div className="filterStyle">
        {/* <h1>Count={this.state.selected.length}</h1> */}
        <Select
          options={options}
          placeholder={placeholder}
          isMulti
          isClearable
          isSearchable
          onChange={this.handleOnSelect}
        />

        {/* <Button size="sm" onClick={()=>this.props.onChange(this.state.selected)}>Submit</Button>
         */}
        {/* {
              this.state.selected.map(select=> {
                return(
                  <div key={select.value}>
                  <p>{select.label}</p>
                  </div>
                )
              })
            } */}
      </div>
    );
  }
}

export default Filter;
