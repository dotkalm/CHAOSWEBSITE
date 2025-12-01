"use client";

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import { NavigationTuple, NavigationLabels, NavigationColors } from '@/constants';

export default function Navigation(){
    const pathname = usePathname();
    const theme = useTheme();

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
                    const activeMobileColor = isActive ? theme.palette.shapes[NavigationColors[route]] : theme.palette.primary.main;

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
                                        xs: activeMobileColor,
                                        sm: isActive ? theme.palette.grey[500] : 'inherit',
                                    },
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: {
                                            xs: activeMobileColor,
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
