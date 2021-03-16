import Keepit from '../models/KeepitModel'
import User from '../models/UserModel'
import Image from '../models/ImageModel'
import Tag from '../models/TagModel'
import geoCodingService from './geocoding-service'

const getAll = (userId) => {
  console.log('// GetAll Service')
  return new Promise((resolve) => {
    try {
      Keepit.find({ userId: userId })
        .populate('images tags')
        .exec(function (err, keepitArr) {
          if (err) return handleError(err)
          var response = []
          keepitArr.forEach((kt) => {
            response.push(kt)
          })
          resolve(response)
        })
    } catch (e) {
      resolve({ message: 'Error: ' + e })
    }
  })
}

const save = async (reqBody, userId) => {
  console.log('// Save Service')

  try {
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
      console.log('// Keeepit - Save - Tags - Check')
    })

    // Images
    const images = reqBody.images
    images.forEach((image) => {
      let newImage = new Image({
        path: '/media/images/' + image + '.webp',
        id: image,
        keepitId: keepit._id,
      })
      keepit.images.push(newImage)
      newImage.save()
      console.log('// Keeepit - Save - Images - Check')
    })

    // Geolocation
    if (reqBody.geolocation.length > 1) {
      const latitude = reqBody.geolocation[0]
      const longitude = reqBody.geolocation[1]
      var geoData = await geoCodingService(latitude, longitude)
      keepit.city = geoData.city
      keepit.country = geoData.country
      keepit.latitude = latitude
      keepit.longitude = longitude
    }

    user.keepits.push(keepit)
    keepit.save()
    user.save()
    return { message: 'Saved' }
  } catch (e) {
    return { message: 'Error: ' + e }
  }
}

const deleteOne = (id) => {
  console.log('// Delete Service: ' + id)
  try {
    Image.deleteMany({ keepitId: id }, function (err) {
      if (err) console.log(err)
      console.log('Images deleted')
    })

    Tag.deleteMany({ keepitId: id }, function (err) {
      if (err) console.log(err)
      console.log('Tags deleted')
    })

    Keepit.deleteOne({ _id: id }, function (err) {
      if (err) console.log(err)
      console.log('Keepit deleted')
    })

    return { message: 'Deletion complete ' }
  } catch (e) {
    return { message: 'Error: ' + e }
  }
}

module.exports = {
  getAll,
  save,
  deleteOne,
}
