import { createTheme } from '@mui/material/styles';
import { themeColors } from '@/constants'

declare module '@mui/material/styles' {
  interface Palette {
    shapes: {
      blue: string;
      green: string;
      orange: string;
      purple: string;
      red: string;
    };
  }

  interface PaletteOptions {
    shapes: {
      blue: string;
      green: string;
      orange: string;
      purple: string;
      red: string;
    };
  }
}

const theme = createTheme({
  palette: {
    shapes: themeColors, 
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
      fontSize: '0.769rem', 
      lineHeight: '1.1em',
      '@media (min-width: 801px)': {
        fontSize: '0.984vw', 
      },
    },
    caption: {
      fontSize: '0.616rem',
      lineHeight: '1em',
      '@media (min-width: 801px)': {
        fontSize: '0.788vw',
      },
    },
  }
});

export default theme;