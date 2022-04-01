import { useState } from 'react';
// /  Replace this code with your version of useVisualMode

const useVisualMode = function(initial) {
  // Gary said this is unneccessary, can set it before returning out of statement
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  // ## 4 When transition is called, we need to add the new mode to our history.

  // # 2 Instruction
  // Create a transition function within useVisualMode that will take in a new mode and update the mode
  // state with the new value. If we used useState to initialize the mode state in useVisualMode, what
  // will we have to do to update the mode value?

  const transition = function(newMode, replace = false) {
    // Given [1, 2] if you transition(3, true) history should be [1, 3]
    // Passing "true" to transition(THIRD, true) says "Transition to THIRD by REPLACING SECOND"
    // if (replace === true) {
    //   setHistory(prev => {
    //     // return prev.slice(0, -1);
    //     return [...prev.slice(0, -1), newMode]
    //   });

    // } else {
    //   setHistory(prev => {
    //     return [...prev, newMode]
    //   })
    // }
    setHistory(prev =>
      replace ? [...prev.slice(0, - 1), newMode] : [...prev, newMode]
    );

    
    setMode(newMode)

    // const newHistory = [...history]
    // newHistory.push(newMode);
    // setHistory(newHistory);

    // if leaving mode, setMode at top of func...
    // setMode(newMode)

  };


  // ## 5 When back is called, we should set the mode to the previous item in our history array

  // # 3 Add an empty back() function to the Hook that allows us to go back to the previous mode.
  // You don't need to implement any logic for this function yet. Be sure to add the back property to the object
  // that useVisualMode returns, just like you did with the transition() function.

  const back = function() {
    // arr = [1]
    if (history.length < 2) {
      return;
    }
    setHistory(prev => {
      // slice will not mutate original array (don't need to spread prev)
      const newHistory = prev.slice(0, -1);
      setMode([...newHistory].pop())
      return newHistory;
    }
    // arr = [first, second, third]
  )};

  // In order to do the above, we will need to keep track of the history of the modes, so we can go backwards.
  // We can store this history as a stateful array called history in our Hook.
  // We'll interact with history through the transition and back actions.
  // In the following code we are initializing our history as an array with the first mode that gets passed to useVisualMode.


  // ## 6 Every time we add a mode to our history it goes to the top of the stack, this means to transition back to
  // the previous mode, all we need to do is remove the last item from the stack, and then setMode with the last item in the array.



  // # 7 Back Limit
  // We need to put a constraint on our back function. It should not allow the user to go back past the initial mode.
  // This means that our history array will always need to have a length that is greater than or equal to 1.
  // This test will confirm that navigating back from the initial mode will not change the mode value.
  

  // const mode = history.slice(-1)[0]; // FIRST from ['FIRST']
  // console.log("history sliced at 0:", history.slice(-1)[0])

  // Don't forget this!  history is needed here
  // return { mode, transition, back, history };
  return { mode, transition, back };
};

export default useVisualMode;