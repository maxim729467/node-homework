const Joi = require('joi')

const nameSchema = Joi.string().trim().min(3).max(30)
const emailSchema = Joi.string().trim().email()
const phoneSchema = Joi.string().min(10).max(12).pattern(/^[0-9]+$/)

const postSchema = Joi.object({
  name: nameSchema.required(),
  email: emailSchema.required(),
  phone: phoneSchema.required(),
})

const patchSchema = Joi.object({
  name: nameSchema.optional(),
  email: emailSchema.optional(),
  phone: phoneSchema.optional(),
}).min(1)

const validate = async (schema, object, res, next) => {
  try {
    await schema.validateAsync(object)
    next()
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message })
  }
}

const validatePostedContact = async (req, res, next) => {
  return await validate(postSchema, req.body, res, next)
}

const validateUpdatedContact = async (req, res, next) => {
  return await validate(patchSchema, req.body, res, next)
}

module.exports = {
  validatePostedContact,
  validateUpdatedContact
}
