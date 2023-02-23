'use strict';

import bcrypt from 'bcrypt';
import User from '../models/userSchema.mjs';

const signinController = {};

/**
 * This method responds to the GET request when the user wants to sign in.
 * Renders the signin page.
 *
 * @param {object} req The Express request.
 * @param {object} res The Express response.
 */
signinController.get = async (req, res) => {
  const message = req.flash('message');

  if (req.session?.isAuth) {
    return res.redirect('/snippets');
  }

  delete req.session.message;
  res.render('signin/signin', { message, csrfTocken: req.csrfToken() });
};

/**
 * This method responds to the POST request when the user wants to submit for authentications for signin.
 * Authenticates the user's email and password and sets session variables.
 *
 * @param {object} req The Express request.
 * @param {object} res The Express response.
 */
signinController.post = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    let message = '';

    if (!user) {
      message = 'The user does not exist!';
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        message = 'The password does not match!';
      } else {
        req.session.isAuth = true;
        req.session.userID = user._id;
        req.session.username = user.name;
        return res.redirect('/snippets');
      }
    }

    await req.flash('message', message);
    res.redirect('/sign-in');
  } catch (error) {
    console.log(error);
  }
};

export default signinController;
