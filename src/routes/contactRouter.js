/**
 * Home routes.
 *
 * @author Wilma Ljungkvist
 */

import express from 'express'
import { ContactController } from '../controllers/contactController.js'

export const router = express.Router()

const controller = new ContactController()

const protectedRoute = (req, res, next) => {
    if (req.session.user) {
      next()
    } else {
      req.session.flash = { type: 'danger', text: 'You are not logged in' }
      res.redirect('/')
    }
  }

router.post('/send-form', (req, res, next) => controller.sendForm(req, res, next))
router.get('/contacts', protectedRoute, (req, res, next) => controller.getContacts(req, res, next))
