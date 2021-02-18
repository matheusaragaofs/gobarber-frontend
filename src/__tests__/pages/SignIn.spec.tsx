import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

// criar esse mock antes dos testes, para que todos possam receber esse mock e colocar o nome do modulo que eu quero mockar
// por exemplo vou utilizar o usehistory e link que vem da library react-router-dom

// quando esse meu react-router-dom for importado dos nosso arquivos, o que é que eu quero retornar ?

const mockedHistoryPush = jest.fn(); // criei uma variável pra que ela possa ser visível e nosso teste possa acessá-la. Pra saber quando o  history.push() for chamado. Por exemplo lá no meu código tem um history.push('/dasboard')
const mockedSignIn = jest.fn();

const mockedAddToast = jest.fn();

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }), // jest.fn é uma função vazia que não faz nada, que só serve pra saber se essa função foi chamada ou nao
    Link: ({ children }: { children: React.ReactNode }) => children, // React.Node é uma tipagem do react, qualquer conteudo que um componente react poderia receber, sempre que for definir a tipagem pro children ou pra alguma prorpiedade que vai receber algum conteúdo em jsx, utiliza o react.node,  string, texto , html  , jsx etc...
  };
});

jest.mock('../../hooks/auth.tsx', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn, // forçando a função signIn ser uma função que não retorna nada
    }),
  };
});
describe('SignIn Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear(); // pra nao ter que reutilizar essa variável a cada teste, ele vai limpar ela a cada teste
  });
  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    // getByText , encontrar um elemento pelo conteudo que tem dentro dele, vou utilizar pra pegar o botão

    const emailField = getByPlaceholderText('E-mail'); // vai retornar a referência pra esse elemento pra dentro do HTML
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    // Pra simular um evento do usuário, é bom usar o FireEvent
    // o objeto  { target: { value : "...."}} representa o evento  tipo onchange(e=> e.target.value)
    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement); // disparar um click nesse botão

    await waitFor(() => {
      // esse wait vai ficar executando esse expect até ele dá certo, por que lá no código do index.tsx, há funções assíncronas que demoram um tempo pra ser executada,  e esse history.push() é síncrono, então tem que forçar a sua espera para não dar erro;
      // esse wait serve pra disparar alguma coisa que vai demorar alguma coisa pra acontecer...
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });

    // Quero que meu usuário preencha os inputs do formulário e ao clicar no botão, ele chame o history.push('/dashboard')
    // Que é a ação VISUAL final da nossa aplicação!
  });
  it('should not be able to sign in with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });
  it('should display an error if login fails', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' }),
      );
    });
  });
});
