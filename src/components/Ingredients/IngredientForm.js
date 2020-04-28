import React, { useState } from 'react';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {

  const [ingredientTitle, setIngredientTitle] = useState('');
  const [ingredientAmount, setIngredientAmount] = useState('');
  

  const submitHandler = event => {
    event.preventDefault();
    //Pass ingredient object to ingredints component
    props.onAddIngredient({ title: ingredientTitle, amount: ingredientAmount });
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={ingredientTitle} onChange={ event => setIngredientTitle(event.target.value) } />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={ingredientAmount} onChange={ event => setIngredientAmount(event.target.value) } />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
