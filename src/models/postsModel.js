import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'

const postSchema = new mongoose.Schema({
  header: {
    type: String,
    required: [true, 'Header is required.'],
    trim: true
  },
  text: {
    type: String,
    required: [true, 'Text is required.'],
    trim: true
  },
  creator: {
    type: String,
    required: [true, 'Creator is required.']
  }
})

contactSchema.add(BASE_SCHEMA)

export const PostModel = mongoose.model('Post', postSchema)
