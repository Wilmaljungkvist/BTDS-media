import mongoose from 'mongoose'

/**
 * Establishes a connection to a database.
 *
 * @param {string} connectionString - The connection string.
 * @returns {Promise<mongoose.Mongoose>} Resolves to a Mongoose instance if connection succeeded.
 */
export const connectToDatabase = async (connectionString) => {
  const { connection } = mongoose

  mongoose.set('strict', 'throw')
  mongoose.set('strictQuery', true)

  connection.on('connected', () => console.log('Mongoose connected to MongoDB.'))
  connection.on('error', (err) => console.log(`Mongoose connection error: ${err}`))
  connection.on('disconnected', () => console.log('Mongoose disconnected from MongoDB.'))

  for (const signalEvent of ['SIGINT', 'SIGTERM']) {
    process.on(signalEvent, () => {
      (async () => {
        await connection.close()
        console.log(`Mongoose disconnected from MongoDB through ${signalEvent}.`)
        process.exit(0)
      })()
    })
  }

  console.log('Mongoose connecting to MongoDB.')
  return mongoose.connect(connectionString)
}
