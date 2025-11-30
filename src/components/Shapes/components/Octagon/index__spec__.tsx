import { render } from '@testing-library/react'
import Octagon from './index'

describe('Octagon Component', () => {
  it('should render octagon SVG', () => {
    const { getByRole } = render(<Octagon />)
    expect(getByRole('img')).toBeInTheDocument()
  })

  it('should have data-testid "shape-octagon"', () => {
    const { getByTestId } = render(<Octagon />)
    expect(getByTestId('shape-octagon')).toBeInTheDocument()
  })

  it('should match snapshot', () => {
    const { container } = render(<Octagon />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
