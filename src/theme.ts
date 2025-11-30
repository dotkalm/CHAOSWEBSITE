import { createTheme } from '@mui/material/styles';

// Theme skeleton — adjust typography values to match reference/design.pdf (page 1)
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#9c27b0'
    }
  },
  typography: {
    fontFamily: ['Inter', 'Roboto', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontSize: '3rem',
      fontWeight: 700
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6
    }
  }
});

export default theme;
