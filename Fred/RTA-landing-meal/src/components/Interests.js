import React, { Component } from "react";
import Select from "react-select";

const options = [
  { value: "Science ", label: "Science and Tech" },
  { value: "Films", label: "Films and TV" },
  { value: "Architecture", label: "Architecture" },
  { value: "Fashion ", label: "Fashion and beauty" },
  { value: "Abandoned type", label: "Abandoned" },
  { value: "College ", label: "College Icons" },
  { value: "History ", label: "Historic" },
  { value: "Fashion ", label: "Fashion and beauty" },
  { value: "Lighting", label: "Holiday Lights" },
  { value: "Lit ", label: "Literature" },
  { value: "Mili ", label: "Military" },
  { value: "Monu", label: "Monuments" },
  { value: "Art", label: "Public Art" }
];

class Interests extends Component {
  state = {
    selectedOption: null
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <div>
        <Select
          defaultValue={[]}
          isMulti
          name="colors"
          options={options}
          className="basic-multi-select"
          classNamePrefix="Interests"
          placeholder="Interests"
        />
      </div>
    );
  }
}

export default Interests;
