import { render } from '@testing-library/react'
import KeepitList from './KeepitList'
import testImage from '../../Assets/test.png'
import user from '@testing-library/user-event'

const keepits = [
  {
    userId: '6050d5b92e3b4f4c49066550',
    city: 'Hamburg',
    country: 'Germany',
    latitude: '53.592064',
    longitude: '10.000793600000002',
    rating: 4,
    createdAt: '2021-03-24T11:32:57.852Z',
    submitted: false,
    tags: [
      {
        createdAt: '2021-03-24T11:32:57.855Z',
        _id: '605b237a445871010c4067e4',
        value: 'Beer',
        isCustom: 'false',
        keepitId: '605b237a445871010c4067e3',
        __v: 0,
      },
    ],
    images: [
      {
        _id: '605b237a445871010c4067e6',
        path: 'https://www.test.de/images/svgicons/test.de-logo;v37467901.svg',
        id: 'cc018eb9-b380-421f-91e3-a1e8ace4983a',
        keepitId: '605b237a445871010c4067e3',
        __v: 0,
      },
    ],
    _id: '605b237a445871010c4067e3',
    __v: 0,
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
    expect(ImgContainer).toHaveAttribute(
      'src',
      'https://www.test.de/images/svgicons/test.de-logo;v37467901.svg'
    )
  })

  it('onclick works', () => {
    const { getByTestId } = render(<KeepitList keepits={keepits} />)
    const ImgContainer = getByTestId('TestKeepitImg')
    user.click(ImgContainer)
    expect(mockHistoryPush).toHaveBeenCalled()
  })
})
