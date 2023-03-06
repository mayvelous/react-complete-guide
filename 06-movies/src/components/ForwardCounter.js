import React from 'react';
import useCounter from '../hooks/use-counter';

const ForwardCounter = () => {
  const counter = useCounter();
  return <h2>{counter}</h2>;
};

export default ForwardCounter;
