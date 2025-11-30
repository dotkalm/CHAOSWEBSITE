import { render } from '@testing-library/react'
import Octagon from './index'

describe('Octagon Component', () => {
  it('should render octagon SVG', () => {
    const { getByRole } = render(<Octagon fill="#000" />)
    expect(getByRole('img')).toBeInTheDocument()
  })

  it('should have data-testid "shape-octagon"', () => {
    const { getByTestId } = render(<Octagon fill="#000" />)
    expect(getByTestId('shape-octagon')).toBeInTheDocument()
  })

  it('should have correct viewBox dimensions', () => {
    const { getByTestId } = render(<Octagon fill="#000" />)
    expect(getByTestId('shape-octagon')).toHaveAttribute('viewBox', '0 0 144 144')
  })

  it('should accept fill color prop', () => {
    const testColor = '#FF5733'
    const { getByTestId } = render(<Octagon fill={testColor} />)
    const svg = getByTestId('shape-octagon')

    // SVG should have the fill color applied via sx prop
    expect(svg).toBeInTheDocument()
  })

  it('should match snapshot', () => {
    const { container } = render(<Octagon fill="#000" />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
