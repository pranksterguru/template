import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import App from './App';
import barclaysTheme from './theme';

// Inject global print styles
const style = document.createElement('style');
style.innerHTML = `
  @media print {
    body {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
  }
`;
document.head.appendChild(style);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CssVarsProvider theme={barclaysTheme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CssVarsProvider>
);
