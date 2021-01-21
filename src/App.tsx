import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn/index';
import AppProvider from './hooks/index';
import Routes from './routes/index';

const App: React.FunctionComponent = () => (
  <Router>
    <AppProvider>
      <Routes />
    </AppProvider>
    <GlobalStyle />
  </Router>
);
export default App;
