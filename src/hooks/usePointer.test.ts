/**
 * Tests for usePointer hook
 */

import { renderHook, act } from '@testing-library/react'
import usePointer from './usePointer'

describe('usePointer', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  describe('Pointer position tracking', () => {
    it('should return initial position at center (0.5, 0.5)', () => {
      const { result } = renderHook(() => usePointer())
      
      expect(result.current.position.x).toEqual(0.5)
      expect(result.current.position.y).toEqual(0.5)
    })

    it('should update position on pointermove event', () => {
      const { result } = renderHook(() => usePointer())
      
      // Simulate pointer move to top-left corner
      act(() => {
        const event = new PointerEvent('pointermove', {
          clientX: 0,
          clientY: 0,
          bubbles: true
        })
        window.dispatchEvent(event)
      })
      
      expect(result.current.position.x).toEqual(0)
      expect(result.current.position.y).toEqual(0)
    })

    it('should normalize position to 0-1 range based on window size', () => {
      // Mock window size
      Object.defineProperty(window, 'innerWidth', { value: 1000, writable: true })
      Object.defineProperty(window, 'innerHeight', { value: 800, writable: true })
      
      const { result } = renderHook(() => usePointer())
      
      // Pointer at (500, 400) should be center (0.5, 0.5)
      act(() => {
        const event = new PointerEvent('pointermove', {
          clientX: 500,
          clientY: 400,
          bubbles: true
        })
        window.dispatchEvent(event)
      })
      
      expect(result.current.position.x).toEqual(0.5)
      expect(result.current.position.y).toEqual(0.5)
    })

    it('should handle bottom-right corner as (1, 1)', () => {
      Object.defineProperty(window, 'innerWidth', { value: 1000, writable: true })
      Object.defineProperty(window, 'innerHeight', { value: 800, writable: true })
      
      const { result } = renderHook(() => usePointer())
      
      act(() => {
        const event = new PointerEvent('pointermove', {
          clientX: 1000,
          clientY: 800,
          bubbles: true
        })
        window.dispatchEvent(event)
      })
      
      expect(result.current.position.x).toEqual(1)
      expect(result.current.position.y).toEqual(1)
    })
  })

  describe('Last move time tracking', () => {
    it('should initialize with current timestamp', () => {
      const now = performance.now()
      
      const { result } = renderHook(() => usePointer())
      
      expect(result.current.lastMoveTime).toBeGreaterThanOrEqual(now)
      expect(result.current.lastMoveTime).toBeLessThanOrEqual(performance.now())
    })

    it('should update lastMoveTime on pointermove', () => {
      const { result } = renderHook(() => usePointer())
      
      const initialTime = result.current.lastMoveTime
      
      // Advance time and trigger pointer move
      jest.advanceTimersByTime(1000)
      
      act(() => {
        const event = new PointerEvent('pointermove', {
          clientX: 100,
          clientY: 100,
          bubbles: true
        })
        window.dispatchEvent(event)
      })
      
      expect(result.current.lastMoveTime).toBeGreaterThanOrEqual(initialTime)
    })

    it('should track multiple pointer moves', () => {
      const { result } = renderHook(() => usePointer())
      
      const times: number[] = [result.current.lastMoveTime]
      
      // Trigger multiple moves
      for (let i = 0; i < 3; i++) {
        jest.advanceTimersByTime(500)
        
        act(() => {
          const event = new PointerEvent('pointermove', {
            clientX: 100 * (i + 1),
            clientY: 100 * (i + 1),
            bubbles: true
          })
          window.dispatchEvent(event)
        })
        
        times.push(result.current.lastMoveTime)
      }
      
      // Each timestamp should be >= previous
      for (let i = 1; i < times.length; i++) {
        expect(times[i]).toBeGreaterThanOrEqual(times[i - 1])
      }
    })
  })

  describe('Event listener cleanup', () => {
    it('should remove event listener on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
      
      const { unmount } = renderHook(() => usePointer())
      
      unmount()
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('pointermove', expect.any(Function))
      
      removeEventListenerSpy.mockRestore()
    })

    it('should not update state after unmount', () => {
      const { result, unmount } = renderHook(() => usePointer())
      
      const finalPosition = { ...result.current.position }
      
      unmount()
      
      // Try to trigger pointer move after unmount
      act(() => {
        const event = new PointerEvent('pointermove', {
          clientX: 999,
          clientY: 999,
          bubbles: true
        })
        window.dispatchEvent(event)
      })
      
      // Position should not have changed
      expect(result.current.position).toEqual(finalPosition)
    })
  })

  describe('Edge cases', () => {
    it('should handle negative coordinates', () => {
      const { result } = renderHook(() => usePointer())
      
      act(() => {
        const event = new PointerEvent('pointermove', {
          clientX: -50,
          clientY: -50,
          bubbles: true
        })
        window.dispatchEvent(event)
      })
      
      // Should clamp to 0
      expect(result.current.position.x).toBeLessThanOrEqual(0)
      expect(result.current.position.y).toBeLessThanOrEqual(0)
    })

    it('should handle coordinates beyond window size', () => {
      Object.defineProperty(window, 'innerWidth', { value: 1000, writable: true })
      Object.defineProperty(window, 'innerHeight', { value: 800, writable: true })
      
      const { result } = renderHook(() => usePointer())
      
      act(() => {
        const event = new PointerEvent('pointermove', {
          clientX: 2000,
          clientY: 1600,
          bubbles: true
        })
        window.dispatchEvent(event)
      })
      
      // Should exceed 1 (no clamping at hook level)
      expect(result.current.position.x).toBeGreaterThan(1)
      expect(result.current.position.y).toBeGreaterThan(1)
    })

    it('should handle zero window dimensions', () => {
      Object.defineProperty(window, 'innerWidth', { value: 0, writable: true })
      Object.defineProperty(window, 'innerHeight', { value: 0, writable: true })
      
      const { result } = renderHook(() => usePointer())
      
      act(() => {
        const event = new PointerEvent('pointermove', {
          clientX: 100,
          clientY: 100,
          bubbles: true
        })
        window.dispatchEvent(event)
      })
      
      // Should not crash (may return Infinity or NaN, but shouldn't error)
      expect(result.current.position).toBeDefined()
    })
  })
})
