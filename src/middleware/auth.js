const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.header('token')
  if (!token) return res.status(401).json({ message: 'Auth Error' })
  try {
    const decoded = jwt.verify(token, 'randomString')
    req.user = decoded.user
    next()
  } catch (e) {
    console.error('Invalid Token')
    res.status(401).send({ error: 'Invalid Token' })
  }
}
