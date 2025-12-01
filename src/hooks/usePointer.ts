/**
 * usePointer hook
 * Tracks pointer position and last move time for parallax and idle fade effects
 */

import { useState, useEffect } from 'react'

export interface PointerPosition {
  x: number  // 0-1 normalized
  y: number  // 0-1 normalized
}

export interface UsePointerReturn {
  position: PointerPosition
  lastMoveTime: number
}

export default function usePointer(): UsePointerReturn {
  const [position, setPosition] = useState<PointerPosition>({ x: 0.5, y: 0.5 })
  const [lastMoveTime, setLastMoveTime] = useState<number>(performance.now())

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      
      setPosition({ x, y })
      setLastMoveTime(performance.now())
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

  return { position, lastMoveTime }
}
