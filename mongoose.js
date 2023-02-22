
const mong = require('mongoose')
const DB = 'mongodb://root:secret@127.0.0.1/a?authSource=admin'

/**
 * Exporting the function.
 */
exports.connect = connect

/**
 * It initializes the database.
 *
 * @returns {object} DB connection.
 */
async function connect () {
  mong.connection.on('connected', () => console.log('Running'))
  mong.connection.on('error', () => console.log('ERROR'))
  mong.connection.on('disconnected', () => console.log('DISCONNECT'))

  process.on('SIGNIN', () => {
    mong.connection.close(() => {
      console.log('Connection is closed!')
      process.exit(0)
    })
  })

  return mong.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
