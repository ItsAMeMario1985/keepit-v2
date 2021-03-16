import { render } from '@testing-library/react'
import LoadingSpinner from './LoadingSpinner'
describe('LoadingSpinner', () => {
  it('renders correctly', () => {
    const { container } = render(<LoadingSpinner />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
