'use strict'

const signoutController = {}

/**
 
Responds to the GET request when the user wants to sign out.
 *
@param {object} req The Express request.
@param {object} res The Express response.
 */
signoutController.get = async (req, res) => {
  try {
    req.session.destroy()
    res.redirect('/sign-in')
  } catch (error) {
    console.log(error)
  }
}
export default signoutController
