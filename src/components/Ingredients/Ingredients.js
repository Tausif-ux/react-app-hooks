import React, {useState, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {

  const [ingredientList, setIngredientList] = useState([]);

  const ingredientsFetchHandler = useCallback( //react will cathces fn and will not make new fn while re-rendering
    fetchedIngredients => {
      setIngredientList(fetchedIngredients);
    }, []);

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-84ada.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      console.log(response);
      return response.json();
    }).then(responseData => {
      setIngredientList(prevState =>{
        return [...prevState, { id: responseData.name, ...ingredient }]
      }); 
    });
  };

  const removeItemHandler = ingId => {
    setIngredientList(prevIngredients => { 
      return prevIngredients.filter(ing => ing.id !== ingId);
    });
  };

  // console.log(ingredientList);

  return (
    <div className="App">
      <IngredientForm onAddIngredient = {addIngredientHandler} />
      <section>
        <Search onIngredientFetch = {ingredientsFetchHandler} />
        <IngredientList ingredients = {ingredientList} onRemoveItem = {removeItemHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
