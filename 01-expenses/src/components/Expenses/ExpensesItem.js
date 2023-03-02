import React from 'react';
import './ExpenseItem.css';
import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';

const ExpenseItem = ({ expense }) => {
  const { date, amount, title } = expense;
  const toDollerString = (amount) => {
    const formatter = new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    });
    return formatter.format(amount);
  };

  return (
    <li>
      <Card className='expense-item'>
        <ExpenseDate date={date} />

        <div className='expense-item__description'>
          <h2>{title}</h2>
          <div className='expense-item__price'>{toDollerString(amount)}</div>
        </div>
      </Card>
    </li>
  );
};

export default ExpenseItem;
