const express = require('express')
const router = express.Router()
const {
  loginUser,
  signupUser,
  logoutUser,
  checkCurrentUser,
  uploadAvatar,
} = require('../../controllers/userControllers')
const authMiddleware = require('../../middlewares/authMiddleware')
const uploadMiddleware = require('../../middlewares/uploadMiddleware')
const {
  validateLogin,
  validateSignup,
} = require('../../middlewares/validationMiddleware')

router.post('/login', validateLogin, loginUser)
router.post('/signup', validateSignup, signupUser)
router.post('/logout', authMiddleware, logoutUser)
router.post('/current', authMiddleware, checkCurrentUser)
router.patch('/avatars', authMiddleware, uploadMiddleware.single('avatar'), uploadAvatar)

module.exports = router
