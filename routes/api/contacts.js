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

const {
  validatePostedContact,
  validateUpdatedContact,
  validateFavContact,
} = require('../../middlewares/validationMiddleware')

router.get('/', listContacts)
router.get('/:contactId', getContactById)
router.post('/', [validatePostedContact, addContact])
router.delete('/:contactId', removeContact)
router.patch('/:contactId', [validateUpdatedContact, updateContact])
router.patch(
  '/:contactId/favorite', [validateFavContact, updateFavContact])

module.exports = router
