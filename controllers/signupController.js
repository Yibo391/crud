'use strict'

const signupController = {}
const User = require('../models/userSchema')
const validator = require('./validator')
const crypt = require('bcrypt')

signupController.get = async (req, res) => {
  const message = req.flash('message')
  delete req.session.message

  if (typeof req.session === 'undefined' || !req.session.isAuth) {
    delete req.session.message
    res.render('signup/signup', { message, csrfTocken: req.csrfToken() })
  } else {
    res.redirect('/snippets')
  }
}

signupController.post = async (req, res) => {
  const { name, email, password } = req.body
  const validationErrors = []

  if (!validator.isName(name)) {
    validationErrors.push('The name should ONLY contain letters!')
  }

  if (!validator.isEmail(email)) {
    validationErrors.push('The email provided is NOT correct!')
  }

  if (!validator.isPassword(password)) {
    validationErrors.push('The provided password does NOT fulfill the conditions!')
  }

  try {
    const user = await User.findOne({ email })
    if (user) {
      validationErrors.push('The user exists!')
    }

    if (validationErrors.length > 0) {
      await req.flash('message', validationErrors.join('\n'))
      return res.redirect('/sign-up')
    }

    const hashedPassword = await crypt.hash(password, 10)
    const newUser = new User({ name, email, password: hashedPassword })
    await newUser.save()
    await req.flash('message', 'Successful Registration! Sign in now with your credentials.')
    res.redirect('/sign-in')
  } catch (error) {
    console.log(error)
  }
}


module.exports = signupController
