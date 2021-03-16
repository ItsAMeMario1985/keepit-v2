import { render } from '@testing-library/react'
import StarRating from './StarRating'

const props = {
  rating: 4,
}

describe('StarRating', () => {
  it('renders correctly', () => {
    const { container } = render(<StarRating {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('rating correct', () => {
    const { getAllByTestId } = render(<StarRating {...props} />)
    const TestStarRate = getAllByTestId('TestStarRating')
    expect(TestStarRate).toHaveLength(4)
  })
})
