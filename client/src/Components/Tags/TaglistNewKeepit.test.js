import { render } from '@testing-library/react'
import TaglistNewKeepit from './TaglistNewKeepit'
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
  showIsCustom: false,
  showIsloading: false,
}

describe('TaglistNewKeepit', () => {
  it('renders correctly', () => {
    const { container } = render(
      <TaglistNewKeepit {...props}></TaglistNewKeepit>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
