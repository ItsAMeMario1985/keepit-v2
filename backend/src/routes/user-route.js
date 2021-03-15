import { Router } from 'express'
import { check, validationResult } from 'express-validator'
import userController from '../controllers/user-controller'
const router = new Router()

/**
 * @method - POST
 * @param - /login
 * @description - User login
 */

router.post('/login', userController.login)

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
  '/signup',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a valid password (min 6 characters)'
    ).isLength({
      min: 6,
    }),
  ],
  userController.signup
)

module.exports = router
