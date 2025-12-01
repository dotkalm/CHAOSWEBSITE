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
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        <Box
          onClick={handleLogoClick}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            height: 40,
            position: 'relative',
            width: 'auto',
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
