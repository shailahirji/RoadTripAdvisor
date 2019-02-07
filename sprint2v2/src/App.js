import React, { Component } from "react";
import Itinerary from "./Itinerary";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: "Nothing Selected"
    };

    this.onMouseClick = this.onMouseClick.bind(this);
  }

  onMouseClick(number) {
    this.setState({
      active: number
    });
  }

  render() {
    return (
      <>
        <Itinerary
          timeEvents={[
            {
              time: "12:35",
              event:
                "Seattle Seattle Seattle SeattleSeattleSeattleSeattleSeattleSeattleSeattle"
            },
            { time: "11:35", event: "Tacoma" },
            { time: "11:35", event: "Olympia" },
            { time: "11:35", event: "Portland" }
          ]}
          onMouseClick={this.onMouseClick}
          number="1"
        />
        <br />
        <Itinerary
          timeEvents={[
            { time: "12:35", event: "Seattle" },
            { time: "11:35", event: "Tacoma" },
            { time: "11:35", event: "Olympia" }
          ]}
          onMouseClick={this.onMouseClick}
          number="2"
        />
        <br />
        <Itinerary
          timeEvents={[
            { time: "12:35", event: "Seattle" },
            { time: "11:35", event: "Tacoma" },
            { time: "11:35", event: "Olympia" },
            { time: "11:35", event: "Portland" }
          ]}
          onMouseClick={this.onMouseClick}
          number="3"
        />

        <p>{this.state.active}</p>
      </>
    );
  }
}

export default App;
