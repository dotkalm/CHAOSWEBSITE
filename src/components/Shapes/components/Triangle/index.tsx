import Box from '@mui/material/Box'

export interface TriangleProps {
  fill: string
}

export default function Triangle({ fill }: TriangleProps) {
  return (
    <Box
      component="svg"
      role="img"
      className="shape"
      data-testid="shape-triangle"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 131 144"
      sx={{
        '& path': {
          fill: fill,
          strokeWidth: 0
        }
      }}
    >
      <path d="M65.5,0l65.5,144H0L65.5,0Z" />
    </Box>
  )
}
