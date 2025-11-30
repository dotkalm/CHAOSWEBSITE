"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Footer(){
  return (
    <Box component="footer" sx={{p:2, mt:4}}>
      <Typography variant="body2" align="center">© {new Date().getFullYear()} Chaos Agency</Typography>
    </Box>
  );
}
