import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Loadable from '../components/Loadable';

// project imports
import MinimalLayout from './../layout/MinimalLayout';

// login option 3 routing

const AuthLogin = Loadable(lazy(() => import('../feautures/auth/pages/Login')));
const AuthRegister = Loadable(lazy(() => import('../feautures/auth/pages/Register')));

//-----------------------|| AUTHENTICATION ROUTING ||-----------------------//

const AuthenticationRoutes = () => {
    const location = useLocation();

    return (
        <Route path={['/login', '/register']}>
            <MinimalLayout>
                <Switch location={location} key={location.pathname}>
                    <Route path="/login" component={AuthLogin} />
                    <Route path="/register" component={AuthRegister} />
                </Switch>
            </MinimalLayout>
        </Route>
    );
};

export default AuthenticationRoutes;
