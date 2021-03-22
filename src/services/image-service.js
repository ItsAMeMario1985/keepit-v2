import visionApiService from './visionApi-service'
import fs from 'fs'
import sharp from 'sharp'
import Image from '../models/ImageModel'

const getImgPath = async (id) => {
  let images = await Image.find({ keepitId: id })
  let response = images.map((image) => image.path)
  return response
}

const getTags = async (imageIds) => {
  // try {
  let ids = imageIds
  // Receive labels of images
  const labelPromises = []
  ids.forEach((id) => {
    labelPromises.push(visionApiService('./src/public/images/' + id + '.webp'))
  })
  var allLabels = await Promise.all(labelPromises)

  // Merge if multiple images were uploaded
  var mergedLabels
  if (allLabels.length > 1) {
    mergedLabels = [...allLabels[0], ...allLabels[1]]
  } else {
    mergedLabels = [...allLabels[0]]
  }
  // Filter score > X
  var filteredLabels = mergedLabels.filter((label) => label.score > 0.8)
  // Create response
  var response = filteredLabels.map((filteredLabel) => {
    return filteredLabel.description
  })
  return Promise.resolve({ labels: response })
}

// Alternative way for labels
const getTagsA = (imageIds) => {
  return new Promise((resolve) => {
    visionApiService('./src/public/images/' + imageIds + '.webp').then(
      (result) => {
        var filteredLabels = result.filter((label) => label.score > 0.8)
        // Create response
        var response = filteredLabels.map((filteredLabel) => {
          return filteredLabel.description
        })
        resolve(response)
      }
    )
  })
}

const saveImage = async (file, name) => {
  let prePath = './src/public/images/' + name + '_pre.webp'
  let path = './src/public/images/' + name + '.webp'
  return new Promise((resolve) => {
    try {
      var base64result = file.split(',')[1]
      // Save orig image
      fs.writeFileSync(prePath, base64result, 'base64', function (err) {
        console.log('error in write', err)
      })
      // Optimize orig image
      sharp(prePath)
        .rotate()
        .resize(1100)
        .toFile('./src/public/images/' + name + '.webp')
        .then(() => {
          // Save Thumbnail
          sharp(path)
            .rotate()
            .resize(300)
            .toFile('./src/public/images/' + name + '_thumb.webp')
            .then(() => {
              //console.log('// BE Uploading done...')
              resolve(path)
            })
        })
    } catch (e) {
      resolve({ message: 'Error in saving image' + e })
    }
  })
}

const saveThumbnail = async (name) => {
  let path = './src/public/images/' + name + '.webp'
  return new Promise((resolve) => {
    try {
      sharp(path)
        .rotate()
        .resize(300)
        .toFile('./src/public/images/' + name + '_thumb.webp')
        .then(() => {
          resolve('./src/public/images/' + name + '_thumb.webp')
        })
    } catch (e) {
      resolve({ message: 'Error in saving thumb image' + e })
    }
  })
}

const deleteImage = async (path) => {
  try {
    fs.unlinkSync(path)
  } catch (err) {
    console.error(err)
  }
}

const deleteUnused = async (file, name) => {
  try {
    // Get all
    const imagesInUse = await Image.find({})
    const allImages = fs.readdirSync('./src/public/images/')

    console.log('1 - Images in use: ', imagesInUse.length * 2)
    console.log('1 - Images in folder:', allImages.length)

    // splice images "in use" from arr
    imagesInUse.forEach((imageInUse) => {
      let index = allImages.indexOf(imageInUse.id + '.webp')
      allImages.splice(index, 1)
      let indexThumb = allImages.indexOf(imageInUse.id + '_thumb.webp')
      allImages.splice(indexThumb, 1)
    })

    // Delete remaining images
    allImages.forEach((imageToDelete) => {
      try {
        fs.unlinkSync('./src/public/images/' + imageToDelete)
      } catch (err) {
        console.error(err)
      }
    })

    console.log('2 - Images in use: ', imagesInUse.length * 2)
    console.log('2 - Images to delete:', allImages.length)
  } catch (e) {
    return { message: 'Error in deleting image' + e }
  }
}

module.exports = {
  getTags,
  saveImage,
  saveThumbnail,
  deleteUnused,
  deleteImage,
  getTagsA,
  getImgPath,
}
