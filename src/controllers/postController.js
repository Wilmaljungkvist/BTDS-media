import { PostModel } from '../models/postModel.js'
import xss from 'xss'

/**
 * Encapsulates a controller.
 */
export class PostController {
  /**
   * Renders the page with all the posts with the selected post type.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      let posts
      if (req.query.postType) {
        posts = await PostModel.find({ type: req.query.postType }).sort({ createdAt: -1 })
      } else {
        posts = await PostModel.find({ type: 'main' }).sort({ createdAt: -1 })
      }
      const logo = '/img/IMG_8196.PNG'
      const contentType = 'main'
      res.render('posts/mainPagePosts', { logo, type: contentType, posts })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Handles the creation of posts.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async createPost (req, res, next) {
    const type = req.body.type
    const post = new PostModel({
      text: xss(req.body.text),
      htmlImage: req.body.textImage,
      creator: xss(req.session.user.firstName),
      type: xss(type)
    })

    await post.save()

    req.session.flash = { type: 'success', text: 'The Post was created successfully' }
    res.redirect('/admin/posts')
  }

  /**
   * Handles the deletion of posts.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async deletePost (req, res, next) {
    const postId = req.params.id
    const deletedPost = await PostModel.findByIdAndDelete(postId)

    if (!deletedPost) {
      req.session.flash = { type: 'danger', text: 'Inlägg inte hittat' }
      return res.redirect('/admin/posts')
    }

    req.session.flash = { type: 'success', text: 'Inlägg raderat' }
    res.redirect('/admin/posts')
  }

  /**
   * Renders page for creation of posts.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getCreatePost (req, res, next) {
    try {
      const logo = '/img/IMG_8196.PNG'
      const type = 'main'
      res.render('posts/createMainPagePosts', { logo, type })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Renders page for editing of post.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getUpdatePost (req, res, next) {
    try {
      const postId = req.params.id
      const post = await PostModel.findOne({ _id: postId })
      const logo = '/img/IMG_8196.PNG'
      const type = 'main'
      res.render('posts/updateMainPagePosts', { logo, type, post })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Handles editing of posts.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async updatePost (req, res, next) {
    const postId = req.params.id
    const postToUpdate = await PostModel.findOne({ _id: postId })

    if (!postToUpdate) {
      return res.status(404).send('Post not found')
    }

    postToUpdate.text = xss(req.body.text)
    postToUpdate.htmlImage = req.body.textImage
    postToUpdate.creator = xss(req.session.user.firstName)

    await postToUpdate.save()

    req.session.flash = { type: 'success', text: 'The Post was created successfully' }
    res.redirect('/admin/posts')
  }
}
