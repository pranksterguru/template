import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import App from './App';
import barclaysTheme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CssVarsProvider theme={barclaysTheme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CssVarsProvider>
);
