import React, { Suspense, lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import MainLayout from './../layout/MainLayout';
import Loadable from '../components/Loadable';
import PrivateRoute from '../components/private-route/PrivateRoute';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));

// ecommerce routing
const Category = Loadable(lazy(() => import('../feautures/category')));
const Product = Loadable(lazy(() => import('../feautures/product')));
const Order = Loadable(lazy(() => import('../feautures/order')));

// sample page routings
const SamplePage = Loadable(lazy(() => import('../views/sample-page')));

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
  const location = useLocation();
  // console.log('main route');
  return (
    <Route
      path={[
        '/admin/dashboard',

        '/admin/category/add',
        '/admin/category',

        '/admin/product/add',
        '/admin/product',

        '/admin/order',

        '/sample-page'
      ]}
    >
      <MainLayout>
        <PrivateRoute>
          <Suspense fallback={<div>Loading ...</div>}>
            <Switch location={location} key={location.pathname}>
              <Route path="/admin/dashboard" component={DashboardDefault} />

              <Route path="/admin/category" component={Category} />
              <Route path="/admin/product" component={Product} />

              <Route exact path="/admin/order" component={Order} />

              <Route path="/admin/sample-page" component={SamplePage} />
            </Switch>
          </Suspense>
        </PrivateRoute>
      </MainLayout>
    </Route>
  );
};

export default MainRoutes;
