import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

Overlay.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element,
  status: PropTypes.bool,
  onClick: PropTypes.func,
}

export default function Overlay({ className, status, children, onClick }) {
  return status ? (
    <StyledOverlay
      data-testid="TestOverlay"
      className={className}
      onClick={onClick}
    >
      {children}
    </StyledOverlay>
  ) : (
    ''
  )
}
const StyledOverlay = styled.div`
  font-size: 3rem;
  width: 100%;
  height: 100%;
  color: white;
  background-color: #000000c7;
  top: 0;
  position: fixed;
  z-index: 1000;
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  max-width: 500px;
`
