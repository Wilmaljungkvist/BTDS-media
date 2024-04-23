/**
 * Home routes.
 *
 * @author Wilma Ljungkvist
 */

import express from 'express'
import { AdminController } from '../controllers/adminController.js'

export const router = express.Router()

const controller = new AdminController()


const protectedRoute = (req, res, next) => {
    if (req.session.user) {
      next()
    } else {
      res.status(404).send('Not Found')
    }
  }

router.get('/admin', (req, res, next) => controller.index(req, res, next))
router.post('/login', (req, res, next) => controller.loginAdmin(req, res, next))
router.post('/register', protectedRoute, (req, res, next) => controller.registerUser(req, res, next))
router.get('/register', protectedRoute, (req, res, next) => controller.registerPage(req, res, next))
router.get('/logout', protectedRoute, (req, res, next) => controller.logoutUser(req, res, next))
router.get('/admin/edit-home', protectedRoute, (req, res, next) => controller.renderEditPage(req, res, next))
router.post('/admin/contacts/:id', protectedRoute, (req, res, next) => controller.deleteContact(req, res, next))
