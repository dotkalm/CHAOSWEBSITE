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
    const { getAllByRole: getAllByRole1, unmount: unmount1 } = renderWithTheme(<Background />)
    const shapes1 = getAllByRole1('img')

    const positions1 = shapes1.map(shape => ({
      left: (shape as HTMLElement).style.left,
      top: (shape as HTMLElement).style.top,
      transform: (shape as HTMLElement).style.transform
    }))

    unmount1()

    const { getAllByRole: getAllByRole2 } = renderWithTheme(<Background />)
    const shapes2 = getAllByRole2('img')

    const positions2 = shapes2.map(shape => ({
      left: (shape as HTMLElement).style.left,
      top: (shape as HTMLElement).style.top,
      transform: (shape as HTMLElement).style.transform
    }))

    expect(positions1).not.toEqual(positions2)
  })

  it('should match snapshot', () => {
    const { container } = renderWithTheme(<Background />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
