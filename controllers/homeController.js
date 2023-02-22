'use strict'

const Snippet = require('../models/snippetSchema')

const homeController = {}

homeController.index = async (req, res) => {
  try {
    const result = await Snippet.find()
    const isAuth = req.session?.isAuth || false

    if (isAuth) {
      res.render('home/panel', { result })
    } else {
      res.render('home/index', { result })
    }
  } catch (error) {
    console.log(error)
  }
}

homeController.indexGetSnippet = async (req, res) => {
  try {
    const id = req.params.id
    const isAuth = req.session?.isAuth || false
    const userID = req.session?.userID

    if (!isAuth) {
      res.status(403)
      return res.render('forbidden/forbidden')
    }

    const snipp = await Snippet.findById(id)

    if (!snipp) {
      res.status(404)
      return res.render('notfound/notfound')
    }

    if (userID.equals(snipp.ownerID)) {
      res.render('home/snippet', { snippet: snipp })
    } else {
      res.render('home/snippet2', { snippet: snipp })
    }
  } catch (error) {
    console.log(error)
  }
}

homeController.indexDeleteSnippet = async (req, res) => {
  try {
    const id = req.params.id
    const isAuth = req.session?.isAuth || false
    const userID = req.session?.userID

    if (!isAuth) {
      res.status(403)
      return res.render('forbidden/forbidden')
    }

    const snippet = await Snippet.findById(id)

    if (!snippet) {
      res.status(404)
      return res.render('notfound/notfound')
    }

    if (userID.equals(snippet.ownerID)) {
      await snippet.delete()
      res.json({ redirect: '/snippets' })
    } else {
      res.status(403)
      return res.render('forbidden/forbidden')
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = homeController
