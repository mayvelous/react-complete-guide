import { useState, useEffect } from 'react';

const useCounter = (forwards = true) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (forwards) {
        setCounter((prev) => prev + 1);
      } else {
        setCounter((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [forwards]);

  // Return anything you want, here we return counter number
  return counter;
};

export default useCounter;
