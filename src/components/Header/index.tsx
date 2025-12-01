"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Image from 'next/image';

export default function Header(){
  const router = useRouter();

  const handleLogoClick = () => {
    router.replace('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none', p: 0 }}>
      <Toolbar 
        sx={{
            p: 0,
            paddingLeft: '0px !important',
        }}
      >
        <Box
          onClick={handleLogoClick}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            height: 40,
            width: 'auto',
            padding: 0,
          }}
        >
          <Image
            src="/Chaos_Logotype.png"
            alt="Chaos Agency"
            width={150}
            height={40}
            priority
            style={{ objectFit: 'contain' }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
