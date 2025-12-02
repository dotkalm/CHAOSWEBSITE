"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import { NavigationTuple, NavigationLabels, NavigationColors } from '@/constants';

export default function Navigation(){
    const pathname = usePathname();
    const theme = useTheme();
    const [a11y, setA11y] = useState<boolean>(false);

    useEffect(() => {
        const storedA11y = localStorage.getItem('a11y');
        setA11y(storedA11y === 'true');

        const handleA11yChange = (e: Event) => {
            const customEvent = e as CustomEvent<{ value: string }>;
            setA11y(customEvent.detail.value === 'true');
        };

        window.addEventListener('a11yChange', handleA11yChange);
        return () => window.removeEventListener('a11yChange', handleA11yChange);
    }, []);

    return (
        <Box 
            component="nav"
            sx={{
                display: 'flex',
                gap: {
                    xs: 2,
                    sm: .5,
                },
                flexDirection: {
                    xs: 'row',
                    sm: 'column'
                },
                zIndex: {
                    sm: 1000
                }
            }}
        >
            {
                NavigationTuple.map((route) => {
                    const isActive = pathname === route;
                    const activeColor = isActive ? theme.palette.shapes[NavigationColors[route]] : theme.palette.primary.main;
                    const desktopColor = isActive && a11y ? theme.palette.shapes[NavigationColors[route]] : (isActive ? theme.palette.grey[500] : 'inherit');

                    return (
                        <Link
                            href={route}
                            key={NavigationLabels[route]}
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    color: {
                                        xs: activeColor,
                                        sm: desktopColor,
                                    },
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: {
                                            xs: activeColor,
                                            sm: `${theme.palette.grey[500]} !important`,
                                        }
                                    }
                                }}
                            >
                                {NavigationLabels[route]}
                            </Typography>
                        </Link>
                    );
                })
            }
        </Box>
    );
}
