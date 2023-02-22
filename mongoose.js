const mongoose = require('mongoose')

const DB_URL = 'mongodb://root:secret@127.0.0.1/a?authSource=admin'

const db = mongoose.connection

db.on('connected', () => console.log('MongoDB connected!'))
db.on('error', (error) => console.error('MongoDB connection error:', error))
db.on('disconnected', () => console.log('MongoDB disconnected!'))

process.on('SIGINT', () => {
  db.close(() => {
    console.log('MongoDB connection closed!')
    process.exit(0)
  })
})

exports.connect = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB connection successful!')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}
