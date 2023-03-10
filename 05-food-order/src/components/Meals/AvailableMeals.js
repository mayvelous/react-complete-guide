import React, { useState, useEffect } from 'react';
import classes from './AvailableMeals.module.css';

// import DUMMY_MEALS from '../../store/dummy-meals';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import useHttp from '../../hooks/use-http';

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();

  // should not return a promise and should run synchronously
  useEffect(() => {
    const parseMeals = (data) => {
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(loadedMeals);
    };

    const fetchMeals = async () => {
      await sendRequest(
        {
          url: `${process.env.REACT_APP_REALTIME_DB_URL}/meals.json`,
        },
        parseMeals,
      );
    };

    fetchMeals();
  }, [sendRequest]);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.mealsError}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
