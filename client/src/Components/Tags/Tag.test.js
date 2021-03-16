import { render } from '@testing-library/react'
import Tag from './Tag'
const onClickMock = jest.fn()
const props = {
  onClick: onClickMock,
  tagValue: 'Test',
  targetState: false,
}

describe('Tag', () => {
  it('renders correctly', () => {
    const { container } = render(<Tag {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
