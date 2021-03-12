import { check, validationResult } from 'express-validator/check'
import { Router } from 'express'
import auth from '../middleware/auth'
import User from '../models/UserModel'
import Keepit from '../models/KeepitModel'
import Image from '../models/ImageModel'
import Tag from '../models/TagModel'
import geoCoding from '../services/geoCoding'
const router = new Router()

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
        console.log('// Keeepit - Save - Tags - Check')
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
        console.log('// Keeepit - Save - Images - Check')
      })

      // Geolocation
      if (req.body.geolocation.length > 1) {
        const latitude = req.body.geolocation[0]
        const longitude = req.body.geolocation[1]
        var geoData = await geoCoding(latitude, longitude)
        keepit.city = geoData.city
        keepit.country = geoData.country
        keepit.latitude = latitude
        keepit.longitude = longitude
      }

      user.keepits.push(keepit)
      await keepit.save()
      await user.save()

      res.json(keepit)
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
