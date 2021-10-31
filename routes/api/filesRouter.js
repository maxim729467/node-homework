const express = require('express')
const authMiddleware = require('../../middlewares/authMiddleware')
const path = require('path')

const fileDirectory = path.resolve('./public/avatars')
const router = new express.Router()

router.use('/', authMiddleware, express.static(fileDirectory))

module.exports = router
