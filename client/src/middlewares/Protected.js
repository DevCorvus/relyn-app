import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '../redux/authSlice';

export default function Protected({ component: Component, ...rest }) {
  const auth = useSelector(isLoggedIn);
  if (!auth) {
    return <Redirect to="/login" />;
  }
  return (
    <Route {...rest} render={(routeProps) => <Component {...routeProps} />} />
  );
}
