import { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { ReactComponent as ActionButtonSvg } from '../../Assets/keepit-button.svg'
import styled from 'styled-components/macro'

export default function UploadButtonw() {
  const [imageList, setImageList] = useState([])
  const history = useHistory()
  const location = useLocation()

  function gotoNew() {
    if (imageList.length > 0) {
      history.push('/new', { images: imageList })
    }
    if (location.pathname === '/new') {
      window.location.reload()
    }
  }

  useEffect(() => {
    setTimeout(function () {
      gotoNew()
    }, 500)
  }, [imageList])

  function onChangePicture(event) {
    setImageList(event.target.files)
    event.preventDefault()
  }

  return (
    <form>
      <StyledLabel>
        <ActionButtonSvg height="50px"></ActionButtonSvg>
        <StyledInput
          alt="image-input"
          name="image"
          type="file"
          onChange={onChangePicture}
          accept="image/x-png,image/gif,image/jpeg"
          data-testid="uploadbutton"
          multiple
        />
      </StyledLabel>
    </form>
  )
}
const StyledInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`
const StyledLabel = styled.label`
  cursor: pointer;
`
