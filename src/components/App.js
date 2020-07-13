import React from 'react';
import Navigation from './Navigation';
import Homepage from './Homepage';
import {BrowserRouter as Router, Route} from 'react-router-dom';
function App() {
  return (
    <>
      <Navigation/>
      <Router>
        <Route path="/" exact>
          <Homepage/>
        </Route>
      </Router>
      
    </>
  );
}

export default App;
