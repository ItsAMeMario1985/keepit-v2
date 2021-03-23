import fetch from 'node-fetch'

const getCityCountry = (latitude, longitude) => {
  return new Promise((resolve) => {
    const url =
      'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
      latitude +
      ',' +
      longitude +
      '&sensor=false&key=' +
      process.env.MAP_API_KEY
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        var city = ''
        var country = ''

        // filter for city and country
        json.results.forEach((fsd) => {
          if (!fsd.types.indexOf('locality')) {
            city = fsd.address_components[0].long_name
          }
          if (!fsd.types.indexOf('country')) {
            country = fsd.address_components[0].long_name
          }
        })
        resolve({ city: city, country: country })
      })
  })
}

module.exports = {
  getCityCountry,
}
