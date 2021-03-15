import visionApiService from './visionApi-service'
import fs from 'fs'
import sharp from 'sharp'

const getTags = async (imageIds) => {
  console.log('// Image Service')
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
    return { message: 'Error in loading tags' }
  }
}

const saveImage = async (file, name) => {
  console.log('// Image Service - saveImage')
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
    return { message: 'Error in saving image' }
  }
}

const saveThumbnail = async (name) => {
  console.log('// Image Service - uploadImage')
  try {
    sharp('./src/public/images/' + name + '.webp')
      .rotate()
      .resize(300)
      .toFile('./src/public/images/' + name + '_thumb.webp')
    return { message: 'ok' }
  } catch (e) {
    return { message: 'Error in saving thumbnail' }
  }
}

module.exports = {
  getTags,
  saveImage,
  saveThumbnail,
}
