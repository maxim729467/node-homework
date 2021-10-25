const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET_KEY
const expiresIn = '4w'

const createToken = (userId) => {
  const id = userId.toString()
  const token = jwt.sign({ id }, SECRET_KEY, { expiresIn })
  return token
}

module.exports = {
  createToken,
}
