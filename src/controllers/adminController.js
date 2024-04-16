/**
 * Home controller.
 *
 * @author Wilma Ljungkvist
 */

/**
 * Encapsulates a controller.
 */
export class AdminController {
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
        const logo = '/img/BDTSMedia.png'
        let type = 'home'
        res.render('home/index', { logo, type })
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
  