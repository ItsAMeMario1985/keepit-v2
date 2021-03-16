import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { useState, useEffect } from 'react'
import { StarIcon } from '../Icons'

StarRatingForm.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default function StarRatingForm({ onClick }) {
  const [rating, setRating] = useState(null)

  useEffect(() => {
    onClick(rating)
  }, [rating])

  return (
    <div>
      <StyledFieldset>
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1
          return (
            <label key={index}>
              <StyledInput
                type="radio"
                value={ratingValue}
                name="rating"
                onClick={() => setRating(ratingValue)}
              />
              <StarIcon
                fill={
                  ratingValue <= rating
                    ? 'var(--color-primary)'
                    : 'var(--color-tertiary)'
                }
                data-testid={'TestStarRate' + index}
                width="25"
              ></StarIcon>
            </label>
          )
        })}
      </StyledFieldset>
    </div>
  )
}

const StyledInput = styled.input`
  display: none;
`
const StyledFieldset = styled.fieldset`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 5px;

  svg {
    cursor: pointer;
  }
`
