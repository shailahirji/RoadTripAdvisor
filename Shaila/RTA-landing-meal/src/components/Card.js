import React, { Component } from "react";
import "./App.css";
import Square from "./Square.js";
import IncrementComponent from "./IncrementComponent.js";

class Card extends Component {
  state = {
    Adults: 0,
    Seniors: 0,
    Youth: 0,
    Child: 0,
    Infant: 0
  };
  IncrementItem = field => {
    this.setState({ [field]: this.state[field] + 1 });
  };
  DecreaseItem = field => {
    this.setState({
      [field]: this.state[field] == 0 ? 0 : this.state[field] - 1
    });
  };
  ToggleClick = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    var styles = {
      cardStyle: {
        height: 400,
        width: 300,
        float: "left",
        backgroudColor: "#FFF",

        boxShadow: "0px 0px 5px #666",
        margin: "20px"
      }
    };

    return (
      <div>
        <h1> Profile </h1>

        <div style={styles.cardContainer}>
          <div style={styles.cardStyle}>
            <Square />
            <div style={styles.titleStyle}>
              <table className="table-borderless mx-auto my-5">
                <tbody>
                  <tr className="my-2 ">
                    <td>Adults (18-64)</td>
                    <td>
                      {" "}
                      <IncrementComponent
                        name="Adults"
                        value={this.state.Adults}
                        increment={this.IncrementItem}
                        decrement={this.DecreaseItem}
                      />
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>Seniors (65+)</td>
                    <td>
                      <IncrementComponent
                        name="Seniors"
                        value={this.state.Seniors}
                        increment={this.IncrementItem}
                        decrement={this.DecreaseItem}
                      />
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>Youth (12-17)</td>
                    <td>
                      <IncrementComponent
                        name="Youth"
                        value={this.state.Youth}
                        increment={this.IncrementItem}
                        decrement={this.DecreaseItem}
                      />
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>Child (2-11)</td>
                    <td>
                      <IncrementComponent
                        name="Child"
                        value={this.state.Child}
                        increment={this.IncrementItem}
                        decrement={this.DecreaseItem}
                      />
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>Seat Infant (under 2)</td>
                    <td>
                      <IncrementComponent
                        name="Infant"
                        value={this.state.Infant}
                        increment={this.IncrementItem}
                        decrement={this.DecreaseItem}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
