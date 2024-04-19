import { connectDB } from '../config/mysql.js'

import bcrypt from 'bcrypt'

const AuthModel = {}

AuthModel.register = async function (userData) {
  const { firstName, lastName, email, username, password } = userData

  const hashedPassword = await bcrypt.hash(password, 10);

  const createUserQuery = `INSERT INTO users (firstName, lastName, email, username, password) VALUES (?, ?, ?, ?, ?)`
  const values = [firstName, lastName, email, username, hashedPassword]

  return new Promise((resolve, reject) => {
    connectDB.query(createUserQuery, values, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results.insertId)
      }
    })
  })
}

AuthModel.authenticate = async function (username, password) {
  const getUserQuery = `SELECT * FROM users WHERE username = ?`
  return new Promise((resolve, reject) => {
    connectDB.query(getUserQuery, [username], async (err, results) => {
      if (err) {
        reject(err)
      } else {
        if (results.length === 0) {
          reject(new Error('User not found'))
        } else {
          const user = results[0]
          const isPasswordValid = await bcrypt.compare(password, user.password)
          if (isPasswordValid) {
            resolve(user)
          } else {
            reject(new Error('Invalid password'))
          }
        }
      }
    })
  })
}

export default AuthModel
