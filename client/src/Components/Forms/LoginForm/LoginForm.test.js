import { render } from '@testing-library/react'
import LoginForm from './LoginForm'

describe('LoginForm', () => {
  it('renders correctly', () => {
    const { container } = render(<LoginForm />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
