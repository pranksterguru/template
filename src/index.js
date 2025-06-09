import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import barclaysTheme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={barclaysTheme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
