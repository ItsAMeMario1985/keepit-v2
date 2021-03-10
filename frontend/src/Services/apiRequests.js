const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

export function apiGetAllKeepits(token) {
  console.log(apiBaseUrl)
  return requestApi('', `${apiBaseUrl}/keepit/getall`, 'GET', token)
}

export function apiGetVisionLabels(body) {
  return requestApi(body, `${apiBaseUrl}/images/gettags`, 'POST')
}

export function apiUploadImages(body) {
  return requestApi(body, `${apiBaseUrl}/images/upload`, 'POST')
}

export function apiSaveKeepit(body) {
  return requestApi(body, `${apiBaseUrl}/keepit/add`, 'POST')
}

export function apiDeleteKeepit(id) {
  return requestApi('', `${apiBaseUrl}/keepit/delete/` + id, 'POST')
}

export function requestApi(body, url, method, token) {
  // console.log('Api Request - url', url)
  // console.log('Api Request - body', body)
  // console.log('Api Request - method', method)

  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('token', token)

  var requestOptions = {
    method: method,
    headers: myHeaders,

    redirect: 'follow',
  }

  // if (method === 'POST') {
  //   requestOptions = {
  //     method: method,
  //     headers: myHeaders,
  //     body: JSON.stringify(body),
  //     redirect: 'follow',
  //   }
  // }
  return fetch(url, requestOptions).then((response) => response.json())
}
