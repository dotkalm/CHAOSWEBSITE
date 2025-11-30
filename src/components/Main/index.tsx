"use client";

import * as React from 'react';
import Container from '@mui/material/Container';

export default function Main({children}:{children: React.ReactNode}){
  return <Container maxWidth="lg">{children}</Container>;
}
