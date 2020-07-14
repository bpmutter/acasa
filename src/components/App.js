import React from 'react';
import Navigation from './Navigation';
import Homepage from './Homepage';
import UserPage from './UserPage';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from './Footer';
function App() {
  return (
    <>
    <div style={{minHeight:'92vh'}}>
      <Navigation />
      <Router>
        <Switch>
          <Route path="/" exact>
            <Homepage />
          </Route>
          <Route path="/users/:username">
            <UserPage/>
          </Route>
          <Route path="*">
            <p>404...aww snapp</p>
          </Route>
        </Switch>
      </Router>
    </div>
      <Footer />
    </>
  );
}

export default App;
