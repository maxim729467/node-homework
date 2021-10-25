const express = require('express')
const router = express.Router()
const {
  loginUser,
  signupUser,
  logoutUser,
  checkCurrentUser,
} = require('../../controllers/userControllers')
const authMiddleware = require('../../middlewares/authMiddleware')

const {
  validateLogin,
  validateSignup,
} = require('../../middlewares/validationMiddleware')

router.post('/login', validateLogin, loginUser)
router.post('/signup', validateSignup, signupUser)
router.post('/logout', authMiddleware, logoutUser)
router.post('/current', authMiddleware, checkCurrentUser)

module.exports = router
