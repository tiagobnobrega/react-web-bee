import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { isAuthenticated } from './common/helpers/authHelpers';

import Home from './basics/Home';
import About from './basics/About';
import NotFound from './basics/NotFound';
import Login from './basics/Login';

import EmployeeList from './employees/List';
import EmployeeAdd from './employees/Add';
import EmployeeEdit from './employees/Edit';

const authRoutes = {
  baseUri: '',
  unauthenticatedRedirect: '/login',
  routes: [
    { path: '/employee', exact: true, component: EmployeeList },
    { path: '/employee/add', exact: true, component: EmployeeAdd },
    { path: '/employee/:id', exact: true, component: EmployeeEdit },
  ],
};

const publicRoutes = {
  baseUri: '',
  routes: [
    { path: '/', exact: true, component: Home },
    { path: '/login', exact: true, component: Login },
    { path: '/home', exact: true, component: Home },
    { path: '/about', exact: true, component: About },

    //defaults to not found. Should be last.
    { component: NotFound },
  ],
};

publicRoutes.routes = publicRoutes.routes.map(r => ({
  ...r,
  path: r.path && `${publicRoutes.baseUri}${r.path}`,
}));
authRoutes.routes = authRoutes.routes.map(r => ({
  ...r,
  path: r.path && `${authRoutes.baseUri}${r.path}`,
}));

class Routes extends Component {
  render() {
    return (
      <Switch>
        {authRoutes.routes.map(
          r =>
            isAuthenticated(this.props.state, r) ? (
              <Route {...r} key={r.path || 'notFound'} />
            ) : (
              <Redirect
                to={{
                  pathname: authRoutes.unauthorizedRedirect,
                  state: { from: this.props.location },
                }}
              />
            )
        )}
        {publicRoutes.routes.map(r => (
          <Route {...r} key={r.path || 'notFound'} />
        ))}
      </Switch>
    );
  }
}

// export default Routes;
function mapStateToProps(state) {
  return { state };
}
export default withRouter(connect(mapStateToProps)(Routes));
