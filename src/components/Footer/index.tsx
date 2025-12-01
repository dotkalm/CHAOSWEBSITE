"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { usePathname } from 'next/navigation';
import { Labels } from '@/constants';

export default function Footer(){
    const pathname = usePathname();
    const notRoot = pathname !== '/';
    return (
        <Box 
            component="footer"
            sx={{
                visibility: {
                    xs: notRoot ? 'hidden' : 'visible',
                    md: 'visible',
                }
            }}
        >
            <Typography variant="caption">{Labels.ACCESSIBILITY}</Typography>
        </Box>
    );
}
