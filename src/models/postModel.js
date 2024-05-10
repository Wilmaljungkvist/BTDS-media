import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true
  },
  creator: {
    type: String,
    required: [true, 'Creator is required.']
  },
  type: {
    type: String,
    required: [true, 'Type is required.']
  },
  htmlImage: {
    type: String,
    trim: true
  }
})

postSchema.add(BASE_SCHEMA)

export const PostModel = mongoose.model('Post', postSchema)
