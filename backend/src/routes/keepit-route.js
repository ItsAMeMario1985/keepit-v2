import { check, validationResult } from 'express-validator/check'
import { Router } from 'express'
import auth from '../middleware/auth'
import keepitController from '../controllers/keepit-controller'
const router = new Router()

/**
 * @method - GET
 * @description - Add keepit
 * @param - /keepit/getAll
 */

router.get('/getAll', auth, keepitController.getAll)

/**
 * @method - POST
 * @description - Add keepit
 * @param - /keepit/add
 */

router.post('/save', auth, function (req, res) {
  console.log('save route')
  keepitController.save(req, res)
})

/**
 * @method - DELETE
 * @description - Delete keepit
 * @param - /keepit/delete:id
 */

router.delete('/delete/:id', auth, function (req, res) {
  keepitController.deleteOne(req, res)
})

module.exports = router
