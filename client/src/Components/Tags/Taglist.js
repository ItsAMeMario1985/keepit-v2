import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

import { CloudIcon, UserIcon } from '../Icons'

export default function Taglist({
  onClick,
  tags,
  bgColor,
  showIsCustom,
  showIsloading,
}) {
  Taglist.propTypes = {
    onClick: PropTypes.func,
    tags: PropTypes.array.isRequired,
    bgColor: PropTypes.string,
    showIsCustom: PropTypes.bool.isRequired,
    showIsloading: PropTypes.bool.isRequired,
  }

  function IsCustomIcon(tag) {
    if (showIsCustom) {
      if (tag.isCustom === 'true') {
        return <UserIcon />
      } else {
        return <CloudIcon fill="#fff" />
      }
    } else {
      return ''
    }
  }

  if (tags.length === 0 && showIsloading) {
    return <LoadingSpinner />
  }

  return (
    <StyledUl>
      {tags &&
        tags.map((tag, index) => (
          <StyledLi
            clickable={onClick ? true : false}
            key={tag.value}
            bgcolor={bgColor}
            onClick={
              onClick ? () => onClick(tag.value, !tag.added) : console.log('#')
            }
          >
            <StyledTagText>{tag.value} </StyledTagText>
            <IsCustomIcon isCustom={tag.isCustom}></IsCustomIcon>
          </StyledLi>
        ))}
    </StyledUl>
  )
}

const StyledTagText = styled.span`
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.5px;
  margin: 0 8px 0 5px;
`

const StyledUl = styled.ul`
  list-style-type: none;
  color: white;
  display: flex;
  flex-wrap: wrap;
  min-height: 24px;
`

const StyledLi = styled.li`
  background-color: ${(props) => props.bgcolor};
  display: inline-block;
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
  min-width: 50px;
  display: inline-flex;
  align-items: center;
  padding: 5px 10px 5px 5px;
  border-left: 2px solid #e3e3e3;
  cursor: ${(props) => (props.clickable ? 'pointer' : 'auto')};
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 5px;
  margin-right: 5px;
`
