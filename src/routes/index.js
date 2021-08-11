import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// project imports
import config from './../config';
import PrivateRoute from '../components/private-route/PrivateRoute';
import HomeRoutes from './HomeRoutes';
//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {
  // console.log('routes index');

  return (
    <Switch>
      {/* <Redirect exact from="/" to={config.defaultPath} /> */}
      <React.Fragment>
        <PrivateRoute path="/admin">
          <MainRoutes />
        </PrivateRoute>
        <HomeRoutes path="/" />
        {/* Routes for authentication pages */}
        <AuthenticationRoutes />
        {/* Routes for main layouts */}
      </React.Fragment>
    </Switch>
  );
};

export default Routes;
