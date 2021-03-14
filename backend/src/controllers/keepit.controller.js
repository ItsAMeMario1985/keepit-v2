const auth = require('../middleware/auth')
const KeepitService = require('../services/keepit.service')
import User from '../models/UserModel'

module.exports = { getAll, save }

async function getAll(req, res) {
  const userId = req.user.id
  const user = await User.findById(req.user.id)
  try {
    var response = await KeepitService.getAll(userId)
    res.json(response)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function save(req, res) {
  const userId = req.user.id
  try {
    var test = await KeepitService.save(req.body, userId)
    res.json(test)
  } catch (err) {
    res.status(500).send(err)
  }
}
