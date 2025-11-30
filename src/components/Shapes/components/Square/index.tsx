import Box from '@mui/material/Box'

export interface SquareProps {
  left?: number
  top?: number
  scale?: number
  rotate?: number
  zIndex?: number
}

export default function Square({ left, top, scale = 1, rotate = 0, zIndex = 10 }: SquareProps) {
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
      data-testid="shape-square"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 144 144"
      style={style}
    >
      <path d="M0,0h144v144h-144V0Z" />
    </Box>
  )
}
