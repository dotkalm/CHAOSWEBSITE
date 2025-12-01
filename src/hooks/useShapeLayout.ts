import { useState } from 'react'
import { 
  randomRotation, 
  randomNormalScale, 
  randomBigScale,
  jitter,
  clampRange,
  randomZIndex
} from '@/utils'
import { SHAPE_LAYOUT_CONFIG } from '@/constants'

interface ShapeLayout {
  left: number
  top: number
  rotation: number
  scale: number
  zIndex: number
}

/**
 * Shuffle an array in place using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function useShapeLayout() {
  const [layouts] = useState<ShapeLayout[]>(() => {
    const { 
      GRID_POSITIONS, 
      JITTER_X, 
      JITTER_Y, 
      MIN_POSITION, 
      MAX_POSITION 
    } = SHAPE_LAYOUT_CONFIG
    
    // Shuffle grid columns and rows to randomize placement
    const columnOrder = shuffleArray([0, 1, 2])
    const rowOrder = shuffleArray([0, 1, 2])
    
    // Pick one random shape to be "big"
    const bigShapeIndex = Math.floor(Math.random() * 3)
    
    return [0, 1, 2].map((i) => {
      // Get grid position for this shape
      const colIdx = columnOrder[i % 3]
      const rowIdx = rowOrder[i % 3]
      
      // Apply jitter to grid position
      const baseLeft = GRID_POSITIONS[colIdx]
      const baseTop = GRID_POSITIONS[rowIdx]
      
      // Add jitter and clamp to safe viewport bounds
      const left = clampRange(baseLeft + jitter(JITTER_X), MIN_POSITION, MAX_POSITION)
      const top = clampRange(baseTop + jitter(JITTER_Y), MIN_POSITION, MAX_POSITION)
      
      return {
        left: left * 100, // Convert to percentage
        top: top * 100,   // Convert to percentage
        rotation: randomRotation(),
        scale: i === bigShapeIndex ? randomBigScale() : randomNormalScale(),
        zIndex: randomZIndex()
      }
    })
  })

  return { layouts }
}
