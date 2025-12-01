/**
 * Generates random rotation in degrees
 * @returns Random rotation between 0-360
 */
export function randomRotation(): number {
  return Math.floor(Math.random() * 360);
}

import { SHAPE_LAYOUT_CONFIG } from '@/constants'

/**
 * Generates random scale for normal-sized shapes
 * @returns Random scale between NORMAL_SCALE_MIN and NORMAL_SCALE_MAX
 */
export function randomNormalScale(): number {
  const range = SHAPE_LAYOUT_CONFIG.NORMAL_SCALE_MAX - SHAPE_LAYOUT_CONFIG.NORMAL_SCALE_MIN
  return SHAPE_LAYOUT_CONFIG.NORMAL_SCALE_MIN + Math.random() * range
}

/**
 * Generates random scale for big shape
 * @returns Random scale between BIG_SCALE_MIN and BIG_SCALE_MAX
 */
export function randomBigScale(): number {
  const range = SHAPE_LAYOUT_CONFIG.BIG_SCALE_MAX - SHAPE_LAYOUT_CONFIG.BIG_SCALE_MIN
  return SHAPE_LAYOUT_CONFIG.BIG_SCALE_MIN + Math.random() * range
}

/**
 * Generate a random jitter value within the given amplitude
 * @param amplitude - Maximum deviation from center (both positive and negative)
 * @returns Random value between -amplitude and +amplitude
 */
export function jitter(amplitude: number): number {
  return (Math.random() - 0.5) * amplitude * 2;
}

/**
 * Clamp a value within a specified range
 * @param value - The value to clamp
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns Value clamped between min and max
 */
export function clampRange(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Generate a random z-index value for shape layering
 * @returns Random integer between Z_INDEX_MIN and Z_INDEX_MAX (inclusive)
 */
export function randomZIndex(): number {
  const range = SHAPE_LAYOUT_CONFIG.Z_INDEX_MAX - SHAPE_LAYOUT_CONFIG.Z_INDEX_MIN + 1
  return SHAPE_LAYOUT_CONFIG.Z_INDEX_MIN + Math.floor(Math.random() * range)
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 * @param items - The array to shuffle
 * @returns A new shuffled array (does not mutate original)
 */
export function shuffleArray<T>(items: T[]): T[] {
  const arr = items.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
