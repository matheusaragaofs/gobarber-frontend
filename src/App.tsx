import React from 'react';
import GlobalStyle from './styles/global';
// import SignUp from './pages/SignUp/index';
import SignIn from './pages/SignIn/index';
import AppProvider from './hooks/index';

const App: React.FunctionComponent = () => (
  <>
    <AppProvider>
      <SignIn />
    </AppProvider>

    <GlobalStyle />
  </>
);
export default App;
