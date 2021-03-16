import { render } from '@testing-library/react'
import ResetFilterButton from './ResetFilterButton'
import user from '@testing-library/user-event'

const onClickMock = jest.fn()
const props = {
  onClick: onClickMock,
}
//{...props}

describe('ResetFilterButton', () => {
  it('renders correctly', () => {
    const { container } = render(<ResetFilterButton {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('onclick works', () => {
    const { getByTestId } = render(<ResetFilterButton {...props} />)
    const menuButton = getByTestId('resetbutton')
    user.click(menuButton)
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })
})
