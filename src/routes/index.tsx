import React from 'react';
import { Switch } from 'react-router-dom';
import SignIn from '../pages/SignIn/index';
import SignOut from '../pages/SignUp/index';
import Dashboard from '../pages/Dashboard/index';
import Route from './Routes';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignOut} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    {/* // se a rota tiver o "isPrivate" e o usuário não estiver logado ,ele redireciona para a rota de login */}
  </Switch>
);

export default Routes;
