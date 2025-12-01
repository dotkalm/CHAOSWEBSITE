"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Labels } from '@/constants';

export default function Footer(){
    return (
        <Box component="footer" sx={
            {
                position: 'fixed',
                bottom: 35,
                left: 40,
            }
        }
        >
            <Typography variant="h3">{Labels.ACCESSIBILITY}</Typography>
        </Box>
    );
}
