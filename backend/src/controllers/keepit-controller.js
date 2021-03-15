import KeepitService from '../services/keepit-service'

module.exports = { getAll, save, deleteOne }

async function getAll(req, res) {
  const userId = req.user.id
  try {
    let response = await KeepitService.getAll(userId)
    res.json(response)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function save(req, res) {
  console.log('save controller')
  const userId = req.user.id
  try {
    let response = await KeepitService.save(req.body, userId)
    res.json(response)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function deleteOne(req, res) {
  const { id } = req.params
  console.log('//////////// ID: ' + id)
  // const userId = req.user.id
  try {
    let response = await KeepitService.deleteOne(id)
    res.json(response)
  } catch (err) {
    res.status(500).send(err)
  }
}
