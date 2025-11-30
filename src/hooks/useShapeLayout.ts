import { useState } from 'react'
import { randomRotation, randomNormalScale, randomBigScale } from '@/utils'

interface ShapeLayout {
  left: number
  top: number
  rotation: number
  scale: number
}

export function useShapeLayout() {
  const [layouts] = useState<ShapeLayout[]>(() => {
    // Pick one random shape to be "big"
    const bigShapeIndex = Math.floor(Math.random() * 3)
    
    return [
      { 
        left: 50, 
        top: 50, 
        rotation: randomRotation(),
        scale: bigShapeIndex === 0 ? randomBigScale() : randomNormalScale()
      },
      { 
        left: 50, 
        top: 50, 
        rotation: randomRotation(),
        scale: bigShapeIndex === 1 ? randomBigScale() : randomNormalScale()
      },
      { 
        left: 50, 
        top: 50, 
        rotation: randomRotation(),
        scale: bigShapeIndex === 2 ? randomBigScale() : randomNormalScale()
      }
    ]
  })

  return { layouts }
}
