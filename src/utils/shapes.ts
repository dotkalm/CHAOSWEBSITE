'use client';

import { SHAPE_COLOR_VALUES } from '@/constants'
import type { ShapeColor } from '@/types'

const getSeededIndex = (seed: number, arrayLength: number) => {
  return Math.floor(seed / 100) % arrayLength;
};

export function selectRandomShapeColor(): ShapeColor {
  const index = getSeededIndex(Date.now(), SHAPE_COLOR_VALUES.length);
  return SHAPE_COLOR_VALUES[index] as ShapeColor
}
