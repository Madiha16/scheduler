import { useState } from 'react';

const useVisualMode = function(initial) {
  // Gary said this is unneccessary, can set it before returning out of statement
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false) {

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
      // use .pop() to get last element of newHistory array, setMode to that element
      setMode([...newHistory].pop())
      return newHistory;
    }
  )};

  return { mode, transition, back, history };
};

export default useVisualMode;