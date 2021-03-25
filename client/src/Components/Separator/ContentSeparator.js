import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

ContentSeperator.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.object,
  text: PropTypes.string,
}

export default function ContentSeperator({ className, icon, text, onClick }) {
  return (
    <StyledDiv
      innerContent={icon || text ? true : false}
      onClick={onClick}
      className={className}
    >
      <span>
        {icon} {text}
      </span>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 20px 0 20px 0;
  text-transform: uppercase;
  max-width: 500px;
  cursor: ${(props) => (props.onClick ? 'pointer' : 'auto')};

  &:before {
    content: '';
    flex: 1;
    border-bottom: 1px dashed #e3e3e3;
    margin-right: ${(props) => (props.innerContent ? '0.25em' : '0')};
  }

  &:after {
    content: '';
    flex: 1;
    border-bottom: 1px dashed #e3e3e3;
    margin-left: ${(props) => (props.innerContent ? '0.25em' : '0')};
  }

  span {
    font-weight: 600;
    font-size: 0.85rem;
    color: #c7c7c7;
    padding: ${(props) => (props.innerContent ? '0 5px' : '0')};
  }

  svg {
    margin-bottom: -1px;
  }
`
