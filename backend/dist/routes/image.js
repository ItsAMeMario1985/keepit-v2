"use strict";

var _uuid = require("uuid");

const express = require('express');

const {
  check,
  validationResult
} = require('express-validator/check');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const router = express.Router();

var getDirName = require('path').dirname;

const auth = require('../middleware/auth');

const User = require('../models/UserModel');

const Image = require('../models/ImageModel');

const fs = require('fs');

const sharp = require('sharp');

/**
 * @method - POST
 * @description - Get LoggedIn User
 * @param - /image/gettags
 */
router.post('/gettags', auth, async (req, res) => {
  try {
    console.log('get image Tags');
    const user = await User.findById(req.user.id);
    console.log(user);
    res.json({
      labels: ['Brown', 'Photograph', 'White']
    });
  } catch (e) {
    res.send({
      message: 'Error in Fetching user'
    });
  }
});
/**
 * @method - POST
 * @description - Get LoggedIn User
 * @param - /image/upload
 */

router.post('/upload', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    let files = req.body.files;
    let responseIds = [];
    files.forEach(file => {
      let name = (0, _uuid.v4)();
      responseIds.push(name);
      saveImage(file, name);
      saveThumbnail(name);
    });
    console.log(responseIds); // await saveImage(req.body.files[0], name)
    // await saveThumbnail(name)

    res.json({
      ids: responseIds
    });
  } catch (e) {
    res.send({
      message: 'Error in Fetching user'
    });
  }

  function saveImage(file, name) {
    console.log('saveImage');
    var base64result = file.split(',')[1];
    fs.writeFileSync('./src/public/images/' + name + '.webp', base64result, 'base64', function (err) {
      console.log(err);
    });
  }

  function saveThumbnail(name) {
    console.log('saveThumb');
    sharp('./src/public/images/' + name + '.webp').resize(300).toFile('./src/public/images/' + name + '_thumb.webp', (err, info) => {
      console.log(console.log('Error while resizing:', err));
    });
  }
});
module.exports = router;