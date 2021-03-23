import KeepitService from '../services/keepit-service'
import awsS3Service from '../services/aws-s3-service'
import ImageService from '../services/image-service'

module.exports = { getAll, save, deleteOne }

function getAll(req, res) {
  const userId = req.user.id
  KeepitService.getAll(userId)
    .then((response) => res.json(response))
    .catch((error) => res.status(500).send(error + ''))
}

function save(req, res) {
  const userId = req.user.id
  KeepitService.save(req.body, userId)
    .then((response) => res.json(response))
    .catch((error) => res.status(500).send(error + ''))
}

function deleteOne(req, res) {
  const { id } = req.params
  ImageService.getImgPath(id)
    .then((response) => {
      let imagesPath = response
      console.log('Got image path', imagesPath)
      imagesPath.forEach((imagePath) => {
        awsS3Service.deleteImg(imagePath)
        awsS3Service.deleteImg(imagePath.replace('.webp', '_thumb.webp'))
      })
    })
    .then(() => {
      res.json(KeepitService.deleteOne(id))
    })
    .catch((error) => res.status(500).send(error + ''))
}
