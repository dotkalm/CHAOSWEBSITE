import { useEffect, useRef } from 'react'
import { PARALLAX_CONFIG } from '@/constants'

interface ShapeBaseState {
  node: SVGSVGElement
  left: number
  top: number
  scale: number
  rotate: number
  z: number
}

/**
 * Hook to apply parallax effect to shapes based on pointer position
 * Uses the pointer position from usePointer hook and applies depth-based movement
 * 
 * @param pointerPosition - Normalized pointer position {x, y} from 0-1
 * @param shapes - Array of shape elements with their base states
 */
export function useParallax(
  pointerPosition: { x: number; y: number },
  shapes: ShapeBaseState[]
) {
  const rafIdRef = useRef<number>(0)

  useEffect(() => {
    if (shapes.length === 0) return

    const tick = () => {
      const { moveScale, depthBase, depthRange, rotationScale, invertX, invertY } = PARALLAX_CONFIG
      
      const invX = invertX ? -1 : 1
      const invY = invertY ? -1 : 1
      
      // Always calculate from center (0.5, 0.5)
      const baseDx = pointerPosition.x - 0.5
      const baseDy = pointerPosition.y - 0.5
      
      const dx = baseDx * moveScale * invX
      const dy = baseDy * moveScale * invY

      shapes.forEach((shape, i) => {
        // Calculate depth factor (shapes further in array are "closer")
        const depth = (i + 1) / (shapes.length + 1)
        const factor = depthBase + depth * depthRange
        
        // Apply parallax offset
        const left = shape.left + dx * factor
        const top = shape.top + dy * factor
        const rot = shape.rotate + (dx - dy) * rotationScale * depth
        
        // Ensure scale is valid
        const scaleValue = typeof shape.scale === 'number' && !isNaN(shape.scale) && shape.scale > 0 ? shape.scale : 1
        
        // Update DOM
        shape.node.style.left = `${left * 100}%`
        shape.node.style.top = `${top * 100}%`
        shape.node.style.transform = `translate(-50%, -50%) rotate(${rot}deg) scale(${scaleValue})`
      })

      rafIdRef.current = requestAnimationFrame(tick)
    }

    rafIdRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [pointerPosition, shapes])
}
