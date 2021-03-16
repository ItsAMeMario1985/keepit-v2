import { render } from '@testing-library/react'
import ContentSeparator from './ContentSeparator'
describe('ContentSeparator', () => {
  it('renders correctly', () => {
    const { container } = render(<ContentSeparator />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
