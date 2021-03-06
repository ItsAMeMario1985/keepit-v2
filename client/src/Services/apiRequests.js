let apiBaseUrl = 'https://keepit182.herokuapp.com/api'

if (process.env.NODE_ENV === 'development') {
  apiBaseUrl = process.env.REACT_APP_API_BASE_URL
}

export function apiGetAllKeepits(token) {
  return requestApi({
    url: `${apiBaseUrl}/keepit/getall`,
    method: 'GET',
    token,
  })
}

export function apiGetVisionLabels(token, body) {
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
  return requestApi({
    url: `${apiBaseUrl}/keepit/delete/` + id,
    method: 'DELETE',
    token,
  })
}

export function requestApi(props) {
  // console.log('Api Request - url', props.url)
  // console.log('Api Request - body', props.body)
  // console.log('Api Request - method', props.method)
  // console.log('Api Request - token', props.token)

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
}

export function apiUserLogin(credentials) {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL
  return fetch(apiBaseUrl + '/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json())
}

export function apiRegister(credentials) {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL
  return fetch(apiBaseUrl + '/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json())
}
