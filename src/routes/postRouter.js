/**
 * Home routes.
 *
 * @author Wilma Ljungkvist
 */

import express from 'express'
import { PostController } from '../controllers/postController.js'

export const router = express.Router()

const controller = new PostController()

router.get('/admin/main/posts', (req, res, next) => controller.index(req, res, next))
router.get('/admin/main/post', (req, res, next) => controller.getCreatePost(req, res, next))
router.post('/admin/main/post', (req, res, next) => controller.createPost(req, res, next))
router.post('/admin/main/post/:id', (req, res, next) => controller.deletePost(req, res, next))