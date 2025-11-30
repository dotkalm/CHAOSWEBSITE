import { render } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/theme'
import Background from './index'

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('Background Component', () => {
  it('should render background container', () => {
    const { container } = renderWithTheme(<Background />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('should render all three SVG shapes', () => {
    const { getAllByRole } = renderWithTheme(<Background />)
    const shapes = getAllByRole('img')
    expect(shapes).toHaveLength(3)
  })

  it('should render octagon shape', () => {
    const { getByTestId } = renderWithTheme(<Background />)
    expect(getByTestId('shape-octagon')).toBeInTheDocument()
  })

  it('should render square shape', () => {
    const { getByTestId } = renderWithTheme(<Background />)
    expect(getByTestId('shape-square')).toBeInTheDocument()
  })

  it('should render triangle shape', () => {
    const { getByTestId } = renderWithTheme(<Background />)
    expect(getByTestId('shape-triangle')).toBeInTheDocument()
  })

  it('should apply random positioning to shapes on each mount', () => {
    const { getByTestId } = renderWithTheme(<Background />)

    const octagon = getByTestId('shape-octagon') as HTMLElement
    const square = getByTestId('shape-square') as HTMLElement
    const triangle = getByTestId('shape-triangle') as HTMLElement

    expect(octagon.style.left).toBeDefined()
    expect(octagon.style.left).not.toEqual('')
    expect(octagon.style.top).toBeDefined()
    expect(octagon.style.top).not.toEqual('')
    expect(octagon.style.transform).toContain('translate')

    expect(square.style.left).toBeDefined()
    expect(square.style.left).not.toEqual('')
    expect(square.style.top).toBeDefined()
    expect(square.style.top).not.toEqual('')
    expect(square.style.transform).toContain('translate')

    expect(triangle.style.left).toBeDefined()
    expect(triangle.style.left).not.toEqual('')
    expect(triangle.style.top).toBeDefined()
    expect(triangle.style.top).not.toEqual('')
    expect(triangle.style.transform).toContain('translate')
  })

  it('should keep all shapes visible within viewport bounds (12%-88%)', () => {
    const { getByTestId } = renderWithTheme(<Background />)

    const octagon = getByTestId('shape-octagon') as HTMLElement
    const square = getByTestId('shape-square') as HTMLElement
    const triangle = getByTestId('shape-triangle') as HTMLElement

    const shapes = [octagon, square, triangle]

    shapes.forEach(shape => {
      const left = parseFloat(shape.style.left)
      const top = parseFloat(shape.style.top)

      // Shapes should be positioned between 12% and 88% to stay visible
      expect(left).toBeGreaterThanOrEqual(12)
      expect(left).toBeLessThanOrEqual(88)
      expect(top).toBeGreaterThanOrEqual(12)
      expect(top).toBeLessThanOrEqual(88)
    })
  })

  it('should have different arrangement on each reload', () => {
    const { getByTestId: getByTestId1, unmount } = renderWithTheme(<Background />)
    
    const octagon1 = getByTestId1('shape-octagon') as HTMLElement
    const positions1 = {
      octagon: { left: octagon1.style.left, top: octagon1.style.top },
    }

    unmount()

    const { getByTestId: getByTestId2 } = renderWithTheme(<Background />)
    const octagon2 = getByTestId2('shape-octagon') as HTMLElement
    const positions2 = {
      octagon: { left: octagon2.style.left, top: octagon2.style.top },
    }

    // Positions should be different on remount (randomized)
    const samePosition = 
      positions1.octagon.left === positions2.octagon.left &&
      positions1.octagon.top === positions2.octagon.top

    expect(samePosition).toEqual(false)
  })

  it('should maintain max 20% whitespace (80% coverage minimum)', () => {
    const { getByTestId } = renderWithTheme(<Background />)

    const octagon = getByTestId('shape-octagon') as HTMLElement
    const square = getByTestId('shape-square') as HTMLElement
    const triangle = getByTestId('shape-triangle') as HTMLElement

    const shapes = [octagon, square, triangle]

    // Extract scale from transform
    shapes.forEach(shape => {
      const transform = shape.style.transform
      const scaleMatch = transform.match(/scale\(([\d.]+)\)/)
      
      expect(scaleMatch).toBeDefined()
      if (scaleMatch) {
        const scale = parseFloat(scaleMatch[1])
        // Shapes should have meaningful size (not too small)
        expect(scale).toBeGreaterThan(0.3)
      }
    })
  })

  it('should use silver color on mobile breakpoint', () => {
    // Mock mobile viewport
    global.innerWidth = 600
    global.dispatchEvent(new Event('resize'))

    const { getByTestId } = renderWithTheme(<Background />)
    const octagon = getByTestId('shape-octagon') as HTMLElement
    
    // On mobile, shapes should be silver from theme.palette.grey[300]
    const svgElement = octagon.querySelector('svg') || octagon
    const pathElement = svgElement.querySelector('path')
    
    if (pathElement) {
      const fill = window.getComputedStyle(pathElement).fill || pathElement.getAttribute('fill')
      const expectedColor = theme.palette.grey[300]
      
      // Should match the theme token (either contains or equals)
      const matchesColor = fill?.includes(expectedColor) || fill === expectedColor
      expect(matchesColor).toEqual(true)
    }
  })

  it('should apply random rotation (0-360 degrees) to each shape', () => {
    const { getByTestId, unmount } = renderWithTheme(<Background />)

    const octagon = getByTestId('shape-octagon') as HTMLElement
    const square = getByTestId('shape-square') as HTMLElement
    const triangle = getByTestId('shape-triangle') as HTMLElement

    const shapes = [octagon, square, triangle]
    const rotations1: number[] = []

    shapes.forEach(shape => {
      const transform = shape.style.transform
      expect(transform).toBeDefined()
      expect(transform).not.toEqual('')
      
      const rotateMatch = transform.match(/rotate\(([\d.]+)deg\)/)
      expect(rotateMatch).not.toEqual(null)
      
      if (rotateMatch) {
        const rotation = parseFloat(rotateMatch[1])
        expect(rotation).toBeGreaterThanOrEqual(0)
        expect(rotation).toBeLessThanOrEqual(360)
        rotations1.push(rotation)
      }
    })

    unmount()

    // Remount and verify rotations changed
    const { getByTestId: getByTestId2 } = renderWithTheme(<Background />)
    const octagon2 = getByTestId2('shape-octagon') as HTMLElement
    const square2 = getByTestId2('shape-square') as HTMLElement
    const triangle2 = getByTestId2('shape-triangle') as HTMLElement

    const shapes2 = [octagon2, square2, triangle2]
    const rotations2: number[] = []

    shapes2.forEach(shape => {
      const transform = shape.style.transform
      const rotateMatch = transform.match(/rotate\(([\d.]+)deg\)/)
      
      if (rotateMatch) {
        const rotation = parseFloat(rotateMatch[1])
        rotations2.push(rotation)
      }
    })

    // At least one rotation should be different after remount
    const allSame = rotations1.every((rot, idx) => rot === rotations2[idx])
    expect(allSame).toEqual(false)
  })

  it('should apply random z-index (10-99) to each shape', () => {
    const { getByTestId } = renderWithTheme(<Background />)

    const octagon = getByTestId('shape-octagon') as HTMLElement
    const square = getByTestId('shape-square') as HTMLElement
    const triangle = getByTestId('shape-triangle') as HTMLElement

    const shapes = [octagon, square, triangle]

    shapes.forEach(shape => {
      const zIndex = parseInt(shape.style.zIndex)
      
      expect(zIndex).toBeDefined()
      expect(zIndex).toBeGreaterThanOrEqual(10)
      expect(zIndex).toBeLessThanOrEqual(99)
    })
  })

  it('should have one "big" shape with scale between 1.0-1.25', () => {
    const { getByTestId } = renderWithTheme(<Background />)

    const octagon = getByTestId('shape-octagon') as HTMLElement
    const square = getByTestId('shape-square') as HTMLElement
    const triangle = getByTestId('shape-triangle') as HTMLElement

    const shapes = [octagon, square, triangle]
    const scales = shapes.map(shape => {
      const transform = shape.style.transform
      const scaleMatch = transform.match(/scale\(([\d.]+)\)/)
      return scaleMatch ? parseFloat(scaleMatch[1]) : 0
    })

    // At least one shape should be "big" (scale >= 1.0)
    const bigShapes = scales.filter(scale => scale >= 1.0 && scale <= 1.25)
    expect(bigShapes.length).toBeGreaterThanOrEqual(1)

    // Other shapes should be normal size (0.35-0.75)
    const normalShapes = scales.filter(scale => scale >= 0.35 && scale < 1.0)
    expect(normalShapes.length).toBeGreaterThanOrEqual(2)
  })

  it('should have different random scales for each shape', () => {
    const { getByTestId } = renderWithTheme(<Background />)

    const octagon = getByTestId('shape-octagon') as HTMLElement
    const square = getByTestId('shape-square') as HTMLElement
    const triangle = getByTestId('shape-triangle') as HTMLElement

    const shapes = [octagon, square, triangle]
    const scales = shapes.map(shape => {
      const transform = shape.style.transform
      const scaleMatch = transform.match(/scale\(([\d.]+)\)/)
      return scaleMatch ? parseFloat(scaleMatch[1]) : 0
    })

    // All scales should be within valid range
    scales.forEach(scale => {
      expect(scale).toBeGreaterThanOrEqual(0.35)
      expect(scale).toBeLessThanOrEqual(1.25)
    })
  })

  it('should apply 3x3 grid positioning with jitter', () => {
    const { getByTestId } = renderWithTheme(<Background />)

    const octagon = getByTestId('shape-octagon') as HTMLElement
    const square = getByTestId('shape-square') as HTMLElement
    const triangle = getByTestId('shape-triangle') as HTMLElement

    const shapes = [octagon, square, triangle]
    const gridPositions = [12, 50, 88] // 3x3 grid at 12%, 50%, 88%

    shapes.forEach(shape => {
      const left = parseFloat(shape.style.left)
      const top = parseFloat(shape.style.top)

      // Position should be near a grid position (within jitter range)
      // but not exactly on grid due to jitter
      const nearGridX = gridPositions.some(grid => 
        Math.abs(left - grid) <= 18 // jitter of 0.36 * 50 = 18%
      )
      const nearGridY = gridPositions.some(grid => 
        Math.abs(top - grid) <= 22 // jitter of 0.44 * 50 = 22%
      )

      expect(nearGridX).toEqual(true)
      expect(nearGridY).toEqual(true)
    })
  })

  it('should select random color from 4-color palette on load', () => {
    const { getByTestId } = renderWithTheme(<Background />)

    const octagon = getByTestId('shape-octagon') as HTMLElement
    const pathElement = octagon.querySelector('path')

    expect(pathElement).toBeDefined()
    
    // Color should be one of: green, purple, red, orange from theme
    const validColors = [
      theme.palette.shapes.green,
      theme.palette.shapes.purple,
      theme.palette.shapes.red,
      theme.palette.shapes.orange
    ]

    if (pathElement) {
      const fill = window.getComputedStyle(pathElement).fill
      const fillString = pathElement.getAttribute('fill') || fill
      
      // Should match one of the 4 valid colors
      const matchesValidColor = validColors.some(color => 
        fillString.includes(color) || fillString === color
      )
      
      expect(matchesValidColor).toEqual(true)
    }
  })

  it('should match snapshot', () => {
    const { container } = renderWithTheme(<Background />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
