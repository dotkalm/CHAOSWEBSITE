import Box from '@mui/material/Box'

export interface OctagonProps {
  fill: string
}

export default function Octagon({ fill }: OctagonProps) {
  return (
    <Box
      component="svg"
      role="img"
      className="shape"
      data-testid="shape-octagon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 144 144"
      sx={{
        '& path': {
          fill: fill,
          strokeWidth: 0
        }
      }}
    >
      <path d="M0,101.6v-59.3L41.9,0h59.7l42.4,42.4v59.3l-42.4,42.4h-59.7L0,101.6Z" />
    </Box>
  )
}
