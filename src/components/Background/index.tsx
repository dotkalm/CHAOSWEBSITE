"use client";

import * as React from 'react';
import Box from '@mui/material/Box';

export default function Background(){
  return (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'dodgerblue',
      zIndex: -9999
    }}>
    </Box>
  );
}
