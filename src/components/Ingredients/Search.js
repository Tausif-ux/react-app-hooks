import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(({ onIngredientFetch }) => {

  const [searchString, setSearchString] = useState('');
  const inputRef = useRef();


  useEffect(() => {
    const timer = setTimeout(() => {
      if(searchString === inputRef.current.value) {
        const query = searchString.length === 0 ? '' : `?orderBy="title"&equalTo="${searchString}"`;
        fetch('https://react-hooks-84ada.firebaseio.com/ingredients.json' + query)
          .then(response => {
            return response.json();
          })
          .then(responseData => {
            const fetchedIngList = [];
            for (let key in responseData) {
              let ingredientElement = responseData[key];
              fetchedIngList.push({ id: key, title: ingredientElement.title, amount: ingredientElement.amount });       
            }
            onIngredientFetch(fetchedIngList);
          });
      }
      
    }, 500);
    
    return () => {
      clearTimeout(timer);
    };

  }, [searchString, onIngredientFetch]);


  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref = {inputRef} type = "text" value = {searchString} onChange = {event => {
            setSearchString(event.target.value);
          }} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
