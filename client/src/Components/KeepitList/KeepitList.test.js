import { render } from '@testing-library/react'
import KeepitList from './KeepitList'
import testImage from '../../Assets/test.png'
import user from '@testing-library/user-event'

const keepits = [
  {
    rated: 4,
    city: 'Hamburg',
    country: 'Germany',
    date: {
      date: '2020-12-29 00:00:00.000000',
      timezone_type: 3,
      timezone: 'UTC',
    },
    id: 187,
    images: [testImage],
    tags: [
      {
        value: 'Beer',
        isCustom: false,
      },
      {
        value: 'Alcohol',
        isCustom: false,
      },
    ],
  },
]

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

describe('KeepitList', () => {
  it('renders correctly', () => {
    const { container } = render(<KeepitList keepits={keepits} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('image is shown', () => {
    const { getByTestId } = render(<KeepitList keepits={keepits} />)
    const ImgContainer = getByTestId('TestKeepitImg')
    expect(ImgContainer).toHaveStyle(`max-height: 100%;`)
    expect(ImgContainer).toHaveAttribute('src', 'undefined/test-thumb.png')
  })

  it('onclick works', () => {
    const { getByTestId } = render(<KeepitList keepits={keepits} />)
    const ImgContainer = getByTestId('TestKeepitImg')
    user.click(ImgContainer)
    expect(mockHistoryPush).toHaveBeenCalled()
  })
})
