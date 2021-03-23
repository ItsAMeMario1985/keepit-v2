import UserService from '../services/user-service'

module.exports = { login, signup }

function login(req, res) {
  const { email, password } = req.body
  UserService.login(email, password)
    .then((response) => res.json(response))
    .catch((error) => res.status(500).send(error + ''))
}

function signup(req, res) {
  const { email, password } = req.body
  UserService.signup(email, password)
    .then((response) => res.json(response))
    .catch((error) => res.status(500).send(error + ''))
}
