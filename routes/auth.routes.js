const Router = require('express')
const { check } = require('express-validator')
const authMiddleware = require('../middlewares/auth')
const AuthController = require('../controllers/AuthController')

const router = new Router()

router.post(
  '/register',
  [
    check('login', 'Login must be longer than 2 and shorter than 12').isLength({ min: 2, max: 12 }),
    check('password', 'Password must be longer than 3 and shorter than 12').isLength({ min: 3, max: 12 }),
  ],
  AuthController.register
)
router.post(
  '/login',
  [
    check('login', 'Login must be longer than 2 and shorter than 12').isLength({ min: 2, max: 12 }),
    check('password', 'Password must be longer than 3 and shorter than 12').isLength({ min: 3, max: 12 }),
  ],
  AuthController.login
)
router.get('/auth', authMiddleware, AuthController.authenticateUser)

module.exports = router
