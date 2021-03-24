import Keepit from '../models/KeepitModel'
import User from '../models/UserModel'
import Image from '../models/ImageModel'
import Tag from '../models/TagModel'
import geoCodingService from './geocoding-service'

const getAll = (userId) => {
  return new Promise((resolve) => {
    Keepit.find({ userId: userId })
      .populate('images tags')
      .exec(function (error, keepitArr) {
        if (error) return reject(error)
        var response = []
        keepitArr.forEach((kt) => {
          response.push(kt)
        })
        if (keepitArr.length === 0) {
          resolve({ message: 'No keepit yet.' })
        }
        resolve(response)
      })
  })
}

const save = async (reqBody, userId) => {
  const user = await User.findById(userId)

  // New Keepit
  const keepit = new Keepit({
    submitted: reqBody.submitted,
    rating: reqBody.rating,
    userId: user._id,
  })

  //Tags
  const tags = reqBody.tags
    ? reqBody.tags
    : [{ value: 'Untagged', isCustom: true }]
  tags.forEach((tag) => {
    let newTag = new Tag({
      value: tag.value,
      isCustom: tag.isCustom,
      keepitId: keepit._id,
    })
    keepit.tags.push(newTag)
    newTag.save()
  })

  // Images
  const imageIds = reqBody.images
  let folder = process.env.amazons3foler

  imageIds.forEach((imageId) => {
    let newImage = new Image({
      path:
        'https://keepitbucket.s3.amazonaws.com/' +
        folder +
        '/' +
        userId +
        '_' +
        imageId +
        '.webp',
      id: imageId,
      keepitId: keepit._id,
    })
    keepit.images.push(newImage)
    newImage.save()
  })

  // Delete images
  // ids.forEach((id) => {
  //   fs.unlinkSync('./src/public/images/' + id + '.webp')
  //   fs.unlinkSync('./src/public/images/' + id + '_thumb.webp')
  // })

  // Geolocation
  if (reqBody.geolocation.length > 1) {
    const latitude = reqBody.geolocation[0]
    const longitude = reqBody.geolocation[1]
    var geoData = await geoCodingService.getCityCountry(latitude, longitude)
    keepit.city = geoData.city
    keepit.country = geoData.country
    keepit.latitude = latitude
    keepit.longitude = longitude
  }

  user.keepits.push(keepit)
  keepit.save()
  user.save()
  return { message: 'Saved' }
}

const deleteOne = (id) => {
  Image.deleteMany({ keepitId: id }, function (err) {
    if (err) console.log(err)
    //console.log('Images deleted')
  })

  Tag.deleteMany({ keepitId: id }, function (err) {
    if (err) console.log(err)
    //console.log('Tags deleted')
  })

  Keepit.deleteOne({ _id: id }, function (err) {
    if (err) console.log(err)
    //console.log('Keepit deleted')
  })

  return { message: 'Deletion complete ' }
}

module.exports = {
  getAll,
  save,
  deleteOne,
}
