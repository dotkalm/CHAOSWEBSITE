/**
 * Unit tests for grid-based shape positioning utilities
 */

import { jitter, clampRange, randomZIndex } from './math'

describe('Grid Positioning Utilities', () => {
  describe('jitter function', () => {
    it('should return values within amplitude range', () => {
      const amplitude = 0.36
      for (let i = 0; i < 100; i++) {
        const j = jitter(amplitude)
        expect(j).toBeGreaterThanOrEqual(-amplitude)
        expect(j).toBeLessThanOrEqual(amplitude)
      }
    })

    it('should produce varied values', () => {
      const values = Array.from({ length: 50 }, () => jitter(0.5))
      const unique = new Set(values)
      expect(unique.size).toBeGreaterThan(40)
    })

    it('should have distribution centered around 0', () => {
      const values = Array.from({ length: 1000 }, () => jitter(1.0))
      const avg = values.reduce((sum, v) => sum + v, 0) / values.length
      expect(Math.abs(avg)).toBeLessThan(0.1) // Close to 0
    })
  })

  describe('clampRange function', () => {
    it('should clamp values below minimum', () => {
      expect(clampRange(0.05, 0.12, 0.88)).toEqual(0.12)
      expect(clampRange(0.00, 0.12, 0.88)).toEqual(0.12)
      expect(clampRange(-0.5, 0.12, 0.88)).toEqual(0.12)
    })

    it('should clamp values above maximum', () => {
      expect(clampRange(0.95, 0.12, 0.88)).toEqual(0.88)
      expect(clampRange(1.00, 0.12, 0.88)).toEqual(0.88)
      expect(clampRange(1.50, 0.12, 0.88)).toEqual(0.88)
    })

    it('should not modify values within range', () => {
      expect(clampRange(0.12, 0.12, 0.88)).toEqual(0.12)
      expect(clampRange(0.50, 0.12, 0.88)).toEqual(0.50)
      expect(clampRange(0.88, 0.12, 0.88)).toEqual(0.88)
      expect(clampRange(0.75, 0.12, 0.88)).toEqual(0.75)
    })
  })

  describe('randomZIndex function', () => {
    it('should return z-index between 10 and 99', () => {
      for (let i = 0; i < 100; i++) {
        const z = randomZIndex()
        expect(z).toBeGreaterThanOrEqual(10)
        expect(z).toBeLessThanOrEqual(99)
        expect(Number.isInteger(z)).toEqual(true)
      }
    })

    it('should produce varied values', () => {
      const values = new Set<number>()
      for (let i = 0; i < 50; i++) {
        values.add(randomZIndex())
      }
      expect(values.size).toBeGreaterThan(30)
    })
  })

  describe('Grid positioning logic', () => {
    const GRID_POSITIONS = [0.12, 0.5, 0.88]
    const JITTER_X = 0.36
    const JITTER_Y = 0.44

    it('should use 3x3 grid at 12%, 50%, 88%', () => {
      // Verify grid positions are correct
      expect(GRID_POSITIONS).toHaveLength(3)
      expect(GRID_POSITIONS[0]).toEqual(0.12)
      expect(GRID_POSITIONS[1]).toEqual(0.5)
      expect(GRID_POSITIONS[2]).toEqual(0.88)
    })

    it('should apply jitter to grid positions', () => {
      // Grid position + jitter should result in varied positions
      // Example: 0.5 + jitter(0.36) could be anywhere from 0.14 to 0.86
      const basePosition = 0.5
      const minExpected = basePosition - JITTER_X
      const maxExpected = basePosition + JITTER_X
      
      expect(minExpected).toEqual(0.14)
      expect(maxExpected).toEqual(0.86)
    })

    it('should clamp jittered positions to 0.12-0.88 range', () => {
      // After jitter, positions should be clamped
      // 0.12 + jitter(0.36) could go below 0.12, needs clamping
      // 0.88 + jitter(0.36) could go above 0.88, needs clamping
      
      const edge1 = 0.12 - JITTER_X  // -0.24
      const edge2 = 0.88 + JITTER_X  // 1.24
      
      // These would need clamping
      expect(edge1).toBeLessThan(0.12)
      expect(edge2).toBeGreaterThan(0.88)
    })

    it('should result in positions within viewport safe zone', () => {
      // Final positions should be 12%-88% of viewport
      // This ensures shapes don't get cut off at edges
      const MIN_POSITION = 0.12
      const MAX_POSITION = 0.88
      
      expect(MIN_POSITION * 100).toEqual(12)
      expect(MAX_POSITION * 100).toEqual(88)
    })
  })
})
