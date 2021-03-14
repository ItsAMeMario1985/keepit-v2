const auth = require('../middleware/auth')
const KeepitService = require('../services/keepit')
import authentificationService from '../services/authentificationService'
import User from '../models/UserModel'

module.exports = { getAllKeepits }

async function getAllKeepits(req, res) {
  console.log('// Im controller angekommen...')

  const userId = authentificationService(req.header('token'))

  console.log(userId)
  try {
    // We only pass the body object, never the req object
    const test = await KeepitService.create(req.body)
    return res.send('// Im controller angekommen...')
  } catch (err) {
    res.status(500).send(err)
  }
}
