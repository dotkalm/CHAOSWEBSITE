/**
 * useIdleFade hook
 * Manages opacity fade effect after period of inactivity
 */

import { useState, useEffect } from 'react'

const IDLE_THRESHOLD_MS = 180000  // 3 minutes
const FADE_DURATION_MS = 20000    // 20 seconds

export default function useIdleFade(lastMoveTime: number): number {
  const [opacity, setOpacity] = useState<number>(1)

  useEffect(() => {
    let rafId: number

    const tick = () => {
      const now = performance.now()
      const idleMs = now - lastMoveTime

      if (idleMs >= IDLE_THRESHOLD_MS) {
        const t = Math.min((idleMs - IDLE_THRESHOLD_MS) / FADE_DURATION_MS, 1)
        const nextOpacity = 1 - t
        setOpacity(nextOpacity)
      } else {
        setOpacity(1)
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [lastMoveTime])

  return opacity
}
