import { check, validationResult } from 'express-validator/check'
import { Router } from 'express'
import auth from '../middleware/auth'
import User from '../models/UserModel'
import Image from '../models/ImageModel'
import fs from 'fs'
import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'
import loadApiVisionLabels from '../services/cloudVisionApi'
const router = new Router()

/**
 * @method - POST
 * @description - Get LoggedIn User
 * @param - /image/gettags
 */

router.post('/gettags', auth, async (req, res) => {
  try {
    let ids = req.body.imageIds

    // Receive labels of images
    const labelPromises = []
    ids.forEach((id) => {
      labelPromises.push(
        loadApiVisionLabels('./src/public/images/' + id + '.webp')
      )
    })
    var allLabels = await Promise.all(labelPromises)

    // Merge if multiple images were uploaded
    var mergedLabels
    if (allLabels.length > 1) {
      console.log('////// multiple images...')
      mergedLabels = [...allLabels[0], ...allLabels[1]]
    } else {
      console.log('////// single images...')
      mergedLabels = [...allLabels[0]]
    }

    // Filter score > X
    var filteredLabels = mergedLabels.filter((label) => label.score > 0.8)

    // Create response
    var response = filteredLabels.map((filteredLabel) => {
      return filteredLabel.description
    })

    res.json({ labels: response })
  } catch (e) {
    res.send({ message: 'Error in loading tags' })
  }
})

/**
 * @method - POST
 * @description - Get LoggedIn User
 * @param - /image/upload
 */

router.post('/upload', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    let files = req.body.files
    let responseIds = []
    files.forEach((file) => {
      let name = uuidv4()
      responseIds.push(name)
      saveImage(file, name)
      saveThumbnail(name)
    })

    res.json({ ids: responseIds })
  } catch (e) {
    res.send({ message: 'Error in uploading' })
  }

  function saveImage(file, name) {
    var base64result = file.split(',')[1]
    fs.writeFileSync(
      './src/public/images/' + name + '.webp',
      base64result,
      'base64',
      function (err) {
        console.log(err)
      }
    )
  }

  function saveThumbnail(name) {
    sharp('./src/public/images/' + name + '.webp')
      .rotate()
      .resize(300)
      .toFile('./src/public/images/' + name + '_thumb.webp')
  }
})

module.exports = router
