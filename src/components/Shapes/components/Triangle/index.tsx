import Box from '@mui/material/Box'

export interface TriangleProps {
  fill: string
  left?: number
  top?: number
  scale?: number
  rotate?: number
  zIndex?: number
}

export default function Triangle({ fill, left, top, scale = 1, rotate = 0, zIndex = 10 }: TriangleProps) {
  const style: React.CSSProperties = {}
  
  if (left !== undefined) {
    style.position = 'absolute'
    style.left = `${left}%`
  }
  if (top !== undefined) {
    style.top = `${top}%`
  }
  if (left !== undefined && top !== undefined) {
    style.transform = `translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`
  }
  if (zIndex !== undefined) {
    style.zIndex = zIndex
  }

  return (
    <Box
      component="svg"
      role="img"
      className="shape"
      data-testid="shape-triangle"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 131 144"
      style={style}
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
