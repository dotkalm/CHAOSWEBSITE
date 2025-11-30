/**
 * Generates random rotation in degrees
 * @returns Random rotation between 0-360
 */
export function randomRotation(): number {
  return Math.floor(Math.random() * 360);
}

/**
 * Generates random scale for normal-sized shapes
 * @returns Random scale between 0.35-0.75
 */
export function randomNormalScale(): number {
  return 0.35 + Math.random() * 0.4; // 0.35 to 0.75
}

/**
 * Generates random scale for big shape
 * @returns Random scale between 1.0-1.25
 */
export function randomBigScale(): number {
  return 1.0 + Math.random() * 0.25; // 1.0 to 1.25
}
