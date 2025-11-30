"use client";

import Box from '@mui/material/Box';
import Shapes from '@/components/Shapes';

export default function Background(){
  return (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -9999
    }}>
      <Shapes />
    </Box>
  );
}
