import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from '../../layout/NotFound';
import Index from './pages'
import AddEdit from './pages/AddEdit'

Product.propTypes = {};

function Product(props) {
  const match = useRouteMatch();
  // console.log({ match });

  return (
    <Switch>

      <Route exact path={match.url} component={Index} />
      <Route path={`${match.url}/add`} component={AddEdit} />
      <Route path={`${match.url}/edit/:slug`} component={AddEdit} />
      {/*<Route path={`${match.url}/:photoId`} component={} />*/}

      <Route component={NotFound} />
    </Switch>
  );
}

export default Product;