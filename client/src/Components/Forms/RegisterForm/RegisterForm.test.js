import { render } from '@testing-library/react'
import LoginForm from './LoginForm'

describe('RegisterForm', () => {
  it('renders correctly', () => {
    const { container } = render(<LoginForm />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
