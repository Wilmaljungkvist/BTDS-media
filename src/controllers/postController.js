import { PostModel } from '../models/postModel.js'

export class PostController {
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
        const posts = await PostModel.find({ type: 'main'})
        const logo = '/img/IMG_8196.PNG'
        const contentType = 'main'
        res.render('posts/mainPage', { logo, type: contentType, posts })
      } catch (error) {
        next(error)
      }
    }

    async createPost(req, res, next) {
              const post = new PostModel({
                header: req.body.header,
                text: req.body.text,
                creator: req.session.user.username,
                type: 'main'
              })
      
              await post.save()
      
              req.session.flash = { type: 'success', text: 'The Post was created successfully' }
              res.redirect('/admin/main/posts')
    }

    async getCreatePost(req, res, next) {
      try {
        const logo = '/img/IMG_8196.PNG'
        const type = 'main'
        res.render('posts/createMainPagePosts', { logo, type })
      } catch (error) {
        next(error)
      }
    }
  }
  