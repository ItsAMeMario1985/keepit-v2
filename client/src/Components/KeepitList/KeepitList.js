import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { StarIcon } from '../Icons'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import ImageNotFoundImg from '../../Assets/image-not-found.png'
import { v4 as uuidv4 } from 'uuid'

KeepitList.propTypes = {
  keepits: PropTypes.array.isRequired,
  className: PropTypes.string,
}

export default function KeepitList({ keepits, className }) {
  const history = useHistory()

  if (keepits.length === 0) {
    return <LoadingSpinner />
  }

  function gotoDetail(keepit) {
    history.push('/detail/' + keepit._id, { keepit: keepit })
  }

  return (
    <StyledUl className={className}>
      {keepits &&
        keepits.map((keepit, index) => (
          <li key={keepit._id}>
            <StyledImg
              key={keepit._id}
              src={
                keepit.images.length > 0
                  ? keepit.images[0].path.replace('.webp', '_thumb.webp')
                  : ImageNotFoundImg
              }
              alt=""
              onClick={() => gotoDetail(keepit)}
              data-testid="TestKeepitImg"
            ></StyledImg>
            <StyledStarRating key={keepit._id + 'rate'}>
              {[...Array(keepit.rating)].map((index) => (
                <StarIcon
                  key={uuidv4()}
                  width="5"
                  fill="var(--color-primary)"
                ></StarIcon>
              ))}
            </StyledStarRating>
          </li>
        ))}
    </StyledUl>
  )
}

const StyledStarRating = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-top-right-radius: 6px;
  font-weight: 600;
  bottom: 1px;
  left: 1px;
  position: absolute;
  height: 12px;
  z-index: 1;
  background-color: #00000059;
  padding-right: 5px;
  height: 15px;
  color: white;
  text-align: center;

  svg {
    height: 12px;
    margin-left: 3px;
  }
`
const StyledImg = styled.img`
  max-height: 100%;
  min-width: 100%;
  object-fit: cover;
  vertical-align: bottom;
  border: 1px dotted #e3e3e3;
  border-radius: 2px;
  cursor: pointer;
`
const StyledUl = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;

  li {
    height: 20vh;
    flex-grow: 4;
    position: relative;
    align-self: flex-start;

    &:last-child {
      flex-grow: 1;
      margin-right: auto;
    }
  }
`
