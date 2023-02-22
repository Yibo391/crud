import express from 'express'
import logger from 'morgan'
import catRoute from './route/cat_route.mjs'

const app = express()

app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World!\n')
})

app.use('/cat', catRoute)

export default (port = 3000) => {
  app.listen(port, () => {
    console.log(`Listening at port ${port}`)
  })
}
