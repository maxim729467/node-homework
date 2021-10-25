const jwt = require('jsonwebtoken')
const User = require('../db/userSchema')
const { ObjectId } = require('mongodb')
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET_KEY

const authMiddleware = async (req, res, next) => {
  let token
  const authToken = req.headers.authorization

  if (authToken) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    next(new Error('Unauthorized'))
  }

  try {
    const { id } = jwt.decode(token, SECRET_KEY)
    req.userId = ObjectId(id)
    const user = await User.findById(id)

    if (!user) {
      next(new Error('Unauthorized'))
    }

    if (token !== user.token) {
      next(new Error('Unauthorized'))
    }

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authMiddleware
