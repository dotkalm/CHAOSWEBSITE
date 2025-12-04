import { forwardRef } from 'react'

export interface TriangleProps {
  left?: number
  top?: number
  scale?: number
  rotate?: number
  zIndex?: number
}

const Triangle = forwardRef<SVGSVGElement, TriangleProps>(function Triangle(
  { left, top, scale = 1, rotate = 0, zIndex = 10 },
  ref
) {
  const style: React.CSSProperties = {
    willChange: 'transform',
    position: 'absolute',
    width: '50vmin',
    height: '50vmin',
  }
  
  if (left !== undefined) {
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
    <svg
      ref={ref}
      role="img"
      className="shape"
      data-testid="shape-triangle"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 144 144"
      style={style}
      suppressHydrationWarning
    >
      <path d="M144,144h-144L72.2,0,144,144Z" />
    </svg>
  )
})

export default Triangle
