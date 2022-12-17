[x] set coordinates h3 to track actual coordinates
    [x] Create state for index/position
    [x] getXY will take index and determine (x,y)
[x] Increment stepCounter with each move, reset with reset btn
    [x] Create state for stepCounter
    [x] move handler should increment stepCounter
    [x] reset handler should set stepCounter to 0
[x] Update index when a direction is clicked
    [x] figure out how to know which direction was clicked 🤔
    [ ] pass direction into getNextIndex, then determine next index
        [x] if UP, index - 3
            [x] handle out of bounds
        [x] if DOWN, index + 3
            [x] handle out of bounds
        [x] if LEFT, index -1
            [x] handle out of bounds
        [x] if RIGHT, index + 1
            [x] handle out of bounds
[x] Control form input for email
[x] onSubmit should:
    [x] prevent default
    [x] post to server
    [x] setMessage(res.message)
    [x] setEmail(initialEmail)
