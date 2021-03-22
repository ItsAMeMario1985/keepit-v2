import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import TaglistNewKeepit from '../Components/Tags/TaglistNewKeepit'
import CustomTagForm from '../Components/Tags/CustomTagForm'
import SaveButton from '../Components/Buttons/SaveButton'
import StarRatingForm from '../Components/StarRating/StarRatingForm'
import Overlay from '../Components/Overlay/Overlay'
import ContentSeparator from '../Components/Separator/ContentSeparator'
import {
  BackIcon,
  StarIcon,
  TagIcon,
  DoneIcon,
  XIcon,
  SearchIcon,
} from '../Components/Icons'

import setBase64 from '../Util/setBase64'

import useTags from '../Hooks/useTags'
import useToken from '../Hooks/useToken'
import useOverlay from '../Hooks/useOverlay'
import useKeepit from '../Hooks/useKeepit'
import useGeolocation from '../Hooks/useGeolocation'
import { apiUploadImages } from '../Services/apiRequests'
import resizeImage from '../Services/resizeImage'

export default function NewKeepitPage() {
  const history = useHistory()

  const [images, setImages] = useState([])
  const [rated, setRated] = useState([])
  const [imageIds, setImageIds] = useState([])
  const [ready4upload, setReady4upload] = useState(false)

  const { token } = useToken()
  const {
    overlayStatus,
    setOverlayStatus,
    overlayContent,
    setOverlayContent,
  } = useOverlay()
  const {
    tags,
    setTags,
    addedTags,
    handleSubmitTag,
    toggleTagAdded,
    loadApiTags,
  } = useTags()
  const { geolocation, getBrowserLocation } = useGeolocation()
  const { saveKeepit } = useKeepit()

  useEffect(() => {
    loadHistoryImages()
    getBrowserLocation()
    setOverlayStatus(false)
  }, [])

  useEffect(() => {
    if (images.length > 0) {
      uploadImages(images)
    }
  }, [images])

  useEffect(() => {
    if (imageIds.length > 0) {
      loadApiTags(imageIds)
      setReady4upload(true)
    }
  }, [imageIds])

  return (
    <>
      <Overlay status={overlayStatus} onClick={() => setOverlayStatus(false)}>
        {overlayContent}
      </Overlay>
      <StyledLayout>
        <Header />
        <StyledPreviewArea bgImg={setBgImg}>
          {images &&
            images.map((image, index) => (
              <StyledImageArea key={index}>
                <img
                  onClick={() => {
                    setOverlayContent(<StyledOverlayImage src={image} />)
                    setOverlayStatus(true)
                  }}
                  src={image}
                  alt=""
                />
                <StyledDeleteIcon
                  onClick={() => removeImage(index)}
                  width="20"
                />
              </StyledImageArea>
            ))}
        </StyledPreviewArea>
        <StyledOptionArea>
          <ContentSeparator
            text="RATE IT"
            icon={<StarIcon fill="#c7c7c7" width="12" height="12" />}
          />
          <StarRatingForm onClick={setRated}></StarRatingForm>
          <ContentSeparator
            text="TAG IT"
            icon={<TagIcon fill="#c7c7c7" width="11" height="11" />}
          />
          <TaglistNewKeepit
            tags={tags}
            onClick={toggleTagAdded}
            bgColor="var(--color-primary)"
            showIsCustom={true}
            showIsloading={true}
          ></TaglistNewKeepit>
          <CustomTagForm onSubmit={handleSubmitTag} />
        </StyledOptionArea>
      </StyledLayout>
      <Footer
        actionButtonText="Save Keepit"
        actionButtonIcon={<SaveButton onClick={handleSaveKeepit} />}
        leftIcon={<BackIcon />}
        leftOnClick={() => history.push('/')}
        rightIcon={<SearchIcon />}
        rightOnClick={() => {}}
      ></Footer>
    </>
  )

  function setBgImg() {
    if (images.length > 0) {
      return images[0]
    } else {
      return '#'
    }
  }

  async function loadHistoryImages() {
    const newImagesPromises = []
    Array.from(history.location.state.images).forEach(async (file) => {
      try {
        newImagesPromises.push(resizeImage(file))
      } catch (err) {
        console.log(err)
      }
    })
    setImages(await Promise.all(newImagesPromises))
  }

  function handleSaveKeepit() {
    if (ready4upload) {
      const request = {
        tags: addedTags,
        images: imageIds,
        rating: rated,
        geolocation,
      }
      saveKeepit(request)
      setOverlayContent(
        <StyledSaveOverlay
          status={overlayStatus}
          onClick={() => setOverlayStatus(false)}
        >
          SAVE
          <DoneIcon width="40" fill="var(--color-primary)" />
        </StyledSaveOverlay>
      )
      setOverlayStatus(true)
      setTimeout(function () {
        history.push('/')
      }, 1500)
    } else {
      alert('Image(s) not uploaded yet. Wait a few seconds please.')
    }
  }

  function removeImage(deleteIndex) {
    setImages(images.filter((image, index) => index !== deleteIndex))
    if (images.length - 1 === 0) {
      setTags([])
      history.push('/')
    }
  }

  async function uploadImages(images) {
    const files = images
    const labelRequest = {
      files,
    }

    apiUploadImages(token, labelRequest)
      .then((result) => setImageIds(result.ids))
      .catch((error) => console.log('error', error))
  }
}

const StyledLayout = styled.div`
  display: grid;
  grid-template-rows: 100px 30vh auto 125px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  font-size: 112.5%;
  max-width: 500px;
  overflow: scroll;
`
const StyledOptionArea = styled.div`
  margin-bottom: 10px;
  padding: 0 30px;
`
const StyledImageArea = styled.div`
  position: relative;
`
const StyledDeleteIcon = styled(XIcon)`
  position: absolute;
  top: -13px;
  right: -5px;
`
const StyledSaveOverlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const StyledPreviewArea = styled.div`
  display: flex;
  flex-direction: row;
  place-items: center;
  text-align: center;
  justify-content: center;
  position: relative;
  img {
    box-shadow: 3px 3px 4px 0px rgba(0, 0, 0, 0.13);
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    max-height: 160px;
    max-width: 90%;
  }

  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${(props) => props.bgImg});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: opacity(69%);
  }
`
const StyledOverlayImage = styled.img`
  width: 100%;
`
