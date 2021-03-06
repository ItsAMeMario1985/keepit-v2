import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import UploadButton from '../Components/Buttons/UploadButton'
import StarRating from '../Components/StarRating/StarRating'
import Taglist from '../Components/Tags/Taglist'
import ContentSeparator from '../Components/Separator/ContentSeparator'
import Overlay from '../Components/Overlay/Overlay'
import {
  BackIcon,
  EditIcon,
  TagIcon,
  DeleteIcon,
  SearchIcon,
} from '../Components/Icons'
import ImageNotFoundImg from '../Assets/image-not-found.png'

import useOverlay from '../Hooks/useOverlay'
import useKeepit from '../Hooks/useKeepit'

export default function KeepitDetailPage({ props }) {
  const { deleteKeepit } = useKeepit()

  const {
    overlayStatus,
    setOverlayStatus,
    overlayContent,
    setOverlayContent,
  } = useOverlay()

  const history = useHistory()
  const keepit = history.location.state.keepit
  const tags = keepit.tags

  let imageUrl = ImageNotFoundImg
  if (keepit.images) {
    imageUrl = keepit.images[0].path
  }

  function handleDelete() {
    deleteKeepit(keepit._id)
    setOverlayContent(
      <StyledDeleteOverlay>
        <DeleteIcon width="50" fill="var(--color-primary)" />
        DELETED ✓
      </StyledDeleteOverlay>
    )
    setOverlayStatus(true)
    setTimeout(function () {
      history.push('/')
    }, 1500)
  }

  function showDate() {
    if (keepit.createdAt) {
      var date = keepit.createdAt.split('T')
      return date[0]
    } else {
      return 'Long time ago'
    }
  }

  function showLocation() {
    if (keepit.city !== '0') {
      return keepit.city + ', ' + keepit.country
    } else {
      return 'In a galaxy far, far away'
    }
  }

  return (
    <>
      <Overlay status={overlayStatus} onClick={() => setOverlayStatus(false)}>
        {overlayContent}
      </Overlay>
      <StyledLayout>
        <Header />
        <StyledImageArea>
          <StyledImage
            onClick={() => {
              setOverlayContent(<StyledOverlayImage src={imageUrl} />)
              setOverlayStatus(true)
            }}
            bgImg={imageUrl}
          />
          <StyledSubInfoArea>
            <StyledDateLocationArea>
              {showDate()}
              <br></br>
              {showLocation()}
            </StyledDateLocationArea>
            <StyledSubMenu>
              <StyedIconWrapperLeft onClick={handleDelete}>
                <StyledDeleteIcon width="14" fill="var(--color-text-medium)" />
                Delete
              </StyedIconWrapperLeft>
              <StyedIconWrapperRight
                onClick={() => {
                  alert('iscomingsoon')
                }}
              >
                <StyledEditIcon width="17" fill="var(--color-text-medium)" />
                Edit
              </StyedIconWrapperRight>
            </StyledSubMenu>
          </StyledSubInfoArea>
        </StyledImageArea>
        <StyledTagArea>
          <StyledTagIcon />
          <StyledTagHeadline>Tags</StyledTagHeadline>
          <StyledStarRating rating={keepit.rating} />
          <StyledContentSeparator />
          <Taglist
            tags={tags}
            bgColor="var(--color-primary)"
            showIsCustom={true}
            showIsloading={true}
          ></Taglist>
        </StyledTagArea>
      </StyledLayout>
      <Footer
        actionButtonText="New Keepit"
        actionButtonIcon={<UploadButton />}
        leftIcon={<BackIcon />}
        leftOnClick={() => history.push('/')}
        rightIcon={<SearchIcon />}
        rightOnClick={() => history.push('/')}
      ></Footer>
    </>
  )
}

const StyledContentSeparator = styled(ContentSeparator)`
  padding: 15px 0 15px 0;
`

const StyledTagIcon = styled(TagIcon)`
  margin-bottom: -2px;
`

const StyledEditIcon = styled(EditIcon)`
  margin-bottom: 3px;
`

const StyledDeleteIcon = styled(DeleteIcon)`
  margin-bottom: 3px;
`

const StyledStarRating = styled(StarRating)`
  float: right;
  margin-top: 4px;
`

const StyledDeleteOverlay = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.5rem;

  svg {
    margin-bottom: 30px;
  }
`

const StyledOverlayImage = styled.img`
  width: 100%;
`

const StyledDateLocationArea = styled.div`
  align-items: center;
  color: var(--color-text-medium);
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
  justify-content: center;
  line-height: 15px;
  margin-left: 30px;
  text-align: left;
`

const StyedIconWrapperLeft = styled.div`
  align-items: center;
  border-right: 1px solid #c9c9c9;
  color: var(--color-text-medium);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  justify-content: center;
  margin: 5px 0;
  width: 70px;
`

const StyedIconWrapperRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70px;
  cursor: pointer;
  margin-right: 15px;
  font-size: 0.8rem;
  color: var(--color-text-medium);
`

const StyledSubMenu = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledSubInfoArea = styled.div`
  bottom: 0;
  height: 50px;
  position: absolute;
  width: 100%;
  background-color: #ffffffcf;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledTagArea = styled.div`
  padding: 0 30px;
  margin-top: 10px;
`

const StyledTagHeadline = styled.span`
  font-weight: 600;
  font-size: 0.85rem;
  color: #c7c7c7;
  margin-left: 5px;
  text-transform: uppercase;
`

const StyledLayout = styled.div`
  display: grid;
  grid-template-rows: 100px 50vh auto 125px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  max-width: 500px;
  overflow: scroll;
`

const StyledImageArea = styled.div`
  text-align: center;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 10px 0;
`

const StyledImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(${(props) => props.bgImg});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`
