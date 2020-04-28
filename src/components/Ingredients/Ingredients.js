import React, {useState, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';

function Ingredients() {

  const [ingredientList, setIngredientList] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState();


  const ingredientsFetchHandler = useCallback( //react will cathces fn and will not make new fn while re-rendering
    fetchedIngredients => {
      setIngredientList(fetchedIngredients);
    }, []);


  const addIngredientHandler = ingredient => {
    setIsLoading(true);
    fetch('https://react-hooks-84ada.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      setIsLoading(false);
      return response.json();
    }).then(responseData => {
      setIngredientList(prevState =>{
        return [...prevState, { id: responseData.name, ...ingredient }]
      }); 
    }).catch(err => {
      setError(err.message);
      setIsLoading(false);
    });
  };


  const removeItemHandler = ingId => {
    fetch(`https://react-hooks-84ada.firebaseio.com/ingredients/${ingId}.json`, 
    {
      method: 'DELETE'
    })
    .then(response => {
      setIngredientList(prevIngredients => { 
        return prevIngredients.filter(ing => ing.id !== ingId);
      });
    }).catch(err => {
      setError(err.message);
    });
  };

  const removeErrorModal = () => {
    setError('');
  };


  return (
    <div className="App">
      <IngredientForm onAddIngredient = {addIngredientHandler} loading={isLoading} />
      {error && <ErrorModal onClose={removeErrorModal}>{error}</ErrorModal>}
      <section>
        <Search onIngredientFetch = {ingredientsFetchHandler} />
        <IngredientList ingredients = {ingredientList} onRemoveItem = {removeItemHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
