import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from '../../layout/NotFound';
import Index from './pages'
import Register from './pages/Register';

Product.propTypes = {};

function Product(props) {
  const match = useRouteMatch();
  // console.log({ match });

  return (
    <Switch>

      {/*<Route exact path={match.url} component={} />*/}
      <Route path={`${match.url}/register`} component={Register} />
      {/*<Route path={`${match.url}/edit/:slug`} component={AddEdit} />*/}
      {/*<Route path={`${match.url}/:photoId`} component={} />*/}

      <Route component={NotFound} />
    </Switch>
  );
}

export default Product;