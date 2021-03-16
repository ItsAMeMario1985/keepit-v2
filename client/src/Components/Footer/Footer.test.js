import { render } from '@testing-library/react'
import Footer from './Footer'
import { SearchIcon } from '../Icons'
import user from '@testing-library/user-event'

const onClickMockA = jest.fn()
const onClickMockB = jest.fn()

const props = {
  actionButtonText: 'Text',
  actionButtonIcon: <SearchIcon />,
  leftIcon: <SearchIcon />,
  leftOnClick: onClickMockA,
  rightIcon: <SearchIcon />,
  rightOnClick: onClickMockB,
}

describe('Footer', () => {
  it('renders correctly', () => {
    const { container } = render(<Footer {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('onclicks work', () => {
    const { getByTestId } = render(<Footer {...props} />)
    const TestLeftIcon = getByTestId('TestLeftIcon')
    const TestRightIcon = getByTestId('TestRightIcon')
    user.click(TestLeftIcon)
    user.click(TestRightIcon)
    expect(onClickMockA).toHaveBeenCalledTimes(1)
    expect(onClickMockB).toHaveBeenCalledTimes(1)
  })
})
