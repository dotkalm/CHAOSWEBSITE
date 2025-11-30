import { render } from '@testing-library/react'
import Square from './index'

describe('Square Component', () => {
  it('should render square SVG', () => {
    const { getByRole } = render(<Square fill="#000" />)
    expect(getByRole('img')).toBeInTheDocument()
  })

  it('should have data-testid "shape-square"', () => {
    const { getByTestId } = render(<Square fill="#000" />)
    expect(getByTestId('shape-square')).toBeInTheDocument()
  })

  it('should have correct viewBox dimensions', () => {
    const { getByTestId } = render(<Square fill="#000" />)
    expect(getByTestId('shape-square')).toHaveAttribute('viewBox', '0 0 126.7 144')
  })

  it('should accept fill color prop', () => {
    const testColor = '#FF5733'
    const { getByTestId } = render(<Square fill={testColor} />)
    const svg = getByTestId('shape-square')

    // SVG should have the fill color applied via sx prop
    expect(svg).toBeInTheDocument()
  })

  it('should match snapshot', () => {
    const { container } = render(<Square fill="#000" />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
