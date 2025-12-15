"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import {
    COPY,
    NavigationTuple,
    NavigationLabels,
    NavigationColors,
} from '@/constants';

export default function Navigation() {
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

    const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const email = COPY.contact.email;

        // Try to open mailto
        window.location.href = `mailto:${email}`;

        // Fallback: copy to clipboard silently after a brief delay
        setTimeout(() => {
            navigator.clipboard.writeText(email).catch(() => {
                // Silently fail if clipboard access is denied
            });
        }, 500);
    };

    return (
        <Box
            component="nav"
            sx={{
                display: 'flex',
                gap: {
                    xs: 'inherit',
                    sm: 0,
                },
                flexDirection: {
                    xs: 'row',
                    sm: 'column'
                },
                zIndex: {
                    sm: 1000
                },
                maxWidth: {
                    xs: '100%',
                    sm: '50vw',
                },
                justifyContent: {
                    xs: 'space-between',
                    sm: 'flex-start',
                },
            }}
        >
            {
                NavigationTuple.map((route) => {
                    const isActive = pathname === route;
                    const hoverColor = a11y ? theme.palette.shapes[NavigationColors[route]] : theme.palette.grey[500];
                    const desktopColor = isActive && a11y ? theme.palette.shapes[NavigationColors[route]] : (isActive ? theme.palette.grey[500] : 'inherit');

                    return (
                        <Typography
                            key={route}
                            variant="body1"
                            sx={{
                                color: desktopColor,
                                cursor: 'pointer',
                                '&:hover': {
                                    color: hoverColor,
                                }
                            }}
                        >
                            <Link
                                href={route}
                                key={NavigationLabels[route]}
                                style={{ textDecoration: 'none' }}
                            >
                                {NavigationLabels[route]}
                            </Link>
                        </Typography>
                    );
                })
            }
            <Typography
                variant="body1"
                sx={{
                    color: {
                        xs: theme.palette.primary.main,
                    },
                    cursor: 'pointer',
                    '&:hover': {
                        color: a11y ? theme.palette.shapes.orange : theme.palette.grey[500],
                    }
                }}
            >
                <a
                    href={`mailto:${COPY.contact.email}`}
                    onClick={handleContactClick}
                    style={{ textDecoration: 'none' }}
                >
                    {COPY.contact.label}
                </a>
            </Typography>
        </Box>
    );
}
