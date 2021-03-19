import KeepitService from '../services/keepit-service'
import awsS3Service from '../services/aws-s3-service'
import ImageService from '../services/image-service'

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
  try {
    let imagePaths = await ImageService.getImgPath(id)
    console.log(imagePaths)
    imagePaths.forEach((imagePath) => {
      awsS3Service.deleteImg(imagePath)
      awsS3Service.deleteImg(imagePath.replace('.webp', '_thumb.webp'))
    })
    let response = await KeepitService.deleteOne(id)
    res.json(response)
  } catch (err) {
    res.status(500).send(err)
  }
}
