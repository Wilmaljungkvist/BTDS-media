import { PostModel } from '../models/postModel.js'

/**
 * Encapsulates a controller.
 */
export class HomeController {
  /**
   * Renders the home page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      const posts = await PostModel.find({ type: 'main' }).sort({ createdAt: -1 })
      const presentation = await PostModel.find({ type: 'mainp' })
      const logo = '/img/BDTSMedia.png'
      const contentType = 'home'
      res.render('home/index', { logo, type: contentType, posts, presentation })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Renders the information page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async information (req, res, next) {
    try {
      const logo = '/img/BDTSMedia.png'
      const type = 'home'
      res.render('information/index', { logo, type })
    } catch (error) {
      next(error)
    }
  }
}
