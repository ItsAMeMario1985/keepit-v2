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
 * @param - /image/add
 */
router.post('/add', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(user);
    res.json(user);
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

function saveImage(file, name) {
  var base64result = file.split(',')[1];
  fs.writeFileSync('./public/images/' + name + '.webp', base64result, 'base64', function (err) {
    console.log(err);
  });
}

function saveThumbnail(name) {
  sharp('./public/images/' + name + '.webp').resize(300).toFile('./public/images/' + name + '_thumbnail.webp', (err, info) => {
    console.log(console.log('Error while resizing:', err));
  });
}

router.post('/upload', auth, async (req, res) => {
  console.log('__________________  RUN  _______________________________');

  try {
    const user = await User.findById(req.user.id);
    var name = (0, _uuid.v4)();
    saveImage(req.body.files[0], name);
    saveThumbnail(name); // fs.writeFileSync(
    //   './public/images/' + name + '.webp',
    //   base64result,
    //   'base64',
    //   function (err) {
    //     console.log(err)
    //   }
    // )

    res.json(user);
  } catch (e) {
    res.send({
      message: 'Error in Fetching user'
    });
  }

  console.log('__________________  END  _______________________________');
});
module.exports = router;