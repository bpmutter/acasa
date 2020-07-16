import React from "react";
import { Route, Redirect } from "react-router-dom";
import firebase from 'firebase';
function PrivateRoute({ children, ...rest }) {
  const uid = firebase.auth().currentUser.uid;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        uid ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
