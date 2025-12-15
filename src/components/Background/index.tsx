"use client";

import { useMemo, useState, useEffect, use } from 'react';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import { selectRandomShapeColor } from '@/utils';
import Shapes from '@/components/Shapes';
import usePointer from '@/hooks/usePointer';
import useIdleFade from '@/hooks/useIdleFade';

export default function Background(){
  const theme = useTheme()
  const pathname = usePathname()
  const [a11y, setA11y] = useState<boolean>(false);

  useEffect(() => {
    const storedA11y = localStorage.getItem('a11y');
    setA11y(storedA11y === 'true');

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'a11y') {
        setA11y(e.newValue === 'true');
      }
    };

    const handleA11yChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ value: string }>;
      setA11y(customEvent.detail.value === 'true');
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('a11yChange', handleA11yChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('a11yChange', handleA11yChange);
    };
  }, []);

  const randomColor = useMemo(() => a11y
    ? theme.palette.grey[300]
    : theme.palette.shapes[selectRandomShapeColor()], [theme, a11y, usePathname()])

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
      <Shapes key={pathname} />
    </Box>
  );
}
