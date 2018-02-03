import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const propTypes = {
  isAuthenticated: PropTypes.func.isRequired,
  unauthorizedRedirect: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

const defaultProps = {
  isAuthenticated: () => true,
  unauthorizedRedirect: '/login',
};

const AuthenticatedRoute = ({
  isAuthenticated,
  unauthorizedRedirect,
  component: AuthComponent,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated(props) ? (
        <AuthComponent {...props} />
      ) : (
        <Redirect
          to={{
            pathname: unauthorizedRedirect,
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
AuthenticatedRoute.propTypes = propTypes;
AuthenticatedRoute.defaultProps = defaultProps;

export default AuthenticatedRoute;
