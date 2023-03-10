import { useState } from 'react';

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue); // execute the func
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const inputBlurHandler = (e) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  const inputClasses = hasError ? 'form-control invalid' : 'form-control';

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    inputClasses,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
