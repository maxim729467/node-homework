const { v4: uuidv4 } = require('uuid')
const multer = require('multer')
const path = require('path')
const maxSize = 2000000

const fileDirectory = path.resolve('./tmp')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, fileDirectory)
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split('.')
    const fileName = `${uuidv4()}.${extension}`
    cb(null, fileName)
  },
})

const limits = {
  fileSize: maxSize
}

const uploadMiddleware = multer({ storage, limits })

module.exports = uploadMiddleware
