'use strict'

const addController = {}
const Snippet = require('../models/snippetSchema')

/**
 * This method responds to the GET request when
 * the user wants to create a snippet.
 * It renders the create form.
 *
 * @param {object} req The Express request.
 * @param {object} res The Express response.
 */
addController.get = async (req, res) => {
  try {
    if (typeof req.session === 'undefined' || !req.session.isAuth) {
      res.status(403)
      return res.render('forbidden/forbidden')
    }

    const message = req.flash('message')
    delete req.session.message

    const data = {
      title: 'Add a new snippet',
      message,
      user: req.session.username,
      tags: await Snippet.distinct('tag'),
      csrfTocken: req.csrfToken()
    }

    res.render('add/add', data)
  } catch (error) {
    console.log(error)
  }
}

/**
 * This method responds to the Post request when
 * the user wants to create a snippet.
 * It creates a snippet and saves it in the DB.
 *
 * @param {object} req The Express request.
 * @param {object} res The Express response.
 */
addController.post = async (req, res) => {
  console.log(1)
  try {
    if (typeof req.session === 'undefined' || !req.session.isAuth) {
      res.status(403)
      return await res.render('forbidden/forbidden')
    }

    const { tag, title, snippet } = req.body
    const author = req.session.username
    const ownerID = req.session.userID
    const id = Date.now()

    const snippetNEW = new Snippet({
      tag,
      title,
      author,
      snippet,
      ownerID,
      id,
      created_at: Date.now(),
      updated_at: Date.now()
    })

    await snippetNEW.save()
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
}

module.exports = addController
