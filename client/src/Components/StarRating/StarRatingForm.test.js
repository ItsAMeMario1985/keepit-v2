import { render } from '@testing-library/react'
import StarRatingForm from './StarRatingForm'
import user from '@testing-library/user-event'

const onClickMock = jest.fn()
const props = {
  onClick: onClickMock,
}

describe('StarRatingForm', () => {
  it('renders correctly', () => {
    const { container } = render(<StarRatingForm {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('onclick works', () => {
    const { getByTestId } = render(<StarRatingForm {...props} />)
    const TestStarRate = getByTestId('TestStarRate1')
    user.click(TestStarRate)
    expect(onClickMock).toHaveBeenCalledTimes(2)
  })
})
