export class PodcastController {
    /**
     * Renders a view and sends the rendered HTML string as an HTTP response.
     * index GET.
     *
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     */
    async index(req, res, next) {
      try {
        const logo = '/img/IMG_8196.PNG'
        const type = 'admin'
        res.render('posts/mainPage', { logo, type })
      } catch (error) {
        next(error)
      }
    }
  }
  