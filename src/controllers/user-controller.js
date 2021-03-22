import UserService from '../services/user-service'

module.exports = { login, signup }

async function login(req, res) {
  const { email, password } = req.body
  try {
    let response = await UserService.login(email, password)
    res.json(response)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function signup(req, res) {
  const { email, password } = req.body
  try {
    let response = await UserService.signup(email, password)
    res.json(response)
  } catch (err) {
    res.status(500).send(err)
  }
}
