/**
 * Home routes.
 *
 * @author Wilma Ljungkvist
 */

import express from 'express'
import { ContactController } from '../controllers/contactController.js'
import { ContactModel } from '../models/contactModel.js'

export const deleteOldContactsMiddleware = async (req, res, next) => {
  try {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    await ContactModel.deleteMany({ createdAt: { $lte: oneWeekAgo } })

    next()
  } catch (error) {
    console.error('Error deleting old contacts:', error)
    next(error)
  }
}


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
router.get('/contacts', protectedRoute, deleteOldContactsMiddleware, (req, res, next) => controller.getContacts(req, res, next))
