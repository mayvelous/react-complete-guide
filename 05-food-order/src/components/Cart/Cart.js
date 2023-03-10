import React, { useContext } from 'react';
import classes from './Cart.module.css';

import CartItem from './CartItem';
import Modal from '../UI/Modal';
import { useState } from 'react';
import Checkout from './Checkout';

import useHttp from '../../hooks/use-http';
import CartContext from '../../store/cart-context';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const { isLoading, sendRequest } = useHttp();

  const cartItemAddHandler = (item) => {
    const itemToAdd = { ...item, amount: 1 };
    cartCtx.addItem(itemToAdd);
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = (e) => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setHasSubmitted(false);
    await sendRequest({
      url: `${process.env.REACT_APP_REALTIME_DB_URL}/orders.json`,
      method: 'POST',
      body: {
        user: userData,
        orderedItems: cartCtx.items,
      },
    });

    setHasSubmitted(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            // .bind preconfigure func for future execution and allows preconfig arguments
            // use .bind to make sure item is passed to handler
            onAdd={cartItemAddHandler.bind(null, item)}
            // use .bind to make sure item id is passed to handler
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>

      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isLoadingContent = <p>Sending order data...</p>;
  const hasSubmittedContent = (
    <>
      <p>Successfully sent the order</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isLoading && !hasSubmitted && cartModalContent}
      {isLoading && isLoadingContent}
      {!isLoading && hasSubmitted && hasSubmittedContent}
    </Modal>
  );
};

export default Cart;
