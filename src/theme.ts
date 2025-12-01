import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    shapes: {
      green: string;
      purple: string;
      red: string;
      orange: string;
    };
  }

  interface PaletteOptions {
    shapes: {
      green: string;
      purple: string;
      red: string;
      orange: string;
    };
  }
}

const theme = createTheme({
  palette: {
    shapes: {
      green: '#008700',
      purple: '#db3adf',
      red: '#d30000',
      orange: '#ffa600'
    },
    primary: { main: '#000' }, 
    secondary: { main: '#000' },
    background: {
      default: 'transparent',
      paper: 'transparent',
    },
    grey: {
      300: '#d9d9d9', // shapes / accessibility mode
      500: '#808080' // neutral gray for hover/active text
    }
  },
  typography: {
    fontFamily: ['NewRail', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    // Type size guide from PDF:
    // Type size 1: 13 over 16 (use for body)
    // Type size 2: 10 over 12
    // Type size 3: 8 over 10
    h1: { fontSize: '32px' },
    h2: { fontSize: '24px' },
    h3: { fontSize: '20px' },
    body1: { fontSize: '0.8125rem', lineHeight: '1rem' },
    body2: { fontSize: '0.625rem', lineHeight: '0.75rem' },
    caption: { fontSize: '0.5rem', lineHeight: '0.625rem' }
  }
});

export default theme;
