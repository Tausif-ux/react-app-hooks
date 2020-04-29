import React, { useContext } from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth';
import { AuthContext } from './context/AuthContext';

const App = props => {
  const authenticationContext = useContext(AuthContext);
  
  let outPut = <Auth />;
  
  if (authenticationContext.isAuth) {
    outPut = <Ingredients />;
  }

  return outPut;

};

export default App;
