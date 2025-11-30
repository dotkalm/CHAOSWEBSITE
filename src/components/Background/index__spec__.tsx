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

  it('should match snapshot', () => {
    const { container } = renderWithTheme(<Background />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
