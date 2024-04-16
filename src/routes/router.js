import express from 'express'
import { router as homeRouter } from './homeRouter.js'
import { router as podcastRouter } from './podcastRouter.js'
import { router as contactRouter } from './contactRouter.js'

export const router = express.Router()

router.use('/', homeRouter)
router.use('/', podcastRouter)
router.use('/', contactRouter)

router.use('*', (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
