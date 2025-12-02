"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { Labels } from '@/constants';

export default function Footer(){
    const pathname = usePathname();
    const router = useRouter();

    
    const handleAccessibilityClick = () => {
        const currentA11y = localStorage.getItem('a11y');
        const newValue = currentA11y === 'true' ? 'false' : 'true';
        localStorage.setItem('a11y', newValue);
        window.dispatchEvent(new CustomEvent('a11yChange', { detail: { value: newValue } }));
        router.refresh(); // Refresh server components
    };
    
    return (
        <Box 
            component="footer"
            onClick={handleAccessibilityClick}
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
