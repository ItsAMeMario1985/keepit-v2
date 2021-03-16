import { render } from '@testing-library/react'
import SaveButton from './SaveButton'
import user from '@testing-library/user-event'

// const mockHistoryPush = jest.fn()
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useHistory: () => ({
//     push: mockHistoryPush,
//   }),
// }))

const mockOnClick = jest.fn()

describe('SaveButton', () => {
  it('renders correctly', () => {
    const { container } = render(<SaveButton onClick={mockOnClick} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('onclick works', () => {
    const { getByTestId } = render(<SaveButton onClick={mockOnClick} />)
    const TestSaveButton = getByTestId('TestSaveButton')
    user.click(TestSaveButton)
    expect(mockOnClick).toHaveBeenCalled()
  })
})
