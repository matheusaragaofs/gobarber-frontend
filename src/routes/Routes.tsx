import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}
// rota privada e usuário autenticado
// true / true = Ok deixa ele entrar na rota e mostra o componente
// true / false = redirecionar ele pro login
// false / true == redirecionar para o dashboard
// false / false = Ok  deixa ele entrar na rota e mostra o componente
const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth(); // user , dados do usuário autenteicado
  // render modifica a logística que ele faz pra mostrar alguma rota / componente em tela,
  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
