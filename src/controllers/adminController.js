/**
 * Home controller.
 *
 * @author Wilma Ljungkvist
 */

import { AuthModel } from '../models/AuthModel.js'
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
        res.render('admin/index', { logo, type })
      } catch (error) {
        next(error)
      }
    }
    // TODO: CSS FOR PHONES.
    // TODO: DIFFRENT HEADER FOR ADMIN.
  
    async loginAdmin(req, res, next) {
      try {
        const logo = '/img/BDTSMedia.png'
        let type = 'home'
        res.render('information/index', { logo, type })
  
      } catch (error) {
        next(error)
      }
    }

    async registerUser(req, res, next) {
        try {
            const userData = {
              firstName: 'John',
              lastName: 'Doe',
              email: 'john@example.com',
              username: 'johndoe',
              password: 'password123'
            }
        
            const userId = await AuthModel.register(userData)
        
            console.log('User added successfully! User ID:', userId)
          } catch (error) {
            console.error('Error adding user:', error)
          }
        }
  }
  