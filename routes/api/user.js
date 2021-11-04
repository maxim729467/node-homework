const express = require('express')
const router = express.Router()
const {
  loginUser,
  signupUser,
  logoutUser,
  checkCurrentUser,
  uploadAvatar,
  verifyUser,
  reverifyUser,
} = require('../../controllers/userControllers')
const authMiddleware = require('../../middlewares/authMiddleware')
const uploadMiddleware = require('../../middlewares/uploadMiddleware')
const {
  validateLogin,
  validateSignup,
  validateReverification,
} = require('../../middlewares/validationMiddleware')

router.post('/login', validateLogin, loginUser)
router.post('/signup', validateSignup, signupUser)
router.post('/logout', authMiddleware, logoutUser)
router.post('/current', authMiddleware, checkCurrentUser)
router.patch('/avatars', authMiddleware, uploadMiddleware.single('avatar'), uploadAvatar)
router.get('/verify/:verificationToken', verifyUser)
router.post('/verify', validateReverification, reverifyUser)

module.exports = router
