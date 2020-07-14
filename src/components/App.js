import React from 'react';
import Navigation from './Navigation';
import Homepage from './Homepage';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from './Footer';
function App() {
  return (
    <>
      <Navigation />
      <Router>
        <Switch>
          <Route path="/" exact>
            <Homepage />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;
