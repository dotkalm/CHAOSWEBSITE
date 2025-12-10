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
    body1: {
      fontSize: '1rem', 
      lineHeight: '1.2em',
      '@media (min-width: 801px)': {
        fontSize: '1.28vw',
      },
    },
    body2: {
      fontSize: '0.984vw', 
      lineHeight: '1.2em',
      '@media (min-width: 801px)': {
        fontSize: '0.769rem', 
      },
    },
    caption: {
      fontSize: '0.788vw', 
      lineHeight: '1.2em',
      '@media (min-width: 801px)': {
        fontSize: '0.616rem', 
      },
    },
  }
});

export default theme;
/*
    body1: {
      fontSize: '1.21875rem', 
    },
    body2: {
      fontSize: '0.9375rem', 
    },
    caption: {
      fontSize: '0.75rem', 
    },
body1: 0.8125rem → 16px (line-height: 19.7px) -> 1.28vw
body2: 0.625rem → 12.3px (line-height: 14.8px) -> 0.984vw
caption: 0.5rem → 9.85px (line-height: 12.3px) -> 0.788vw
*/