import { createTheme } from '@mui/material/styles';

const barclaysTheme = createTheme({
  palette: {
    primary: {
      main: '#00aeef'  // Barclays Blue
    },
    secondary: {
      main: '#00395d'  // Barclays Dark Blue
    },
    background: {
      default: '#f2f2f2'  // Light background
    },
    text: {
      primary: '#00395d'  // Dark text for accessibility
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#00395d'  
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          textTransform: 'none'
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#e0f7ff'
        }
      }
    }
  },
  typography: {
    fontFamily: ['"Segoe UI"', 'Roboto', 'sans-serif'].join(','),
    button: {
      fontWeight: 600
    }
  }
});

export default barclaysTheme;
