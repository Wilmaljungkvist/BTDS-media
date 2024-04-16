/**
 * Home routes.
 *
 * @author Wilma Ljungkvist
 */

 import express from 'express'
 import { PodcastController } from '../controllers/podcastController.js'
 
 export const router = express.Router()
 
 const controller = new PodcastController()
 
 router.get('/straight-up', (req, res, next) => controller.index(req, res, next))
 router.get('/straight-up/avsnitt', (req, res, next) => controller.straightUpEpisodes(req, res, next))
 router.get('/the-cutting-edge', (req, res, next) => controller.homeCuttingEdge(req, res, next))
 router.get('/the-cutting-edge/avsnitt', (req, res, next) => controller.homeCuttingEdge(req, res, next))
 