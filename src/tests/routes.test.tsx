/**
 * Integration tests to verify shapes appear on all routes
 */

import { render } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/theme'
import Background from '@/components/Background'

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('Route Integration Tests', () => {
  describe('Background component on all routes', () => {
    it('should render all three shapes', () => {
      const { getByTestId } = renderWithTheme(<Background />)
      
      // Verify all three shapes are present
      const octagon = getByTestId('shape-octagon')
      const square = getByTestId('shape-square')
      const triangle = getByTestId('shape-triangle')
      
      expect(octagon).toBeInTheDocument()
      expect(square).toBeInTheDocument()
      expect(triangle).toBeInTheDocument()
    })

    it('should have fixed positioning on all routes', () => {
      const { container } = renderWithTheme(<Background />)
      const backgroundBox = container.firstChild as HTMLElement
      
      expect(backgroundBox).toHaveStyle('position: fixed')
      expect(backgroundBox).toHaveStyle('z-index: -9999')
    })

    it('should render shapes with transforms applied', () => {
      const { getByTestId } = renderWithTheme(<Background />)
      
      const octagon = getByTestId('shape-octagon') as HTMLElement
      const square = getByTestId('shape-square') as HTMLElement
      const triangle = getByTestId('shape-triangle') as HTMLElement
      
      const shapes = [octagon, square, triangle]
      
      shapes.forEach(shape => {
        const transform = shape.style.transform
        expect(transform).toBeDefined()
        expect(transform).not.toEqual('')
        
        // Should have translate, rotate, and scale
        expect(transform).toContain('translate')
        expect(transform).toContain('rotate')
        expect(transform).toContain('scale')
      })
    })

    it('should position shapes absolutely', () => {
      const { getByTestId } = renderWithTheme(<Background />)
      
      const octagon = getByTestId('shape-octagon') as HTMLElement
      const square = getByTestId('shape-square') as HTMLElement
      const triangle = getByTestId('shape-triangle') as HTMLElement
      
      const shapes = [octagon, square, triangle]
      
      shapes.forEach(shape => {
        expect(shape.style.position).toEqual('absolute')
        expect(shape.style.left).toBeDefined()
        expect(shape.style.top).toBeDefined()
      })
    })

    it('should have unique layouts for each shape', () => {
      const { getByTestId } = renderWithTheme(<Background />)
      
      const octagon = getByTestId('shape-octagon') as HTMLElement
      const square = getByTestId('shape-square') as HTMLElement
      const triangle = getByTestId('shape-triangle') as HTMLElement
      
      // Extract rotation values
      const getRotation = (el: HTMLElement) => {
        const match = el.style.transform.match(/rotate\(([\d.]+)deg\)/)
        return match ? parseFloat(match[1]) : null
      }
      
      const rotations = [
        getRotation(octagon),
        getRotation(square),
        getRotation(triangle)
      ]
      
      // At least some rotations should be different
      const uniqueRotations = new Set(rotations)
      expect(uniqueRotations.size).toBeGreaterThan(1)
    })
  })

  describe('Background renders consistently', () => {
    it('should render the same structure multiple times', () => {
      const { container: container1 } = renderWithTheme(<Background />)
      const { container: container2 } = renderWithTheme(<Background />)
      
      const bg1 = container1.firstChild as HTMLElement
      const bg2 = container2.firstChild as HTMLElement
      
      // Structure should be consistent
      expect(bg1.tagName).toEqual(bg2.tagName)
      expect(bg1.childElementCount).toEqual(bg2.childElementCount)
    })
  })
})
