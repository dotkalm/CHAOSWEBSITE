"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import Shapes from '@/components/Shapes';
import usePointer from '@/hooks/usePointer';
import useIdleFade from '@/hooks/useIdleFade';
import { SHAPE_COLOR_VALUES } from '@/constants'

export default function Background(){
  const theme = useTheme()
  const pathname = usePathname()
  const color = typeof window !== 'undefined' ? (window as any).__CHAOS_SEED__ : (() => {
    const index = Math.floor(Date.now() / 100) % SHAPE_COLOR_VALUES.length;
    return theme.palette.shapes[SHAPE_COLOR_VALUES[index]];
  })() as string;
  
  // Calculate initial color to prevent flash
  const [randomColor, setRandomColor] = useState<string>(() => {
    const index = Math.floor(Date.now() / 100) % SHAPE_COLOR_VALUES.length;
    return color || theme.palette.shapes[SHAPE_COLOR_VALUES[index]];
  });

  console.log(randomColor, color)

  useEffect(() => {
    const getColorFromSeed = (a11yState: boolean) => {
      if (a11yState) {
        return theme.palette.grey[300];
      } else {
        const index = Math.floor(Date.now() / 100) % SHAPE_COLOR_VALUES.length;
        return theme.palette.shapes[SHAPE_COLOR_VALUES[index]];
      }
    };
    
    const storedA11y = localStorage.getItem('a11y');
    setRandomColor(getColorFromSeed(storedA11y === 'true'));

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'a11y') {
        setRandomColor(getColorFromSeed(e.newValue === 'true'));
      }
    };

    const handleA11yChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ value: string }>;
      setRandomColor(getColorFromSeed(customEvent.detail.value === 'true'));
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('a11yChange', handleA11yChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('a11yChange', handleA11yChange);
    };
  }, [pathname]);

  const { lastMoveTime } = usePointer()
  const opacity = useIdleFade(lastMoveTime)
  
  return (
    <Box
      className=".background"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -9999,
        opacity,
        transition: 'none',
        '& svg path': {
          fill: randomColor,
          strokeWidth: 0
        }
      }}
    >
      <Shapes key={`${pathname}-${Date.now()}`} />
    </Box>
  );
}
