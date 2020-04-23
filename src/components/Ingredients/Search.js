import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(({ onIngredientFetch }) => {

  const [searchString, setSearchString] = useState('');
  const [loadedIngrList, setLoadedIngrList] = useState([]);

  useEffect(() => {
    const query = searchString.length === 0 ? '' : `?orderBy="title"&equalTo="${searchString}"`;

    fetch('https://react-hooks-84ada.firebaseio.com/ingredients.json' + query)
    .then(response => {
      return response.json();
    }).then(responseData => {
      const fetchedIngList = [];
      for (let key in responseData) {
        let ingredientElement = responseData[key];
        fetchedIngList.push({ id: key, title: ingredientElement.title, amount: ingredientElement.amount });       
      }
      onIngredientFetch(fetchedIngList);
    });

  }, [searchString,onIngredientFetch]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={searchString} onChange={event => {
            setSearchString(event.target.value);
          }} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
