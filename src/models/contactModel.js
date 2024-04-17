import { connectDB } from '../config/mysql.js'

const ContactModel = {}

ContactModel.addContact = async function (contactData) {
    const { fname, email, contactType, message, recipientEmail } = contactData
  
    const createContactQuery = `INSERT INTO contacts (fname, email, contactType, message, recipientEmail) VALUES (?, ?, ?, ?, ?)`
    const values = [fname, email, contactType, message, recipientEmail]
  
    return new Promise((resolve, reject) => {
      connectDB.query(createContactQuery, values, (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  }


  ContactModel.getContact = async function () {
    const getContactQuery = `SELECT * FROM contacts`
    return new Promise((resolve, reject) => {
      connectDB.query(getContactQuery, async (err, results) => {
        if (err) {
          reject(err)
        } else {
          if (results.length === 0) {
            reject(new Error('No contacts'))
          } else {
            resolve(results)
          }
        } 
      })
    })
  }

  export default ContactModel


