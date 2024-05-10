import nodemailer from 'nodemailer'
import { ContactModel } from '../models/contactModel.js'
import xss from 'xss'

export class ContactController {
    async sendForm(req, res, next) {
        try {
            const { fname, contactType, message, recipientEmail } = req.body
            
            if (req.body.email) {
                await ContactModel.create({
                    firstName: xss(fname),
                    email: xss(req.body.email),
                    contactType: xss(contactType),
                    message: xss(message),
                    recipientEmail: xss(recipientEmail)
                  })
            } else {
                await ContactModel.create({
                    firstName: xss(fname),
                    contactType: xss(contactType),
                    message: xss(message),
                    recipientEmail: xss(recipientEmail)
                  })
            }


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
                to: recipientEmail,
                subject: 'New message from your website',
                text: `
                    Name: ${fname}
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
        } catch (error) {
            next(error)
        }
    }

    async getContacts(req, res, next) {
        try {
            const contacts = await ContactModel.find()


            const translatedContacts = contacts.map(contact => {
                if (contact.contactType === 'podRequest') {
                    contact.contactType = 'Önskemål'
                } else if (contact.contactType === 'question') {
                    contact.contactType = 'Fråga'
                }
                return contact
            })

            const logo = '/img/BDTSMedia.png'
            let type = 'admin'
            res.render('admin/contacts', { logo, type, contacts })
        } catch (error) {
            next(error)
        }
    }
}
