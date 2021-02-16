import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  avatar_url: string;
  name: string;
}
interface SignInCredentials {
  email: string;
  password: string;
}
interface AuthContextData {
  user: User;
  signIn(credential: SignInCredentials): Promise<void>;
  singOut(): void;
}

interface AuthState {
  token: string;
  user: User;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`; // quando o usuário dá f5 e quando ele loga (signIn) verificamos se o usuário está logado.
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState; // forçando uma tipagem pro objeto;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`; // 'vai se aplicar pra todas as requisições que acontencer daqui em diante

    setData({ token, user });
  }, []);

  const singOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');
    setData({} as AuthState);
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, singOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  // criando meu próprio hook
  const context = useContext(AuthContext); // ele vai retornar nosso contexto

  if (!context) {
    // se o usuário utilizar o useAuth sem passar o AuthProvider por volta dele, o contexto não vai existir
    throw new Error('useAuth must be use within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
