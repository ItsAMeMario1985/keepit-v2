const express = require('express')
const { check, validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
var getDirName = require('path').dirname

const auth = require('../middleware/auth')
const User = require('../models/UserModel')
const Image = require('../models/ImageModel')
const fs = require('fs')
const sharp = require('sharp')
import { v4 as uuidv4 } from 'uuid'

/**
 * @method - POST
 * @description - Get LoggedIn User
 * @param - /image/add
 */

router.post('/add', auth, async (req, res) => {
  try {
    console.log('image add...')
    const user = await User.findById(req.user.id)
    console.log(user)
    res.json(user)
  } catch (e) {
    res.send({ message: 'Error in Fetching user' })
  }
})

/**
 * @method - POST
 * @description - Get LoggedIn User
 * @param - /image/upload
 */

function saveImage(file, name) {
  console.log('saveImage')
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
  console.log('saveThumb')
  sharp('./src/public/images/' + name + '.webp')
    .resize(300)
    .toFile('./src/public/images/' + name + '_thumb.webp', (err, info) => {
      console.log(console.log('Error while resizing:', err))
    })
}

router.post('/upload', auth, async (req, res) => {
  console.log('__________________  RUN  _______________________________')
  try {
    const user = await User.findById(req.user.id)
    var name = uuidv4()
    await saveImage(req.body.files[0], name)
    await saveThumbnail(name)
    res.json(name)
  } catch (e) {
    res.send({ message: 'Error in Fetching user' })
  }
  console.log('__________________  END  _______________________________')
})

module.exports = router
