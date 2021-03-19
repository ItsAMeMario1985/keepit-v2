import ImageService from '../services/image-service'
import AwsS3Service from '../services/aws-s3-service'
import { v4 as uuidv4 } from 'uuid'

module.exports = { getTags, upload }

async function getTags(req, res) {
  console.log('// Image Controller -> getTags')
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

  let promises = []
  files.forEach((file) => {
    let imageId = uuidv4()
    responseIds.push(imageId)
    promises.push(ImageService.saveImage(file, imageId))
    //AwsS3Service.upload(imagePath)
    promises.push(ImageService.saveThumbnail(imageId))
    //AwsS3Service.upload(thumbPath)
  })

  Promise.all(promises).then((result) => {
    console.log('/// result -> ', result)
    res.json({ ids: responseIds })
    console.log('Done....')
  })
}
