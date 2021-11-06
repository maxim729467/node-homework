const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const { errorHandler } = require('./helpers/errorHandlers')
require('dotenv').config()

const contactsRouter = require('./routes/api/contacts')
const authRouter = require('./routes/api/user')
const filesRouter = require('./routes/api/filesRouter')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/users', authRouter)
app.use('/api/contacts', contactsRouter)
app.use('/avatars', filesRouter)

app.use(errorHandler)

module.exports = app
