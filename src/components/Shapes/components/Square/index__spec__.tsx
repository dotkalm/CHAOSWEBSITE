import { render } from '@testing-library/react'
import Square from './index'

describe('Square Component', () => {
  it('should render square SVG', () => {
    const { getByRole } = render(<Square />)
    expect(getByRole('img')).toBeInTheDocument()
  })

  it('should have data-testid "shape-square"', () => {
    const { getByTestId } = render(<Square />)
    expect(getByTestId('shape-square')).toBeInTheDocument()
  })

  it('should match snapshot', () => {
    const { container } = render(<Square />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
