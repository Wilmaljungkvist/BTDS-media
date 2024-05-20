import { PostModel } from '../models/postModel.js'
/**
 *
 */
export class PodcastController {
  /**
   * Renders the page for straight up.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      const posts = await PostModel.find({ type: 'straight' }).sort({ createdAt: -1 })
      const presentation = await PostModel.find({ type: 'straightp' })
      const logo = '/img/IMG_8196.PNG'
      const type = 'straight-up'
      res.render('straightUp/index', { logo, type, posts, presentation })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Renders the page for straight up episodes.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async straightUpEpisodes (req, res, next) {
    try {
      const logo = '/img/IMG_8196.PNG'
      const type = 'straight-up'
      res.render('straightUp/episodes', { logo, type })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Renders the page for The cutting edge.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async homeCuttingEdge (req, res, next) {
    try {
      const logo = '/img/Cuttingedge.png'
      const type = 'the-cutting-edge'
      const posts = await PostModel.find({ type: 'cutting' }).sort({ createdAt: -1 })
      const presentation = await PostModel.find({ type: 'cuttingp' })
      res.render('cuttingEdge/index', { logo, type, posts, presentation })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Renders the page for The cutting edge episodes.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async cuttingEdgeEpisodes (req, res, next) {
    try {
      const logo = '/img/Cuttingedge.png'
      const type = 'the-cutting-edge'
      res.render('cuttingEdge/episodes', { logo, type })
    } catch (error) {
      next(error)
    }
  }
}
