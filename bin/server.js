const app = require('../app')
const { connectMongo } = require('../db/connection')

const PORT = process.env.PORT || 3000

connectMongo()
  .then(
    () => {
      app.listen(PORT, () => {
        console.log(`Server running. Use our API on port: ${PORT}`)
      })
    })
  .catch(err => {
    console.log(`Server not running. Error message: ${err.message}`)
    process.exit(1)
  })
