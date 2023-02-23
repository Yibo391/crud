import Snippet from '../models/snippetSchema.mjs'

const homeController = {}

homeController.h = async (req, res) => {
  try {
    const result = await Snippet.find()
    const isAuth = req.session?.isAuth || false
    const viewName = isAuth ? 'home/panel' : 'home/index'

    res.render(viewName, { result })
  } catch (error) {
    console.log(error)
  }
}

homeController.get = async (req, res) => {
  try {
    const id = req.params.id
    const isAuth = req.session?.isAuth || false
    const userID = req.session?.userID

    const errorPages = {
      403: 'forbidden/forbidden',
      404: 'notfound/notfound'
    }

    const snipp = await Snippet.findById(id)

    if (!snipp) {
      res.status(404)
      return res.render(errorPages[404])
    }

    if (!isAuth) {
      res.status(403)
      return res.render(errorPages[403])
    }

    const viewName = userID.equals(snipp.ownerID) ? 'home/snippet' : 'home/snippet2'
    res.render(viewName, { snippet: snipp })
  } catch (error) {
    console.log(error)
  }
}

homeController.delete = async (req, res) => {
  try {
    console.log('new1')
    const id = req.params.id
    const userID = req.session?.userID

    const errorPages = {
      403: 'forbidden/forbidden',
      404: 'notfound/notfound'
    }

    const snippet = await Snippet.findById(id)

    if (!snippet) {
      res.status(404)
      return res.render(errorPages[404])
    }

    if (!userID.equals(snippet.ownerID)) {
      res.status(403)
      return res.render(errorPages[403])
    }

    await snippet.delete()
    res.json({ redirect: '/snippets' })
  } catch (error) {
    console.log(error)
  }
}

export default homeController
