import { useState } from 'react'

export default function useGeolocation() {
  const [geolocation, setGeolocation] = useState([])

  return { geolocation, getBrowserLocation }

  function getBrowserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handlegeolocation)
    }
  }

  function handlegeolocation(position) {
    const latitude = position.coords['latitude']
    const longitude = position.coords['longitude']
    setGeolocation([latitude, longitude])
  }
}
