const express = require('express')
const { check, validationResult } = require('express-validator/check')
const router = express.Router()
const auth = require('../middleware/auth')

const User = require('../models/UserModel')
const Keepit = require('../models/KeepitModel')
const Image = require('../models/ImageModel')
const Tag = require('../models/TagModel')

/**
 * @method - POST
 * @description - Add keepit
 * @param - /keepit/add
 */

router.post(
  '/save',
  [
    check('images', 'No given image').isLength({
      min: 1,
    }),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      })
    }

    try {
      // Get User
      const user = await User.findById(req.user.id)

      // New Keepit
      const keepit = new Keepit({
        submitted: req.body.submitted,
        rating: req.body.rating,
        userId: user._id,
      })

      // Tags
      const tags = req.body.tags
        ? req.body.tags
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
      const images = req.body.images
      images.forEach((image) => {
        let newImage = new Image({
          path: '/images/' + image + '.webp',
          id: image,
          keepitId: keepit._id,
        })
        keepit.images.push(newImage)
        newImage.save()
      })

      user.keepits.push(keepit)
      await keepit.save()
      await user.save()

      res.json(req.body)
    } catch (e) {
      res.send({ message: 'Error: ' + e })
    }
  }
)

/**
 * @method - POST
 * @description - Add keepit
 * @param - /keepit/getAll
 */

router.get('/getAll', auth, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  try {
    const user = await User.findById(req.user.id)
    const keepits = await Keepit.find({ userId: user._id })
      .populate('images tags')
      .exec(function (err, keepitArr) {
        if (err) return handleError(err)
        var response = []
        keepitArr.forEach((kt) => {
          response.push(kt)
        })
        res.json(response)
      })
  } catch (e) {
    res.send({ message: 'Error: ' + e })
  }
})

module.exports = router
