import visionApiService from './visionApi-service'
import fs from 'fs'
import sharp from 'sharp'
import Image from '../models/ImageModel'

const deleteUnused = async (file, name) => {
  console.log('// Cron to delete unused images')
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

const getTags = async (imageIds) => {
  console.log('// Image Service -> getTags')
  try {
    let ids = imageIds

    // Receive labels of images
    const labelPromises = []
    ids.forEach((id) => {
      labelPromises.push(
        visionApiService('./src/public/images/' + id + '.webp')
      )
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

    return { labels: response }
  } catch (e) {
    return { message: 'Error in loading tags' + e }
  }
}

const saveImage = async (file, name) => {
  console.log('// Image Service -> saveImage')
  try {
    var base64result = file.split(',')[1]
    fs.writeFileSync(
      './src/public/images/' + name + '.webp',
      base64result,
      'base64',
      function (err) {
        console.log(err)
      }
    )
    return { message: 'ok' }
  } catch (e) {
    return { message: 'Error in saving image' + e }
  }
}

const saveThumbnail = async (name) => {
  console.log('// Image Service -> saveThumbnail')
  try {
    sharp('./src/public/images/' + name + '.webp')
      .rotate()
      .resize(300)
      .toFile('./src/public/images/' + name + '_thumb.webp')
    return { message: 'ok' }
  } catch (e) {
    return { message: 'Error in saving thumbnail' + e }
  }
}

module.exports = {
  getTags,
  saveImage,
  saveThumbnail,
  deleteUnused,
}
