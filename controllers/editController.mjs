import Snippet from '../models/snippetSchema.mjs'

const editController = {}

/**
 * Render the snippet edit form.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @returns {Promise<void>}
 */
editController.get = async (req, res) => {
  try {
    const id = req.params.id
    const snippet = await Snippet.findById(id)
    const { session } = req
    const isAuthenticated = Boolean(session) && Boolean(session.isAuth)

    if (isAuthenticated && session.userID.equals(snippet.ownerID)) {
      res.render('edit/edit', {
        snippet,
        csrfTocken: req.csrfToken()
      })
    } else {
      res.status(403)
      await res.render('forbidden/forbidden')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
}

/**
 * Update the snippet in the database.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @returns {Promise<void>}
 */
editController.post = async (req, res) => {
  try {
    const id = req.params.id
    const snippet = await Snippet.findById(id)
    const { session } = req
    const isAuthenticated = Boolean(session) && Boolean(session.isAuth)

    if (isAuthenticated && session.userID.equals(snippet.ownerID)) {
      await Snippet.findByIdAndUpdate(id, req.body)
      res.redirect('/')
    } else {
      res.status(403)
      await res.render('forbidden/forbidden')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
}

export default editController
