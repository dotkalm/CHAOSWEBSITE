"use client";

import { useMemo } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import { selectRandomShapeColor } from '@/utils';
import Shapes from '@/components/Shapes';
import usePointer from '@/hooks/usePointer';
import useIdleFade from '@/hooks/useIdleFade';

export default function Background(){
  const theme = useTheme()
  const randomColor = useMemo(() => theme.palette.shapes[selectRandomShapeColor()], [theme])
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
          fill: {
            xs: theme.palette.grey[300],
            sm: randomColor
          },
          strokeWidth: 0
        }
      }}
    >
      <Shapes />
    </Box>
  );
}
