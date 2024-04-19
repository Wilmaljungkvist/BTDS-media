import mongoose from 'mongoose'

const convertOptions = {
  getters: true,
  versionKey: false
}

const baseSchema = new mongoose.Schema({}, {
  timestamps: true,
  toObject: convertOptions,
  toJSON: convertOptions,
  optimisticConcurrency: false
})

export const BASE_SCHEMA = Object.freeze(baseSchema)
