/**
 * The main entry point to the server.
 */

import express from 'express'
import session from 'express-session'
import MongoDBSession from 'connect-mongodb-session'
import path from 'path'
import logger from 'morgan'
import home from './routes/homeRouter.js'
import signup from './routes/signupRouter.js'
import signin from './routes/signinRouter.js'
import addSnippet from './routes/addRouter.js'
import signout from './routes/signoutRouter.js'
import edit from './routes/editRouter.js'
import search from './routes/searchRouter.js'
import DB from './mongoose.js'
import flash from 'connect-flash'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
DB.connect().then(() => {}).catch((err) => {
  console.log(err)
  process.exit(1)
})

const store = new (MongoDBSession(session))({
  uri: 'mongodb://root:secret@127.0.0.1/a?authSource=admin',
  collection: 'sessions'
})

app.use(session({
  secret: 'o-19&yhXq$0m3&!k7y?mK%O98&rX6&9o-=1q$%',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
    httpOnly: true
  },
  store
}))

app.use(flash())
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))

app.use(home, addSnippet, signout, signup, edit, search, signin)

app.use('*', (req, res, next) => {
  res.status(404)
  res.render('errors/404.ejs')
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render(path.join(__dirname, 'views', 'errors', 'internal.ejs'))
})

app.listen(8000)
