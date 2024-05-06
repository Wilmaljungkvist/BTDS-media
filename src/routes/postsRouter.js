/**
 * Home routes.
 *
 * @author Wilma Ljungkvist
 */

import express from 'express'
import { PostsController } from '../controllers/postsController.js'

export const router = express.Router()

const controller = new PostsController()

router.get('/admin/main/posts', (req, res, next) => controller.index(req, res, next))
