import React, { useState } from 'react';
import Card from '../UI/Card';

import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';
import ExpensesChart from './ExpensesChart';

import './Expenses.css';

const Expenses = ({ expenses }) => {
  const YEAR_DROPDOWN_DEFAULT = '-- All --';
  const [filteredYear, setFilteredYear] = useState(YEAR_DROPDOWN_DEFAULT);
  const years = [
    YEAR_DROPDOWN_DEFAULT,
    '2024',
    ...new Set(expenses.map((x) => x.date.getFullYear())),
  ];

  const filteredExpenses = expenses.filter((x) => {
    if (filteredYear !== YEAR_DROPDOWN_DEFAULT) {
      return x.date.getFullYear().toString() === filteredYear;
    }
    return x;
  });

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  return (
    <div>
      <Card className='expenses'>
        <ExpensesFilter
          years={years}
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        <ExpensesChart expenses={filteredExpenses} />
        <ExpensesList items={filteredExpenses} />
      </Card>
    </div>
  );
};

export default Expenses;
