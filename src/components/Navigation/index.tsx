"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { Button } from '@mui/material';

export default function Navigation(){
  return (
    <Box component="nav" sx={{display:'flex',gap:2,p:2}}>
      <Link href="/"> <Button>Home</Button> </Link>
      <Link href="/mission"> <Button>Mission</Button> </Link>
      <Link href="/about"> <Button>About</Button> </Link>
      <Link href="/podcast"> <Button>Podcast</Button> </Link>
      <Link href="/contact"> <Button>Contact</Button> </Link>
    </Box>
  );
}
