const bcrypt = require('bcrypt')
const User = require('../db/userSchema')
const { createToken } = require('../helpers/tokenUtils')

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
    await user.save()

    return res.status(201).json({ user })
  } catch (error) {
    next(error)
  }
}

const logoutUser = async (req, res, next) => {
  try {
    const id = req.userId

    await User.findByIdAndUpdate(id, { token: null })

    return res.status(204).json({})
  } catch (error) {
    next(error)
  }
}

const checkCurrentUser = async (req, res, next) => {
  try {
    const id = req.userId
    const user = await User.findById(id)

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
}
