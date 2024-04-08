/**
 * Home controller.
 *
 * @author Wilma Ljungkvist
 */

/**
 * Encapsulates a controller.
 */
 export class PodcastController {
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
        const logo = 'Straight up'
        let type = 'straight-up'
        res.render('home/index', { logo, type })
      } catch (error) {
        next(error)
      }
    }


    async homeCuttingEdge (req, res, next) {
        try {
        const logo = 'The Cutting Edge'
        let type = 'cutting-edge'
        res.render('home/index', { logo, type })
      } catch (error) {
        next(error)
      }
    }
  }
  