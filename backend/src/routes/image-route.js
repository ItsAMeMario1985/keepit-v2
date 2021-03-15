import { Router } from 'express'
import auth from '../middleware/auth'
import imageController from '../controllers/image-controller'
const router = new Router()

/**
 * @method - POST
 * @description - Get Tags from VisionApi/DB
 * @param - /image/getTags
 */

router.post('/gettags', auth, imageController.getTags)

/**
 * @method - POST
 * @description - Upload Image
 * @param - /image/upload
 */

router.post('/upload', auth, function (req, res) {
  console.log('// Upload route')
  imageController.upload(req, res)
})

module.exports = router
