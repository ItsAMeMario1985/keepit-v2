import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { CloudIcon, UserIcon, TagMinusIcon, TagPlusIcon } from '../Icons'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

TaglistNewKeepit.propTypes = {
  onClick: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
  showIsCustom: PropTypes.bool.isRequired,
  showIsloading: PropTypes.bool.isRequired,
}

export default function TaglistNewKeepit({
  onClick,
  tags,
  showIsCustom,
  showIsloading,
}) {
  function IsCustomIcon(tag) {
    if (showIsCustom) {
      if (tag.isCustom) {
        return <UserIcon />
      } else {
        return <CloudIcon fill="#fff" />
      }
    } else {
      return ''
    }
  }

  function IsAdded(tag) {
    if (!tag.added) {
      return <TagPlusIcon />
    } else {
      return <TagMinusIcon />
    }
  }

  if (tags.length === 1 && tags[0].value === 'No tags found') {
    return (
      <StyledNoTagsResponse>
        No cloud tags found, sorry. Add your own!
      </StyledNoTagsResponse>
    )
  } else if (tags.length === 0 && showIsloading) {
    return <LoadingSpinner />
  }

  return (
    <StyledTagList>
      {tags &&
        tags.map((tag, index) => (
          <StyledLi
            bgcolor={
              tag.added ? 'var(--color-primary)' : 'var(--color-tertiary)'
            }
            key={tag.value}
            onClick={() => onClick(tag.value, !tag.added, tag.isCustom)}
          >
            {IsAdded(tag)}
            <StyledTagText>{tag.value}</StyledTagText>
            <IsCustomIcon isCustom={tag.isCustom}></IsCustomIcon>
          </StyledLi>
        ))}
    </StyledTagList>
  )
}

const StyledNoTagsResponse = styled.div`
  font-size: 13px;
  color: #a6a6a6;
  display: grid;
  place-items: center;
  min-height: 45px;
`

const StyledTagText = styled.span`
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.5px;
  margin: 0 8px 0 5px;
`

const StyledTagList = styled.ul`
  list-style-type: none;
  color: white;
  display: flex;
  flex-wrap: wrap;

  min-height: 24px;
`

const StyledLi = styled.li`
  background-color: ${(props) => props.bgcolor};
  transition: background-color 0.4s ease-out;
  display: inline-block;
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
  min-width: 50px;
  display: inline-flex;
  align-items: center;
  padding: 5px 10px 5px 5px;
  border-left: 2px solid #e3e3e3;
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
  margin: 0 5px 5px 0;
`
