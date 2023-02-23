import express from 'express'
import controller from '../controllers/homeController.mjs'

const router = express.Router()

/**
 * The routes for the home.
 */
router
  .get('/', controller.index)
  .get('/snippets', controller.index)
  .get('/snippets/:id', controller.indexGetSnippet)
  .delete('/snippets/:id', controller.indexDeleteSnippet)

export default router
