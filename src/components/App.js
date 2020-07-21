import React from 'react';
import Navigation from './Navigation';
import Homepage from './Homepage';
import UserPage from './UserPage';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from './Footer';
import ProtectedRoute from './ProtectedRoute';
import Profile from './Profile';
import ProfileSettings from "./ProfileSettings";
import CreateListing from './CreateListing';
import Testing from './Testing';
import FourOhFour from './FourOhFour';
import ListingPage from './ListingPage';

function App() {
  return (
    <>
      <div style={{ minHeight: "92vh" }}>
        <Router>
          <Navigation />
          <Switch>
            <Route path="/" exact>
              <Homepage />
            </Route>
            <ProtectedRoute exact path="/profile">
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute exact path="/profile/settings">
              <ProfileSettings />
            </ProtectedRoute>
            <ProtectedRoute path="/create-listing">
              <CreateListing />
            </ProtectedRoute>
            <Route path="/users/:username">
              <UserPage />
            </Route>
            <Route path="/listings/:id">
              <ListingPage/>
            </Route>
            <Route path="/testing">
              <Switch>
                <Route exact path="/testing">
                  <Testing />
                </Route>
                <Route path="/testing/listing">
                  <ListingPage />
                </Route>
              </Switch>
            </Route>
            <Route path="*">
              <FourOhFour />
            </Route>
          </Switch>
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;
