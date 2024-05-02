import jwt from 'jsonwebtoken'

/**
 * Exposes methods for working with JSON Web Tokens (JWTs).
 */
export class JsonWebToken {
  /**
   * Encodes user information into a JSON Web Token (JWT) payload.
   *
   * @param {object} user - The user object containing user information to encode.
   * @param {string|number} expiresIn - The expiration time for the JWT, specified in seconds or as a string describing a time span (e.g., '1d', '2h') using the vercel/ms library.
   * @returns {Promise<string>} A Promise that resolves to the generated JWT.
   */
  static async encodeUser (user, expiresIn) {
    const payload = {
      sub: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      permissionLevel: user.permissionLevel,
      username: user.username
    }

    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        process.env.PRIVATE_KEY,
        {
          algorithm: 'RS256',
          expiresIn
        },
        (error, token) => {
          if (error) {
            reject(error)
            return
          }

          resolve(token)
        }
      )
    })
  }

  /**
   * Decodes a JWT and returns the user object extracted from the payload.
   *
   * @param {string} token - The JWT to decode.
   * @returns {Promise<object>} A Promise that resolves to the user object extracted from the JWT payload.
   */
  static async decodeUser (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.PUBLIC_KEY, { algorithms: ['RS256'] }, (error, decoded) => {
        if (error) {
          reject(error)
          return
        }

        const user = {
          id: decoded.sub,
          firstName: decoded.firstName,
          lastName: decoded.lastName,
          email: decoded.email,
          permissionLevel: decoded.permissionLevel,
          username: decoded.username
        }

        resolve(user)
      })
    })
  }
}
