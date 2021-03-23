import ImageService from '../services/image-service'
import AwsS3Service from '../services/aws-s3-service'
import { v4 as uuidv4 } from 'uuid'

module.exports = { getTags, upload }

function getTags(req, res) {
  const imageIds = req.body.imageIds
  ImageService.getTags(imageIds)
    .then((response) => {
      res.json(response)
    })
    .catch((error) => res.status(500).send(error + ''))
}

function upload(req, res) {
  const userId = req.user.id
  console.log('userId', userId)
  let files = req.body.files
  let responseIds = []
  let savingPromises = []
  files.forEach((file) => {
    let imageId = uuidv4()
    responseIds.push(imageId)
    savingPromises.push(ImageService.saveImage(file, imageId))
  })
  Promise.all(savingPromises)
    .then((imagePaths) => {
      imagePaths.forEach((imagePath) => {
        AwsS3Service.upload(imagePath, userId)
        AwsS3Service.upload(imagePath.replace('.webp', '_thumb.webp'), userId)
      })
      res.json({ ids: responseIds })
    })
    .catch((error) => res.status(500).send(error + ''))
}
