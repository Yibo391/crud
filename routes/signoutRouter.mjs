import express from 'express'
import controller from '../controllers/signoutController.mjs'

const router = express.Router()

/**
 * The routes for the signout form.
 */
router.get('/signout', controller.get)

export default router
