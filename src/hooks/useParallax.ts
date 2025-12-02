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
  const isDragActiveRef = useRef(false)
  const dragStartRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    if (shapes.length === 0) return

    const tick = () => {
      const { moveScale, depthBase, depthRange, rotationScale, invertX, invertY } = PARALLAX_CONFIG
      
      const invX = invertX ? -1 : 1
      const invY = invertY ? -1 : 1
      
      const baseDx = isDragActiveRef.current 
        ? (pointerPosition.x - dragStartRef.current.x) 
        : (pointerPosition.x - 0.5)
      const baseDy = isDragActiveRef.current 
        ? (pointerPosition.y - dragStartRef.current.y) 
        : (pointerPosition.y - 0.5)
      
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

  // Handle touch drag baseline
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent | TouchEvent) => {
      // Only treat touch interactions as drags
      if (
        ('pointerType' in e && e.pointerType === 'touch') ||
        ('touches' in e && e.touches.length > 0)
      ) {
        isDragActiveRef.current = true
        dragStartRef.current = { x: pointerPosition.x, y: pointerPosition.y }
      }
    }

    const handlePointerUp = (e: PointerEvent | TouchEvent) => {
      if (
        ('pointerType' in e && e.pointerType === 'touch') ||
        e.type === 'touchend' ||
        e.type === 'touchcancel'
      ) {
        isDragActiveRef.current = false
      }
    }

    window.addEventListener('pointerdown', handlePointerDown, { passive: true })
    window.addEventListener('touchstart', handlePointerDown as EventListener, { passive: true })
    window.addEventListener('pointerup', handlePointerUp, { passive: true })
    window.addEventListener('pointercancel', handlePointerUp, { passive: true })
    window.addEventListener('touchend', handlePointerUp as EventListener, { passive: true })
    window.addEventListener('touchcancel', handlePointerUp as EventListener, { passive: true })

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('touchstart', handlePointerDown as EventListener)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
      window.removeEventListener('touchend', handlePointerUp as EventListener)
      window.removeEventListener('touchcancel', handlePointerUp as EventListener)
    }
  }, [pointerPosition])
}
