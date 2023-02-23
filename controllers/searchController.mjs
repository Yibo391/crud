import Snippet from '../models/snippetSchema.mjs';

const searchController = {}

/**
 * This method it responds to the GET request when
 * the user wants to search for a specific tag.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
searchController.get = async (req, res) => {
  const { term } = req.query
  const termInUpperCase = term.toUpperCase()

  try {
    const result = await Snippet.find({ tag: termInUpperCase })
    const view = (typeof req.session !== 'undefined' && req.session.isAuth) ? 'search/search' : 'search/search2'

    res.render(view, { result })
  } catch (error) {
    console.log(error)
  }
}

export default searchController
