const auth = require('../middleware/auth')
import ImageService from '../services/image-service'
import { v4 as uuidv4 } from 'uuid'

module.exports = { getTags, upload }

async function getTags(req, res) {
  console.log('// Image Controller getTags')
  const imageIds = req.body.imageIds
  try {
    let response = await ImageService.getTags(imageIds)
    res.json(response)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function upload(req, res) {
  console.log('// Image Controller upload')
  try {
    let files = req.body.files
    let responseIds = []
    files.forEach((file) => {
      let name = uuidv4()
      responseIds.push(name)
      ImageService.saveImage(file, name)
      ImageService.saveThumbnail(name)
    })
    res.json({ ids: responseIds })
  } catch (e) {
    res.send({ message: 'Error in uploading' })
  }
}
