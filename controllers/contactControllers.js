const { Contact } = require('../db/contactSchema')

const listContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({})
    res.json({ message: 'success', contacts })
  } catch (error) {
    next(error)
  }
}

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await Contact.findById(contactId)
    if (contact) {
      return res.json({ message: 'success', contact })
    }
    throw new Error(`Contact with ID '${contactId}' is not found`)
  } catch (error) {
    next(error)
  }
}

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await Contact.findByIdAndRemove(contactId)
    if (contact) {
      return res.json({ message: 'success', contact })
    }
    throw new Error(`Contact with ID '${contactId}' not found`)
  } catch (error) {
    next(error)
  }
}

const addContact = async (req, res, next) => {
  const { email } = req.body

  try {
    const searchedEmail = await Contact.findOne({ email })

    if (searchedEmail) {
      throw new Error('email exists')
    }

    const contact = new Contact({ ...req.body })
    await contact.save()
    return res.status(201).json({ message: 'success', data: { contact } })
  } catch (error) {
    next(error)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
    if (contact) {
      return res.json({ message: 'success', data: { contact } })
    }
    throw new Error(`Contact with ID '${contactId}' is not found`)
  } catch (error) {
    next(error)
  }
}

const updateFavContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
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
