import nodemailer from 'nodemailer'

export class ContactController {
    async sendForm(req, res, next) {
        try {
            const { fname, email, contactType, message } = req.body

            const transporter = nodemailer.createTransport({
                host: 'smtp-mail.outlook.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            })

            const mailOptions = {
                from: process.env.EMAIL,
                to: process.env.EMAIL,
                subject: 'New message from your website',
                text: `
                    Name: ${fname}
                    Email: ${email}
                    Contact Type: ${contactType}
                    Message: ${message}
                `
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error:', error)
                    res.status(500).send('Failed to send email')
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
}
