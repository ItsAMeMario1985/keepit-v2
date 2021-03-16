import { useState } from 'react'

export default function useOverlay() {
  const [overlayContent, setOverlayContent] = useState()
  const [overlayStatus, setOverlayStatus] = useState()
  return { overlayStatus, setOverlayStatus, overlayContent, setOverlayContent }
}
