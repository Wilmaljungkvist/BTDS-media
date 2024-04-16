import express from 'express'
import { router as homeRouter } from './homeRouter.js'
import { router as podcastRouter } from './podcastRouter.js'
import { router as contactRouter } from './contactRouter.js'
import { router as adminRouter } from './adminRouter.js'

export const router = express.Router()

router.use('/', homeRouter)
router.use('/', podcastRouter)
router.use('/', contactRouter)
router.use('/', adminRouter)

router.use('*', (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
