import ImageService from '../services/image-service'
import awsS3Service from '../services/aws-s3-service'
import visionApiService from '../services/visionApi-service'
import { v4 as uuidv4 } from 'uuid'
import { async } from 'regenerator-runtime'

module.exports = { getTags, upload }

async function getTags(req, res) {
  //console.log('// Image Controller -> getTags')
  const imageIds = req.body.imageIds
  try {
    let response = await ImageService.getTags(imageIds)
    res.json(response)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function upload(req, res) {
  //console.log('// Image Controller -> upload')
  let files = req.body.files
  let responseIds = []

  files.forEach(async (file) => {
    let imageId = uuidv4()
    responseIds.push(imageId)
    const imagePath = await ImageService.saveImage(file, imageId)
    awsS3Service.upload(imagePath)
    const thumbPath = await ImageService.saveThumbnail(imageId)
    awsS3Service.upload(thumbPath)
  })

  // TRY TO DELIVER
  // let responseLabels = []
  // responseIds.forEach(async (id) => {
  //   //let thumbPath = './src/public/images/' + id + '_thumb.webp'
  //   responseLabels.push(ImageService.getTagsA(id))
  // })
  // var allLabels = await Promise.all(responseLabels)

  res.json({ ids: responseIds })
}
