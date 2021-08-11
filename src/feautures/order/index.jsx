import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from '../../layout/NotFound';
import Index from './pages';

Product.propTypes = {};

function Product(props) {
  const match = useRouteMatch();
  console.log('order index', { match });

  return (
    <Switch>
      <Route exact path={match.url} component={Index} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default Product;
