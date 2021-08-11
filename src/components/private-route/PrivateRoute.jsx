import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { loginSuccess } from '../../feautures/auth/loginSlice';

import { getMe } from '../../store/userSlice';

const PrivateRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const updateAccessJWT = async () => {
      const actionResult = await dispatch(getMe());
      // console.log(actionResult);
    };
    !isAuth && localStorage.getItem('accessToken') && updateAccessJWT() && dispatch(loginSuccess());
  }, [dispatch, isAuth, user.isAdmin]);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (isAuth) return <>{children}</>;
        // if(!isAuth) return <Redirect to={{ pathname: '/login', state: { from: location } }} />
      }}
    />
  );
};
export default PrivateRoute;
