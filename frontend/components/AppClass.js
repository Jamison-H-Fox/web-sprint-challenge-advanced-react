import React from 'react';
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  stepCounter: initialSteps,
}

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor() {
    super();
    this.state = initialState;
  }

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const coords = [0, 0];

    if (this.state.index < 3) {
      coords[1] = 1;
    } else if (this.state.index < 6) {
      coords[1] = 2;
    } else {
      coords[1] = 3;
    }

    if (this.state.index === 0 || this.state.index === 3 || this.state.index === 6) {
      coords[0] = 1;
    } else if (this.state.index === 1 || this.state.index === 4 || this.state.index === 7) {
      coords[0] = 2;
    } else {
      coords[0] = 3;
    }

    return coords
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const coords = this.getXY(this.state.index);

    const msgString = `Coordinates (${coords[0]}, ${coords[1]})`;
    return msgString;
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState(initialState)
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (direction === 'UP') {
      if (this.state.index < 3) {
        this.setState({ ...this.state, message: `You can't go up`});
      } else {
          this.setState({ ...this.state, index: this.state.index - 3, stepCounter: this.state.stepCounter +1 })
        }
    } else if (direction === 'DOWN') {
      if(this.state.index > 5) {
        this.setState({ ...this.state, message: `You can't go down`});
      } else {
        this.setState({ ...this.state, index: this.state.index + 3, stepCounter: this.state.stepCounter +1 })        
        }
    } else if (direction === "LEFT") {
      if(this.state.index % 3 === 0){        
        this.setState({ ...this.state, message: `You can't go left`});
      } else {
        this.setState({ ...this.state, index: this.state.index - 1, stepCounter: this.state.stepCounter +1 })
        }
    } else if (direction === 'RIGHT') {
      if(this.state.index % 3 === 2){        
        this.setState({ ...this.state, message: `You can't go right`});
      } else {
        this.setState({ ...this.state, index: this.state.index + 1, stepCounter: this.state.stepCounter +1 })
        }
    }
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const direction = evt.target.textContent;

    this.getNextIndex(direction);
  }

  handleChange = (evt) => {
    // You will need this to update the value of the input.
    const newEmail = evt.target.value;
    this.setState({ ...this.state, email: newEmail});
  }

  handleSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    axios.post(`http://localhost:9000/api/result`, {'x': this.getXY(this.state.index)[0], 'y': this.getXY(this.state.index)[1], 'steps': this.state.stepCounter, 'email': this.state.email})
      .then(res => {
        this.setState({ ...this.state, message: res.data.message, email: initialEmail})
      })
      .catch(err => {
        this.setState({ ...this.state, message: err.response.data.message, email: initialEmail })        
      })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {this.state.stepCounter} time{this.state.stepCounter == 1 ? '' : 's'}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={(evt) => this.move(evt)} id="left">LEFT</button>
          <button onClick={(evt) => this.move(evt)} id="up">UP</button>
          <button onClick={(evt) => this.move(evt)} id="right">RIGHT</button>
          <button onClick={(evt) => this.move(evt)} id="down">DOWN</button>
          <button onClick={() => this.reset()} id="reset">reset</button>
        </div>
        <form>
          <input 
            id="email" 
            type="email" 
            placeholder="type email"
            value={this.state.email}
            onChange={(evt) => this.handleChange(evt)}
          ></input>
          <input 
            id="submit" 
            type="submit"
            onClick={(evt) => this.handleSubmit(evt)}
          ></input>
        </form>
      </div>
    )
  }
}
