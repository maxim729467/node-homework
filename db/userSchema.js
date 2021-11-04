const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const saltRounds = 10

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    index: true,
  },
  avatarURL: {
    type: String,
    default: function() {
      return gravatar.url(this.email, { s: '250' }, true)
    }
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret._id
      delete ret.password
      delete ret.token
      delete ret._id
      delete ret.__v
      delete ret.verifyToken
    }
  }
})

userSchema.pre('save', async function() {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, saltRounds)
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
