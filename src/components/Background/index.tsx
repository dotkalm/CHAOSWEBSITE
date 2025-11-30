"use client";

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import { selectRandomShapeColor } from '@/utils';
import Shapes from '@/components/Shapes';

export default function Background(){
  const theme = useTheme()
  const randomColor = theme.palette.shapes[selectRandomShapeColor()]
  
  return (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -9999,
      '& svg path': {
        fill: {
          xs: theme.palette.grey[300],
          sm: randomColor
        },
        strokeWidth: 0
      }
    }}>
      <Shapes />
    </Box>
  );
}
