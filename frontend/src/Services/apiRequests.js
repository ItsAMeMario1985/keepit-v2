const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

export function apiGetAllKeepits(token) {
  console.log(apiBaseUrl)
  return requestApi({
    url: `${apiBaseUrl}/keepit/getall`,
    method: 'GET',
    token,
  })
}

export function apiGetVisionLabels(token, body) {
  console.log('apiGetVisionLabels')
  return requestApi({
    url: `${apiBaseUrl}/image/gettags`,
    method: 'POST',
    token,
    body,
  })
}

export function apiUploadImages(token, body) {
  return requestApi({
    url: `${apiBaseUrl}/image/upload`,
    method: 'POST',
    token,
    body,
  })
}

export function apiSaveKeepit(token, body) {
  return requestApi({
    url: `${apiBaseUrl}/keepit/save`,
    method: 'POST',
    token,
    body,
  })
}

export function apiDeleteKeepit(token, id) {
  return requestApi('', `${apiBaseUrl}/keepit/delete/` + id, 'POST', token)
}

export function requestApi(props) {
  console.log('Api Request - url', props.url)
  console.log('Api Request - body', props.body)
  console.log('Api Request - method', props.method)
  console.log('Api Request - token', props.token)

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('token', props.token)
  let requestOptions = {}
  if (props.body) {
    requestOptions = {
      method: props.method,
      headers: myHeaders,
      body: JSON.stringify(props.body),
      redirect: 'follow',
    }
  } else {
    requestOptions = {
      method: props.method,
      headers: myHeaders,
      redirect: 'follow',
    }
  }
  return fetch(props.url, requestOptions).then((response) => response.json())
  // return fetch(props.url, requestOptions).then((response) => {
  //   //console.log(response)
  //   if (response.status === 401) {
  //     sessionStorage.removeItem('token') // rework!
  //     //throw new Error('Invalid Token')

  //     return response.json()
  //   }
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok')
  //   }
  //   return response.json()
  // })
}

/*
  return fetch(url, requestOptions).then((response) => response.json())


     //console.log(response)
    if (response.status === 401) {
      //sessionStorage.removeItem('token') // rework!
      //throw new Error('Invalid Token')
      console.log(response)
      return response.json()
    }
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()

*/
