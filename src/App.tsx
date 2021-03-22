import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.lime.light.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { ThemeProvider } from 'styled-components';
import dark from './styles/themes/dark';
// import light from './styles/themes/light';

import GlobalStyle from './styles/global';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <Router>
    <ThemeProvider theme={dark}>
      <AppProvider>
        <Routes />
      </AppProvider>

      <GlobalStyle />
    </ThemeProvider>
  </Router>
);

export default App;
