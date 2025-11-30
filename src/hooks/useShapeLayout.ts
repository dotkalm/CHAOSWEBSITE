import { useState } from 'react'
import { randomRotation } from '@/utils'

interface ShapeLayout {
  left: number
  top: number
  rotation: number
}

export function useShapeLayout() {
  const [layouts] = useState<ShapeLayout[]>(() => [
    { left: 50, top: 50, rotation: randomRotation() },
    { left: 50, top: 50, rotation: randomRotation() },
    { left: 50, top: 50, rotation: randomRotation() }
  ])

  return { layouts }
}
