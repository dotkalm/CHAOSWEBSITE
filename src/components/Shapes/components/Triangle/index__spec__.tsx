import { render } from '@testing-library/react'
import Triangle from './index'

describe('Triangle Component', () => {
  it('should render triangle SVG', () => {
    const { getByRole } = render(<Triangle />)
    expect(getByRole('img')).toBeInTheDocument()
  })

  it('should have data-testid "shape-triangle"', () => {
    const { getByTestId } = render(<Triangle />)
    expect(getByTestId('shape-triangle')).toBeInTheDocument()
  })

  it('should match snapshot', () => {
    const { container } = render(<Triangle />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
