/**
 * Routes for the create form.
 */
import express from 'express'
import controller from '../controllers/addC.mjs'
import csrf from 'csurf'
const router = express.Router()
const proc = csrf()
router.use(proc)

router
  .get('/add-snippet', controller.get)
  .post('/add-snippet', controller.post)

export default router
