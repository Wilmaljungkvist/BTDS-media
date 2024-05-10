import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'

const sessionSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true,
    trim: true
  }
})

contactSchema.add(BASE_SCHEMA)

export const SessionModel = mongoose.model('Session', sessionSchema)
