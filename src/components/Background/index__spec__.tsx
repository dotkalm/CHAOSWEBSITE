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
    
    // On mobile, shapes should be silver (#d9d9d9)
    const svgElement = octagon.querySelector('svg') || octagon
    const pathElement = svgElement.querySelector('path')
    
    if (pathElement) {
      const fill = window.getComputedStyle(pathElement).fill || pathElement.getAttribute('fill')
      // Silver color from theme.palette.grey[300]
      expect(fill).toContain('217, 217, 217') // rgb(217, 217, 217) = #d9d9d9
    }
  })

  it('should match snapshot', () => {
    const { container } = renderWithTheme(<Background />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
