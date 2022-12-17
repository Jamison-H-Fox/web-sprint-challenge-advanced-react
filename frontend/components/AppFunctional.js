import React, { useState } from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // State declarations
  const [index, setIndex] = useState(initialIndex);
  const [stepCounter, setStepCounter] = useState(initialSteps);

  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  function getXY(index) {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.    
    const coords = [0, 0];

    if (index < 3) {
      coords[1] = 1;
    } else if (index < 6) {
      coords[1] = 2;
    } else {
      coords[1] = 3;
    }

    if (index === 0 || index === 3 || index === 6) {
      coords[0] = 1;
    } else if (index === 1 || index === 4 || index === 7) {
      coords[0] = 2;
    } else {
      coords[0] = 3;
    }

    return coords
  }

  function getXYMessage(cb) {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const x = cb[0];
    const y = cb[1];

    const msgString = `Coordinates (${x}, ${y})`;
    return msgString;
  }

  function reset() {
    setIndex(initialIndex);
    setStepCounter(initialSteps);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    setStepCounter(stepCounter + 1);
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage(getXY(index))}</h3>
        <h3 id="steps">You moved {stepCounter} time{stepCounter == 1 ? '' : 's'}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
              {idx === 4 ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">Message will go here</h3>
      </div>
      <div id="keypad">
        <button onClick={(evt) => move(evt)} id="left">LEFT</button>
        <button onClick={(evt) => move(evt)} id="up">UP</button>
        <button onClick={(evt) => move(evt)} id="right">RIGHT</button>
        <button onClick={(evt) => move(evt)} id="down">DOWN</button>
        <button onClick={() => reset()} id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
