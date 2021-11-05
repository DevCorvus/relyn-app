import React from 'react';
import { Route, useHistory } from "react-router-dom";
import { checkAuth } from "../APIs/authAPI";

export default function Guest({ component: Component, ...rest }) {
  const history = useHistory();
  if (checkAuth()) {
    history.goBack();
    return <></>;
  };
  return (
    <Route {...rest} render={routeProps => <Component {...routeProps} />} />
  );
}