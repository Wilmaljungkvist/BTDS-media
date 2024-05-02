/**
 * Home controller.
 *
 * @author Wilma Ljungkvist
 */

import { AuthModel } from '../models/AuthModel.js'
import { ContactModel } from '../models/contactModel.js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
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
          req.session.flash = { type: 'danger', text: 'Fel användarnamn eller lösenord!' }
          res.redirect('/admin')
        }

        if (existingUser) {
          const userPass = await AuthModel.findOne({ username: req.body.username }, { password: 1 })
          const hashedPass = await bcrypt.compare(req.body.password, userPass.password)
          console.log(hashedPass)
  
          if (hashedPass) {
            this.session = req.session
            this.session.userid = req.body.username
            req.session.flash = { type: 'success', text: 'Lyckad inloggning!' }
            req.session.user = existingUser
            res.redirect('/contacts')
          } else {
            req.session.flash = { type: 'danger', text: 'Fel användarnamn eller lösenord!' }
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
              req.session.flash = { type: 'danger', text: 'Användarnamnet används redan' }
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
                  req.session.flash = { type: 'danger', text: 'Kontakt inte hittad' }
                  return res.redirect('/contacts')
              }
              
              req.session.flash = { type: 'success', text: 'Kontakt raderad' }
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
                req.session.flash = { type: 'danger', text: 'Admin finns inte' }
                return res.redirect('/contacts')
            }
            
            req.session.flash = { type: 'success', text: 'Admin raderad!' }
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
      req.session.flash = { type: 'success', text: 'Lyckad inloggning!' }
      res.redirect('/admin')
    } else {
      res.status(404).send('Not found')
    }
  }

  async forgotPassword (req, res, next) {
    try {
      const { email } = req.body
      const user = await AuthModel.findOne({ email })

      if (user !== null) {
        const token = crypto.randomBytes(20).toString('hex')
      await AuthModel.findOneAndUpdate({ email }, { resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 })
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
      subject: 'Reset your password',
      text: `You are receiving this because you (or someone else) have requested to reset the password for your account.\n\n` +
        `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
        `http://${req.headers.host}/admin/reset-password/${token}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error:', error)
        req.session.flash = { type: 'danger', text: 'Failed to send password reset email' }
        res.redirect('/')
      } else {
        console.log('Email sent:', info.response)
        req.session.flash = { type: 'success', text: 'Password reset email sent successfully!' }
        res.redirect('/')
      }
    })
      }
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
      const { token } = req.params
    const { password } = req.body

    const user = await AuthModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    })

    if (!user) {
      req.session.flash = { type: 'danger', text: 'Password reset token is invalid or has expired' }
      return res.redirect('/')
    }

    user.password = password
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    await user.save()

    req.session.flash = { type: 'success', text: 'Password reset successful!' }
    res.redirect('/admin')
    } catch (error) {
      next(error)
    }
  }

  async getResetPassword (req, res, next) {
    try {
      const token = req.params.token
      const user = await AuthModel.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
      })
      if (!user) {
        req.session.flash = { type: 'danger', text: 'Password reset token is invalid or has expired' }
        return res.redirect('/')
      }
      const logo = '/img/BDTSMedia.png'
      let type = 'home'
      res.render('admin/newPassword', { logo, type, token })
    } catch (error) {
      next(error)
    }
  }

  async getAdmins (req, res, next) {
    try {
      const admins = await AuthModel.find()
      const currentAdmin = req.session.user.username

      const logo = '/img/BDTSMedia.png'
      let type = 'admin'
      res.render('admin/admins', { logo, type, admins, currentAdmin })
    } catch (error) {
      next(error)
    }
  }
  }
  