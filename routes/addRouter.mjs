import express from 'express'
import controller from '../controllers/addController.mjs'
import csrf from 'csurf'
const router = express.Router()
const proc = csrf()
router.use(proc)

/**

The routes for the create form.
 */
router
  .get('/add-snippet', controller.get)
  .post('/add-snippet', controller.post)
export default router
