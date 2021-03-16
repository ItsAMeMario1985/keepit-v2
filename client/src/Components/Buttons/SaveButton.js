import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as SaveFooterButtonSvg } from '../../Assets/save-footer-button.svg'

SaveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default function SaveButton({ onClick }) {
  return (
    <StyledIcon>
      <SaveFooterButtonSvg
        onClick={onClick}
        data-testid="TestSaveButton"
        height="50px"
      ></SaveFooterButtonSvg>
    </StyledIcon>
  )
}

const StyledIcon = styled.div`
  height: 60px;
  margin: auto;
  margin-top: 6px;
`
