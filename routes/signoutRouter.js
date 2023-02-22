
const express = require('express')
const router = express.Router()
const controller = require('../controllers/signoutController')

/**
 * The routes for the signout form.
 */
router
  .get('/signout', controller.get)

module.exports = router
