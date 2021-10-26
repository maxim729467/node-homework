const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')
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
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null,
  },
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret._id
      delete ret.password
      delete ret.token
      delete ret._id
      delete ret.__v
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
