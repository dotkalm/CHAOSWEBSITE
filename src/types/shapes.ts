export type ShapeColor = 'green' | 'purple' | 'red' | 'orange';

export interface ShapeBaseState {
  node: HTMLElement;
  left: number;    // 0-1 normalized position
  top: number;     // 0-1 normalized position
  scale: number;   // scale factor
  rotate: number;  // rotation in degrees
  z: number;       // z-index value
}

export interface ShapePosition {
  left: number;
  top: number;
  rotate: number;
}
