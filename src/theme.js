import { extendTheme } from '@mui/joy/styles';

const barclaysTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          // Barclays primary blue (Cyan, Light Blue, Dark Blue, Active Blue)
          solidBg: '#0BAEEF',      // Cyan (main button color)
          solidHoverBg: '#0076B6', // Light Blue (hover)
          solidActiveBg: '#006DE3',// Active Blue (active)
          outlinedBorder: '#00395D', // Dark Blue (border)
          outlinedColor: '#00395D',
          plainColor: '#00395D',
          100: '#AFFDFD',   // Bright Mint (very light)
          200: '#0076B6',   // Light Blue
          300: '#006DE3',   // Active Blue
          400: '#0BAEEF',   // Cyan
          500: '#00395D',   // Dark Blue
        },
        secondary: {
          solidBg: '#5C1E5B',    // Bright Purple
          solidHoverBg: '#4C3D6C',// Dark Purple
          outlinedBorder: '#752157', // Dark Claret
          plainColor: '#C7237A',    // Bright Claret
        },
        success: {
          solidBg: '#3F7E37',  // Green
          plainColor: '#3F7E37'
        },
        warning: {
          solidBg: '#FFCB05', // Orange
          plainColor: '#FFCB05'
        },
        danger: {
          solidBg: '#7A0FF9', // Electric Violet
          plainColor: '#C7237A' // Bright Claret
        },
        info: {
          solidBg: '#006DE3', // Active Blue
          plainColor: '#0BAEEF'
        },
        neutral: {
          solidBg: '#D9D9D9',   // Light Grey
          plainColor: '#272727',// Black
        },
        background: {
          body: '#F2F2F2',   // off-white
          surface: '#FFFFFF', // white
          level1: '#E8E8C9',  // stone
        },
        text: {
          primary: '#00395D', // dark blue
          secondary: '#515151', // dark grey
        },
      },
    },
  },
  fontFamily: {
    display: '"Segoe UI", Roboto, sans-serif',
    body: '"Segoe UI", Roboto, sans-serif'
  }
});

export default barclaysTheme;
