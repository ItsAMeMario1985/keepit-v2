import KeepitService from '../services/keepit-service'
import AwsS3Service from '../services/aws-s3-service'
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

  // Upload S3 Images
  let imageIds = req.body.images
  imageIds.forEach((imageId) => {
    var imagePath = './src/public/images/' + imageId + '.webp'
    var thumbPath = './src/public/images/' + imageId + '_thumb.webp'
    AwsS3Service.upload(imagePath, userId)
    AwsS3Service.upload(thumbPath, userId)
  })
}

function deleteOne(req, res) {
  const { id } = req.params
  const userId = req.user.id

  ImageService.getImgPath(id)
    .then((response) => {
      let imagesPath = response
      console.log('Got image path', imagesPath)
      imagesPath.forEach((imagePath) => {
        AwsS3Service.deleteImg(imagePath, userId)
        AwsS3Service.deleteImg(
          imagePath.replace('.webp', '_thumb.webp'),
          userId
        )
      })
    })
    .then(() => {
      res.json(KeepitService.deleteOne(id))
    })
    .catch((error) => res.status(500).send(error + ''))
}
