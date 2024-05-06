import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'

const { isEmail } = validator;

const sessionSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'A name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [false, 'Email address is required.'],
    trim: true,
    validate: [isEmail, 'Please provide a valid email address.']
  },
  contactType: {
    type: String,
    required: [true, 'Contact type is required.']
  },
  message: {
    type: String,
    required: [true, 'Message is required.']
  },
  recipientEmail: {
    type: String,
    required: [true, 'Recipient email address is required.']
  }
})

contactSchema.add(BASE_SCHEMA)

export const SessionModel = mongoose.model('Session', sessionSchema)
