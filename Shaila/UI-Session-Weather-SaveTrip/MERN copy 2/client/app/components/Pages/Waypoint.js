import React, { Component } from "react";

class Waypoint extends Component {
  render() {
    var waypointStyle = {
      padding: "10px",
      margin: "5px",
      width: "300px",
      wordWrap: "break-word",
      fontSize: 15,
      backgroundColor: this.props.color,
      textAlign: "left",
      display: "inline-block",
      color: "white"
    
    };

    let status = this.props.showButton;

    return (
      <div>
        {status ? (
          <div>
            <p className="mealTagColor" style={waypointStyle}>
              {this.props.waypoint}{" "}
              {
                <button
                  class="btn btn-warning pl-1 pr-1"
                  onClick={() => this.props.handleClick(this.props.waypoint)}
                >
                  <i class="fa fa-trash" />
                </button>
              }
            </p>
          </div>
        ) : (
          <p style={waypointStyle}>{this.props.waypoint}</p>
        )}
      </div>
    );
  }
}

export default Waypoint;
