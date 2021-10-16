const mongoose = require('mongoose')
const { Schema } = mongoose

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    index: true
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, {
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id
      delete ret._id
    }
  }
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = {
  Contact
}
