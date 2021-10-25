const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavContact
} = require('../../controllers/contactControllers')

const authMiddleware = require('../../middlewares/authMiddleware')

const {
  validatePostedContact,
  validateUpdatedContact,
  validateFavContact,
} = require('../../middlewares/validationMiddleware')

router.get('/', authMiddleware, listContacts)
router.get('/:contactId', authMiddleware, getContactById)
router.post('/', authMiddleware, validatePostedContact, addContact)
router.delete('/:contactId', authMiddleware, removeContact)
router.patch('/:contactId', authMiddleware, validateUpdatedContact, updateContact)
router.patch(
  '/:contactId/favorite', authMiddleware, validateFavContact, updateFavContact)

module.exports = router
