/**
 * Home routes.
 *
 * @author Wilma Ljungkvist
 */

import express from 'express'
import { PostController } from '../controllers/postController.js'

export const router = express.Router()

const controller = new PostController()

const protectedRoute = (req, res, next) => {
    if (req.session.user) {
      next()
    } else {
      req.session.flash = { type: 'danger', text: 'Inte inloggad!' }
      res.redirect('/')
    }
  }

router.get('/admin/posts', protectedRoute, (req, res, next) => controller.index(req, res, next))
router.get('/admin/post', protectedRoute, (req, res, next) => controller.getCreatePost(req, res, next))
router.post('/admin/post', protectedRoute, (req, res, next) => controller.createPost(req, res, next))
router.post('/admin/post/:id', protectedRoute, (req, res, next) => controller.deletePost(req, res, next))
router.get('/admin/post/:id/edit', protectedRoute, (req, res, next) => controller.getUpdatePost(req, res, next))
router.post('/admin/post/:id/edit', protectedRoute, (req, res, next) => controller.updatePost(req, res, next))