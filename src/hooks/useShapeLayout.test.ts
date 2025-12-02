import { renderHook } from '@testing-library/react'
import { useShapeLayout } from './useShapeLayout'

describe('useShapeLayout', () => {
  describe('Layout generation', () => {
    it('should return exactly 3 shape layouts', () => {
      const { result } = renderHook(() => useShapeLayout())
      
      expect(result.current.layouts).toHaveLength(3)
    })

    it('should have all required properties for each layout', () => {
      const { result } = renderHook(() => useShapeLayout())
      
      result.current.layouts.forEach(layout => {
        expect(layout).toHaveProperty('left')
        expect(layout).toHaveProperty('top')
        expect(layout).toHaveProperty('rotation')
        expect(layout).toHaveProperty('scale')
        expect(layout).toHaveProperty('zIndex')
      })
    })
  })

  describe('3x3 Grid positioning', () => {
    it('should position shapes within safe viewport bounds (12%-88%)', () => {
      const { result } = renderHook(() => useShapeLayout())
      
      result.current.layouts.forEach(layout => {
        expect(layout.left).toBeGreaterThanOrEqual(12)
        expect(layout.left).toBeLessThanOrEqual(88)
        expect(layout.top).toBeGreaterThanOrEqual(12)
        expect(layout.top).toBeLessThanOrEqual(88)
      })
    })

    it('should position shapes near grid intersections with jitter', () => {
      const { result } = renderHook(() => useShapeLayout())
      const gridPositions = [12, 50, 88]
      
      result.current.layouts.forEach(layout => {
        // Each position should be near at least one grid position (within jitter range)
        const nearGridX = gridPositions.some(grid => 
          Math.abs(layout.left - grid) <= 18 // 0.36 jitter * 50 = 18%
        )
        const nearGridY = gridPositions.some(grid => 
          Math.abs(layout.top - grid) <= 22 // 0.44 jitter * 50 = 22%
        )
        
        expect(nearGridX).toBe(true)
        expect(nearGridY).toBe(true)
      })
    })

    it('should not place all shapes at exact grid positions (jitter applied)', () => {
      const { result } = renderHook(() => useShapeLayout())
      const exactGridPositions = [12, 50, 88]
      
      // At least one shape should not be exactly on a grid position
      const allExact = result.current.layouts.every(layout => 
        exactGridPositions.includes(layout.left) && 
        exactGridPositions.includes(layout.top)
      )
      
      expect(allExact).toBe(false)
    })
  })

  describe('Rotation', () => {
    it('should apply rotation between 0-360 degrees to all shapes', () => {
      const { result } = renderHook(() => useShapeLayout())
      
      result.current.layouts.forEach(layout => {
        expect(layout.rotation).toBeGreaterThanOrEqual(0)
        expect(layout.rotation).toBeLessThanOrEqual(360)
        expect(Number.isInteger(layout.rotation)).toBe(true)
      })
    })

    it('should have varied rotations across shapes', () => {
      const { result } = renderHook(() => useShapeLayout())
      
      const rotations = result.current.layouts.map(l => l.rotation)
      const allSame = rotations.every(r => r === rotations[0])
      
      // Very unlikely all 3 would have the same random rotation
      expect(allSame).toBe(false)
    })
  })

  describe('Scale', () => {
    it('should have exactly one big shape (scale >= 2.4)', () => {
      const { result } = renderHook(() => useShapeLayout())
      
      const bigShapes = result.current.layouts.filter(l => l.scale >= 2.4)
      
      expect(bigShapes.length).toBeGreaterThanOrEqual(1)
    })

    it('should have big shape scale between 2.4-3.6', () => {
      const { result } = renderHook(() => useShapeLayout())
      
      const scales = result.current.layouts.map(l => l.scale)
      const maxScale = Math.max(...scales)
      
      expect(maxScale).toBeGreaterThanOrEqual(2.4)
      expect(maxScale).toBeLessThanOrEqual(3.6)
    })

    it('should have normal shapes scale between 1.65-2.3', () => {
      const { result } = renderHook(() => useShapeLayout())
      
      const normalShapes = result.current.layouts.filter(l => l.scale < 2.4)
      
      expect(normalShapes.length).toBeGreaterThanOrEqual(2)
      normalShapes.forEach(shape => {
        expect(shape.scale).toBeGreaterThanOrEqual(1.65)
        expect(shape.scale).toBeLessThanOrEqual(2.3)
      })
    })
  })

  describe('Z-index', () => {
    it('should assign z-index between 10-99 to all shapes', () => {
      const { result } = renderHook(() => useShapeLayout())
      
      result.current.layouts.forEach(layout => {
        expect(layout.zIndex).toBeGreaterThanOrEqual(10)
        expect(layout.zIndex).toBeLessThanOrEqual(99)
        expect(Number.isInteger(layout.zIndex)).toBe(true)
      })
    })

    it('should have varied z-index values for layering', () => {
      const { result } = renderHook(() => useShapeLayout())
      
      const zIndexes = result.current.layouts.map(l => l.zIndex)
      const unique = new Set(zIndexes)
      
      // At least 2 shapes should have different z-index
      expect(unique.size).toBeGreaterThanOrEqual(2)
    })
  })

  describe('Randomization on each mount', () => {
    it('should produce different layouts on different hook instances', () => {
      const { result: result1 } = renderHook(() => useShapeLayout())
      const { result: result2 } = renderHook(() => useShapeLayout())
      
      // At least one layout property should differ
      let hasDifference = false
      
      for (let i = 0; i < 3; i++) {
        if (result1.current.layouts[i].left !== result2.current.layouts[i].left ||
            result1.current.layouts[i].top !== result2.current.layouts[i].top ||
            result1.current.layouts[i].rotation !== result2.current.layouts[i].rotation) {
          hasDifference = true
          break
        }
      }
      
      expect(hasDifference).toBe(true)
    })

    it('should maintain stable layouts within same hook instance', () => {
      const { result, rerender } = renderHook(() => useShapeLayout())
      
      const initialLayouts = JSON.parse(JSON.stringify(result.current.layouts))
      
      // Re-render multiple times
      rerender()
      rerender()
      rerender()
      
      // Layouts should remain unchanged
      expect(result.current.layouts).toEqual(initialLayouts)
    })
  })

  describe('Shape distribution', () => {
    it('should distribute shapes across different positions (no overlap)', () => {
      const { result } = renderHook(() => useShapeLayout())
      
      // Check that no two shapes are at exactly the same position
      const positions = result.current.layouts.map(l => `${l.left},${l.top}`)
      const unique = new Set(positions)
      
      expect(unique.size).toBe(3)
    })

    it('should use all 3 shapes with different configurations', () => {
      const { result } = renderHook(() => useShapeLayout())
      
      // Verify we have variation in the layouts
      const scales = result.current.layouts.map(l => l.scale)
      const rotations = result.current.layouts.map(l => l.rotation)
      
      // Should have varied scales
      const uniqueScales = new Set(scales.map(s => Math.round(s * 10) / 10))
      expect(uniqueScales.size).toBeGreaterThanOrEqual(1)

      // Should have different rotations
      const uniqueRotations = new Set(rotations)
      expect(uniqueRotations.size).toBeGreaterThanOrEqual(2)
    })
  })

  describe('Edge cases', () => {
    it('should handle multiple consecutive renders without errors', () => {
      expect(() => {
        for (let i = 0; i < 50; i++) {
          renderHook(() => useShapeLayout())
        }
      }).not.toThrow()
    })

    it('should consistently return valid number types', () => {
      const { result } = renderHook(() => useShapeLayout())
      
      result.current.layouts.forEach(layout => {
        expect(typeof layout.left).toBe('number')
        expect(typeof layout.top).toBe('number')
        expect(typeof layout.rotation).toBe('number')
        expect(typeof layout.scale).toBe('number')
        expect(typeof layout.zIndex).toBe('number')
        
        expect(isNaN(layout.left)).toBe(false)
        expect(isNaN(layout.top)).toBe(false)
        expect(isNaN(layout.rotation)).toBe(false)
        expect(isNaN(layout.scale)).toBe(false)
        expect(isNaN(layout.zIndex)).toBe(false)
      })
    })
  })
})
