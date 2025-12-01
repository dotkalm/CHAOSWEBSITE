"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useStatements } from '@/hooks/useStatements';

export default function Statements(){
  const { currentStatement, isVisible } = useStatements()

  if (!currentStatement) {
    return null
  }

  return (
    <Box
      component="section"
      sx={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}
    >
      <Typography variant="body1" component="p">
        <Typography 
          component="span" 
          className="quote"
          sx={{
            opacity: 0,
            animation: isVisible ? 'line-reveal 80ms ease-out forwards' : 'none',
            animationDelay: '1s',
            '@keyframes line-reveal': {
              from: { opacity: 0 },
              to: { opacity: 1 }
            }
          }}
        >
          {currentStatement.quote}
        </Typography>
        {currentStatement.attribution && (
          <>
            {' '}
            <Typography 
              component="span"
              sx={{
                opacity: 0,
                animation: isVisible ? 'line-reveal 80ms ease-out forwards' : 'none',
                animationDelay: '1.333s',
                display: 'block',
                '@keyframes line-reveal': {
                  from: { opacity: 0 },
                  to: { opacity: 1 }
                }
              }}
            >
              — {currentStatement.attribution}
            </Typography>
          </>
        )}
      </Typography>
    </Box>
  );
}
