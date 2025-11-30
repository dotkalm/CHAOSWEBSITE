/**
 * Unit tests for math utility functions
 */

import { randomRotation, randomNormalScale, randomBigScale } from './math'

describe('Math Utilities', () => {
  describe('randomRotation', () => {
    it('should return rotation between 0 and 360', () => {
      for (let i = 0; i < 100; i++) {
        const rotation = randomRotation()
        expect(rotation).toBeGreaterThanOrEqual(0)
        expect(rotation).toBeLessThanOrEqual(360)
      }
    })

    it('should return whole numbers', () => {
      for (let i = 0; i < 50; i++) {
        const rotation = randomRotation()
        expect(Number.isInteger(rotation)).toEqual(true)
      }
    })

    it('should produce varied values', () => {
      const rotations = new Set<number>()
      for (let i = 0; i < 50; i++) {
        rotations.add(randomRotation())
      }
      // Should have at least 30 unique values in 50 attempts
      expect(rotations.size).toBeGreaterThan(30)
    })
  })

  describe('randomNormalScale', () => {
    it('should return scale between 0.35 and 0.75', () => {
      for (let i = 0; i < 100; i++) {
        const scale = randomNormalScale()
        expect(scale).toBeGreaterThanOrEqual(0.35)
        expect(scale).toBeLessThanOrEqual(0.75)
      }
    })

    it('should produce varied values', () => {
      const scales = Array.from({ length: 50 }, () => randomNormalScale())
      const uniqueScales = new Set(scales)
      // Should have many unique values (floating point)
      expect(uniqueScales.size).toBeGreaterThan(40)
    })

    it('should have reasonable distribution', () => {
      const scales = Array.from({ length: 1000 }, () => randomNormalScale())
      const avg = scales.reduce((sum, s) => sum + s, 0) / scales.length
      // Average should be near midpoint (0.55)
      expect(avg).toBeGreaterThan(0.50)
      expect(avg).toBeLessThan(0.60)
    })
  })

  describe('randomBigScale', () => {
    it('should return scale between 1.0 and 1.25', () => {
      for (let i = 0; i < 100; i++) {
        const scale = randomBigScale()
        expect(scale).toBeGreaterThanOrEqual(1.0)
        expect(scale).toBeLessThanOrEqual(1.25)
      }
    })

    it('should produce varied values', () => {
      const scales = Array.from({ length: 50 }, () => randomBigScale())
      const uniqueScales = new Set(scales)
      // Should have many unique values (floating point)
      expect(uniqueScales.size).toBeGreaterThan(40)
    })

    it('should have reasonable distribution', () => {
      const scales = Array.from({ length: 1000 }, () => randomBigScale())
      const avg = scales.reduce((sum, s) => sum + s, 0) / scales.length
      // Average should be near midpoint (1.125)
      expect(avg).toBeGreaterThan(1.10)
      expect(avg).toBeLessThan(1.15)
    })
  })
})
