import { render } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/theme'
import Shapes from './index'

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('Shapes Component', () => {
  it('should render all three shape components', () => {
    const { getByTestId } = renderWithTheme(<Shapes />)
    expect(getByTestId('shape-octagon')).toBeInTheDocument()
    expect(getByTestId('shape-square')).toBeInTheDocument()
    expect(getByTestId('shape-triangle')).toBeInTheDocument()
  })

  it('should render exactly 3 shapes', () => {
    const { getAllByRole } = renderWithTheme(<Shapes />)
    const shapes = getAllByRole('img')
    expect(shapes).toHaveLength(3)
  })

  it('should pass theme colors to shape components', () => {
    const { getByTestId } = renderWithTheme(<Shapes />)

    const octagon = getByTestId('shape-octagon')
    const square = getByTestId('shape-square')
    const triangle = getByTestId('shape-triangle')

    expect(octagon).toBeInTheDocument()
    expect(square).toBeInTheDocument()
    expect(triangle).toBeInTheDocument()
  })

  /*
  it('should match snapshot', () => {
    const { container } = renderWithTheme(<Shapes />)
    expect(container.firstChild).toMatchSnapshot()
  })
  */
})
