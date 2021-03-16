import { render } from '@testing-library/react'
import Taglist from './Taglist'
import user from '@testing-library/user-event'

const onClickMock = jest.fn()
const props = {
  onClick: onClickMock,
  tags: [
    {
      value: 'Beer',
      added: false,
      isCustom: false,
    },
    {
      value: 'Barware',
      added: false,
      isCustom: false,
    },
  ],
  bgColor: 'var(--color-primary)',
  showIsCustom: false,
  showIsloading: false,
}

describe('Taglist', () => {
  it('renders correctly', () => {
    const { container } = render(<Taglist {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('onclick works', () => {
    const { getAllByRole } = render(<Taglist {...props} />)
    const listItem = getAllByRole('listitem')
    user.click(listItem[0])
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })
})
