const bcrypt = require('bcrypt')
const User = require('../db/userSchema')
const fs = require('fs/promises')
const path = require('path')
const { createToken } = require('../helpers/tokenUtils')
const UploadService = require('../helpers/uploadService')

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error('Email or password is wrong')
    }

    if (!await bcrypt.compare(password, user.password)) {
      throw new Error('Email or password is wrong')
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
      throw new Error('Email in use')
    }
    const user = new User({ email, password })
    const newUser = await user.save()

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

module.exports = {
  loginUser,
  signupUser,
  logoutUser,
  checkCurrentUser,
  uploadAvatar,
}
