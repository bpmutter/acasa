import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import context from './Context';
function PrivateRoute({ children, ...rest }) {
  const {loggedIn} = useContext(context);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
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
