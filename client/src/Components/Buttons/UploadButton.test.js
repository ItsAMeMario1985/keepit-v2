import { render } from '@testing-library/react'
import UploadButton from './UploadButton'

const mockUseHistory = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    push: mockUseHistory,
  }),
}))

describe('UploadButton', () => {
  it('renders correctly', () => {
    const onClickMock = jest.fn()
    const { container } = render(<UploadButton onClick={onClickMock} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
