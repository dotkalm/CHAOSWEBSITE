/**
 * Parallax Configuration
 * 
 * Controls how shapes respond to pointer/cursor movement
 */

export const PARALLAX_CONFIG = {
  /**
   * Overall cursor→movement scale
   * Higher values = more movement
   */
  moveScale: 0.9,
  
  /**
   * Minimum movement factor for farthest shape
   * Base depth factor before depth scaling is applied
   */
  depthBase: 0.3,
  
  /**
   * Additional movement factor scaled by depth
   * Creates depth illusion by making closer shapes move more
   */
  depthRange: 1.5,
  
  /**
   * Rotation sensitivity to pointer movement
   * Higher values = more rotation
   */
  rotationScale: 200,
  
  /**
   * Flip horizontal direction of parallax
   */
  invertX: false,
  
  /**
   * Flip vertical direction of parallax
   */
  invertY: false,
} as const

export type ParallaxConfig = typeof PARALLAX_CONFIG
