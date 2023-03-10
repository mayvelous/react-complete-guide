import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    city: true,
    postcode: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const postcodeRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredPostcode = postcodeRef.current.value;
    const enteredCity = cityRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostcodeIsValid = isFiveChars(enteredPostcode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postcode: enteredPostcodeIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostcodeIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      console.log({
        name: enteredName,
        street: enteredStreet,
        postcode: enteredPostcode,
        city: enteredCity,
      });
      return;
    }

    // Submit the cart data
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postcode: enteredPostcode,
      city: enteredCity,
    });
  };

  const controlClasses = (fieldName) =>
    `${classes.control} ${formValidity[fieldName] ? '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={controlClasses('name')}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameRef} type='text' id='name' />
        {!formValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={controlClasses('street')}>
        <label htmlFor='street'>Street</label>
        <input ref={streetRef} type='text' id='street' />
        {!formValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={controlClasses('postcode')}>
        <label htmlFor='postal'>Postal Code</label>
        <input ref={postcodeRef} type='text' id='postal' />
        {!formValidity.postcode && <p>Please enter a valid postcode</p>}
      </div>
      <div className={controlClasses('city')}>
        <label htmlFor='city'>City</label>
        <input ref={cityRef} type='text' id='city' />
        {!formValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
