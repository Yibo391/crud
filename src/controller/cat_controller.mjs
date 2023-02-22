import { model as catModel } from './../model/cat.mjs'

export const controller = {}

controller.list = async (req, res) => {
  console.log('# List all cats')
  const data = {
    cats: await catModel.listAll()
  }
  res.render('read', data)
}

controller.find = async (req, res) => {
  const name = req.params.name
  console.log(`# Find a cat named: ${name}`)
  const data = {
    cats: await catModel.findByName(name)
  }
  res.render('read', data)
}

controller.add = async (req, res) => {
  console.log('# Add a cat')
  await catModel.add()
  res.redirect('/cat')
}

controller.deleteAll = async (req, res) => {
  console.log('# Delete all cats')
  await catModel.deleteAll()
  res.redirect('/cat')
}
