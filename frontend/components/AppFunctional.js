import React, { useState } from 'react';
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // State declarations
  const [index, setIndex] = useState(initialIndex);
  const [stepCounter, setStepCounter] = useState(initialSteps);
  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState(initialMessage);

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

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const coords = getXY(index);

    const msgString = `Coordinates (${coords[0]}, ${coords[1]})`;
    return msgString;
  }

  function reset() {
    setIndex(initialIndex);
    setStepCounter(initialSteps);
    setMessage(initialMessage);
    setEmail(initialEmail);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (direction === 'UP') {
      if (index < 3) {
        (setMessage(`You can't go Up`))
      } else {
        setIndex(index - 3);
        setStepCounter(stepCounter + 1)
        }
    } else if (direction === 'DOWN') {
      if(index > 5) {
        setMessage(`You can't go Down`)
      } else {
        setIndex(index + 3);
        setStepCounter(stepCounter + 1)
        }
    } else if (direction === "LEFT") {
      if(index % 3 === 0){        
        setMessage(`You can't go Left`)
      } else {
        setIndex(index - 1);
        setStepCounter(stepCounter + 1)
        }
    } else if (direction === 'RIGHT') {
      if(index % 3 === 2){        
        setMessage(`You can't go Right`)
      } else {
        setIndex(index + 1);
        setStepCounter(stepCounter + 1)
        }
    }

  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const direction = evt.target.textContent;

    getNextIndex(direction);    
  }

  function handleChange(evt) {
    // You will need this to update the value of the input.
    const newEmail = evt.target.value;
    setEmail(newEmail);
  }

  function handleSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    axios.post(`http://localhost:9000/api/result`, {'x': getXY(index)[0], 'y': getXY(index)[1], 'steps': stepCounter, 'email': email})
      .then(res => {
        setMessage(res.data.message);
        setEmail(initialEmail);
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {stepCounter} time{stepCounter == 1 ? '' : 's'}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : ''}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={(evt) => move(evt)} id="left">LEFT</button>
        <button onClick={(evt) => move(evt)} id="up">UP</button>
        <button onClick={(evt) => move(evt)} id="right">RIGHT</button>
        <button onClick={(evt) => move(evt)} id="down">DOWN</button>
        <button onClick={() => reset()} id="reset">reset</button>
      </div>
      <form>
        <input 
          id="email" 
          type="email" 
          placeholder="type email"
          value={email}
          onChange={(evt) => handleChange(evt)}
        ></input>
        <input 
          id="submit" 
          type="submit"
          onClick={(evt) => handleSubmit(evt)}
        ></input>
      </form>
    </div>
  )
}