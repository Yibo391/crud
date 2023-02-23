import express from 'express'
import controller from '../controllers/signinController.mjs'
import csrf from 'csurf'

const router = express.Router()
const proc = csrf()
router.use(proc)

/**
 * The routes for the signin form.
 */
router
  .get('/sign-in', controller.get)
  .post('/sign-in', controller.post)

export default router
