import express from 'express'
import controller from '../controllers/homeController.mjs'

const router = express.Router()

/**
 * The routes for the home.
 */
router
  .get('/', controller.h)
  .get('/snippets', controller.h)
  .get('/snippets/:id', controller.get)
  .delete('/snippets/:id', controller.delete)

export default router
