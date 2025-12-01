/**
 * Shape Layout Configuration
 * 
 * Controls the positioning and sizing of shapes on the page.
 * Adjust these values to tune whitespace coverage during stakeholder signoff.
 * 
 * Target: 80% coverage (20% whitespace) for optimal readability
 */

export const SHAPE_LAYOUT_CONFIG = {
  /**
   * 3x3 grid positions as normalized values (0-1)
   * Shapes are placed near these intersections
   */
  GRID_POSITIONS: [0.12, 0.5, 0.88] as const,
  
  /**
   * Random jitter applied to grid positions
   * Prevents shapes from being perfectly aligned
   */
  JITTER_X: 0.36, // Horizontal jitter amplitude
  JITTER_Y: 0.44, // Vertical jitter amplitude
  
  /**
   * Safe viewport bounds (normalized 0-1)
   * Ensures shapes don't get cut off at edges
   */
  MIN_POSITION: 0.12, // 12% from edge
  MAX_POSITION: 0.88, // 88% from edge
  
  /**
   * Scale ranges for normal-sized shapes
   * Two of the three shapes will use these values
   */
  NORMAL_SCALE_MIN: 0.6,
  NORMAL_SCALE_MAX: 0.9,
  
  /**
   * Scale range for the big shape
   * One randomly selected shape will be slightly larger
   * Keeping sizes more similar to match original site aesthetic
   */
  BIG_SCALE_MIN: 0.85,
  BIG_SCALE_MAX: 1.1,
  
  /**
   * Z-index range for shape layering
   * Creates depth by stacking shapes at different levels
   */
  Z_INDEX_MIN: 10,
  Z_INDEX_MAX: 99,
  
  /**
   * Shape dimensions
   * All shapes use 144x144 viewBox
   */
  SHAPE_VIEWBOX_SIZE: 144,
} as const

export type ShapeLayoutConfig = typeof SHAPE_LAYOUT_CONFIG
