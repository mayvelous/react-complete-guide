import React, { useContext } from 'react';

import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

import CartContext from '../../../store/cart-context';

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    const { id, name, price } = props;
    const cartItemToAdd = {
      id,
      name,
      price,
      amount,
    };

    cartCtx.addItem(cartItemToAdd);
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>

      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
