const jwt = require('jsonwebtoken')

export default function myAuth(token) {
  if (!token) return { error: 'Token not given' }
  try {
    const decoded = jwt.verify(token, 'randomString')
    const userID = decoded.user
    return userID
  } catch (e) {
    //console.error(e)
    return { error: 'Invalid Token' }
  }
}
