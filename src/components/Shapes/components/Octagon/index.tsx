import { forwardRef } from 'react'
import Box from '@mui/material/Box'

export interface OctagonProps {
  left?: number
  top?: number
  scale?: number
  rotate?: number
  zIndex?: number
}

const Octagon = forwardRef<HTMLElement, OctagonProps>(function Octagon(
  { left, top, scale = 1, rotate = 0, zIndex = 10 },
  ref
) {
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
      ref={ref}
      component="svg"
      role="img"
      className="shape"
      data-testid="shape-octagon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 144 144"
      style={style}
    >
      <path d="M0,101.6v-59.3L41.9,0h59.7l42.4,42.4v59.3l-42.4,42.4h-59.7L0,101.6Z" />
    </Box>
  )
})

export default Octagon
