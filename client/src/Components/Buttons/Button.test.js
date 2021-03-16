import { render } from '@testing-library/react'
import Button from './Button'

const onClickMock = jest.fn()
const props = {
  onClick: onClickMock,
  buttonText: 'Test',
}

describe('Button', () => {
  it('renders correctly', () => {
    const { container } = render(<Button {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
