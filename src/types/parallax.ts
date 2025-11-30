export interface ParallaxConfig {
  moveScale: number;      // overall cursor-to-movement scale
  depthBase: number;      // minimum movement factor for farthest shape
  depthRange: number;     // additional movement factor scaled by depth
  rotationScale: number;  // rotation sensitivity
  invertX: boolean;       // flip X direction
  invertY: boolean;       // flip Y direction
}

export interface PointerPosition {
  x: number;  // 0-1 normalized
  y: number;  // 0-1 normalized
}

export interface DragState {
  isActive: boolean;
  startX: number;  // 0-1 normalized
  startY: number;  // 0-1 normalized
}
