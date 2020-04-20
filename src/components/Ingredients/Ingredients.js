import React, {useState} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {

  const [ingredientList, setIngredientList] = useState([]);

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
      console.log(responseData);   
    });
  };

  const removeItemHandler = ingId => {
    setIngredientList(prevIngredients => prevIngredients.filter(ing => ing.id !== ingId));
  };

  // console.log(ingredientList);

  return (
    <div className="App">
      <IngredientForm onAddIngredient = {addIngredientHandler} />

      <section>
        <Search />
        {/* Need to add list here! */}
        <IngredientList ingredients={ingredientList} onRemoveItem={removeItemHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
