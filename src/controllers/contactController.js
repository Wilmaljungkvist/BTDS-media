import nodemailer from 'nodemailer'
import { ContactModel } from '../models/contactModel.js'

export class ContactController {
    async sendForm(req, res, next) {
        try {
            const { fname, email, contactType, message, recipientEmail } = req.body

            const contactModel = await ContactModel.create({
                firstName: fname,
                email: email,
                contactType: contactType,
                message: message,
                recipientEmail: recipientEmail
              })

            console.log(contactModel)

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });

            const mailOptions = {
                from: process.env.EMAIL,
                to: recipientEmail,
                subject: 'New message from your website',
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
        } catch (error) {
            next(error)
        }
    }

    async getContacts(req, res, next) {
        try {
            const contacts = await ContactModel.find()

            console.log(contacts)

            const translatedContacts = contacts.map(contact => {
                if (contact.contactType === 'podRequest') {
                    contact.contactType = 'Önskemål'
                } else if (contact.contactType === 'question') {
                    contact.contactType = 'Fråga'
                }
                return contact
            })

            console.log(translatedContacts)

            const logo = '/img/BDTSMedia.png'
            let type = 'home'
            res.render('admin/contacts', { logo, type, contacts })
        } catch (error) {
            next(error)
        }
    }
}
