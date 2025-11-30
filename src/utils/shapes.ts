import { SHAPE_COLOR_VALUES } from '@/constants'
import type { ShapeColor } from '@/types'

export function selectRandomShapeColor(): ShapeColor {
  const randomIndex = Math.floor(Math.random() * SHAPE_COLOR_VALUES.length)
  return SHAPE_COLOR_VALUES[randomIndex] as ShapeColor
}
