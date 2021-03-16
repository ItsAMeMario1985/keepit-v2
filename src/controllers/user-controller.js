import UserService from '../services/user-service'

module.exports = { login, signup }

async function login(req, res) {
  console.log('// Login Controller ')
  const { email, password } = req.body
  try {
    let response = await UserService.login(email, password)
    console.log(response)
    res.json(response)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function signup(req, res) {
  console.log('// Signup Controller ')
  const { email, password } = req.body
  try {
    let response = await UserService.signup(email, password)
    console.log(response)
    res.json(response)
  } catch (err) {
    res.status(500).send(err)
  }
}
