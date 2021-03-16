import { render } from '@testing-library/react'
import Overlay from './Overlay'
import user from '@testing-library/user-event'

describe('Overlay', () => {
  it('renders correctly', () => {
    const { container } = render(<Overlay />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
