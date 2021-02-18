import React from 'react';
import { render } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

// criar esse mock antes dos testes, para que todos possam receber esse mock e colocar o nome do modulo que eu quero mockar
// por exemplo vou utilizar o usehistory e link que vem da library react-router-dom

// quando esse meu react-router-dom for importado dos nosso arquivos, o que é que eu quero retornar ?

jest.mock('react-router-dom', () => {
  return {
    useHistory: jest.fn(), // jest.fn é uma função vazia que não faz nada, que só serve pra saber se essa função foi chamada ou nao
    Link: ({ children }: { children: React.ReactNode }) => children, // React.Node é uma tipagem do react, qualquer conteudo que um componente react poderia receber, sempre que for definir a tipagem pro children ou pra alguma prorpiedade que vai receber algum conteúdo em jsx, utiliza o react.node,  string, texto , html  , jsx etc...
  };
});

describe('SignIn Page', () => {
  it('should be able to sign in', () => {
    const { debug } = render(<SignIn />);

    debug();
  });
});
