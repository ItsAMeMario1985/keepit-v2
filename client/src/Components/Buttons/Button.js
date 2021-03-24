import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

Button.propTypes = {
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
}

export default function Button({ onClick, children }) {
  const bgColor = 'var(--color-primary)'

  return (
    <StyledButton bgColor={bgColor} onClick={onClick}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  background-color: ${(props) => props.bgColor};
  border: none;
  min-height: 40px;
  min-width: 100px;
  width: 100%;
  font-weight: 400;
  color: white;
  padding: 8px 20px 8px 20px;
  border-radius: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;

  svg {
    margin-left: 10px;
  }

  &:active {
    transform: scale(0.95);
    transition: transform 0.1s ease-out;
  }
`
