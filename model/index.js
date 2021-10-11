const fs = require('fs/promises')
const shortid = require('shortid')
const path = require('path')

const filePath = path.join(__dirname, 'contacts.json')

const getDataFromDB = async () => {
  const data = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(data)
}

const listContacts = async () => {
  try {
    return await getDataFromDB()
  } catch (error) {
    return error
  }
}

const getContactById = async (id) => {
  try {
    const allContacts = await getDataFromDB()
    const contact = allContacts.find((contact) => contact.id.toString() === id)

    if (contact) {
      return contact
    }
    return null
  } catch (error) {
    return error
  }
}

const removeContact = async (id) => {
  try {
    const allContacts = await getDataFromDB()

    const contact = allContacts.find((contact) => contact.id.toString() === id)
    if (contact) {
      const filteredContacts = allContacts.filter(
        (contact) => contact.id.toString() !== id
      )
      const updatedContacts = JSON.stringify(filteredContacts)
      fs.writeFile(filePath, updatedContacts)
      return contact
    }
    return null
  } catch (error) {
    return error
  }
}

const addContact = async (body) => {
  const newContact = {
    id: shortid.generate(),
    ...body,
  }

  try {
    const allContacts = await getDataFromDB()
    const updatedContacts = [newContact, ...allContacts]
    const parsedContacts = JSON.stringify(updatedContacts)
    await fs.writeFile(filePath, parsedContacts)
    return newContact
  } catch (error) {
    return error
  }
}

const updateContact = async (id, body) => {
  try {
    const allContacts = await getDataFromDB()
    const contact = allContacts.find((contact) => contact.id.toString() === id)

    if (contact) {
      const updatedContact = { ...contact, ...body }
      const index = allContacts.indexOf(contact)
      allContacts.splice(index, 1, updatedContact)
      const updatedContacts = JSON.stringify(allContacts)
      await fs.writeFile(filePath, updatedContacts)
      return updatedContact
    }
    return null
  } catch (error) {
    return error
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
