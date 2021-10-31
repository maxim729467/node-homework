const Contact = require('../db/contactSchema')

const listContacts = async (req, res, next) => {
  const owner = req.user._id
  try {
    const contacts = await Contact.find({ owner })
    res.json({ message: 'success', contacts })
  } catch (error) {
    next(error)
  }
}

const getContactById = async (req, res, next) => {
  const owner = req.user._id

  try {
    const { contactId } = req.params
    const contact = await Contact.findOne({ _id: contactId, owner }).exec()
    if (contact) {
      return res.json({ message: 'success', contact })
    }
    throw new Error(`Contact with ID '${contactId}' is not found`)
  } catch (error) {
    next(error)
  }
}

const removeContact = async (req, res, next) => {
  const { contactId } = req.params
  const owner = req.user._id

  try {
    const contact = await Contact.findOneAndRemove({ _id: contactId, owner }).exec()
    if (contact) {
      return res.json({ message: 'success', contact })
    }
    throw new Error(`Contact with ID '${contactId}' not found`)
  } catch (error) {
    next(error)
  }
}

const addContact = async (req, res, next) => {
  const owner = req.user._id

  try {
    const contact = new Contact({ ...req.body, owner })
    await contact.save()
    return res.status(201).json({ message: 'success', data: { contact } })
  } catch (error) {
    next(error)
  }
}

const updateContact = async (req, res, next) => {
  const owner = req.user._id
  try {
    const { contactId } = req.params
    const contact = await Contact.findOneAndUpdate({ _id: contactId, owner }, req.body, { new: true }).exec()
    if (contact) {
      return res.json({ message: 'success', data: { contact } })
    }
    throw new Error(`Contact with ID '${contactId}' is not found`)
  } catch (error) {
    next(error)
  }
}

const updateFavContact = async (req, res, next) => {
  const owner = req.user._id
  try {
    const { contactId } = req.params
    const contact = await Contact.findOneAndUpdate({ _id: contactId, owner }, req.body, { new: true }).exec()
    if (contact) {
      return res.json({ message: 'success', data: { contact } })
    }
    throw new Error(`contact with ID '${contactId}' is not found`)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavContact,
}
