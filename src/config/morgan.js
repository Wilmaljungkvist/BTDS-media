import morgan from 'morgan'

/**
 * Get the color code based on the HTTP status code.
 *
 * @param {number} status - The HTTP status code.
 * @returns {number} The color code corresponding to the status code.
 */
const getStatusColor = (status) => {
  if (status >= 500) {
    return 41
  } else if (status >= 400) {
    return 43
  } else if (status >= 300) {
    return 46
  } else if (status >= 200) {
    return 42
  } else {
    return 0
  }
}

/**
 * Format the status code with the corresponding color.
 *
 * @param {number} status - The HTTP status code.
 * @returns {string} The formatted status code with color.
 */
const colorizeStatus = (status) => {
  const color = getStatusColor(status)

  return `\x1b[30m\x1b[${color}m${status}\x1b[39m\x1b[49m`
}

/**
 * Custom Morgan token 'statusColor' that returns the formatted status code with color.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {object} args - Additional arguments.
 * @returns {string} The formatted status code with color.
 */
morgan.token('statusColor', (req, res, args) => {
  const status = res.headersSent || Boolean(res.header) ? res.statusCode : undefined

  return colorizeStatus(status)
})

export const morganLogger = morgan(
  process.env.LOGGER_MORGAN_FORMAT_ADD_REMOTE?.toLocaleLowerCase() === 'true'
    ? ':remote-addr :remote-user :method :url HTTP/:http-version :statusColor :res[content-length] - :response-time ms'
    : ':method :url :statusColor :res[content-length] - :response-time ms',
  {
    stream: {
      /**
       * Writes the message to the logger.
       *
       * @param {string} message - The message to write.
       */
      write: (message) => {
        console.log(message.trim())
      }
    }
  }
)
