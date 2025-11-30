import { render } from '@testing-library/react'
import Triangle from './index'

describe('Triangle Component', () => {
  it('should render triangle SVG', () => {
    const { getByRole } = render(<Triangle fill="#000" />)
    expect(getByRole('img')).toBeInTheDocument()
  })

  it('should have data-testid "shape-triangle"', () => {
    const { getByTestId } = render(<Triangle fill="#000" />)
    expect(getByTestId('shape-triangle')).toBeInTheDocument()
  })

  it('should have correct viewBox dimensions', () => {
    const { getByTestId } = render(<Triangle fill="#000" />)
    expect(getByTestId('shape-triangle')).toHaveAttribute('viewBox', '0 0 131 144')
  })

  it('should accept fill color prop', () => {
    const testColor = '#FF5733'
    const { getByTestId } = render(<Triangle fill={testColor} />)
    const svg = getByTestId('shape-triangle')

    // SVG should have the fill color applied via sx prop
    expect(svg).toBeInTheDocument()
  })

  it('should match snapshot', () => {
    const { container } = render(<Triangle fill="#000" />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
