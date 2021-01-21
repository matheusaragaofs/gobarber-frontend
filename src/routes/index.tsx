import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from '../pages/SignIn/index';
import SignOut from '../pages/SignUp/index';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignOut} />
  </Switch>
);

export default Routes;
