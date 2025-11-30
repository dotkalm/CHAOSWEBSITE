import Box from '@mui/material/Box'

export interface SquareProps {
  fill: string
}

export default function Square({ fill }: SquareProps) {
  return (
    <Box
      component="svg"
      role="img"
      className="shape"
      data-testid="shape-square"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 126.7 144"
      sx={{
        '& path': {
          fill: fill,
          strokeWidth: 0
        }
      }}
    >
      <path d="M0,0h126.7v144H0V0Z" />
    </Box>
  )
}
