import React from 'react';
import Navigation from './Navigation';
import Homepage from './Homepage';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Switch } from '@material-ui/core';
import Footer from './Footer';
function App() {
  return (
    <>
      <Navigation />
      <Router>
          <Route path="/" exact>
            <Homepage />
          </Route>
      </Router>
      <Footer/>
    </>
  );
}

export default App;
