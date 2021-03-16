import { render, fireEvent } from '@testing-library/react'
import CustomTagForm from './CustomTagForm'

const handleSubmitMock = jest.fn()
const props = {
  onSubmit: handleSubmitMock,
}

describe('CustomTagForm', () => {
  it('renders correctly', () => {
    const { container } = render(<CustomTagForm {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('calls handleSubmitMock on submitting the form', () => {
    const { getByTestId } = render(<CustomTagForm {...props} />)
    const Form = getByTestId('TestForm')
    fireEvent.submit(Form)
    expect(handleSubmitMock).toHaveBeenCalled()
  })
})
