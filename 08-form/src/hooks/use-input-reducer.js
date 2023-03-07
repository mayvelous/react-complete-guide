import { useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched };
  }

  if (action.type === 'BLUR') {
    return { value: state.value, isTouched: true };
  }

  if (action.type === 'RESET') {
    return initialInputState;
  }

  return initialInputState;
};

const useInputReducer = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState,
  );

  const valueIsValid = validateValue(inputState.value); // execute the func
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (e) => {
    dispatch({ type: 'INPUT', value: e.target.value });
  };

  const inputBlurHandler = (e) => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  const inputClasses = hasError ? 'form-control invalid' : 'form-control';

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    inputClasses,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInputReducer;
