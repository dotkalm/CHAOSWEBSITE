"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { usePathname } from 'next/navigation';
import { Labels } from '@/constants';

export default function Footer(){
    const pathname = usePathname();
    return (
        <Box 
            component="footer"
            sx={{
                visibility: {
                    xs: 'hidden',
                    md: 'visible',
                },
                cursor: 'pointer',
            }}
        >
            <Typography variant="caption">
                {Labels.ACCESSIBILITY}
            </Typography>
        </Box>
    );
}
