/**
 * Home routes.
 *
 * @author Wilma Ljungkvist
 */

import express from 'express'
import { AdminController } from '../controllers/adminController.js'

export const router = express.Router()

const controller = new AdminController()

router.get('/admin', (req, res, next) => controller.index(req, res, next))
router.post('/login', (req, res, next) => controller.loginAdmin(req, res, next))
