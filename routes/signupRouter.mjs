import express from 'express'
import controller from '../controllers/register.mjs'
import csrf from 'csurf'

const router = express.Router()
const proc = csrf()

router.use(proc)

/**
 * The routes for the signup form.
 */
router
  .get('/sign-up', controller.get)
  .post('/sign-up', controller.post)

export default router
