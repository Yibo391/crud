'use strict'

const signupController = {}
const User = require('../models/userSchema')
const validator = require('../models/validator')
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
  try {
    const { name, email, password } = req.body
    let user = await User.findOne({ email })

    if (user) {
      await req.flash('message', 'The user exists!')
      return res.redirect('/sign-up')
    } else if (!validator.isName(name)) {
      await req.flash('message', 'The name should ONLY contain letters!')
      return res.redirect('/sign-up')
    } else if (!validator.isEmail(email)) {
      await req.flash('message', 'The email provided is NOT correct!')
      return res.redirect('/sign-up')
    } else if (!validator.isPassword(password)) {
      await req.flash('message', 'The provided password does NOT fulfill the conditions!')
      return res.redirect('/sign-up')
    } else {
      const hashedPassword = await crypt.hash(password, 10)
      user = new User({
        name,
        email,
        password: hashedPassword
      })

      await user.save()
      await req.flash('message', 'Successful Registration! Sign in now with your credentials.')
      res.redirect('/sign-in')
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = signupController
