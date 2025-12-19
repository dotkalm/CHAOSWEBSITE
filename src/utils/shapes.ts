'use client';

import { SHAPE_COLOR_VALUES } from '@/constants'
import type { ShapeColor } from '@/types'
import { getSeededIndex } from './randomIndex';

export function selectRandomShapeColor(): ShapeColor {
  const index = getSeededIndex(Date.now(), SHAPE_COLOR_VALUES.length);
  return SHAPE_COLOR_VALUES[index] as ShapeColor
}
