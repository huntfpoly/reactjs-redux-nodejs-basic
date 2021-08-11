import PrivateRoute from '@/components/private-route/PrivateRoute';
import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Loadable from '../components/Loadable';
// project imports
import HomeLayout from '../layout/HomeLayout';

// dashboard routing
const Home = Loadable(lazy(() => import('../views/home')));

// ecommerce routing
const Category = Loadable(lazy(() => import('../feautures/category')));
const Product = Loadable(lazy(() => import('../views/home/product')));
const Cart = Loadable(lazy(() => import('../views/home/cart')));
const Checkout = Loadable(lazy(() => import('../views/home/checkout/checkout')));
const Profile = Loadable(lazy(() => import('../views/home/profile')));
const Order = Loadable(lazy(() => import('../views/home/order')));
const DrawerProfile = Loadable(lazy(() => import('@/layout/HomeLayout/DrawerProfile')));

//-----------------------|| MAIN ROUTING ||-----------------------//

const HomeRoutes = () => {
  const location = useLocation();
  console.log('HomeRoutes');
  return (
    <Route path={['/', '/product/:slug', '/product', '/cart', '/checkout', '/order', '/profile']}>
      <HomeLayout>
        <Suspense fallback={<div>Loading ...</div>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/product" component={Product} />
            <Route exact path="/product/:slug" component={Category} />

            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <PrivateRoute>
              <DrawerProfile>
                <Route exact path="/order" component={Order} />
                <Route path="/profile" component={Profile} />
              </DrawerProfile>
            </PrivateRoute>
          </Switch>
        </Suspense>
      </HomeLayout>
    </Route>
  );
};

export default HomeRoutes;
