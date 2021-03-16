import { render } from '@testing-library/react'
import Header from './Header'
import user from '@testing-library/user-event'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

describe('Header', () => {
  it('renders correctly', () => {
    const { container } = render(<Header />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('onclick works', () => {
    const { getByTestId } = render(<Header />)
    const TestHeaderLogo = getByTestId('TestHeaderLogo')
    user.click(TestHeaderLogo)
    expect(mockHistoryPush).toHaveBeenCalledTimes(1)
  })
})
