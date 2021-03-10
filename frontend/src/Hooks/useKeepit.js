import { useState } from 'react'
import {
  apiDeleteKeepit,
  apiSaveKeepit,
  apiGetAllKeepits,
} from '../Services/apiRequests.js'
import useToken from '../Hooks/useToken'

export default function useKeepit() {
  const [keepits, setKeepits] = useState([])
  const [rawKeepits, setRawKeepits] = useState([])
  const { token } = useToken()

  return {
    rawKeepits,
    keepits,
    setKeepits,
    deleteKeepit,
    saveKeepit,
    loadKeepitsFromApi,
  }

  function deleteKeepit(id) {
    apiDeleteKeepit(token, id)
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error))
  }

  function saveKeepit(request, handleApiTags) {
    apiSaveKeepit(token, request)
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error))
  }

  function loadKeepitsFromApi() {
    apiGetAllKeepits(token)
      .then((result) => handleApiKeepits(result))
      .catch((error) => console.log(error))
  }

  function handleApiKeepits(result) {
    setKeepits(
      result.sort(function (a, b) {
        return b.id - a.id
      })
    )
    setRawKeepits(
      result.sort(function (a, b) {
        return b.id - a.id
      })
    )
  }
}
