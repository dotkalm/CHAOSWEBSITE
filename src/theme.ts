import { createTheme } from '@mui/material/styles';

// Theme based on design__temp__.pdf (page 1) — colors and type scale
const theme = createTheme({
  palette: {
    primary: { main: '#008700' }, // green from PDF
    secondary: { main: '#db3adf' }, // magenta/purple
    error: { main: '#d30000' }, // red
    warning: { main: '#ffa600' }, // orange
    background: {
      default: '#ffffff',
      paper: '#ffffff'
    },
    grey: {
      300: '#d9d9d9', // shapes / accessibility mode
      500: '#808080' // neutral gray for hover/active text
    }
  },
  typography: {
    fontFamily: ['Inter', 'Roboto', 'Arial', 'sans-serif'].join(','),
    // Type size guide from PDF:
    // Type size 1: 13 over 16 (use for body)
    // Type size 2: 10 over 12
    // Type size 3: 8 over 10
    h1: { fontSize: '32px', fontWeight: 700 },
    h2: { fontSize: '24px', fontWeight: 600 },
    h3: { fontSize: '20px', fontWeight: 600 },
    body1: { fontSize: '13px', lineHeight: '16px' },
    body2: { fontSize: '10px', lineHeight: '12px' },
    caption: { fontSize: '8px', lineHeight: '10px', color: '#808080' }
  }
});

export default theme;
