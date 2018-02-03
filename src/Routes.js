import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import AuthenticatedRoute from './common/route/AuthenticatedRoute';
import { isAuthenticated } from './common/helpers/authHelpers';

import Home from './containers/Home';
import About from './containers/About';
import NotFound from './containers/NotFound';

const publicRoutes = {
  baseUri: '',
  routes: [
    { path: '/', exact: true, component: Home },
    { path: '/home', exact: true, component: Home },
    { path: '/about', exact: true, component: About },

    //defaults to not found. Should be last.
    { component: NotFound },
  ],
};

const authRoutes = {
  baseUri: '',
  unauthenticatedRedirect: '/login',
  routes: [
    { path: '/employee', exact: true, component: Home },
    { path: '/employee/add', exact: true, component: Home },
    { path: '/employee/id', exact: true, component: Home },
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
  runIsAuth = props => {
    return isAuthenticated(this.props.state, props);
  };

  render() {
    return (
      <Switch>
        {publicRoutes.routes.map(r => (
          <Route {...r} key={r.path || 'notFound'} />
        ))}

        {authRoutes.routes.map(r => (
          <AuthenticatedRoute
            {...r}
            key={r.path}
            isAuthenticated={this.runIsAuth}
          />
        ))}
      </Switch>
    );
  }
}

// export default Routes;
function mapStateToProps(state) {
  return { state };
}
export default connect(mapStateToProps)(Routes);
