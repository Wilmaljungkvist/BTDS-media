/**
 * Home routes.
 *
 * @author Wilma Ljungkvist
 */

import express from 'express'
import { ContactController } from '../controllers/contactController.js'

export const router = express.Router()

const controller = new ContactController()

router.post('/send-form', (req, res, next) => controller.sendForm(req, res, next))
