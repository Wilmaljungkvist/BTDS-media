/**
 * Home controller.
 *
 * @author Wilma Ljungkvist
 */

import { AuthModel } from '../models/AuthModel.js'
import { ContactModel } from '../models/contactModel.js'
import bcrypt from 'bcrypt'
import { JsonWebToken } from '../lib/JsonWebToken.js'
import nodemailer from 'nodemailer'
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
        const existingUser = await AuthModel.findOne({ username: req.body.username })

        if (!existingUser) {
          req.session.flash = { type: 'danger', text: 'Wrong username and/or password' }
          res.redirect('/admin')
        }

        if (existingUser) {
          const userPass = await AuthModel.findOne({ username: req.body.username }, { password: 1 })
          const hashedPass = await bcrypt.compare(req.body.password, userPass.password)
          console.log(hashedPass)
  
          if (hashedPass) {
            this.session = req.session
            this.session.userid = req.body.username
            req.session.flash = { type: 'success', text: 'Login succesfully.' }
            req.session.user = existingUser
            res.redirect('/contacts')
          } else {
            req.session.flash = { type: 'danger', text: 'Wrong username and/or password' }
            res.redirect('/admin')
          }
        }


        const logo = '/img/BDTSMedia.png'
        let type = 'home'
        res.render('information/index', { logo, type })
  
      } catch (error) {
        next(error)
      }
    }

    async registerUser(req, res, next) {
        try {

          const existingUser = await AuthModel.findOne({ username: req.body.username })

            if (existingUser) {
              req.session.flash = { type: 'danger', text: 'Username already exists' }
              res.redirect('/admin')
            } else {
              const user = new AuthModel({
                username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                email: req.body.email
              })
      
              await user.save()
      
              req.session.flash = { type: 'success', text: 'The User was created successfully' }
              res.redirect('/admins')
            }
          } catch (error) {
            req.session.flash = { type: 'danger', text: error }
            console.error('Error adding user:', error)
          }
        }


        async deleteContact(req, res, next) {
          try {
              const contactId = req.params.id
              const deletedContact = await ContactModel.findByIdAndDelete(contactId)
              
              if (!deletedContact) {
                  req.session.flash = { type: 'danger', text: 'Contact not found' }
                  return res.redirect('/contacts')
              }
              
              req.session.flash = { type: 'success', text: 'Contact deleted successfully!' }
              res.redirect('/contacts')
          } catch (error) {
              next(error)
          }
      }

      async deleteAdmin(req, res, next) {
        try {
            const contactId = req.params.id
            const deletedContact = await AuthModel.findByIdAndDelete(contactId)
            
            if (!deletedContact) {
                req.session.flash = { type: 'danger', text: 'Contact not found' }
                return res.redirect('/contacts')
            }
            
            req.session.flash = { type: 'success', text: 'Contact deleted successfully!' }
            res.redirect('/admins')
        } catch (error) {
            next(error)
        }
    }


      async registerPage(req, res, next) {
        try {
          const logo = '/img/BDTSMedia.png'
          let type = 'admin'
          res.render('admin/register', { logo, type })
      } catch (error) {
          next(error)
      }
    }

        
  /**
   * Destroys the users session.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async logoutUser (req, res, next) {
    const loggedIn = await req.session.user
    if (loggedIn) {
      delete req.session.user
      req.session.flash = { type: 'success', text: 'Logout successful!' }
      res.redirect('/admin')
    } else {
      res.status(404).send('Not found')
    }
  }
  async forgotPassword (req, res, next) {
    try {
      const { email } = req.body
      const user = await User.findOne({ email })
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Återställ lösenord',
        text: `
            Name: ${fname}
            Email: ${email}
            Contact Type: ${contactType}
            Message: ${message}
        `
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error)
            req.session.flash = { type: 'danger', text: 'Formulär kunde inte skickas' }
            res.redirect('/')
        } else {
            console.log('Email sent:', info.response)
            req.session.flash = { type: 'success', text: 'Formulär skickades korrekt!' }
            res.redirect('/')
        }
    })
      const logo = '/img/BDTSMedia.png'
      let type = 'home'
      res.render('admin/forgotPasswordText', { logo, type, email })
    } catch (error) {
      next(error)
    }
  }

  async getForgotPassword (req, res, next) {
    try {
      const logo = '/img/BDTSMedia.png'
      let type = 'home'
      res.render('admin/forgotPassword', { logo, type })
    } catch (error) {
      next(error)
    }
  }

  async resetPassword (req, res, next) {
    try {
      const logo = '/img/BDTSMedia.png'
      let type = 'home'
      res.render('admin/index', { logo, type })
    } catch (error) {
      next(error)
    }
  }

  async getResetPassword (req, res, next) {
    try {
      const logo = '/img/BDTSMedia.png'
      let type = 'home'
      res.render('admin/newPassword', { logo, type })
    } catch (error) {
      next(error)
    }
  }

  async getAdmins (req, res, next) {
    try {
      const admins = await AuthModel.find()

      console.log(admins)

      const logo = '/img/BDTSMedia.png'
      let type = 'admin'
      res.render('admin/admins', { logo, type, admins })
    } catch (error) {
      next(error)
    }
  }
  }
  