const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index')

const {
  validatePostedContact,
  validateUpdatedContact
} = require('./validation')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.json({ message: 'success', code: 200, data: { contacts } })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await getContactById(contactId)
    if (contact) {
      return res.json({ message: 'success', code: 200, data: { contact } })
    }
    return res.json({ message: `Contact with ID '${contactId}' is not found`, code: 404 })
  } catch (error) {
    next(error)
  }
})

router.post('/', validatePostedContact, async (req, res, next) => {
  try {
    const contact = await addContact(req.body)
    return res.status(201).json({ message: 'success', code: 201, data: { contact } })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await removeContact(contactId)
    if (contact) {
      return res.json({ message: 'success', code: 200, data: { contact } })
    }
    return res.json({
      message: `Contact with ID '${contactId}' is not found`,
      code: 404,
    })
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId', validateUpdatedContact, async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await updateContact(contactId, req.body)
    if (contact) {
      return res.json({ message: 'success', code: 200, data: { contact } })
    }
    return res.json({
      message: `Contact with ID '${contactId}' is not found`,
      code: 404,
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
