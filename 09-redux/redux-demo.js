const redux = require('redux');

// Inputs: Old State + Dispatched Action
// Output: New State Object
// Should be a pure function (same input leads to same output and should be no side effects inside of the function)
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
    };
  }
};

const store = redux.createStore(counterReducer);

const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

store.subscribe(counterSubscriber);

store.dispatch({
  type: 'increment',
});

store.dispatch({
  type: 'decrement',
});
