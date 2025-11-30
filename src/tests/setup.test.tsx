/**
 * Basic snapshot test to verify Jest and React Testing Library setup
 */

import { render } from '@testing-library/react'

describe('Test Setup', () => {
  it('should run a basic test', () => {
    expect(true).toBe(true)
  })

  it('should render a basic component', () => {
    const TestComponent = () => <div data-testid="test-element">Hello Test</div>
    const { getByTestId } = render(<TestComponent />)
    expect(getByTestId('test-element')).toBeInTheDocument()
    expect(getByTestId('test-element')).toHaveTextContent('Hello Test')
  })

  it('should match snapshot', () => {
    const TestComponent = () => (
      <div>
        <h1>Test Snapshot</h1>
        <p>This is a basic snapshot test.</p>
      </div>
    )
    const { container } = render(<TestComponent />)
    expect(container).toMatchSnapshot()
  })
})
