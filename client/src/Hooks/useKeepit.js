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
  const { token, deleteToken } = useToken()

  function handleError(response) {
    if (response.error === 'Invalid Token') {
      console.log('error handling started')
      deleteToken()
    } else {
      return response
    }
  }

  return {
    rawKeepits,
    keepits,
    setKeepits,
    deleteKeepit,
    saveKeepit,
    loadKeepitsFromApi,
  }

  function deleteKeepit(id) {
    console.log('in delete', id)
    apiDeleteKeepit(token, id)
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error))
  }

  function saveKeepit(request) {
    apiSaveKeepit(token, request)
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error))
  }

  function loadKeepitsFromApi() {
    apiGetAllKeepits(token)
      .then((result) => handleApiKeepits(handleError(result)))
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
