/**
 * Home routes.
 *
 * @author Wilma Ljungkvist
 */

import express from 'express'
import { PostController } from '../controllers/postController.js'

export const router = express.Router()

const controller = new PostController()

router.get('/admin/posts', (req, res, next) => controller.index(req, res, next))
router.get('/admin/post', (req, res, next) => controller.getCreatePost(req, res, next))
router.post('/admin/post', (req, res, next) => controller.createPost(req, res, next))
router.post('/admin/post/:id', (req, res, next) => controller.deletePost(req, res, next))
router.get('/admin/post/:id/edit', (req, res, next) => controller.getUpdatePost(req, res, next))
router.post('/admin/post/:id/edit', (req, res, next) => controller.updatePost(req, res, next))