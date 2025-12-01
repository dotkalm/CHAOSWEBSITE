/**
 * Tests for useIdleFade hook
 */

import { renderHook, act } from '@testing-library/react'
import useIdleFade from './useIdleFade'

describe('useIdleFade', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  describe('Initial state', () => {
    it('should return opacity 1 initially', () => {
      const lastMoveTime = performance.now()
      const { result } = renderHook(() => useIdleFade(lastMoveTime))
      
      expect(result.current).toEqual(1)
    })

    it('should return opacity 1 when recently active', () => {
      const lastMoveTime = performance.now() - 1000 // 1 second ago
      const { result } = renderHook(() => useIdleFade(lastMoveTime))
      
      // Advance animation frame
      act(() => {
        jest.advanceTimersByTime(16) // One frame
      })
      
      expect(result.current).toEqual(1)
    })
  })

  describe('Idle threshold (3 minutes)', () => {
    it('should remain at opacity 1 before 3-minute threshold', () => {
      const lastMoveTime = performance.now()
      const { result } = renderHook(() => useIdleFade(lastMoveTime))
      
      // Advance to just before threshold (179 seconds)
      act(() => {
        jest.advanceTimersByTime(179000)
      })
      
      expect(result.current).toEqual(1)
    })

    it('should begin fading after 3 minutes (180000ms)', () => {
      const now = performance.now()
      const lastMoveTime = now - 180000 // 3 minutes ago
      
      const { result } = renderHook(() => useIdleFade(lastMoveTime))
      
      // Advance one frame to trigger calculation
      act(() => {
        jest.advanceTimersByTime(16)
      })
      
      expect(result.current).toEqual(1)
      
      // Advance slightly past threshold
      const lastMoveTimePastThreshold = now - 181000
      const { result: result2 } = renderHook(() => useIdleFade(lastMoveTimePastThreshold))
      
      act(() => {
        jest.advanceTimersByTime(16)
      })
      
      expect(result2.current).toBeLessThan(1)
      expect(result2.current).toBeGreaterThan(0)
    })
  })

  describe('Fade duration (20 seconds)', () => {
    it('should fade from opacity 1 to 0 over 20 seconds', () => {
      const now = performance.now()
      
      // Start at threshold
      let lastMoveTime = now - 180000
      const { result, rerender } = renderHook(({ time }) => useIdleFade(time), {
        initialProps: { time: lastMoveTime }
      })
      
      act(() => {
        jest.advanceTimersByTime(16)
      })
      
      expect(result.current).toEqual(1)
      
      // Halfway through fade (10 seconds after threshold)
      lastMoveTime = now - 190000
      rerender({ time: lastMoveTime })
      
      act(() => {
        jest.advanceTimersByTime(16)
      })
      
      expect(result.current).toBeGreaterThan(0.4)
      expect(result.current).toBeLessThan(0.6)
      
      // End of fade (20 seconds after threshold)
      lastMoveTime = now - 200000
      rerender({ time: lastMoveTime })
      
      act(() => {
        jest.advanceTimersByTime(16)
      })
      
      expect(result.current).toEqual(0)
    })

    it('should clamp opacity at 0 after fade completes', () => {
      const now = performance.now()
      
      // 30 seconds past threshold (beyond fade duration)
      const lastMoveTime = now - 210000
      const { result } = renderHook(() => useIdleFade(lastMoveTime))
      
      act(() => {
        jest.advanceTimersByTime(16)
      })
      
      expect(result.current).toEqual(0)
    })
  })

  describe('Opacity calculation', () => {
    it('should calculate opacity linearly during fade', () => {
      const now = performance.now()
      
      const testPoints = [
        { offsetMs: 180000, expectedOpacity: 1 },      // Start of fade
        { offsetMs: 185000, expectedOpacity: 0.75 },   // 25% through fade
        { offsetMs: 190000, expectedOpacity: 0.5 },    // 50% through fade
        { offsetMs: 195000, expectedOpacity: 0.25 },   // 75% through fade
        { offsetMs: 200000, expectedOpacity: 0 },      // End of fade
      ]
      
      testPoints.forEach(({ offsetMs, expectedOpacity }) => {
        const lastMoveTime = now - offsetMs
        const { result } = renderHook(() => useIdleFade(lastMoveTime))
        
        act(() => {
          jest.advanceTimersByTime(16)
        })
        
        expect(result.current).toBeCloseTo(expectedOpacity, 2)
      })
    })
  })

  describe('Reactivation', () => {
    it('should reset to opacity 1 when lastMoveTime updates', () => {
      const now = performance.now()
      
      // Start faded
      let lastMoveTime = now - 190000 // Halfway through fade
      const { result, rerender } = renderHook(({ time }) => useIdleFade(time), {
        initialProps: { time: lastMoveTime }
      })
      
      act(() => {
        jest.advanceTimersByTime(16)
      })
      
      expect(result.current).toBeLessThan(1)
      
      // Simulate pointer move (update lastMoveTime to now)
      lastMoveTime = now
      rerender({ time: lastMoveTime })
      
      act(() => {
        jest.advanceTimersByTime(16)
      })
      
      expect(result.current).toEqual(1)
    })
  })

  describe('Animation loop', () => {
    it('should use requestAnimationFrame for smooth updates', () => {
      const rafSpy = jest.spyOn(window, 'requestAnimationFrame')
      
      const lastMoveTime = performance.now()
      const { unmount } = renderHook(() => useIdleFade(lastMoveTime))
      
      expect(rafSpy).toHaveBeenCalled()
      
      unmount()
      rafSpy.mockRestore()
    })

    it('should cancel animation frame on unmount', () => {
      const cancelSpy = jest.spyOn(window, 'cancelAnimationFrame')
      
      const lastMoveTime = performance.now()
      const { unmount } = renderHook(() => useIdleFade(lastMoveTime))
      
      unmount()
      
      expect(cancelSpy).toHaveBeenCalled()
      
      cancelSpy.mockRestore()
    })
  })

  describe('Edge cases', () => {
    it('should handle lastMoveTime in the future', () => {
      const lastMoveTime = performance.now() + 10000 // 10 seconds in future
      const { result } = renderHook(() => useIdleFade(lastMoveTime))
      
      act(() => {
        jest.advanceTimersByTime(16)
      })
      
      // Should treat as active (opacity 1)
      expect(result.current).toEqual(1)
    })

    it('should handle very large lastMoveTime values', () => {
      const lastMoveTime = performance.now() - 1000000000 // Very long ago
      const { result } = renderHook(() => useIdleFade(lastMoveTime))
      
      act(() => {
        jest.advanceTimersByTime(16)
      })
      
      // Should be fully faded (opacity 0)
      expect(result.current).toEqual(0)
    })

    it('should handle rapid lastMoveTime updates', () => {
      const now = performance.now()
      let lastMoveTime = now
      
      const { result, rerender } = renderHook(({ time }) => useIdleFade(time), {
        initialProps: { time: lastMoveTime }
      })
      
      // Rapidly update lastMoveTime (simulating fast pointer movements)
      for (let i = 0; i < 10; i++) {
        lastMoveTime = now + i * 100
        rerender({ time: lastMoveTime })
        
        act(() => {
          jest.advanceTimersByTime(16)
        })
        
        expect(result.current).toEqual(1)
      }
    })
  })
})
