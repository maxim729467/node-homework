const bcrypt = require('bcrypt')
const sha246 = require('sha256')
const User = require('../db/userSchema')
const path = require('path')
const { createToken } = require('../helpers/tokenUtils')
const { VerificationEmailService } = require('../helpers/emailService')
const {
  NotAuthorizedError,
  ConflictError,
  NotFoundError,
  CustomError
} = require('../helpers/errorHandlers')
const UploadService = require('../helpers/uploadService')
require('dotenv').config()
const VERIFICATION_SECRET = process.env.VERIFICATION_SECRET

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      next(new NotAuthorizedError('Email or password is wrong'))
      return
    }

    if (!user.verify) {
      next(new NotAuthorizedError('Please verify your email to proceed'))
      return
    }

    if (!await bcrypt.compare(password, user.password)) {
      next(new NotAuthorizedError('Email or password is wrong'))
      return
    }

    const userId = user._id
    const token = createToken(userId)
    await User.updateOne({ _id: userId }, { token })

    return res.json({ token, user })
  } catch (error) {
    next(error)
  }
}

const signupUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const creds = await User.findOne({ email })

    if (creds) {
      next(new ConflictError('Email in use'))
      return
    }
    const verifyToken = sha246(email + VERIFICATION_SECRET)
    const user = new User({ email, password, verifyToken })
    const newUser = await user.save()

    const verificationEmailService = new VerificationEmailService(email, verifyToken)
    await verificationEmailService.sendVerificationEmail()
    return res.status(201).json({ newUser })
  } catch (error) {
    next(error)
  }
}

const logoutUser = async (req, res, next) => {
  try {
    const { _id } = req.user

    await User.findByIdAndUpdate(_id, { token: null })

    return res.status(204).json({})
  } catch (error) {
    next(error)
  }
}

const checkCurrentUser = async (req, res, next) => {
  try {
    const { _id } = req.user
    const user = await User.findById(_id)

    return res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
}

const uploadAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user
    const file = req.file
    const dest = path.resolve('./public/avatars')
    const uploadService = new UploadService(file, dest)
    await uploadService.process()

    const user = await User.findByIdAndUpdate(_id, { avatarURL: file.filename }, { new: true })
    return res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
}

const verifyUser = async (req, res, next) => {
  const { verificationToken } = req.params
  try {
    const user = await User.findOne({ verifyToken: verificationToken, verify: false })

    if (!user) {
      next(new NotFoundError('User not found'))
      return
    }
    const _id = user._id
    await User.findOneAndUpdate({ _id }, { verifyToken: null, verify: true })
    return res.status(200).json({ message: 'Verification successful' })
  } catch (error) {
    next(error)
  }
}

const reverifyUser = async (req, res, next) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })

    if (!user) {
      next(new NotFoundError('User not found'))
      return
    }

    if (user.verify) {
      next(new CustomError('Verification has already been passed'))
      return
    }
    const _id = user._id
    const verifyToken = sha246(email + VERIFICATION_SECRET)
    await User.findOneAndUpdate({ _id }, { verifyToken })

    const verificationEmailService = new VerificationEmailService(email, verifyToken)
    await verificationEmailService.sendVerificationEmail()
    return res.status(200).json({ message: 'Verification email sent' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  loginUser,
  signupUser,
  logoutUser,
  checkCurrentUser,
  uploadAvatar,
  verifyUser,
  reverifyUser,
}
