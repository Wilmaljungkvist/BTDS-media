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
      req.session.flash = { type: 'danger', text: 'Inte inloggad!' }
      res.redirect('/')
    }
  }

router.get('/admin', (req, res, next) => controller.index(req, res, next))
router.post('/login', (req, res, next) => controller.loginAdmin(req, res, next))
router.post('/register', protectedRoute, (req, res, next) => controller.registerUser(req, res, next))
router.get('/register', protectedRoute, (req, res, next) => controller.registerPage(req, res, next))
router.get('/logout', protectedRoute, (req, res, next) => controller.logoutUser(req, res, next))
router.get('/admin/edit-home', protectedRoute, (req, res, next) => controller.renderEditPage(req, res, next))
router.post('/admin/contacts/:id', protectedRoute, (req, res, next) => controller.deleteContact(req, res, next))
router.post('/admin/admins/:id', protectedRoute, (req, res, next) => controller.deleteAdmin(req, res, next))
router.post('/admin/forgot-password', (req, res, next) => controller.forgotPassword(req, res, next))
router.get('/admin/forgot-password', (req, res, next) => controller.getForgotPassword(req, res, next))
router.post('/admin/reset-password/:token', (req, res, next) => controller.resetPassword (req, res, next))
router.get('/admin/reset-password/:token', (req, res, next) => controller.getResetPassword(req, res, next))
router.get('/admins', protectedRoute, (req, res, next) => controller.getAdmins(req, res, next))