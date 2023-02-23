import express from 'express'
import controller from '../controllers/editController.mjs'
import csrf from 'csurf'

const router = express.Router()
const proc = csrf()
router.use(proc)

/**
 * The routes for the edit form.
 */
router
  .get('/edit/:id', controller.get)
  .post('/edit/:id', controller.post)

export default router
