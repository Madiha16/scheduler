import { useState } from 'react';

const useVisualMode = function(initial) {
  // Gary said this is unneccessary, can set it before returning out of statement
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false) {
    // Given [1, 2] if you transition(3, true) history should be [1, 3]
    // Passing "true" to transition(THIRD, true) says "Transition to THIRD by REPLACING SECOND"
    setHistory(prev =>
      replace ? [...prev.slice(0, - 1), newMode] : [...prev, newMode]
    );

    setMode(newMode)

  };

  const back = function() {
    if (history.length < 2) {
      return;
    }
    setHistory(prev => {
      // slice will not mutate original array (don't need to spread prev)
      const newHistory = prev.slice(0, -1);
      setMode([...newHistory].pop())
      return newHistory;
    }
  )};

  // Don't forget this!  history is needed here
  return { mode, transition, back, history };
};

export default useVisualMode;