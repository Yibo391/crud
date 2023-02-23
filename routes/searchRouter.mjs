import express from 'express'
import controller from '../controllers/searchController.mjs'

const router = express.Router()

/**
 * The route for the search bar.
 */
router.get('/search', controller.get)

export default router
