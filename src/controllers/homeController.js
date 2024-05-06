import { PostModel } from '../models/postModel.js'

/**
 * Home controller.
 *
 * @author Wilma Ljungkvist
 */

/**
 * Encapsulates a controller.
 */
export class HomeController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * index GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      const posts = await PostModel.find({ type: 'main'}).sort({ createdAt: -1 })
      const presentation = await PostModel.find({ type: 'mainp'})
      const logo = '/img/BDTSMedia.png'
      let contentType = 'home'
      res.render('home/index', { logo, type: contentType, posts, presentation })
    } catch (error) {
      next(error)
    }
  }
  // TODO: CSS FOR PHONES.

  async information(req, res, next) {
    try {
      const logo = '/img/BDTSMedia.png'
      let type = 'home'
      res.render('information/index', { logo, type })

    } catch (error) {
      next(error)
    }
  }
}
