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

class Profile extends Component {
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
      <form>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputEmail4">Name</label>
            <input
              type="email"
              class="form-control"
              id="inputName"
              placeholder="Name"
            />
          </div>

          <div class="form-group col-md-6">
            <label for="inputState">Age Range</label>
            <select id="inputState" class="form-control">
              <option selected>Select your age</option>

              <option>13-18</option>
              <option>18-24</option>
              <option>25-35</option>
              <option>35 and older</option>
            </select>

            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                />
                <label class="form-check-label" for="gridCheck">
                  Kids accompanying?
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group col-md-6">
          <label for="interests">Point of Interests</label>

          <Select
            defaultValue={[options[2], options[3]]}
            isMulti
            name="colors"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        <div class="form-group">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="gridCheck" />
            <label class="form-check-label" for="gridCheck">
              Check me out
            </label>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">
          Save
        </button>
      </form>
    );
  }
}

export default Profile;
