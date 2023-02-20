import { config } from 'dotenv-safe'
import mongoose from 'mongoose'

config()

mongoose.Promise = global.Promise

const uri = process.env.MONGO_URI
console.log('Connecting to MongoDB:', uri)
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 3000
}).then(() => {
  console.log('Connected to MongoDB')
}).catch((err) => {
  console.log('Failed to connect to MongoDB:', err.message)
})

const Schema = mongoose.Schema

const catSchema = new Schema({
  name: String
})

catSchema.methods.speak = function () {
  const greeting = this.name
    ? 'Meow name is ' + this.name
    : "I don't have a name"
  console.log(greeting)
  return greeting
}

const Cat = mongoose.model('Cat', catSchema)

export const model = {}

model.listAll = async () => {
  console.log('Reading cats from the database...')
  const kittens = await Cat.find()
  console.log(JSON.stringify(kittens, null, 2))
  return kittens
}

model.deleteAll = async () => {
  await Cat.deleteMany()
  console.log('All cats were deleted')
}

model.add = async () => {
  const rand = Math.floor(Math.random() * Math.floor(10))
  const kitty = new Cat({
    name: 'Zildjian ' + rand
  })

  await kitty.save()
  console.log('A cat was added - ' + kitty.speak())
}

model.findByName = async (name) => {
  return await Cat.find({
    name
  })
}
