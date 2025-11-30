import { render } from '@testing-library/react'
import Shapes from './index'

describe('Shapes Component', () => {
  it('should render all three shape components', () => {
    const { getByTestId } = render(<Shapes />)
    expect(getByTestId('shape-octagon')).toBeInTheDocument()
    expect(getByTestId('shape-square')).toBeInTheDocument()
    expect(getByTestId('shape-triangle')).toBeInTheDocument()
  })

  it('should render exactly 3 shapes', () => {
    const { getAllByRole } = render(<Shapes />)
    const shapes = getAllByRole('img')
    expect(shapes).toHaveLength(3)
  })

  it('should match snapshot', () => {
    const { container } = render(<Shapes />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
