const Joi = require('joi')

const nameSchema = Joi.string().trim().min(3).max(30)
const emailSchema = Joi.string().trim().email()
const phoneSchema = Joi.string()
  .min(10)
  .max(19)
  .pattern(/^[0-9]+$/)
const favSchema = Joi.boolean()
const passwordSchema = Joi.string().trim().alphanum().min(6).max(20)

const postSchema = Joi.object({
  name: nameSchema.required(),
  email: emailSchema.required(),
  phone: phoneSchema.required(),
  favorite: favSchema.optional(),
})

const patchSchema = Joi.object({
  name: nameSchema.optional(),
  email: emailSchema.optional(),
  phone: phoneSchema.optional(),
  favorite: favSchema.optional(),
}).min(1)

const updateFavSchema = Joi.object({
  favorite: favSchema.required(),
}).min(1)

const signinSchema = Joi.object({
  email: emailSchema.required(),
  password: passwordSchema.required(),
}).min(1)

const signupSchema = Joi.object({
  email: emailSchema.required(),
  password: passwordSchema.required(),
}).min(1)

const reverificationSchema = Joi.object({
  email: emailSchema.required(),
}).min(1)

const validate = async (schema, object, res, next) => {
  try {
    await schema.validateAsync(object)
    next()
  } catch (error) {
    next(error)
  }
}

const validatePostedContact = async (req, res, next) => {
  return await validate(postSchema, req.body, res, next)
}

const validateUpdatedContact = async (req, res, next) => {
  return await validate(patchSchema, req.body, res, next)
}

const validateFavContact = async (req, res, next) => {
  return await validate(updateFavSchema, req.body, res, next)
}

const validateLogin = async (req, res, next) => {
  return await validate(signinSchema, req.body, res, next)
}

const validateSignup = async (req, res, next) => {
  return await validate(signupSchema, req.body, res, next)
}

const validateReverification = async (req, res, next) => {
  return await validate(reverificationSchema, req.body, res, next)
}

module.exports = {
  validatePostedContact,
  validateUpdatedContact,
  validateFavContact,
  validateLogin,
  validateSignup,
  validateReverification,
}
