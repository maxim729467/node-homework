const mongoose = require('mongoose')

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST)
  } catch (error) {
    await mongoose.connection.close()
    throw new Error(`<${error.message}>`)
  }
}

mongoose.connection.on('connected', () => console.log('Database connection successful'))
mongoose.connection.on('error', err => console.log(err.message))
mongoose.connection.on('close', () => console.log('Database connection closed'))

module.exports = {
  connectMongo,
}
