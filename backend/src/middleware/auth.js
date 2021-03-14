const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.header('token')
  if (!token) return res.status(401).json({ message: 'Auth Error' })
  //console.log(token)
  try {
    const decoded = jwt.verify(token, 'randomString')
    req.user = decoded.user
    console.log('USER ID in AUTH')
    console.log(req.user.id)
    return req.user.id
  } catch (e) {
    console.error(e)
    res.status(401).send({ error: 'Invalid Token' })
  }
}
