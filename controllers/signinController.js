'use strict'

const bcrypt = require('bcrypt')
const User = require('../models/userSchema')

const signinController = {}

/**
 * This method responds to the GET request when the user wants to sign in.
 * Renders the signin page.
 *
 * @param {object} req The Express request.
 * @param {object} res The Express response.
 */
signinController.get = async (req, res) => {
  const message = req.flash('message')
  if (typeof req.session === 'undefined' || !req.session.isAuth) {
    delete req.session.message
    res.render('signin/signin', { message, csrfTocken: req.csrfToken() })
  } else {
    res.redirect('/snippets')
  }
}

/**
 * This method responds to the POST request when the user wants to submit for authentications for signin.
 * Authenticates the user's email and password and sets session variables.
 *
 * @param {object} req The Express request.
 * @param {object} res The Express response.
 */
signinController.post = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      await req.flash('message', 'The user does not exist!')
      return res.redirect('/sign-in')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      await req.flash('message', 'The password does not match!')
      return res.redirect('/sign-in')
    }
    req.session.isAuth = true
    req.session.userID = user._id
    req.session.username = user.name
    res.redirect('/snippets')
  } catch (error) {
    console.log(error)
  }
}

module.exports = signinController
