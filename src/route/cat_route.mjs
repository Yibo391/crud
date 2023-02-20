import express from 'express'
import { controller } from '../controller/cat_controller.mjs'

const router = express.Router()
export default router

router.get('/', controller.list)
router.get('/find/:name', controller.find)
router.get('/add', controller.add)
router.get('/delete-all', controller.deleteAll)
